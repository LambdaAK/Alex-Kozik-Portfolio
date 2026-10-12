---
title: Bandits & search
tagline: Two libraries for decisions under uncertainty; multi-armed bandits from ε-greedy to neural contextual, and Monte Carlo Tree Search on three games.
question: "How do bandit and tree-search algorithms trade exploration against exploitation in practice?"
date: 2025–26
description: BanditBot is a Python library for simulating and benchmarking multi-armed bandit algorithms, with plots for regret and action selection. MCTSLab is a small Monte Carlo Tree Search framework with pluggable games and a benchmark harness. Together with the voting-based multi-agent bandits report, they're the groundwork for my RL research at CMU.
group: ml
order: 3
tech: [Python, NumPy, Matplotlib]
github: https://github.com/LambdaAK/BanditBot
links:
  - label: MCTSLab source
    href: https://github.com/LambdaAK/MCTSLab
  - label: Multi-agent bandits report
    href: /papers/voting-based-multi-agent-bandits.pdf
image: ../../assets/logos/bandits-search.png
media: ../../assets/media/bandits-search.jpg
mediaAlt: "BanditBot experiment: cumulative regret and average reward of context-aware vs context-ignorant policies on a 5-arm contextual bandit."
role: Solo
highlights:
  - "BanditBot: ε-greedy, UCB, Thompson sampling, Softmax and neural-network contextual bandits behind one interface, with regret and action-selection plots."
  - "MCTSLab: UCT and a Flat UCB variant on tic-tac-toe, Connect Four and 2048, with tree visualization and a benchmark harness."
---
