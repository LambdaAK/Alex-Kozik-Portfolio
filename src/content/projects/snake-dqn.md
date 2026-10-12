---
title: Snake DQN
tagline: A DQN that plays Snake on a 30×30 board; the greedy policy averages 44.5 food per game over 100 seeds. Watch it play in your browser.
question: "Can a DQN learn Snake from a compact, hand-designed state?"
date: "2025"
role: Solo
description: A Deep Q-Network agent for Snake with a 33-feature hand-designed state (danger, food direction, free space, A*-based path quality), shaped rewards and timeouts that stop it from looping. The demo on this page runs the trained network in your browser.
group: ml
order: 2
tech: [Python, PyTorch, Reinforcement Learning]
github: https://github.com/LambdaAK/SnakeDQN
links:
  - label: CoinBot (tabular Q-learning)
    href: https://github.com/LambdaAK/CoinBot
image: ../../assets/logos/snake-dqn.png
results:
  - metric: Mean score
    value: 44.5 ± 21.1
    baseline: Greedy policy, 100 seeds
  - metric: Median / max
    value: 51.5 / 71
    baseline: Food eaten per game
  - metric: Network
    value: 33→128→128→64→4
    baseline: ReLU MLP, 29k params
highlights:
  - "State: danger ahead/left/right, heading, food direction, distances to walls and body, free space, dead-end checks and an A*-based path-quality score per direction."
  - Adam (lr 5e-4), γ = 0.99, 50k replay buffer, batch 64, target network synced every 500 episodes.
  - Episodes end after 500 steps without food, which removes the incentive to circle forever.
  - Grew out of CoinBot, a tabular Q-learning and DQN agent for 5×5 grid navigation.
---
