---
title: Text2Code
tagline: Seq2seq transformer that translates English descriptions into a small expression language with arithmetic, conditionals, let-bindings and lambdas. It gets 86.7% exact match on 2,000 held-out descriptions, from 94% on 1–3-token programs down to 40% on programs of 16+ tokens.
question: Can a 4M-parameter transformer learn compositional English-to-code translation from 16k synthetic pairs, and where does it break?
date: '2026'
role: Solo
description: A grammar-driven generator pairs random programs in a small expression language with templated English descriptions. A 3+3-layer encoder-decoder transformer trained from scratch translates the English back into code.
group: ml
order: 4
tech:
- Python
- PyTorch
- Transformer encoder-decoder
- synthetic data generation
github: https://github.com/LambdaAK/Text2Code
media: ../../assets/media/text2code.png
mediaAlt: Exact-match accuracy on 2,000 held-out English descriptions, by target program length. Shaded caps show errors that use the target's tokens in a different order or bracketing.
results:
- metric: Exact match, held-out test
  value: 86.7% (1,734/2,000)
  baseline: copying the input scores 1.4%. Free-running greedy decoding on unseen descriptions, Apple Silicon CPU (measured)
- metric: Programs of 16+ tokens
  value: 40%
  baseline: vs. 94% on programs of 1–3 tokens (n=70 and n=752, measured)
highlights:
- The target language has integers, booleans, + − *, comparisons, && and ||, if-then-else, let-bindings, lambdas and application, with precedence rules spelled out in grammar.md.
- The generator writes many English paraphrases per construct ("the variable x applied to …", "where g is b, …", "function that takes c and gives 7") and deduplicates on the English string, so no test description appears in training.
- Reconstructed the exact training split from the generator seed. The rebuilt vocabulary matches the checkpoint's 163-token vocabulary exactly, so the test numbers are on data the model never saw.
- 'Error analysis: 210 of the 266 errors use exactly the same tokens as the target, rearranged or re-bracketed. Part of this is irreducible, because the generator swaps commutative operands in the English only ("one equals seven" → `7 == 1`).'
---

## How it works
`data_generator.py` (670 lines) samples typed expression trees up to depth 3: integer-, boolean- and function-valued, with let and lambda keeping variables in scope. It renders each tree two ways: as code, and as English chosen from a set of paraphrase templates. Pairs are deduplicated on the English string. 20,000 pairs are split 80/10/10 with seed 42, and `train.py` holds out another 10% of the training file for validation.

The model is an encoder-decoder transformer (`model.py`): 3+3 layers, d_model 256, 4 heads, FFN 512, sinusoidal positions and one shared embedding table for English and code tokens. It has 4.1M parameters. Tokenization is whitespace for the English and a regex lexer for code (`==`, `&&`, numbers, identifiers, punctuation). It is trained with cross-entropy and AdamW, and checkpoint selection uses validation exact match (epoch 115). Inference is greedy autoregressive decoding.

## Results
Measured with the committed `checkpoint_best.pt` on the regenerated `data_test` split (`data_generator.py -n 20000 -d 3 --split --seed 42`, 2,000 pairs), Apple Silicon CPU:

| Target length (tokens) | n | Exact match |
|---|---|---|
| 1–3 | 752 | 93.9% |
| 4–7 | 755 | 91.0% |
| 8–11 | 303 | 77.9% |
| 12–15 | 120 | 64.2% |
| 16+ | 70 | 40.0% |
| all | 2,000 | 86.7% |

Validation (train.py's internal split, 1,600 pairs): 86.1%. Accuracy falls steadily with program length. In 12 randomly sampled errors, the failures were operand order and scope: how far a "minus", "in" or "else" extends.

## Try it
```bash
pip install -r requirements.txt
python infer.py --checkpoint checkpoint_best.pt --input "if x is greater than three then the sum of x and one else zero"
# => if x > 3 then x + 1 else 0
```
