---
title: English2Logic
tagline: A seq2seq transformer that translates English into propositional logic; ~88% exact match on held-out sentences, trained on synthetic data only.
question: "Can a transformer learn to translate English into propositional logic from synthetic data alone?"
date: "2026"
description: A sequence-to-sequence transformer that maps natural-language sentences to formal propositional logic. A synthetic pipeline (formula generator plus English realizer) produces training data, so no human labels are needed.
group: ml
order: 1
tech: [PyTorch, Transformers, NLP]
github: https://github.com/LambdaAK/English2Logic
image: ../../assets/logos/english2logic.png
role: Solo
results:
  - metric: Exact match
    value: ~88%
    baseline: 1k held-out synthetic sentences; no baseline yet
  - metric: Training
    value: ~30 min
    baseline: 1×A100, 10k examples
highlights:
  - Handles varied phrasings ("if A then B", "both A and B", "it is not the case that A").
  - Encoder–decoder transformer (d=128, 4 heads, 2 encoder layers) emitting prefix formulas like IMPLIES(AND(A,B),C).
  - ~88% exact string match on held-out synthetic sentences after about 30 minutes on one A100; logically equivalent but differently written formulas count as wrong.
---
