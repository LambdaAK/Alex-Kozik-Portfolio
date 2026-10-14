// Snake environment and DQN policy, ported from github.com/LambdaAK/SnakeDQN
// (snake_game.py and dqn_agent.py). The feature order and helper logic must match
// the Python exactly: the trained network only understands this 33-dim state.

export type Cell = [row: number, col: number];
type Dir = 'up' | 'down' | 'left' | 'right';

const DELTA: Record<Dir, Cell> = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
const NEIGHBORS: Cell[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
// Network actions are absolute directions.
export const ACTIONS: Dir[] = ['up', 'down', 'left', 'right'];
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

export class SnakeGame {
  snake: Cell[] = [];
  food: Cell = [0, 0];
  direction: Dir = 'right';
  score = 0;
  steps = 0;
  stepsSinceFood = 0;
  over = false;
  readonly height: number;
  readonly width: number;
  private rand: () => number;
  private body = new Set<number>();

  constructor(height = 30, width = 30, rand: () => number = Math.random) {
    this.height = height;
    this.width = width;
    this.rand = rand;
    this.reset();
  }

  reset() {
    this.snake = [[Math.floor(this.height / 2), Math.floor(this.width / 2)]];
    this.direction = 'right';
    this.score = 0;
    this.steps = 0;
    this.stepsSinceFood = 0;
    this.over = false;
    this.syncBody();
    this.spawnFood();
  }

  private key(r: number, c: number) {
    return r * this.width + c;
  }
  private syncBody() {
    this.body = new Set(this.snake.map(([r, c]) => this.key(r, c)));
  }
  private inSnake(r: number, c: number) {
    return this.body.has(this.key(r, c));
  }
  private inBounds(r: number, c: number) {
    return r >= 0 && r < this.height && c >= 0 && c < this.width;
  }

  private spawnFood() {
    for (;;) {
      const r = Math.floor(this.rand() * this.height);
      const c = Math.floor(this.rand() * this.width);
      if (!this.inSnake(r, c)) {
        this.food = [r, c];
        return;
      }
    }
  }

  step(action: number) {
    const d = ACTIONS[action];
    if (d !== OPPOSITE[this.direction]) this.direction = d;
    const [hr, hc] = this.snake[0];
    const [dr, dc] = DELTA[this.direction];
    const nr = hr + dr;
    const nc = hc + dc;
    this.steps++;
    if (!this.inBounds(nr, nc) || this.inSnake(nr, nc)) {
      this.over = true;
      return;
    }
    this.snake.unshift([nr, nc]);
    if (nr === this.food[0] && nc === this.food[1]) {
      this.score++;
      this.stepsSinceFood = 0;
      this.syncBody();
      this.spawnFood();
    } else {
      this.snake.pop();
      this.stepsSinceFood++;
      this.syncBody();
    }
    // Same timeouts as training: stops the agent circling forever.
    if (this.stepsSinceFood >= 500 || this.steps >= 1500) this.over = true;
  }

  // ---- 33-dim state, in the order of get_state() ----

  private dangerous(r: number, c: number) {
    return !this.inBounds(r, c) || this.inSnake(r, c) ? 1 : 0;
  }

  private relative(turn: 'ahead' | 'left' | 'right'): Cell {
    const [hr, hc] = this.snake[0];
    const table: Record<Dir, Record<typeof turn, Cell>> = {
      up: { ahead: [hr - 1, hc], left: [hr, hc - 1], right: [hr, hc + 1] },
      down: { ahead: [hr + 1, hc], left: [hr, hc + 1], right: [hr, hc - 1] },
      left: { ahead: [hr, hc - 1], left: [hr + 1, hc], right: [hr - 1, hc] },
      right: { ahead: [hr, hc + 1], left: [hr - 1, hc], right: [hr + 1, hc] },
    };
    return table[this.direction][turn];
  }

  private foodFlags(): [left: number, right: number, up: number, down: number] {
    const [hr, hc] = this.snake[0];
    const [fr, fc] = this.food;
    const b = (x: boolean) => (x ? 1 : 0);
    switch (this.direction) {
      case 'up':
        return [b(fc < hc), b(fc > hc), b(fr < hr), b(fr > hr)];
      case 'down':
        return [b(fc > hc), b(fc < hc), b(fr > hr), b(fr < hr)];
      case 'left':
        return [b(fr > hr), b(fr < hr), b(fc < hc), b(fc > hc)];
      default:
        return [b(fr < hr), b(fr > hr), b(fc > hc), b(fc < hc)];
    }
  }

  private wallDistance(d: Dir) {
    const [hr, hc] = this.snake[0];
    if (d === 'up') return hr / 10;
    if (d === 'down') return (this.height - 1 - hr) / 10;
    if (d === 'left') return hc / 10;
    return (this.width - 1 - hc) / 10;
  }

  // Walks from the head; the Python checks snake[1:], i.e. body without the head.
  private bodyDistance(d: Dir) {
    const [hr, hc] = this.snake[0];
    const [dr, dc] = DELTA[d];
    const rest = new Set(this.snake.slice(1).map(([r, c]) => this.key(r, c)));
    let distance = 0;
    for (let r = hr + dr, c = hc + dc; this.inBounds(r, c); r += dr, c += dc) {
      if (rest.has(this.key(r, c))) return distance / 10;
      distance++;
    }
    return 1;
  }

  private safeMoves() {
    const [hr, hc] = this.snake[0];
    let n = 0;
    for (const [dr, dc] of NEIGHBORS) if (!this.dangerous(hr + dr, hc + dc)) n++;
    return n / 4;
  }

  private deadEnd(d: Dir) {
    const [hr, hc] = this.snake[0];
    const nr = hr + DELTA[d][0];
    const nc = hc + DELTA[d][1];
    if (this.dangerous(nr, nc)) return 1;
    let free = 0;
    for (const [dr, dc] of NEIGHBORS) if (!this.dangerous(nr + dr, nc + dc)) free++;
    return free <= 1 ? 1 : 0;
  }

  private space(d: Dir) {
    const [hr, hc] = this.snake[0];
    const [dr, dc] = DELTA[d];
    let free = 0;
    for (let r = hr + dr, c = hc + dc; this.inBounds(r, c) && !this.inSnake(r, c); r += dr, c += dc) free++;
    return free / 10;
  }

  // A* with a binary heap keyed on (f, insertion counter), as in the Python at HEAD.
  private aStar(start: Cell, goal: Cell): Cell[] | null {
    if (start[0] === goal[0] && start[1] === goal[1]) return [start];
    const h = (r: number, c: number) => Math.abs(r - goal[0]) + Math.abs(c - goal[1]);
    const heap: [f: number, n: number, key: number][] = [];
    const push = (item: [number, number, number]) => {
      heap.push(item);
      let i = heap.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (less(heap[p], heap[i])) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
      }
    };
    const less = (a: [number, number, number], b: [number, number, number]) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const pop = () => {
      const top = heap[0];
      const last = heap.pop()!;
      if (heap.length) {
        heap[0] = last;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1;
          const r = l + 1;
          let m = i;
          if (l < heap.length && less(heap[l], heap[m])) m = l;
          if (r < heap.length && less(heap[r], heap[m])) m = r;
          if (m === i) break;
          [heap[m], heap[i]] = [heap[i], heap[m]];
          i = m;
        }
      }
      return top;
    };
    const startKey = this.key(...start);
    const goalKey = this.key(...goal);
    let counter = 0;
    push([0, counter, startKey]);
    const cameFrom = new Map<number, number>();
    const g = new Map<number, number>([[startKey, 0]]);
    const open = new Set([startKey]);
    while (heap.length) {
      const [, , cur] = pop();
      open.delete(cur);
      if (cur === goalKey) {
        const path: Cell[] = [];
        for (let k: number | undefined = cur; k !== undefined; k = cameFrom.get(k)) {
          path.push([Math.floor(k / this.width), k % this.width]);
        }
        return path.reverse();
      }
      const cr = Math.floor(cur / this.width);
      const cc = cur % this.width;
      for (const [dr, dc] of NEIGHBORS) {
        const nr = cr + dr;
        const nc = cc + dc;
        if (!this.inBounds(nr, nc) || this.inSnake(nr, nc)) continue;
        const nk = this.key(nr, nc);
        const tentative = g.get(cur)! + 1;
        if (!g.has(nk) || tentative < g.get(nk)!) {
          cameFrom.set(nk, cur);
          g.set(nk, tentative);
          if (!open.has(nk)) {
            counter++;
            push([tentative + h(nr, nc), counter, nk]);
            open.add(nk);
          }
        }
      }
    }
    return null;
  }

  private pathQuality(d: Dir) {
    const [hr, hc] = this.snake[0];
    const nr = hr + DELTA[d][0];
    const nc = hc + DELTA[d][1];
    if (this.dangerous(nr, nc)) return 0;
    const path = this.aStar([nr, nc], this.food);
    if (!path) return 0;
    const lengthScore = 1 - path.length / (this.width + this.height);
    const k = Math.min(5, path.length);
    let spaceScore = 0;
    for (const [pr, pc] of path.slice(0, k)) {
      let free = 0;
      for (const [dr, dc] of NEIGHBORS) if (!this.dangerous(pr + dr, pc + dc)) free++;
      spaceScore += free / 4;
    }
    spaceScore /= k;
    const wall = Math.min(nr, this.height - 1 - nr, nc, this.width - 1 - nc) / Math.max(this.width, this.height);
    return lengthScore * 0.4 + spaceScore * 0.4 + wall * 0.2;
  }

  state(): Float32Array {
    const [ahead, left, right] = (['ahead', 'left', 'right'] as const).map((t) => this.dangerous(...this.relative(t)));
    const dirs: Dir[] = ['up', 'down', 'left', 'right'];
    const d = this.direction;
    return Float32Array.from([
      ahead, left, right,
      +(d === 'left'), +(d === 'right'), +(d === 'up'), +(d === 'down'),
      ...this.foodFlags(),
      ...dirs.map((x) => this.wallDistance(x)),
      ...dirs.map((x) => this.bodyDistance(x)),
      this.safeMoves(),
      ...dirs.map((x) => this.deadEnd(x)),
      ...dirs.map((x) => this.space(x)),
      ...dirs.map((x) => this.pathQuality(x)),
      this.snake.length / 20,
    ]);
  }
}

// 33 → 128 → 128 → 64 → 4 MLP with ReLU; weights are float32, per layer W[out][in] then b.
const SHAPES: [out: number, inp: number][] = [[128, 33], [128, 128], [64, 128], [4, 64]];

export class Policy {
  private layers: { W: Float32Array; b: Float32Array; out: number; inp: number }[] = [];

  constructor(buffer: ArrayBuffer) {
    const all = new Float32Array(buffer);
    let o = 0;
    for (const [out, inp] of SHAPES) {
      const W = all.subarray(o, (o += out * inp));
      const b = all.subarray(o, (o += out));
      this.layers.push({ W, b, out, inp });
    }
    if (o !== all.length) throw new Error(`weights: expected ${o} floats, got ${all.length}`);
  }

  q(x: Float32Array): Float32Array {
    let h = x;
    this.layers.forEach(({ W, b, out, inp }, li) => {
      const y = new Float32Array(out);
      for (let i = 0; i < out; i++) {
        let s = b[i];
        for (let j = 0; j < inp; j++) s += W[i * inp + j] * h[j];
        y[i] = li < this.layers.length - 1 ? Math.max(0, s) : s;
      }
      h = y;
    });
    return h;
  }
}

export function argmax(v: ArrayLike<number>) {
  let best = 0;
  for (let i = 1; i < v.length; i++) if (v[i] > v[best]) best = i;
  return best;
}
