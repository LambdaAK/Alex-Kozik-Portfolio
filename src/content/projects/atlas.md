---
title: Atlas
tagline: A 50M-parameter transformer trained from scratch and served at 110 req/s with 140 ms P95 latency on Kubernetes.
description: A 50.7M-parameter decoder-only transformer, written from scratch in PyTorch, that tracks world state across multi-turn conversations ("Who has the ball?", "How many things does Alice have?"), plus the full inference stack around it.
group: featured
order: 2
tech: [PyTorch, Python, FastAPI, Redis, PostgreSQL, Docker, Kubernetes]
github: https://github.com/LambdaAK/Atlas
image: ../../assets/logos/atlas.png
highlights:
  - GPT-style decoder built from scratch for conversational reasoning and state tracking.
  - Trained on 300K synthetic conversations with masked loss, AdamW and cosine decay.
  - Distributed inference with Redis-backed request batching, sustaining 110 req/s at 140 ms P95 latency.
  - Containerized with Docker and deployed on Kubernetes, scaling to 8 pods with persistent PostgreSQL storage.
---
