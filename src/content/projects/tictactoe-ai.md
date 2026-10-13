---
title: Tic-Tac-Toe AI
tagline: A tabular Q-learning agent playing X never lost in 2,000 games against a perfect minimax opponent (all draws) and won 99% against a random player.
question: Can self-play tabular Q-learning find unbeatable tic-tac-toe play, and how does it compare to MCTS?
date: '2025'
role: Solo
description: Tabular Q-learning (self-play, separate X and O agents) and UCT MCTS for tic-tac-toe, plus an N-dimensional / larger-board variant of the game.
group: archive
order: 8
tech:
- Python
- NumPy
github: https://github.com/LambdaAK/tictactoe-ai
mediaAlt: ''
results:
- metric: X agent vs perfect minimax
  value: 0% losses (100% draws)
  baseline: 2,000 games, minimax breaks ties at random
- metric: X agent vs random
  value: 99.0% wins
  baseline: 2,000 games, 1% draws, 0 losses
- metric: O agent vs perfect minimax
  value: 23% losses
  baseline: 2,000 games, 77% draws
highlights:
- Self-play Q-learning with separate X and O tables. Training ran 50,000 episodes (α=0.1, γ=0.95, ε 0.8 → 0.01), and the committed tables cover 2,154 X states and 1,835 O states.
- Checked against an exact minimax oracle, not only a random opponent. X is unexploitable, but O still has holes.
- A UCT MCTS agent (1,000 iterations per move) for comparison, and an N-dimensional tic-tac-toe engine that enumerates winning lines in any dimension.
---

## How it works

The board state is a 9-character string. Each player has its own Q-table, `state → {action: value}`. During self-play, both agents act ε-greedy and update with the one-step Q-learning target. The reward is +10 for a win, −10 for a loss, and 0 otherwise. At play time an agent takes the argmax Q, with random tie-breaking. `mcts_agent.py` is a separate UCT player (c=1.414, random rollouts), and `tictactoe_nd.py` generalizes the game to N dimensions and larger boards.

## Results

**Measured** with the committed tables (`qlearning/agents/*.pkl`): greedy play, 2,000 games per matchup, `random.Random(0)`, on an Apple Silicon Mac CPU. The minimax opponent is exact and picks uniformly among its optimal moves.

| Agent | vs random (W/D/L) | vs minimax (W/D/L) |
|---|---|---|
| X (moves first) | 99.0 / 1.0 / 0.0 % | 0 / 100 / 0 % |
| O (moves second) | 88.6 / 9.7 / 1.8 % | 0 / 77.0 / 23.0 % |

The repo's MCTS agent (1,000 iterations, playing X) won 975 and lost 25 of 1,000 games against random (`mcts_1000_games_results.json`). A 300-game rerun matched: 296 wins, 4 losses. Since optimal X never loses, those losses point to a weakness in the MCTS implementation.

## Try it

```bash
cd qlearning
python play_game.py
```
