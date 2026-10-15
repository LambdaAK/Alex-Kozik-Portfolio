---
title: Snake Self-Play
tagline: Neural networks that learned Battlesnake only by playing themselves, winning 91% of games against the strongest hand-written bot.
summary: "Self-play PPO agents for multiplayer Snake that beat the best scripted bot 91% of the time, running live in the browser."
question: Can an agent learn a competitive multiplayer game with no human data and a reward that only says who won?
description: "A batched Battlesnake simulator (214k turns/s, verified against an independent reference), PPO self-play training on a laptop GPU, and a browser port of the rules that runs the trained networks with ONNX Runtime Web."
date: '2026'
group: ml
order: 1
role: Solo
tech: [PyTorch, PPO, NumPy, ONNX Runtime Web]
github: https://github.com/LambdaAK/SnakeDQN
paper: /papers/snake-selfplay-report.pdf
links:
  - label: full-page demo
    href: /snake/
results:
  - value: '91%'
    metric: wins vs the strongest scripted bot
    baseline: that bot beats a greedy one 74% of the time
  - value: '45%'
    metric: arena wins, one network vs five bots
    baseline: fair share is 17%
  - value: 2.5 h
    metric: self-play on a laptop GPU
    baseline: no human games, +1/−1 reward
---

## Results

1,000 games per opponent, 11×11 board, 95% confidence intervals.

| opponent | win | draw | loss |
|---|---|---|---|
| flood-fill bot (space-aware, dodges losing head-to-heads) | 91.4% (89.5–93.0) | 0.4% | 8.2% |
| greedy bot (chases food safely) | 90.2% (88.2–91.9) | 6.4% | 3.4% |
| safe-random bot | 99.4% | 0.2% | 0.4% |

Arena, 6 snakes on 19×19: one network against five copies of a bot, 300 games each.
It wins 44.7% against flood-fill bots, 88.0% against greedy bots and 98.7% against safe-random bots.

## How it works

```
simulator  Battlesnake rules in batched NumPy · 214k turns/s · checked step by step
           against an independent reference implementation · 106 tests
input      8 egocentric planes: own head/body/age, enemy heads/bodies, dangerous heads,
           food, health · arena network: 17×17 window around its head + walls
network    3 conv layers → 256 → policy (4 moves) + value · 2.0M parameters
training   PPO self-play vs itself and a pool of past selves · reward +1 win, −1 loss
           · 33.6M turns, 2.5 h on an M3 Max GPU
browser    rules ported to JS (parity-tested) · ONNX Runtime Web · no server
```

The full write-up is in the report linked above.
