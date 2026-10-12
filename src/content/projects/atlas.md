---
title: Atlas
tagline: A 50.7M-parameter transformer trained from scratch to track who-has-what across conversations, served by Redis-batched workers that autoscale on Kubernetes.
question: "Can a small transformer trained from scratch track state across a conversation, and be served like a production model?"
date: "2026"
role: Solo
description: A decoder-only transformer, written from scratch in PyTorch, that tracks world state across multi-turn conversations ("Who has the ball?", "How many things does Alice have?"), plus the full inference stack around it.
group: featured
order: 2
tech: [PyTorch, Python, FastAPI, Redis, PostgreSQL, Docker, Kubernetes]
github: https://github.com/LambdaAK/Atlas
image: ../../assets/logos/atlas.png
results:
  - metric: Model
    value: 50.7M params
    baseline: 12 layers · d=384 · 12 heads
  - metric: Training
    value: 300k conversations
    baseline: Synthetic · 1×A100 · ~15 epochs
  - metric: Serving
    value: k8s, 1–6 workers
    baseline: Autoscaled; CI load-test gate
highlights:
  - GPT-style decoder built from scratch in PyTorch with weight-tied embeddings, FlashAttention, bf16 and torch.compile.
  - Trained on 300k synthetic multi-turn conversations with masked loss, AdamW and cosine decay on one A100.
  - "Serving stack: FastAPI gateway, Redis request queue feeding batched inference workers, Postgres request logging, Prometheus and Grafana."
  - Runs under Docker Compose or on Kubernetes with a horizontal autoscaler (1–6 worker replicas); a CI load-test gate fails the build on latency or throughput regressions.
---
