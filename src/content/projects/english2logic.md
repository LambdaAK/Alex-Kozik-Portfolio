---
title: English2Logic
tagline: Encoder-decoder transformer that translates templated English into propositional-logic formulas. It gets 66% exact match on 916 held-out sentences, where 83% is the most any model can score because 64% of the sentences have more than one valid reading.
question: How close does a small seq2seq transformer get to the best possible accuracy when the English it reads is often structurally ambiguous?
date: '2026'
role: Solo
description: A synthetic English-to-logic translation task (5 variables, NOT/AND/OR/IMPLIES/IFF, nesting depth up to 4) with a 7.5M-parameter encoder-decoder transformer trained from scratch. The re-evaluation compares the model with an exact parser and with the Bayes-optimal predictor for the data generator.
group: ml
order: 5
tech:
- Python
- PyTorch
- Transformer encoder-decoder
- synthetic data generation
github: https://github.com/LambdaAK/English2Logic
image: ../../assets/logos/english2logic.png
media: ../../assets/media/english2logic.png
mediaAlt: Exact-match accuracy by formula nesting depth for the transformer, for a parser that picks a random valid reading, and for the Bayes-optimal ceiling. 916 held-out sentences; 64% of them have more than one valid reading.
results:
- metric: Exact match, held-out test
  value: 65.8% (603/916)
  baseline: picking a random valid reading scores 56.1%; the Bayes-optimal ceiling is 82.9%. Greedy decoding, one sentence at a time, CPU (measured)
- metric: Sentences with only one valid reading
  value: 84.5% (277/328)
  baseline: on the 588 ambiguous sentences the model scores 55.4% vs. 31.5% for picking a random valid reading (measured)
- metric: Depth-4 formulas
  value: 51.5%
  baseline: picking a random valid reading scores 29.3%; the Bayes-optimal ceiling is 64.3% (n=359, measured)
highlights:
- Grammar-based data generator. Random formulas up to depth 4 are realized through 23 English templates such as "B follows from A", "provided that A, B" and "A exactly when B".
- Wrote an exact chart parser over the generator's templates and an inside-probability computation. Together they give every valid reading of a test sentence and its exact posterior, so the model can be scored against the best achievable accuracy rather than against 100%.
- 'Error breakdown: 81% of outputs are a valid reading of the input sentence. Of the 313 errors, 140 are a different valid reading and 173 are not a valid reading at all.'
- Found that reported accuracy depends on batch composition. The decoder attends to padded encoder positions because no memory padding mask is passed. Evaluating in padded batches of 64 gives 77.1%; one sentence at a time gives 65.8%.
---

## How it works
A generator samples a random propositional formula over variables A–E. It picks a depth from 1 to 4, then recursively picks NOT (20–30%) or one of four binary operators. The formula is realized as English by choosing a random template at every node: 3 variable patterns, 4 for NOT, 3 for AND, 3 for OR, 6 for IMPLIES and 4 for IFF. The English has no brackets, so a sentence like "A and B or C and D" has several valid readings. Data: 9,148 train, 914 val and 916 test pairs after deduplication (seed 42).

The model is a standard PyTorch `nn.Transformer` encoder-decoder: 4+4 layers, d_model 256, 8 heads and 7.5M parameters. Word-level tokenization uses a closed 43-token English vocabulary (including 4 special tokens) and 17 logic tokens, with output in prefix form (`IMPLIES(AND(A,B),C)`). It was trained with teacher forcing and cross-entropy. Training stopped once exact match on the training set reached 95% (epoch 102). Decoding is greedy, and the interactive script adds a repetition penalty and bracket-balancing post-processing.

To put the score in context, I wrote an exact parser over the same templates. It enumerates every formula that could have produced a sentence and computes P(formula | sentence) under the generator. This gives two reference points: picking a random valid reading, and the Bayes-optimal argmax.

## Results
All numbers below were measured on the regenerated test split (`python -m dataset.dataset_builder --train 10000 --val 1000 --test 1000`, seed 42, 916 examples) with the committed checkpoint, on an Apple Silicon Mac CPU.

| Decoder / predictor | Exact match |
|---|---|
| Picking a random valid reading (exact parser) | 56.1% |
| Transformer, greedy, one sentence at a time | 65.8% |
| Transformer, `interact.py` decoder (repetition penalty 1.5) | 68.8% |
| Transformer, repo `evaluate.py` (padded batches of 64) | 77.1% |
| Bayes-optimal (exact posterior argmax) | 82.9% |

The model is perfect on depth ≤2 (173/173) and falls to 51.5% at depth 4, where 90% of sentences are ambiguous. The README reports about 88%. I could not reproduce that: it is above the Bayes-optimal ceiling for this test distribution, and training-set accuracy is 94.5%. The 77.1% from the repo's own evaluator holds only when sentences are padded in a batch. Fed one at a time, as in the interactive tool, the model drops to 65.8%. It reproduces 10 of the 17 example translations in the README.

## Try it
```bash
pip install -r requirements.txt
python -m dataset.dataset_builder --train 10000 --val 1000 --test 1000 --output data
python evaluate.py --model checkpoints/model_epoch_102_final.pt
python interact.py --model checkpoints/model_epoch_102_final.pt
```
