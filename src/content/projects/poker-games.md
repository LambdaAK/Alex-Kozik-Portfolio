---
title: Poker CFR
tagline: Vanilla CFR in pure Python drives a Leduc poker strategy to 0.0048 chips/hand exploitability in 4,000 iterations (about 4 minutes on a laptop CPU). Self-play REINFORCE stays above 0.7. Play against it in your browser.
question: How close to a Nash equilibrium do CFR and policy-gradient self-play get in small imperfect-information poker games?
date: '2026'
role: Solo
description: Kuhn, Leduc, and heads-up limit Hold'em environments with CFR, REINFORCE and NFSP-style agents, a round-robin benchmark harness, and a blackjack environment with tabular RL. Standard library only, with 56 unit tests.
group: featured
order: 4
tech:
- Python
- CFR
- REINFORCE
- NFSP
github: https://github.com/LambdaAK/Poker-Games
media: ../../assets/media/poker-games.png
mediaAlt: Exploitability of the Leduc CFR average strategy against iterations on log-log axes, falling from 1.39 chips/hand (uniform) to 0.0048 after 4,000 iterations. A shaded band near 1 chip/hand shows REINFORCE self-play after 400,000 hands.
results:
- metric: Leduc CFR exploitability
  value: 0.0048 chips/hand
  baseline: 4,000 iterations; uniform policy is 1.39
- metric: Leduc REINFORCE self-play exploitability
  value: 0.71–1.18 chips/hand
  baseline: 400k hands, 3 seeds
- metric: CFR bot vs random opponent
  value: +0.38 / +0.57 chips/hand
  baseline: first / second seat, 30,000 hands
highlights:
- Vanilla CFR with full chance enumeration over all 120 Leduc deals; regret matching and reach-weighted average strategy, 288 information sets.
- Chance-sampled CFR, REINFORCE, and a tabular NFSP-style learner (ε-greedy best-response Q-learner plus a reservoir-trained average policy) for limit Hold'em over a hand-bucketing abstraction, plus a league script that trains candidates and promotes the round-robin winner.
- Benchmark harness reporting chips/hand, bb/100, 95% CIs over seeds and per-game Elo.
- Measured with an exact best-response exploitability evaluator (run separately for this page, not part of the repo), CFR converges roughly as 1/√T while policy-gradient self-play plateaus.
---

## How it works

Each game is an immutable state plus a pure `step_state` transition, which keeps tree-walking algorithms simple. For Leduc, `CFRTrainer` enumerates every (P0 card, P1 card, board) deal each iteration and runs vanilla CFR for both traversers. It accumulates counterfactual regrets weighted by opponent reach and builds the average strategy weighted by own reach. Information sets are keyed by private rank, board rank, round, and the public betting history.

The RL baseline is a tabular softmax policy trained with REINFORCE in self-play, using a running-mean baseline. Hold'em is too large to enumerate, so it uses an abstraction (`holdem_limit/abstraction.py`: hole-card buckets, made-hand buckets, bet-state features) with chance-sampled CFR, REINFORCE, and an NFSP-style agent. `evaluate_agents.py` runs round-robins across seeds and reports chips/hand with confidence intervals and bb/100.

This Leduc variant uses bet sizes 1/2 and one raise per round, not the textbook 2/4 and two raises, so its exploitability numbers are not comparable to published Leduc results.

## Results

**Measured** on an Apple Silicon Mac CPU. Exploitability is computed exactly as the average of the two best-response values against the fixed strategy, enumerating all deals.

| Method | Budget | Exploitability (chips/hand) |
|---|---|---|
| Uniform random policy | — | 1.39 |
| CFR average strategy | 100 iterations (7 s) | 0.046 |
| CFR average strategy | 1,000 iterations (63 s) | 0.0095 |
| CFR average strategy | 4,000 iterations (256 s) | 0.0048 |
| REINFORCE self-play | 100k hands, 3 seeds | 0.74–0.83 |
| REINFORCE self-play | 400k hands (repo default), 3 seeds | 0.71–1.18 |

REINFORCE gets worse on two of three seeds between 100k and 400k hands, the cycling you'd expect from naive self-play policy gradient. The near-equilibrium CFR bot wins less against a random player (+0.47 chips/hand averaged over seats) than the 5-iteration strategy does (+0.67), since an equilibrium strategy doesn't try to exploit a weak opponent.

## Try it

```bash
python3 -m unittest discover -s tests
python3 train_cfr_leduc.py --iterations 4000 --save models/leduc_cfr_policy.json
python3 play_leduc.py --cfr-policy models/leduc_cfr_policy.json
```
