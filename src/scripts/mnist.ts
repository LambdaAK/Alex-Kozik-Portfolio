// MNIST CNN from github.com/LambdaAK/MNIST-Classifier (models/best_model.h5), with
// BatchNorm folded into the following layers and dense-1 reordered to CHW.
// Layout of the float32 weight file: per layer W (row-major) then b, no header.

type Conv = { kind: 'conv'; W: Float32Array; b: Float32Array; out: number; inp: number };
type Dense = { kind: 'dense'; W: Float32Array; b: Float32Array; out: number; inp: number; relu: boolean };
type Layer = Conv | Dense | { kind: 'pool' };

const PLAN: ({ kind: 'conv'; out: number; inp: number } | { kind: 'dense'; out: number; inp: number; relu: boolean } | { kind: 'pool' })[] = [
  { kind: 'conv', out: 32, inp: 1 },
  { kind: 'conv', out: 32, inp: 32 },
  { kind: 'pool' },
  { kind: 'conv', out: 64, inp: 32 },
  { kind: 'conv', out: 64, inp: 64 },
  { kind: 'pool' },
  { kind: 'conv', out: 128, inp: 64 },
  { kind: 'dense', out: 512, inp: 512, relu: true },
  { kind: 'dense', out: 10, inp: 512, relu: false },
];

export class MnistNet {
  private layers: Layer[] = [];

  constructor(buffer: ArrayBuffer) {
    const all = new Float32Array(buffer);
    let o = 0;
    for (const p of PLAN) {
      if (p.kind === 'pool') {
        this.layers.push(p);
        continue;
      }
      const size = p.kind === 'conv' ? p.out * p.inp * 9 : p.out * p.inp;
      const W = all.subarray(o, (o += size));
      const b = all.subarray(o, (o += p.out));
      this.layers.push({ ...p, W, b } as Conv | Dense);
    }
    if (o !== all.length) throw new Error(`weights: expected ${o} floats, got ${all.length}`);
  }

  /** x: 784 values in [0,1], white ink on black, row-major 28×28. Returns logits. */
  logits(x: Float32Array): Float32Array {
    let h = x;
    let c = 1;
    let size = 28;
    for (const l of this.layers) {
      if (l.kind === 'pool') {
        const s = size / 2;
        const y = new Float32Array(c * s * s);
        for (let ch = 0; ch < c; ch++)
          for (let i = 0; i < s; i++)
            for (let j = 0; j < s; j++) {
              const base = ch * size * size + 2 * i * size + 2 * j;
              y[ch * s * s + i * s + j] = Math.max(h[base], h[base + 1], h[base + size], h[base + size + 1]);
            }
        h = y;
        size = s;
      } else if (l.kind === 'conv') {
        const s = size - 2;
        const y = new Float32Array(l.out * s * s);
        for (let oc = 0; oc < l.out; oc++) {
          const yo = y.subarray(oc * s * s, (oc + 1) * s * s);
          yo.fill(l.b[oc]);
          for (let ic = 0; ic < l.inp; ic++) {
            const hin = ic * size * size;
            const w = (oc * l.inp + ic) * 9;
            for (let ky = 0; ky < 3; ky++)
              for (let kx = 0; kx < 3; kx++) {
                const wk = l.W[w + ky * 3 + kx];
                if (wk === 0) continue;
                for (let i = 0; i < s; i++) {
                  const row = hin + (i + ky) * size + kx;
                  const yrow = i * s;
                  for (let j = 0; j < s; j++) yo[yrow + j] += wk * h[row + j];
                }
              }
          }
          for (let k = 0; k < yo.length; k++) if (yo[k] < 0) yo[k] = 0;
        }
        h = y;
        c = l.out;
        size = s;
      } else {
        const y = new Float32Array(l.out);
        for (let i = 0; i < l.out; i++) {
          let acc = l.b[i];
          const row = i * l.inp;
          for (let j = 0; j < l.inp; j++) acc += l.W[row + j] * h[j];
          y[i] = l.relu && acc < 0 ? 0 : acc;
        }
        h = y;
      }
    }
    return h;
  }
}

export function softmax(z: ArrayLike<number>): number[] {
  const m = Math.max(...Array.from(z));
  const e = Array.from(z, (v) => Math.exp(v - m));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / s);
}

/**
 * Turn a drawing (grayscale, ink = high values) into MNIST format: crop to the ink,
 * scale the longer side to 20 px, and centre by center of mass in a 28×28 frame.
 * Returns null for an empty drawing.
 */
export function toMnist(ink: Float32Array, w: number, h: number): Float32Array | null {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (ink[y * w + x] > 0.05) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  if (x1 < 0) return null;
  const bw = x1 - x0 + 1;
  const bh = y1 - y0 + 1;
  const scale = 20 / Math.max(bw, bh);
  const tw = Math.max(1, Math.round(bw * scale));
  const th = Math.max(1, Math.round(bh * scale));
  // Area-average downsampling of the bounding box into tw×th.
  const small = new Float32Array(tw * th);
  for (let ty = 0; ty < th; ty++)
    for (let tx = 0; tx < tw; tx++) {
      const sx0 = x0 + (tx * bw) / tw, sx1 = x0 + ((tx + 1) * bw) / tw;
      const sy0 = y0 + (ty * bh) / th, sy1 = y0 + ((ty + 1) * bh) / th;
      let sum = 0, area = 0;
      for (let sy = Math.floor(sy0); sy < Math.ceil(sy1); sy++)
        for (let sx = Math.floor(sx0); sx < Math.ceil(sx1); sx++) {
          const a = (Math.min(sx + 1, sx1) - Math.max(sx, sx0)) * (Math.min(sy + 1, sy1) - Math.max(sy, sy0));
          if (a <= 0) continue;
          sum += a * ink[sy * w + sx];
          area += a;
        }
      small[ty * tw + tx] = area ? sum / area : 0;
    }
  let mass = 0, cx = 0, cy = 0;
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) {
      const v = small[y * tw + x];
      mass += v;
      cx += v * x;
      cy += v * y;
    }
  const ox = Math.round(14 - (mass ? cx / mass : tw / 2)) ;
  const oy = Math.round(14 - (mass ? cy / mass : th / 2));
  const out = new Float32Array(784);
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) {
      const X = x + ox, Y = y + oy;
      if (X >= 0 && X < 28 && Y >= 0 && Y < 28) out[Y * 28 + X] = Math.min(1, small[y * tw + x]);
    }
  return out;
}
