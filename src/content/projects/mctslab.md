---
title: MCTSLab
tagline: A game-agnostic MCTS engine for five games. On Connect 4, UCT with 800 simulations per move scores 80% against 200 simulations and 100% against 50, and 8 simulations already beat a random player 91% of the time.
question: How does Monte Carlo Tree Search strength scale with search budget, and does full-tree UCT beat root-only Flat UCB?
date: '2026'
role: Solo
description: Pure-Python MCTS framework (UCT and Flat UCB) behind a small game interface. It covers tic-tac-toe, Connect 4, 6×6 checkers, dots-and-boxes and stochastic 2048, and adds a round-robin arena with Elo, tree visualization and position analysis.
group: ml
order: 6
tech:
- Python
- MCTS
- rich
- pygame
github: https://github.com/LambdaAK/MCTSLab
image: ../../assets/logos/mctslab.png
media: ../../assets/media/mctslab.png
mediaAlt: Pairwise score matrix from a Connect 4 round-robin (20 games per pair, 10 per seat). Each doubling-plus of the UCT budget wins about 80–95% of games against the smaller budget, and Flat UCB at 800 simulations is level with UCT at 800.
results:
- metric: UCT-800 score vs UCT-200 (Connect 4)
  value: 80%
  baseline: 20 games, 10 per seat
- metric: UCT win rate vs random at 8 simulations/move
  value: 91%
  baseline: Connect 4, 100 games (50 per seat), seed 0
- metric: Flat UCB-800 score vs UCT-800
  value: 57.5%
  baseline: 20 games; not a significant difference
highlights:
- One five-method game protocol (players, legal actions, transition, terminal, outcome). Chance nodes are handled by sampling, so 2048 runs on the same engine as the two-player games.
- UCT and Flat UCB (UCB1 at the root only) share the rollout and backprop code, so they can be compared head-to-head.
- Connect 4 rollouts use a win-if-possible, block-if-necessary policy instead of uniform random moves.
- A round-robin arena (Elo, pairwise score matrix, JSON export), a position analyzer, and terminal and pygame UIs.
---

## How it works

`mcts/game.py` defines the interface a game implements: `get_current_player`, `get_legal_actions`, `apply_action`, `is_terminal` and `get_outcome`. `apply_action` may return a list of `(state, prob)` pairs, and `"chance"` is a valid player, which is how 2048's tile spawns work. `mcts/uct.py` runs the standard loop of UCB1 selection, one-node expansion, rollout to a terminal state and backprop. Each node's reward is credited to the player who moved into it. The final move is the most-visited root child.

`mcts/flat_ucb.py` is the root-only baseline: UCB1 over the root actions with a rollout after each, and no deeper tree. A game can override `rollout_action`. Connect 4 uses that hook to take immediate wins and block immediate losses during rollouts, which makes even shallow searches tactically aware.

`scripts/arena.py` plays every pair of bots from both seats and reports W-D-L, a sequential Elo (K=24) and a pairwise score matrix. `scripts/benchmark_vs_random.py` sweeps the simulation budget against a random player.

## Results

All Connect 4 results are **measured** on an Apple Silicon Mac CPU with the repo's scripts.

Budget sweep against a random player (100 games per point, 50 per seat, `--seed 0`):

| Simulations/move | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 |
|---|---|---|---|---|---|---|---|---|
| UCT win % | 45 | 49 | 56 | 91 | 94 | 95 | 98 | 100 |
| Flat UCB win % | 45 | 49 | 45 | 93 | 96 | 98 | 99 | 100 |

Below 7 simulations the search can't even try every column once, so play is close to random. Round robin (20 games per pair): UCT-800 beats UCT-200 16-0-4 and UCT-200 beats UCT-50 19-0-1. Flat UCB-800 vs UCT-800 was 11-1-8, which is not distinguishable at this sample size. With heuristic rollouts and 7 actions, the deeper tree buys little at 800 simulations.

## Try it

```bash
make connect4
python scripts/arena.py --game connect4 --bots uct:50 uct:200 uct:800 flat_ucb:800 random
```
