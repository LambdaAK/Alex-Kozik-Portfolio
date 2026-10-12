---
title: BanditBot
tagline: Linear Thompson Sampling ends 2,000 rounds of a 5-arm contextual bandit with 131 cumulative regret, vs 489 for linear ε-greedy and 2,289 for a context-free learner (10 seeds).
question: How much does using context, and modelling uncertainty, cut regret in a linear contextual bandit?
date: '2025'
role: Solo
description: From-scratch multi-armed and contextual bandit library in NumPy and PyTorch, with classic MAB policies, linear and neural contextual policies, and an experiment harness.
group: ml
order: 7
tech:
- Python
- NumPy
- PyTorch
- Matplotlib
github: https://github.com/LambdaAK/BanditBot
image: ../../assets/logos/banditbot.png
media: ../../assets/media/banditbot.png
mediaAlt: Cumulative pseudo-regret over 2,000 rounds for five policies (mean of 10 seeds, shaded min–max). Linear Thompson Sampling flattens out near 131, while context-free ε-greedy and uniform random grow linearly to about 2,300.
results:
- metric: Cumulative regret, Linear Thompson Sampling
  value: 131 ± 16
  baseline: 2,000 rounds, 5 arms, 5-D Gaussian context, mean ± sd over 10 seeds
- metric: Cumulative regret, linear ε-greedy (ε=0.1)
  value: 489 ± 68
  baseline: same setup
- metric: Cumulative regret, context-free ε-greedy
  value: 2,289 ± 35
  baseline: same setup; uniform random is 2,303
highlights:
- Classic MAB policies (ε-greedy, greedy, UCB1, softmax, Beta and Gaussian Thompson Sampling) and contextual policies (Bayesian linear Thompson Sampling with a closed-form posterior update, linear ε-greedy, an MLP with experience replay).
- The environment gives each arm a linear-Gaussian reward model with its own noise level, so the best arm changes with the context.
- Linear Thompson Sampling has 3.7× less regret than linear ε-greedy and 6.4× less than the neural policy. Posterior sampling explores less as the fit tightens, while ε-greedy keeps spending 10% of rounds at random.
- A context-free learner does no better than random here, since every arm's mean reward is zero when averaged over contexts.
---

## How it works

The library has two halves. `policies.py` and `mab_environment.py` cover the standard K-armed bandit: ε-greedy, greedy, UCB1, softmax, and Thompson Sampling with Beta and Gaussian posteriors. `contextual_policies.py` and `contextual_mab_environment.py` cover the contextual case. There, a d-dimensional context is drawn each round and each arm's reward is Normal(wᵢ·x, σᵢ).

Linear Thompson Sampling keeps a Gaussian posterior over each arm's weights and bias. It updates the posterior in closed form (Bayesian linear regression), samples one weight vector per arm, and plays the argmax. Linear ε-greedy fits the same linear model with SGD but explores uniformly. The neural policy is an MLP (hidden layers 64 and 32 by default) that predicts all arm values, trained from a replay buffer with ε-greedy exploration. A context-free ε-greedy learner that tracks one mean per arm is the control.

The repo's `run_contextual_experiments.py` contains the experiment configurations used for the README figures: context vs no context, an ε sweep, and an MLP architecture sweep.

## Results

Re-run with fixed seeds on the repo's `create_experiment_bandit` (5 arms, 5-D context, arm noise σ from 0.2 to 0.6): 2,000 rounds and 10 seeds, on an Apple Silicon Mac CPU. Regret is pseudo-regret, measured as the expected reward of the best arm minus the expected reward of the chosen arm.

| Policy | Cumulative regret at T=2000 (mean ± sd) |
|---|---|
| Linear Thompson Sampling | 131 ± 16 |
| Linear ε-greedy (ε=0.1) | 489 ± 68 |
| MLP, ε-greedy (ε=0.1) | 836 ± 175 |
| Context-free ε-greedy (ε=0.1) | 2,289 ± 35 |
| Uniform random | 2,303 ± 47 |

The MLP has the highest variance across seeds (range 511 to 1,084). The context-free learner matches random because the environment code drops each arm's intended bias term, so every arm averages to zero reward over contexts.

## Try it

```bash
pip install -r requirements.txt
python run_contextual_experiments.py
```
