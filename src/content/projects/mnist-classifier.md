---
title: MNIST Classifier
tagline: A 407K-parameter CNN that misclassifies 34 of the 10,000 official MNIST test digits (99.66%). Draw a digit and it runs in your browser.
question: How far does a small conv net with batch norm and dropout get on MNIST, and which digits does it still miss?
date: '2025'
role: Solo
description: A five-conv-layer CNN for handwritten digits in TensorFlow/Keras, with training, evaluation and single-image inference scripts. Small enough (1.6 MB of float32 weights) to run in the browser without an ML runtime.
group: ml
order: 2
tech:
- Python
- TensorFlow
- Keras
- NumPy
- scikit-learn
github: https://github.com/LambdaAK/MNIST-Classifier
media: ../../assets/media/mnist-classifier.png
mediaAlt: All 34 test digits the model gets wrong, labeled true → predicted with the model's confidence; most are 4/9, 7/1 and 6/0 confusions.
results:
- metric: Test accuracy
  value: 99.66%
  baseline: official 10k MNIST test set, committed checkpoint, re-evaluated (34 errors)
- metric: Macro F1
  value: '0.9966'
  baseline: same 10k test set
- metric: Model size
  value: 407K params
  baseline: 1.6 MB float32 after folding batch norm
highlights:
- Five 3x3 valid convolutions (32-32-64-64-128) with two max-pools, then a 512-unit dense layer; batch norm and dropout after each block.
- Adam with early stopping (patience 10) and reduce-LR-on-plateau (factor 0.2, patience 5); the committed checkpoint ended at learning rate 2e-4.
- Most remaining errors are 4↔9, 7→1 and 6→0/1, and several of them are ambiguous even to a person.
- Batch norm layers fold exactly into the following conv/dense weights, so inference is plain conv + ReLU + max-pool + matmul.
---

## How it works
The input is the raw 28x28 MNIST image scaled to [0, 1]; there is no augmentation and no mean/std normalization. The network is a VGG-style stack of five 3x3 convolutions without padding (32, 32, 64, 64, 128 filters) with 2x2 max-pooling after the second and fourth, which reduces the image to a 2x2x128 map. A 512-unit dense layer and a 10-way softmax follow. Batch normalization follows the first conv of each block and the dense layer, and dropout (0.25 in the conv blocks, 0.5 before the output) regularizes the 407K parameters.

Training uses Adam (learning rate 1e-3, batch 128, up to 30 epochs) with categorical cross-entropy. Callbacks stop early on validation loss, cut the learning rate by 5x on plateaus, and keep the checkpoint with the best validation accuracy. `evaluate.py` produces the confusion matrix, per-class metrics, and grids of the misclassified digits. `inference.py` classifies a user image or random test images.

For the web demo, each batch norm layer (all of which come after a ReLU) was folded into the next layer's weights. This is exact because the convolutions are unpadded. The folded float32 network matches the original's predictions on all 10,000 test images.

## Results
Re-evaluating the committed `best_model.h5` on the official 10,000-image MNIST test set gives **99.66% accuracy** (34 errors) and macro F1 0.9966. Per-class recall runs from 99.16% for digit 6 to 99.91% for digit 1. One caveat: the training script uses the test set as its validation set, and both checkpoint selection and the LR schedule depend on it, so this number is slightly optimistic. There is no separate held-out split.

## Try it
```bash
pip install -r requirements.txt
python train.py        # trains the CNN, saves models/best_model.h5
python evaluate.py     # confusion matrix, per-class report, error grids
```
