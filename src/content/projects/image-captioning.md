---
title: Show, Attend, Tell
tagline: A reproduction of Show, Attend and Tell on Flickr8k; METEOR matches the paper for both soft (18.96 vs 18.93) and hard (20.75 vs 20.30) attention.
question: "Do soft and hard visual attention reproduce the paper's captioning results?"
date: Spring 2025
role: Team of 5 · Cornell CS 4782 Deep Learning
description: A re-implementation of the Show, Attend and Tell image-captioning model with both soft attention and hard (stochastic) attention, trained on Flickr8k and compared against the numbers reported by Xu et al. (2015).
group: featured
order: 4
tech: [PyTorch, Computer Vision, LSTM, REINFORCE]
github: https://github.com/srkvatsa/exploring-show-attend-tell
paper: /papers/show-attend-tell.pdf
image: ../../assets/logos/image-captioning.png
media: ../../assets/media/show-attend-tell.jpg
mediaAlt: "Where the soft-attention model looks while generating each word of “two young children play in the sand.”"
results:
  - metric: METEOR, soft
    value: "18.96"
    baseline: Paper 18.93
  - metric: METEOR, hard
    value: "20.75"
    baseline: Paper 20.30
  - metric: BLEU-1, soft
    value: "45.9"
    baseline: Paper 67.0 (tokenization unpublished)
highlights:
  - ResNet-50 encoder producing a 14×14 feature grid and an LSTM decoder with attention over it.
  - Soft attention with doubly stochastic regularization; hard attention trained with REINFORCE (moving-average baseline, entropy bonus), fine-tuned from the soft model.
  - Trained for about 24 hours on a single T4 with the standard Flickr8k splits.
  - METEOR matches or beats the paper for both variants. BLEU-1 is well below it, most likely because the paper's tokenization isn't published.
---
