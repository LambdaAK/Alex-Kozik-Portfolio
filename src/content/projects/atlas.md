---
title: Atlas
tagline: A 21.5M-parameter transformer trained from scratch answers 99.6% of 4,388 held-out questions about who holds what, until objects change hands more often than they did in training.
summary: "A 21.5M-parameter transformer trained from scratch to track who holds what across multi-turn conversations, answering 99.6% of 4,388 held-out questions, served behind a Redis-batched inference stack that autoscales on Kubernetes."
question: Can a small decoder-only transformer trained from scratch track who holds what across a multi-turn conversation, and where does that stop working?
date: '2026'
role: Solo
description: A GPT-style decoder trained from scratch on 300k synthetic conversations to track object possession, served behind a FastAPI gateway with a Redis micro-batching queue, Postgres request logs and a Kubernetes deployment with worker autoscaling.
group: featured
order: 2
tech:
- PyTorch
- Transformers (from scratch)
- FastAPI
- Redis
- PostgreSQL
- Docker Compose
- Kubernetes
- Prometheus
- Grafana
- GitHub Actions
github: https://github.com/LambdaAK/Atlas
image: ../../assets/logos/atlas.png
media: ../../assets/media/atlas.png
mediaAlt: Exact-match accuracy on "Who has the X?" as the queried object changes hands 0–20 times. Atlas stays at or above 99% through 6 hand-offs, the range covered by training, then falls to about 34% by 20, dropping below a heuristic that names the last person mentioned at around 14.
results:
- metric: Held-out question accuracy
  value: 99.6%
  baseline: 4,370 of 4,388 questions, exact match, greedy decoding on the generator's test split (seed 456, 2,000 conversations). Measured.
- metric: '"Who has the X?" accuracy'
  value: 100%
  baseline: 1,599 of 1,599. The "last-named person" heuristic scores 61%, the "first holder" heuristic 15%. Measured.
- metric: Accuracy at 20 hand-offs
  value: 34%
  baseline: Out-of-distribution stress test, 200 conversations per chain length. Holds at ≥99% up to 6 hand-offs, the most the training data contains. Measured.
highlights:
- 12-layer, 384-dim, 12-head pre-norm decoder with weight-tied embeddings, trained from scratch over a closed 148-token vocabulary, with loss computed only on the model's own turns.
- Synthetic data generator with a ground-truth state tracker covering 11 question types, including transfers, counting, quantities and "who has the most".
- Serving path is API → Redis list → worker that forms micro-batches of up to 8 requests within 25 ms → tokens streamed back over Redis pub/sub and SSE. Every request is logged to Postgres.
- Kubernetes manifests include a StatefulSet for Postgres, an HPA that scales workers from 1 to 6 replicas, and optional Prometheus and Grafana.
- A CI gate runs a load test on every PR and fails it if p95 latency exceeds 2.5 s or throughput falls below 6 req/s.
---

## How it works

The data comes from a generator that writes `CLIENT:`/`OUTPUT:` conversations. In each one, people receive objects ("Bob receives the hat."), pass them around ("Eve takes the ring from Alice."), receive countable items ("Diana has 8 apples.") and ask questions. A `PossessionState` object tracks the true state, so every answer is correct by construction. There are 11 question types: who has X, what does X have, yes/no, who has what, how many, who does not have X, does anyone have X, comparisons, who has apples, how many apples, and who has the most. Training used 300k conversations (seed 42). The vocabulary is a closed set of 148 tokens with whitespace and punctuation tokenization, which keeps the model's capacity on state tracking rather than spelling.

The model is a GPT-style pre-norm decoder: 12 layers, d_model 384, 12 heads, FFN 1536, learned absolute positions up to 384 tokens, and an output head tied to the token embeddings, for 21.5M parameters. Loss covers only the model's own turns (the `OUTPUT:` tokens). Training ran on an A100 with bf16, TF32, FlashAttention through SDPA, and `torch.compile`. The best checkpoint came at epoch 16 with a validation loss of 4.2e-4.

For serving, a FastAPI gateway tokenizes the conversation and pushes it onto a Redis list. Workers block on that list, collect up to 8 requests or wait 25 ms, run batched decoding and publish each token to a per-request pub/sub channel. The gateway streams those tokens to the client as server-sent events. The same stack runs locally, under Docker Compose, or on Minikube, with a worker HPA and optional Prometheus and Grafana.

![Serving architecture: client → FastAPI gateway → Redis queue → batched CPU workers (1–6 replicas, autoscaled) → streamed tokens; Postgres request log; Prometheus and Grafana.](../../assets/media/atlas-architecture.svg)

## Results

All results were measured with the committed `checkpoints/best.pt` on an Apple M3 Max CPU. The test split is the repo generator's own (`--test 2000`, seed 456); 3 of its 2,000 conversations also appear verbatim in the 300k training set. Each answer is decoded greedily given the true conversation so far and scored by exact token match.

| Slice | Correct |
|---|---|
| All questions | 4,370 / 4,388 (99.6%) |
| Who has the X? | 1,599 / 1,599 (100%) |
| Who has what? (full inventory) | 281 / 285 (98.6%) |
| Who has the most apples/oranges/coins? | 98 / 102 (96.1%) |
| How many apples does X have? | 445 / 449 (99.1%) |
| Whole conversations with every turn correct | 1,985 / 2,000 (99.3%) |

Accuracy stays between 99.2% and 100% however many statements come before the question (conversations run up to 29 turns).

**Where it breaks.** In the stress test, one object is passed k times before the question. Accuracy is ≥99% for k ≤ 6, which covers 99.98% of training conversations. It then falls to 81% at k = 10 and about 34% at k = 20. Those longer conversations (≤ 284 tokens) are shorter than the longest test conversations (362 tokens), which the model handles, so the failure is in the depth of the state chain, not in context length.

The repo's 22 scripted conversations (`run_examples.py`) all pass (22/22).

## Try it

```bash
python data_generator.py --train 300000 --val 2000 --test 2000 --outdir data
python run_examples.py        # 22 scripted conversations against checkpoints/best.pt
```
