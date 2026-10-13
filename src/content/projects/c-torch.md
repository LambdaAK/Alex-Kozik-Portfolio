---
title: C-torch
tagline: A from-scratch C++ ML library (about 13k lines in lib/, 52 passing unit tests) whose DQN agent beats a random tic-tac-toe opponent in 91% of games, averaged over 10 training seeds.
summary: "A machine learning library written from scratch in C++, with its own linear algebra, symbolic differentiation, 15+ models, DQN and REINFORCE agents, and synchronous distributed training across processes over TCP."
question: What does it take to build the pieces of an ML framework (matrices, layers, optimizers, RL, data-parallel training) without any ML dependencies?
date: 2025–26
role: Solo
description: A dependency-free C++20 library covering dense matrices, an MLP stack with SGD, Adam and other optimizers, classical models (SVMs, kNN, naive Bayes, PCA, k-means, bandits), DQN and REINFORCE agents, synchronous data-parallel training over TCP, and Python ctypes bindings.
group: featured
order: 3
tech:
- C++20
- CMake
- GoogleTest
- POSIX sockets
- std::thread
- Python (ctypes)
- GitHub Actions
github: https://github.com/LambdaAK/C-torch
paper: /papers/low-level-learning.pdf
image: ../../assets/logos/c-torch.png
media: ../../assets/media/c-torch.png
mediaAlt: Win rate of the C-torch DQN against a random tic-tac-toe opponent over 10,000 training episodes for 10 seeds (gray) and their mean (teal), which ends at 91.2%. Random play wins 58.8% and perfect play wins 96.5%.
results:
- metric: DQN win rate vs. random opponent
  value: 91.2%
  baseline: Mean of 10 seeds at 10k episodes, greedy policy, 10k evaluation games each (repo CSVs; re-measured at 91.3%). Random play wins 58.8%, perfect play 96.5% (measured).
- metric: 2-process TCP data-parallel accuracy
  value: 95.2%
  baseline: vs. 94.9% for single-process training; same MLP, global batch and 200 steps on a synthetic 10-class task. Two processes on one Mac. Measured.
- metric: Iris MLP test accuracy
  value: 95.7%
  baseline: Mean of 20 random 80/20 splits (30 test flowers each), range 83–100%. Measured.
highlights:
- Dense `Matrix` type with multi-threaded row kernels, and a `Sequential` MLP (Linear, ReLU, Sigmoid, Tanh) trained with SGD, Adam, AdamW, RMSProp or Adagrad.
- Classical models implemented directly, including an RBF kernel SVM whose dual objective is built as a symbolic expression, a Random Fourier feature SVM, Gaussian naive Bayes, PCA via QR iteration, k-means, epsilon-greedy and UCB bandits.
- DQN with replay memory and a target network for N×N tic-tac-toe, plus a sweep harness covering architecture, γ, ε-decay, batch size, learning rate and update frequency, with a 10-seed reproducibility run.
- 'Synchronous data-parallel training: a `TcpProcessGroup` with broadcast, barrier and all-reduce, gradient averaging across ranks, and distributed checkpoint and resume.'
- CI on Ubuntu and macOS builds the project with CMake, runs 52 GoogleTest cases and runs an Iris smoke test. Python bindings are exposed through a C API.
---

## How it works

Everything is built on a hand-written dense `Matrix` class. Large row-wise operations are split across `std::thread` workers. Neural networks are `Sequential` stacks of linear and activation layers with hand-coded backward passes, Xavier-uniform initialization, binary save and load, and five optimizers. Mini-batches are processed in parallel: each worker thread gets a copy of the model that shares its parameters but keeps its own gradient buffers, and the gradients are summed afterwards.

The RL experiment trains a DQN on N×N tic-tac-toe. The input is an 18-dim one-hot board (X plane, O plane), the network is an MLP (18→32→32→9 for 3×3), and the agent uses ε-greedy exploration, replay memory and a target network, playing first against a uniform-random opponent. The `ttt_main` harness sweeps hyperparameters and writes evaluation CSVs: each saved checkpoint plays 10,000 greedy games. The reproducibility run trains the same configuration with 10 seeds.

Distributed training uses a star topology. Rank 0 accepts TCP connections, receives each rank's gradient tensors, sums them and broadcasts the result. Each rank trains on an equal shard with batch size equal to the global batch divided by world size, and the averaged gradient goes to an identical optimizer step on every rank. The same path covers the MLP and the classical models (logistic regression, SVM primal), and is exposed in both C++ and Python.

## Results

**Tic-tac-toe DQN (3×3, agent moves first).** After 10k episodes the 10 seeds win 84.7–94.9% of games against a random opponent (mean 91.2%, repo CSVs). Re-playing the saved checkpoints 20,000 times each with the repo's own game environment gives a 91.3% mean. That is far above random play (58.8%) but short of perfect play (96.5% wins, 0% losses). The agent still loses 3.6–11.2% of games. It takes an available immediate win in 53% of the 1,498 reachable positions that have one, and blocks an immediate loss in 38% of the 512 that require it. Against a minimax opponent it loses 76–100% of games.

**Data-parallel training.** The test is a synthetic 10-class, 32-dim Gaussian-blob task with an MLP 32-256-256-10, global batch 512 and 200 SGD steps. Two TCP ranks reach 95.2% test accuracy, against 94.6–95.1% for single-process runs, so gradient averaging matches. On a single Mac it is not faster. The shipped TCP backend writes one 8-byte value per `send()` call, which made 2 ranks take 204 s against 8–12 s single-process. A local patch that sends each tensor in one call cut that to 7–10 s. Even then there is no speedup, because one process already keeps all 16 cores busy.

**Iris.** Over 20 random 80/20 splits: MLP (4-32-32-3) 95.7%, Gaussian naive Bayes 95.5%, perceptron (setosa vs. rest) 100%.

## Try it

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release && cmake --build build --parallel
ctest --test-dir build --output-on-failure
CTORCH_IRIS_CSV="$PWD/experiments/classification/Iris.csv" ./build/classification --seed 1
```
