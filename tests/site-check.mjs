// End-to-end stability check for the built site.
//
// Serves dist/ with `astro preview`, then drives a real Chrome through every page:
//   - every internal link resolves (crawled from the homepage)
//   - no page errors, console errors, failed requests, broken images or tab crashes
//   - no horizontal overflow at phone width
//   - the theme toggle, the Forge playground and the Snake demo actually work
//   - repeated navigation doesn't leak memory or crash
//
// Run with `npm run test:site` (builds first). Set CHROME_PATH to use a specific browser.

import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const PORT = 4322;
const BASE = `http://localhost:${PORT}`;
const PASSES = Number(process.env.PASSES ?? 3);
const failures = [];
const fail = (where, what) => failures.push(`${where}: ${what}`);

async function startServer() {
  const proc = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--ignore-lock'], { stdio: 'ignore' });
  let exited = null;
  proc.on('exit', (code) => (exited = code));
  // Poll until the server answers (its log format varies between Astro versions).
  for (let i = 0; i < 120; i++) {
    if (exited !== null) throw new Error(`preview server exited (${exited})`);
    try {
      if ((await fetch(BASE + '/')).ok) return proc;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  proc.kill();
  throw new Error('preview server did not start within 30 s');
}

function watch(page, label) {
  const problems = [];
  page.on('pageerror', (e) => problems.push(`page error: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && problems.push(`console error: ${m.text()}`));
  page.on('requestfailed', (r) => {
    const url = r.url();
    // External requests (fonts CDN, analytics) are outside this check.
    // ERR_ABORTED just means we navigated away before it finished.
    if (url.startsWith(BASE) && r.failure()?.errorText !== 'net::ERR_ABORTED') problems.push(`request failed: ${url} (${r.failure()?.errorText})`);
  });
  page.on('response', (r) => r.url().startsWith(BASE) && r.status() >= 400 && problems.push(`HTTP ${r.status()}: ${r.url()}`));
  page.on('crash', () => problems.push('TAB CRASHED'));
  return () => {
    for (const p of problems.splice(0)) fail(label(), p);
  };
}

async function brokenImages(page) {
  return page.evaluate(async () => {
    const broken = [];
    for (const img of [...document.images]) {
      if (getComputedStyle(img).display === 'none') continue;
      // Bring lazy images into view and give each up to 5 s to load.
      img.scrollIntoView({ block: 'center' });
      if (!img.complete) await new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); setTimeout(r, 5000); });
      if (img.naturalWidth === 0) broken.push(img.src);
    }
    window.scrollTo(0, 0);
    return broken;
  });
}

async function crawl(page) {
  const seen = new Set(['/']);
  const queue = ['/'];
  while (queue.length) {
    const path = queue.shift();
    if (process.env.VERBOSE) console.log(`· crawl ${path}`);
    const resp = await page.goto(BASE + path, { waitUntil: 'load', timeout: 20000 });
    if (!resp || resp.status() !== 200) fail(path, `status ${resp?.status()}`);
    const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    for (const href of links) {
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const clean = href.split('#')[0];
      if (clean.endsWith('.pdf')) {
        if (!seen.has(clean)) {
          seen.add(clean);
          const r = await page.request.get(BASE + clean);
          if (r.status() !== 200) fail(path, `broken PDF link ${clean} (${r.status()})`);
        }
        continue;
      }
      if (!seen.has(clean)) {
        seen.add(clean);
        queue.push(clean);
      }
    }
  }
  return [...seen].filter((p) => !p.endsWith('.pdf'));
}

async function main() {
  const log = (m) => process.env.VERBOSE && console.log(`· ${m}`);
  log('starting preview server');
  const server = await startServer();
  log('launching chrome');
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
  let current = '';
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const flush = watch(page, () => current);

    // 1. Crawl every internal page.
    log('crawling');
    const pages = await crawl(page);
    flush();
    console.log(`Found ${pages.length} pages.`);

    // 2. Visit each page several times: errors, images, overflow, memory.
    const heap = [];
    for (let pass = 1; pass <= PASSES; pass++) {
      for (const path of pages) {
        current = `${path} (pass ${pass})`;
        if (process.env.VERBOSE) console.log(`· ${current}`);
        await page.goto(BASE + path, { waitUntil: 'load', timeout: 20000 });
        if (pass === 1) {
          for (const src of await brokenImages(page)) fail(current, `broken image ${src}`);
        }
        flush();
      }
      heap.push(await page.evaluate(() => performance.memory?.usedJSHeapSize ?? 0));
    }
    const mb = heap.map((h) => Math.round(h / 1e6));
    console.log(`JS heap after each pass (MB): ${mb.join(', ')}`);
    if (mb.length > 1 && mb.at(-1) > mb[0] * 2 + 20) fail('memory', `heap grew from ${mb[0]}MB to ${mb.at(-1)}MB`);

    // 3. Theme toggle flips dark mode and survives a reload.
    current = 'theme toggle';
    await page.goto(BASE + '/', { waitUntil: 'load' });
    const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await page.click('[data-theme-toggle]');
    const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (before === after) fail(current, 'did not toggle');
    await page.reload({ waitUntil: 'load' });
    if ((await page.evaluate(() => document.documentElement.classList.contains('dark'))) !== after) fail(current, 'choice not remembered');
    flush();

    // 4. Forge playground runs every example and shows the expected output.
    current = 'forge playground';
    await page.goto(BASE + '/projects/forge/', { waitUntil: 'load' });
    const examples = await page.$$eval('[data-example]', (bs) => bs.map((b) => b.dataset.example));
    for (const ex of examples) {
      if (ex.includes('infinite')) continue; // takes ~5 s by design; checked separately below
      await page.click(`[data-example="${ex}"]`);
      await page.click('[data-run]');
      await page.waitForFunction(() => !document.querySelector('[data-run]').disabled, null, { timeout: 15000 });
      const out = await page.textContent('[data-output]');
      if (!out || out.includes('failed to load') || out === 'Press Run.') fail(current, `${ex}: no output`);
      if (!ex.includes('type-error') && /error/i.test(await page.textContent('[data-status]'))) fail(current, `${ex}: errored`);
    }
    await page.click('[data-example*="infinite"]');
    await page.click('[data-run]');
    await page.waitForFunction(() => !document.querySelector('[data-run]').disabled, null, { timeout: 20000 });
    if (!/step limit|Stopped/.test(await page.textContent('[data-output]'))) fail(current, 'infinite loop was not stopped');
    flush();

    // 5. Snake demo loads the network and plays: move probabilities appear.
    current = 'snake demo';
    await page.goto(BASE + '/projects/snake-dqn/', { waitUntil: 'load' });
    await page.click('.snake-demo .sd-start');
    await page
      .waitForFunction(() => document.querySelector('.snake-demo [data-sd="probs"]')?.textContent.includes('%'), null, { timeout: 30000 })
      .catch(() => fail(current, 'network did not load or play'));
    flush();

    // 6. Phone width: nothing scrolls sideways.
    const phone = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    const mp = await phone.newPage();
    const flushPhone = watch(mp, () => current);
    for (const path of pages) {
      current = `${path} (phone)`;
      await mp.goto(BASE + path, { waitUntil: 'load' });
      const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) fail(current, `horizontal overflow of ${overflow}px`);
      flushPhone();
    }
  } finally {
    await browser.close();
    server.kill();
  }

  if (failures.length) {
    console.error(`\n${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }
  console.log('\nAll checks passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
