---
title: Reproducing Show, Attend and Tell
tagline: A PyTorch reimplementation of soft- and hard-attention image captioning, evaluated against the paper on Flickr8k.
summary: "A reproduction of Show, Attend and Tell that matched the paper's METEOR on Flickr8k."
date: '2025'
group: ml
order: 2
tech: []
github: https://github.com/srkvatsa/exploring-show-attend-tell
paper: https://github.com/srkvatsa/exploring-show-attend-tell/blob/main/report/23_showattendtell_2pagereport.pdf
---

## Results

METEOR on the Flickr8k test split.

| model | paper | ours |
|---|---|---|
| soft attention | 18.93 | 18.96 |
| hard attention | 20.30 | 20.75 |

## Example

Where the soft-attention model looks for each word it generates.

![Soft-attention maps for the predicted caption "two dogs running in a field", one panel per word; the reference caption says three dogs](../../assets/media/image-captioning.jpg)

## Model

```
ResNet-50 (replaces VGG-19) → 14×14 grid, 196 regions → LSTM decoder, additive attention
soft attention   Adam, teacher forcing decayed 1.0 → 0.5
hard attention   fine-tuned from soft for 20 epochs with REINFORCE
decoding         beam search, width 8
training         about 24 h on one T4
```
