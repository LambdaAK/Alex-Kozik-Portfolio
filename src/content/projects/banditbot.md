---
title: BanditBot
tagline: A bandit-algorithm library in Python, and a comparison of five policies on a contextual bandit where the best arm depends on the context.
summary: "A bandit-algorithm library where linear Thompson sampling cuts regret 4× versus ε-greedy."
date: '2025'
group: ml
order: 6
tech: []
github: https://github.com/LambdaAK/BanditBot
---

## Setting

```
arms       5, reward ~ Normal(wᵢ · x, σᵢ), σ from 0.2 to 0.6
context    x ~ Normal(0, I) in 5 dimensions, new every round
horizon    2,000 rounds, 10 seeds
regret     expected reward of the best arm minus that of the chosen arm
```

## Results

| policy | cumulative regret (mean ± sd) |
|---|---|
| linear Thompson sampling | 131 ± 10 |
| linear ε-greedy, ε = 0.1 | 520 ± 85 |
| MLP, ε-greedy, ε = 0.1 | 873 ± 186 |
| context-free ε-greedy, ε = 0.1 | 2,312 ± 51 |
| uniform random | 2,318 ± 62 |

Linear Thompson sampling has 4.0× less regret than linear ε-greedy, and the context-free learner does no better than random because every arm averages zero reward over contexts.

## What's in it

```
multi-armed   ε-greedy, greedy, UCB1, softmax, Thompson sampling (Beta and Gaussian)
contextual    linear Thompson sampling (Bayesian linear regression posterior),
              linear ε-greedy (SGD), MLP with a replay buffer (PyTorch)
```
