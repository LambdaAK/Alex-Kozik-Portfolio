// Leduc poker rules as implemented in github.com/LambdaAK/Poker-Games (leduc_poker/game.py).
// Non-standard variant: bets of 1 then 2, at most one raise per round, player 0 acts first.

export type Action = 'check' | 'bet' | 'call' | 'raise' | 'fold';
export const RANKS = ['J', 'Q', 'K'] as const;
const TOKEN: Record<Action, string> = { check: 'k', bet: 'b', call: 'c', raise: 'r', fold: 'f' };
// Six cards: two of each rank. Card id = rank * 2 + suit.
export const rankOf = (card: number) => Math.floor(card / 2);

export interface LeducState {
  cards: [number, number];
  board: number; // revealed after round 0
  round: 0 | 1;
  histories: [Action[], Action[]];
  contrib: [number, number];
  toCall: number;
  raises: number;
  toAct: 0 | 1;
  done: boolean;
  folded: 0 | 1 | null; // who folded
}

export function newHand(cards: [number, number], board: number): LeducState {
  return { cards, board, round: 0, histories: [[], []], contrib: [1, 1], toCall: 0, raises: 0, toAct: 0, done: false, folded: null };
}

export function legalActions(s: LeducState): Action[] {
  if (s.done) return [];
  if (s.toCall === 0) return ['check', 'bet'];
  return s.raises < 1 ? ['call', 'raise', 'fold'] : ['call', 'fold'];
}

export function apply(s: LeducState, a: Action): LeducState {
  const n: LeducState = { ...s, histories: [[...s.histories[0]], [...s.histories[1]]], contrib: [...s.contrib] };
  const size = s.round === 0 ? 1 : 2;
  const p = s.toAct;
  const h = n.histories[s.round];
  h.push(a);
  if (a === 'fold') {
    n.done = true;
    n.folded = p;
    return n;
  }
  if (a === 'bet') {
    n.contrib[p] += size;
    n.toCall = size;
  } else if (a === 'call') {
    n.contrib[p] += s.toCall;
    n.toCall = 0;
  } else if (a === 'raise') {
    n.contrib[p] += s.toCall + size;
    n.toCall = size;
    n.raises += 1;
  }
  const closed = n.toCall === 0 && (a === 'call' || (h.length >= 2 && h[h.length - 1] === 'check' && h[h.length - 2] === 'check'));
  if (closed) {
    if (s.round === 1) n.done = true;
    else Object.assign(n, { round: 1, toCall: 0, raises: 0, toAct: 0 });
  } else {
    n.toAct = (1 - p) as 0 | 1;
  }
  return n;
}

/** Net chips for each player at the end of a hand. */
export function payoff(s: LeducState): [number, number] {
  const pot = s.contrib[0] + s.contrib[1];
  let winner: 0 | 1 | null;
  if (s.folded !== null) winner = (1 - s.folded) as 0 | 1;
  else {
    const b = rankOf(s.board);
    const score = (c: number) => (rankOf(c) === b ? 10 : 0) + rankOf(c);
    const d = score(s.cards[0]) - score(s.cards[1]);
    winner = d > 0 ? 0 : d < 0 ? 1 : null;
  }
  if (winner === null) return [pot / 2 - s.contrib[0], pot / 2 - s.contrib[1]];
  return winner === 0 ? [pot - s.contrib[0], -s.contrib[1]] : [-s.contrib[0], pot - s.contrib[1]];
}

/** Information-set key, identical to info_state_key in leduc_poker/cfr.py. */
export function infoKey(s: LeducState, player: 0 | 1): string {
  const priv = RANKS[rankOf(s.cards[player])];
  const board = s.round === 0 ? '?' : RANKS[rankOf(s.board)];
  const hist = (hs: Action[]) => hs.map((a) => TOKEN[a]).join('');
  return `${priv}/${board}|r${s.round}|${hist(s.histories[0])}|${hist(s.histories[1])}`;
}

export type Policy = Record<string, Partial<Record<Action, number>>>;

/** Bot's action probabilities over the legal actions (uniform if the key is unseen). */
export function strategy(policy: Policy, s: LeducState): [Action, number][] {
  const legal = legalActions(s);
  const row = policy[infoKey(s, s.toAct)] ?? {};
  const w = legal.map((a) => row[a] ?? 0);
  const total = w.reduce((x, y) => x + y, 0);
  return legal.map((a, i) => [a, total > 0 ? w[i] / total : 1 / legal.length]);
}

export function sample(probs: [Action, number][], rand = Math.random): Action {
  let r = rand();
  for (const [a, p] of probs) if ((r -= p) <= 0) return a;
  return probs[probs.length - 1][0];
}

/** Deal two private cards and a board card from the six-card deck. */
export function deal(rand = Math.random): { cards: [number, number]; board: number } {
  const deck = [0, 1, 2, 3, 4, 5];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return { cards: [deck[0], deck[1]], board: deck[2] };
}
