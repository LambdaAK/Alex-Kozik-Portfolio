---
title: Reproducing Show, Attend and Tell
tagline: A course-team reimplementation of soft and hard attention captioning that matched the paper's Flickr8k METEOR (18.96 vs 18.93 soft, 20.75 vs 20.30 hard) but trailed far behind on BLEU-1.
question: Do Show, Attend and Tell's METEOR results on Flickr8k hold up with a modern encoder and unknown training details?
date: '2025'
role: Team of 5 · co-author of the report and poster; wrote the README's results and conclusion sections
description: A PyTorch reimplementation of Xu et al. (2015) for Cornell CS 4782 with a ResNet-50 encoder, an LSTM decoder with additive attention, and hard attention trained by REINFORCE. The model was evaluated on the Flickr8k test split against the paper's numbers.
group: ml
order: 4
tech:
- PyTorch
- ResNet-50
- LSTM
- REINFORCE
- NLTK
- Flickr8k
github: https://github.com/srkvatsa/exploring-show-attend-tell
paper: https://github.com/srkvatsa/exploring-show-attend-tell/blob/main/report/23_showattendtell_2pagereport.pdf
image: ../../assets/logos/image-captioning.png
media: ../../assets/media/image-captioning.jpg
mediaAlt: Soft-attention maps for the caption "two dogs running in a field", one panel per generated word; the reference says three dogs.
results:
- metric: METEOR, soft attention
  value: '18.96'
  baseline: paper 18.93 · Flickr8k test
- metric: METEOR, hard attention
  value: '20.75'
  baseline: paper 20.30 · Flickr8k test
- metric: BLEU-1, soft / hard
  value: 45.9 / 43.2
  baseline: paper 67.0 / 67.0
highlights:
- The encoder is ImageNet ResNet-50 pooled to a 14x14 grid of 196 annotation vectors, replacing the paper's VGG-19; the decoder is an LSTM with additive attention, a gating scalar, and learned initial states.
- Doubly stochastic attention regularizer (λ = 0.2) pushes every image region to receive about one unit of attention over the caption.
- Hard attention was fine-tuned from the soft model for 20 epochs with REINFORCE, using an EMA baseline, an entropy bonus, label smoothing and temperature annealing to stabilize the high-variance gradients.
- Length-bucketed mini-batches (batch 64) sped up training. Full training took about 24 h on a single T4.
- Per-word attention maps show where the model looks for each token, for correct and incorrect captions.
---

## How it works
The model follows Xu et al. (2015). A CNN encodes the image into a 14x14 grid of annotation vectors, and an LSTM decoder generates the caption one word at a time. At each step an attention MLP scores all 196 regions against the previous hidden state. In soft attention, the context vector is the softmax-weighted average of the regions. In hard attention, a single region is sampled. The context vector, the previous word embedding, and the hidden state feed the LSTM and a deep output layer.

The team's main departure from the paper was swapping VGG-19 for ImageNet-pretrained ResNet-50 and RMSProp for Adam. Teacher forcing decays linearly from 1.0 to 0.5. Inference uses beam search with width 8 and length normalization. Hard attention is not differentiable, and the paper does not specify how it was trained. The team fine-tuned the trained soft-attention model with REINFORCE for 20 more epochs, using the negative per-sample cross-entropy as the reward. They added an exponential-moving-average baseline, an entropy bonus, and a temperature schedule after early runs collapsed to generic, repetitive captions. Data is Flickr8k (8,000 images, 5 captions each) with its standard train/dev/test split.

## Results
| Flickr8k test | Xu et al. | Reproduced |
|---|---|---|
| Soft · METEOR | 18.93 | **18.96** |
| Hard · METEOR | 20.30 | **20.75** |
| Soft · BLEU-1 | 67.0 | 45.9 |
| Hard · BLEU-1 | 67.0 | 43.2 |

METEOR matched the paper for both variants, but BLEU-1 was about 21–24 points lower. The report attributes the gap to unknown tokenization. In addition, scores were computed with NLTK's METEOR and BLEU rather than the paper's evaluation toolkit, so the comparison is approximate, not exact. Hard attention scored slightly above soft on METEOR, consistent with the paper.

## Try it
```bash
pip install -r requirements.txt
jupyter notebook code/run_sat.ipynb   # setup → data → model → train → visualize
```
