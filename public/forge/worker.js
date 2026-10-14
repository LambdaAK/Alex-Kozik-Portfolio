// Runs Forge (compiled from OCaml with js_of_ocaml) off the main thread.
importScripts('forge.js');
self.onmessage = (e) => {
  const t = performance.now();
  let result;
  try {
    result = self.forge.run(e.data.source);
  } catch (err) {
    result = { ok: false, output: '', error: String(err) };
  }
  self.postMessage({ ...result, ms: Math.round(performance.now() - t) });
};
