---
title: C-Torch
tagline: A machine learning library written from scratch in C++; 15+ models, DQN and REINFORCE agents, and synchronous distributed training over TCP.
question: "How much of the ML stack can you build yourself, from linear algebra up to distributed training?"
date: 2025–26
role: Solo
description: A machine learning library built from the ground up in C++, covering linear algebra, symbolic differentiation and optimizers, with classical models, neural networks and reinforcement learning agents on top, plus Python bindings.
group: featured
order: 2
tech: [C++, Multithreading, TCP Networking, Python bindings]
github: https://github.com/LambdaAK/c-torch
paper: /papers/low-level-learning.pdf
image: ../../assets/logos/c-torch.png
media: ../../assets/media/c-torch.jpg
mediaAlt: DQN win rate against a uniformly random tic-tac-toe player over 10,000 training episodes, 10 independent trials.
results:
  - metric: DQN vs random player
    value: 91.2% wins
    baseline: Mean of 10 trials (84.7–94.9%), 3×3 tic-tac-toe
  - metric: Models
    value: 15+
    baseline: SVMs, MLP, KNN, NB, K-means, PCA, bandits
  - metric: Distributed
    value: Sync over TCP
    baseline: Multi-process data-parallel training
highlights:
  - Matrix library, a symbolic expression engine for derivatives, and optimizers, all from scratch.
  - Perceptron, linear, kernel and random-Fourier SVMs, logistic and linear regression, KNN, Gaussian naive Bayes, K-means, PCA, bandits and an MLP.
  - DQN and REINFORCE agents; the DQN beats a random tic-tac-toe player 91% of the time across 10 independent training runs (training-time win rate).
  - Synchronous data-parallel training across processes over TCP, plus multithreaded training on one machine.
  - Python bindings through ctypes.
---
