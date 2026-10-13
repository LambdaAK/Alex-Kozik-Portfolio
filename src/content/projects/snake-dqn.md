---
title: Snake DQN
tagline: A DQN over 33 hand-engineered features averages 44.5 food per game on a 30×30 board (100 seeds, 1,500-step cap), against 66.6 for a hand-coded greedy A* bot.
question: Can a small DQN learn to play Snake from engineered state features, and how much does the learning add over the features themselves?
date: '2025'
role: Solo
description: PyTorch DQN (and a REINFORCE variant) for Snake on a 30×30 board, with a 33-feature state that includes danger flags, open space and A* path quality, plus 22 committed checkpoints.
group: ml
order: 1
tech:
- Python
- PyTorch
- NumPy
github: https://github.com/LambdaAK/SnakeDQN
links:
- label: CoinBot (tabular Q-learning)
  href: https://github.com/LambdaAK/CoinBot
image: ../../assets/logos/snake-dqn.png
media: ../../assets/media/snake-dqn.png
mediaAlt: The trained DQN playing greedily on a 30×30 board (seed 48, the best of 100 seeds; last 360 steps at 2× speed), reaching 71 food and length 72 at the 1,500-step cap.
video: /media/snake-dqn.mp4
results:
- metric: Mean food per game, final DQN (ep. 2100)
  value: '44.5'
  baseline: greedy policy, 100 seeds, 30×30, 1,500-step cap; median 51.5
- metric: Same, earliest checkpoint (ep. 100)
  value: '38.3'
  baseline: same 100 seeds
- metric: Greedy A* shortest-path bot (no learning)
  value: '66.6'
  baseline: same seeds and cap
highlights:
- MLP Q-network 33 → 128 → 128 → 64 → 4 (about 30k parameters) with experience replay (50k), a target network and gradient clipping. Trained for 2,100 episodes on a laptop.
- The state vector carries danger flags, open-space counts per direction, dead-end flags and A*-based path quality, so the network learns to weigh hand-built features rather than read raw pixels.
- All 22 checkpoints evaluated on the same 100 seeds. Means swing between 26.7 and 44.9 (episode 100 already averages 38.3; the final checkpoint 44.5), and 6 of 100 final-policy games end with 0 food.
- "Small enough to run client-side: the policy is a 117 KB float32 MLP, and the demo on this page runs it in your browser."
---

## How it works

`snake_game.py` is the environment: a 30×30 grid, actions UP/DOWN/LEFT/RIGHT (a reversal is ignored), an episode cap of 1,500 steps, and early termination after 500 steps without food. The agent sees 33 features instead of the board:

- danger straight, left and right
- heading and food direction
- distances to the wall and to the body in each direction
- the count of safe moves
- per-direction dead-end flags, reachable open space, and an A*-based path-quality score
- snake length

The reward is +10 for food, −10 for death, and ±0.3 for moving toward or away from the food.

`dqn_agent.py` is a standard DQN: a 4-layer MLP, ε-greedy exploration decaying per replay step, Adam (lr 5e-4), γ = 0.99, batch 64, a 50k replay buffer, gradient clipping, and a target network synced every 500 episodes. A REINFORCE agent with the same body and a mean-return baseline is included but was only trained for 141 episodes.

The design choice that matters is the feature set. Most of the "planning" (A* path quality, flood-fill space) is computed for the network, which is why even the 100-episode checkpoint averages 38 food.

## Results

**Measured**: greedy argmax-Q, 100 episodes per checkpoint with `random.seed(0..99)`, 30×30 board, 1,500-step cap, on an Apple Silicon Mac CPU.

| Policy | Mean food | Median | Games with 0 food |
|---|---|---|---|
| DQN, episode 100 | 38.3 | 39.0 | 0 |
| DQN, episode 1,000 | 41.9 | 45.0 | 3 |
| DQN, episode 2,100 (final) | 44.5 | 51.5 | 6 |
| Greedy A* to food (hand-coded, no learning) | 66.6 | 68.0 | 2 |
| REINFORCE, episode 141 | 0.03 | 0 | 97 |

Learning across checkpoints is noisy rather than monotone: episode 700 drops to 26.7 and episode 1,300 to 31.6. The learned policy does not beat a simple shortest-path bot under this step cap. A fairer framing is "learns a reasonable policy from engineered features", not "superhuman".

## Try it

```bash
pip install -r requirements.txt
python run_trained_model.py
```
