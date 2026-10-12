---
title: Spam Filter
tagline: A bag-of-words MLP that reaches 98.8% accuracy (F1 0.988) on held-out Enron-Spam emails after a single training epoch.
question: How far does a one-hidden-layer network on word counts get on email spam?
date: '2024'
role: Solo
description: A PyTorch spam classifier for the Enron-Spam corpus (33,345 non-empty emails) using a 17,227-word count vector and a 100-unit hidden layer.
group: archive
order: 7
tech:
- Python
- PyTorch
- pandas
github: https://github.com/LambdaAK/spam-filter
mediaAlt: ''
results:
- metric: Held-out accuracy
  value: 98.8%
  baseline: mean of 3 seeded 90/10 splits, 1 epoch (98.6–98.9%)
- metric: Held-out F1 (spam)
  value: '0.988'
  baseline: same splits
highlights:
- Lowercases and strips punctuation, keeps words that appear at least 20 times, and represents each email as raw word counts.
- 17,227 → 100 → 1 MLP with sigmoid output, trained with BCE and per-example Adam (lr 5e-4).
---

## How it works
`createdata.py` reads the Enron-Spam CSV, drops emails with empty bodies, lowercases them, strips punctuation, and splits on whitespace. It keeps every word that occurs at least 20 times in the corpus, which gives 17,227 words. Each email becomes a vector of word counts, and the data is shuffled into a 90/10 train/test split. `spamfilter.py` trains a 17,227 → 100 → 1 MLP (ReLU, sigmoid) with binary cross-entropy and Adam at lr 5e-4, one example at a time. It reports overall, spam and ham accuracy, and has an interactive mode for classifying a typed sentence.

## Results
Retraining the repo's model and recipe for one epoch on three seeded 90/10 splits (3,335 test emails each, Apple Silicon CPU, ~1.5–4.5 min per run) gave 98.9%, 98.9% and 98.6% held-out accuracy, with F1 from 0.986 to 0.989. The vocabulary is built from the full corpus, test emails included. That is a small leak, though the vocabulary is unsupervised.
