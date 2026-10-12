# Portfolio redesign research (Oct 2026)

Compiled from four research passes: an inventory of the current site, the best engineer portfolios, the best ML-researcher portfolios, and what recruiters/hiring managers say they look for. All reference sites were fetched and confirmed live on 2026-10-11.

---

## 1. Current site: what's there and what's wrong

**Structure.** One scrolling page, seven sections in this order: About → Education → Experience → Skills → Awards → Papers → Projects. No routing (react-router is installed but unused). No footer, no contact section, **no resume link anywhere**.

**Content.** All data lives in arrays inside the 1,574-line `src/App.tsx`. 3 education entries (incl. high school with 8 AP courses), 7 experience entries, 6 skill categories (~45 keywords), 10 awards, 4 papers (PDF only; no authors/venue/date rendered), 18 projects (4 featured + 7 ML + 7 SWE).

**Design.** Pastel pink/blue/lavender gradient, glassmorphism cards, 200 static "stars" that are nearly invisible, three blurred orbs that don't move. No custom font. Dark mode exists in code (`DarkModeContext.tsx`, `DarkModeToggle.tsx`) but is never mounted. `ParallaxBackground.tsx` is dead code.

**Technical.**
- No meta description, Open Graph, Twitter card, canonical, JSON-LD, sitemap or robots.txt. Links shared on LinkedIn/Slack get no preview card.
- Client-rendered SPA: empty HTML without JS. Unlikely to rank for "Alex Kozik".
- `public/` is 61 MB. Project logos are 1–2.3 MB PNGs shown at 64–128 px. Show-Attend-Tell PDF is 18 MB. PDFs duplicated in `/papers` and `/public`. Favicon is a 1.4 MB PNG.
- Desktop and mobile card markup is duplicated (`hidden md:flex` / `md:hidden`) instead of responsive classes.
- Navbar uses `<button>` + scrollTo, so no real anchors or deep links. Toggles lack `aria-expanded`.
- Data bugs: CMU `gpa` field holds a date; education dates never rendered; Salesforce bullets in present tense; "Framer Motion" listed but not installed; AlgoSandbox lists Netlify but has no demo link; CritterWorld has no link.

**Recruiter-facing weaknesses.**
- `h1` is just "Alex"; subtitle is the generic "Software/ML Engineer". No specialty, no one-sentence claim, no availability.
- Hero copy is filler ("Welcome to my website!", hobbies) while the top credentials (CMU RL research, Amazon, Salesforce, CMSX president, PBK, Marx Prize, 4.11 GPA) are below the fold.
- Projects, the strongest material, are the **last** section. Education (21 courses + high school) comes first.
- Strong metrics (110 req/s, P95 140 ms, 26× speedup, 88% exact match, 10,000+ users) are hidden behind "See more" or buried mid-paragraph.
- Project images are AI-looking logos, not screenshots/demos/diagrams. Only 2 of 18 projects have live demos.
- Amazon entry is four words. TA entries repeat the same office-hours bullet three times.
- Skills wall includes Go, Rust, C that no listed project uses.
- Low-signal items: high school, AP Scholar, Boomerang award, "Portfolio Website" as a project.

---

## 2. Reference sites

### Engineer portfolios (verified live)

| Site | Who | Why it works | Recruiter gets in 10 s |
|---|---|---|---|
| [brittanychiang.com](https://brittanychiang.com) | Frontend eng, Klaviyo | Sticky left column (name, one-line tagline, 3-item scroll-spy nav); right column About → Experience (dated timeline with tech chips per role) → Projects (4 cards w/ screenshot + stats) → Writing. "View Full Résumé" PDF. Open-source template. | Role, employer, 6-role timeline, stack |
| [karpathy.ai](https://karpathy.ai) | ML | Pure HTML. Headline "I like to train deep neural nets on large datasets". Dated career timeline with logos → talks → teaching → writing → pet projects (image + paragraph + repo) → publications. Loads instantly. | Employers, talks, repos, all dated |
| [eugeneyan.com](https://eugeneyan.com) | MTS, Anthropic | Start Here / Writing / Speaking / Prototyping. Hard counts as proof (212 posts, 31 talks, 19 prototypes, 11.8k readers). Selected prototypes with one-liner + repo. | Domain, volume of public work, employer |
| [madebyoll.in](https://madebyoll.in) | Systems/ML eng | Homepage = name + 4 dated posts. Each post is a long interactive demo-embedded technical write-up. "4 great things beats 40 cards." | Four deep original projects |
| [lucasb.eyer.be](https://lucasb.eyer.be) | ex-DeepMind/OpenAI | One Markdown-style page: publications with one-sentence takeaway, projects timeline with code/demo, hobby libraries with candid "Outcome" notes, expandable CV, copy-paste short bio. Best single-page merge of research + engineering + CV. | Everything, scannable |
| [samwho.dev](https://samwho.dev) | Dev educator, ngrok | Visual-essay grid with animated preview cards (Bloom filters, load balancing). Site demonstrates the skill. | Can explain systems visually |
| [alexharri.com](https://alexharri.com) | SWE, graphics | Homepage is literally "Popular posts" with interactive diagrams; monospace; tiny bio at bottom. | Depth, writing quality |
| [dhravya.dev](https://dhravya.dev) | Early-career founder | "I love AI research and infra." Milestone timeline, 4 projects with one-liners, live GitHub contribution graph. | Shipped products, trajectory |
| [tomweightman.com](https://tomweightman.com) | Staff eng, Figma | Resume-first: uniform cards (logo, name, one-liner), press quotes, awards. | FAANG employers, awards |
| [hen-ry.com](https://hen-ry.com) | Design engineer | Live project widgets in hero, testimonials, "where I was / am / will be" timeline, explicit "open to full-time" line. | Taste, availability, contact |
| [taniarascia.com](https://www.taniarascia.com) | Principal eng | 4-line career timeline; projects with uniform "Article / Demo / Source" links; stats (177 posts, 20k+ stars). | Seniority, output |
| [rauno.me](https://rauno.me) | Design eng, Vercel | Terse bio, /craft page of micro-interactions. The site is the proof. | Craft quality |
| [hamel.dev](https://hamel.dev) | ML eng | One credibility paragraph: artifacts (CodeSearchNet, nbdev) and who uses them. | Niche + concrete artifacts |
| [anuraghazra.dev](https://anuraghazra.dev) | OSS author | "Case Study / Live Demo / GitHub" triplet per project; 30k+ stars stated. | OSS impact |
| [dustinbrett.com](https://dustinbrett.com) | Senior eng | Full OS in the browser. Admired, but crashed visitors' tabs; résumé hard to find. **Cautionary.** | Ambition, but no résumé |

### Researcher portfolios (verified live)

| Site | Who | Why it works |
|---|---|---|
| [jonbarron.info](https://jonbarron.info) | DeepMind (NeRF) | The canonical academic layout; most-copied HTML in CV. Each paper: thumbnail/looping video, title → project page, bold self-name, venue + badges, link row (project / arXiv / video / code / bibtex), one-sentence "X lets you Y". |
| [ysymyth.github.io](https://ysymyth.github.io) | Shunyu Yao, OpenAI | One page: About, **Selected work** (13 items mixing papers and shipped products), talks. Each: title, authors, venue+status, one-liner, `paper \| repo \| project \| blog` links. Best example of papers and products in one list. |
| [tridao.me](https://tridao.me) | Princeton/Together | al-folio. Selected publications numbered with arXiv+code; "Repositories" as first-class nav item (the research-engineer tell); CV with update date. |
| [yoonholee.com](https://yoonholee.com) | Stanford PhD | Three numbered research threads → blog post + project site. Selected papers with one-sentence summary. Footer: job-market notice + email CTA. |
| [ellisbrown.github.io](https://ellisbrown.github.io) | NYU PhD | al-folio by the book: pubs by year with thumbnails, venue badges with acceptance rate, buttons Abs / arXiv / Bib / PDF / Code / Website, collapsible abstract. |
| [jasonwei.net](https://www.jasonwei.net) | OpenAI | Text-only. Bio with each concept hyperlinked to the paper that defines it. Minimal maintenance, reads authoritative. |
| [sander.ai](https://sander.ai) | DeepMind | Long essays with TOC, BibTeX block for citing the post, key-takeaways list. Blog posts as citable artifacts. |
| [lilianweng.github.io](https://lilianweng.github.io) | OpenAI/Thinking Machines | The site is the blog. Proof is entirely the posts. |
| [colah.github.io](https://colah.github.io) | Anthropic | Topic-grouped image-card index; papers demoted below interactive essays. |
| [kvfrans.com](https://kvfrans.com) | BAIR PhD | Blog-as-lab-notebook: runnable notebooks, research posts beside essays. |
| [natolambert.com](https://www.natolambert.com) | Ai2 | Hub pattern: bold quick-links outward (Scholar, slides, newsletter). |
| [nerfies.github.io](https://nerfies.github.io) | — | MIT-licensed per-paper project-page template: title, authors, buttons, abstract, result videos, BibTeX. |

Honourable: [sebastianraschka.com](https://sebastianraschka.com) ("Start Here / Best Articles", dark mode), [jalammar.github.io](https://jalammar.github.io) (explorables, HN points as social proof), [jsteinhardt.stat.berkeley.edu](https://jsteinhardt.stat.berkeley.edu) (claims hyperlinked inline to arXiv), [leerob.com](https://leerob.com) (bio + notes, no project gallery), [nindalf.com](https://nindalf.com) (perfect PageSpeed, praised on HN).

---

## 3. Patterns that recur in the best sites

1. **One-sentence identity above the fold, with a noun and a verb.** "I like to train deep neural nets on large datasets." Never "passionate full-stack developer".
2. **Current affiliation in the first two lines, linked.**
3. **Single scrolling page, 3–5 nav items.** About / Experience / Projects / Writing. Sticky sidebar + scroll-spy, or plain `<hr>`-separated sections.
4. **Dated, reverse-chronological everything.** Dates are the credibility signal.
5. **Few, deep, linked projects.** 4–7 on the homepage, each with real image/preview + 1–2 sentences + uniform link set (`Write-up / Demo / Source`). Long tail goes to `/projects`. For ML/systems people, the "project" is a long-form write-up with embedded demos.
6. **Quantified proof instead of skill bars.** Stars, req/s, speedups, user counts, awards, press.
7. **Tech as chips on roles/projects, not a global Skills wall.**
8. **Contact = email (copy-to-clipboard) + GitHub + LinkedIn in header or footer, plus a PDF résumé.**
9. **The site demonstrates the claimed skill.** Systems/ML people ship fast static sites with interactive diagrams.
10. **Voice is first-person, specific, lightly humorous; one line of hobbies at most.**
11. **Fast and durable.** Static, no hero video, no 3D showpieces.

Research-specific:
- Universal paper schema: title → PDF/arXiv, authors with self highlighted, venue + badge, link row (`paper | code | project | bibtex | slides | talk`).
- "Selected" on the homepage + one-line plain-English summary; full list elsewhere or via Scholar.
- Shipped products beside papers in one "selected work" list is the clearest research-engineer signal (Yao).
- Dated news feeds age badly; "Recent" paragraphs and "latest posts" age gracefully.

## 4. Common mistakes (from critique threads)

Skill bars; cookie-cutter Intro → Skills → Projects → Contact; tutorial clones; no live demo or public code; broken links; overstated role on team projects; poor contrast / desktop-only; performance-killing flourishes (3D, embeds); generic bio; hobbies above the work; contact buried; stale content; typos (the one data-backed red flag).

---

## 5. What recruiters and hiring managers actually do

Evidence quality: almost no rigorous data on portfolio sites. Traceable: Ladders eye-tracking (résumés: 7.4 s scan; simple single-column layouts with clear headings win), CoderPad 2026 (only 11% of recruiters think portfolio review predicts on-the-job ability), interviewing.io (typos are the strongest negative predictor). Everything else is practitioner anecdote, but highly consistent.

- **30–90 seconds total.** They need, in order: who you are, what role you want, what stack, what you built, where you worked, what you studied.
- **Sourcers often don't click at all.** Hiring managers and interviewing engineers open the site for promising or borderline candidates. **Design for the engineer who clicks, not the sourcer who won't.**
- **Moves the needle:** 3–5 projects with problem → approach → result write-ups and live links; impact numbers ("achieved X measured by Y by doing Z"); technical writing (the most-cited success channel on HN's "did your site help you get hired" thread); one well-documented repo with README, tests, screenshots; downloadable résumé; contact on every page; honest proficiency ("PyTorch, 3 yrs, daily") instead of bars.
- **Noise:** skill bars, long About, generic adjectives, unlabeled tech logos, heavy animation, editors/hardware as skills, default favicon.
- **AI-lab specific:** DeepMind/Anthropic hiring-manager quotes via 80,000 Hours: being able to **reproduce a typical ML paper** or land a serious fix in a major ML library gets an interview. Put replications on GitHub/blog with a benchmark table vs. paper numbers, failure modes, compute used. Lab reviewers inspect research code for experiment tracking, documented assumptions, tests, reproducibility. Publications required for research-first roles; strong open-source implementation portfolios are often a better signal for applied RE roles.
- **SEO:** own `yourname.com`; `<title>` = "Full Name – Role"; role and stack in visible text; same URL in LinkedIn contact field, résumé header, GitHub profile; Person JSON-LD + sitemap; Google yourself logged-out. LinkedIn restricted Google indexing in 2024, so personal sites are relatively more findable now.
- **Performance:** static site, < 2 s load, Lighthouse 90+, works on a phone; lightweight analytics (Plausible/Umami) to see which projects get opened.

Sources: joshwcomeau.com/effective-portfolio · dev.to/fahimulhaq (thousands of résumés) · news.ycombinator.com/item?id=41656015 · news.ycombinator.com/item?id=46618714 · 80000hours.org/career-reviews/ai-safety-technical-research · recruitingfromscratch.com/blog/how-to-hire-a-research-engineer-at-an-ai-lab-2026 · freecodecamp.org "I reviewed fifty portfolios" · hrdive.com (Ladders eye-tracking) · coderpad.io/state-of-tech-hiring-2026 · qz.com/886041 (interviewing.io).
