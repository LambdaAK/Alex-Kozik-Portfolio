---
title: English2Logic
tagline: A transformer that translates English into propositional logic; ~88% exact match on nested formulas, trained on synthetic data only.
description: A sequence-to-sequence transformer that maps natural-language sentences to formal propositional logic. A synthetic pipeline (formula generator plus English realizer) produces training data, so no human labels are needed.
group: ml
order: 5
tech: [PyTorch, Transformers, NLP]
github: https://github.com/LambdaAK/English2Logic
image: ../../assets/logos/english2logic.png
highlights:
  - Handles varied phrasings ("if A then B", "both A and B", "it is not the case that A").
  - ~88% exact-match accuracy on nested formulas after ~30 minutes of training on one A100.
---
