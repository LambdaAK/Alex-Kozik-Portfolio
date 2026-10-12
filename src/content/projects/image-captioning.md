---
title: Show, Attend, Tell
tagline: Visual attention for image captioning, re-implemented in PyTorch with a ResNet-50 encoder and LSTM decoder.
description: A re-implementation of the Show, Attend, Tell architecture for generating image captions, with both soft and hard attention. Final project for CS 4782 Deep Learning.
group: ml
order: 2
tech: [PyTorch, Computer Vision, LSTM]
github: https://github.com/LambdaAK/CS-4782-Final-Project
paper: /ShowAttendTell Report.pdf
image: ../../assets/logos/image-captioning.png
highlights:
  - Soft attention trained with backpropagation and hard attention trained with REINFORCE.
  - Encoder–decoder with ResNet-50 features and an LSTM, plus attention-map visualization.
  - Evaluated with METEOR against the original paper's reported scores.
---
