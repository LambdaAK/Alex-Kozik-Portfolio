---
title: MCTSLab
tagline: A Monte Carlo Tree Search engine in Python that plays five games through one game interface.
summary: "A Monte Carlo Tree Search engine for five games, from tic-tac-toe to Connect 4."
date: '2026'
group: ml
order: 3
tech: []
github: https://github.com/LambdaAK/MCTSLab
---

## Example

The position analyzer on Connect 4, 4,000 simulations. Column 4 is the only move that sets up two threats at once.

```
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. O O . . . .
. X X . . . .
1 2 3 4 5 6 7

Action  Visits   Share   Mean
------  ------  ------  -----
4         3414   85.4%  0.888
1          157    3.9%  0.627
3          144    3.6%  0.615
2          108    2.7%  0.560
5           64    1.6%  0.445
7           61    1.5%  0.434
6           52    1.3%  0.385

Principal variation: 4 -> 1 -> 5
```

## Results

Connect 4 against a random player, 100 games per budget, 50 from each seat.

| simulations per move | UCT win rate | Flat UCB win rate |
|---|---|---|
| 1 | 45% | 45% |
| 4 | 56% | 45% |
| 8 | 91% | 93% |
| 32 | 95% | 98% |
| 128 | 100% | 100% |

## What's in it

```
games     tic-tac-toe · Connect 4 · 6×6 checkers · dots and boxes · 2048 (chance nodes)
search    UCT · Flat UCB (UCB1 at the root only) · per-game rollout policies
tools     round-robin arena with Elo · position analyzer · tree visualizer · terminal and pygame UIs
```
