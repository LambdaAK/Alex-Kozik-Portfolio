---
title: Snake DQN
tagline: A deep Q-network that plays Snake on a 30×30 board from 33 hand-built state features.
summary: "A DQN that learns Snake from a 33-feature state, averaging 44.5 food per game."
date: '2025'
group: ml
order: 1
tech: []
github: https://github.com/LambdaAK/SnakeDQN
---

## Results

Greedy play on the same 100 seeded games, 30×30 board, 1,500-step cap.

| checkpoint | mean food | median |
|---|---|---|
| episode 100 | 38.3 | 39 |
| episode 1,000 | 41.9 | 45 |
| episode 2,100 (final) | 44.5 | 51.5 |

## Model

```
MLP 33 → 128 → 128 → 64 → 4 · 29,380 parameters
state   3 danger · 4 heading · 4 food direction · 4 wall distance · 4 body distance
        1 safe-move count · 4 dead end · 4 open space · 4 A* path quality · 1 length
reward  +10 food · −10 death · ±0.3 toward or away from the food
DQN     replay 50k · target network · Adam 5e-4 · γ 0.99 · batch 64 · 2,100 episodes
```

The demo above runs the final checkpoint, a 117 KB float32 file.
