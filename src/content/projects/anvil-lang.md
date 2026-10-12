---
title: Anvil
tagline: A tensor language that compiles a whole training loop (forward, backward and optimizer) into one fused ARM64 program; it trained four small models 2.6-5.8× faster per epoch than the best PyTorch CPU setting in my reruns.
question: If the compiler sees the whole training step at once, how much of a framework's overhead can it remove?
date: '2026'
role: Solo
description: A small language for machine learning, written in Python, with index notation, shapes as types and built-in reverse-mode autodiff. It compiles programs to multithreaded NEON assembly, to Metal for the Apple GPU, or to a CUDA file, and Anvil functions can be called from NumPy or exported as C libraries.
group: featured
order: 2
tech:
- Python
- ARM64 assembly
- NEON
- Metal
- NumPy
- PyTorch (baselines)
github: https://github.com/LambdaAK/Anvil-Lang
media: ../../assets/media/anvil-lang.png
mediaAlt: 'Seconds per training epoch on an Apple M3 Max CPU for four small models: Anvil versus PyTorch 2.14 at default threads and at one thread (log scale, median of 3 runs).'
results:
- metric: Training speed vs PyTorch (CPU)
  value: 2.6–5.8× faster
  baseline: steady-state epoch time vs the faster of PyTorch 2.14 eager at default threads or 1 thread; logreg, MLP, LeNet, 2-block GPT; 3 runs, Apple M3 Max (measured)
- metric: MNIST MLP, 5 epochs
  value: 96.84% in 0.5 s
  baseline: 784-128-10, SGD; reproduced the README's numbers exactly (measured)
- metric: Tests
  value: 333 pass, 7 skipped
  baseline: pytest; autodiff rules checked against float64 finite differences, native code against a NumPy reference interpreter (measured)
highlights:
- 'Index notation is the core: `y[i] = sum W[i, j] * x[j]`; a convolution is one line and its output size is inferred.'
- '`minimize loss with adam()` generates the backward pass at compile time, so it is fused like the forward pass; the SGD update runs inside the weight-gradient matmul.'
- 'Named dimensions: two sizes that are both 64 but mean different things (T vs D) fail to compile, catching transposition bugs that would otherwise train silently worse.'
- 'Four backends: multithreaded ARM64 with matmuls on Apple''s AMX via Accelerate, Metal, CUDA (tested in emulation only), and a NumPy reference interpreter.'
- 'Written in Anvil: a DQN for Snake, a GRU and a small GPT, a VAE, DDPM diffusion, checkers by self-play, a pretrained 12-layer BERT fine-tuned on SST-2 (91.97% reported), and a U-Net that draws handwriting.'
---

## How it works

An Anvil program is parsed, then elaborated: every shape is resolved at compile time, functions
are inlined, and every tensor operation becomes one kernel of the form `out[I] = ⊕_J body(I, J)`.
Autodiff, fusion and code generation are each written once against that form. Reverse-mode
differentiation runs on the kernel IR at compile time, so the backward pass and the optimizer
update are optimized together with the forward pass: elementwise work is fused into the matmuls
around it, temporaries whose lifetimes do not overlap share memory, and there is no allocation
during training.

The ARM64 backend emits readable assembly, one function per kernel headed by the math it
computes, with 4×16 register-tiled NEON micro-kernels and inline `exp`/`log`/`tanh`. Large
kernels split their outer loop across cores and stay bit-identical for any thread count; large
matrix products go to Apple's AMX coprocessor through `cblas_sgemm` with Anvil's epilogue fused
around them. The same IR also lowers to Metal and to a single CUDA file. The compiler is about
15k lines of Python; the standard library (layers, losses, optimizers) is written in Anvil.

## Results

My reruns on an Apple M3 Max with other jobs running (load average 9-16), using the repo's own
harness (`benchmarks/vs_pytorch/run.py`, 3 runs, median steady-state epoch):

| model | Anvil | PyTorch, default threads | PyTorch, 1 thread | final accuracy / loss (Anvil, PyTorch) |
|---|---|---|---|---|
| softmax regression, MNIST | 0.015 s | 0.186 s | 0.087 s | 92.13%, 92.09% |
| MLP 784-128-10, MNIST | 0.066 s | 0.438 s | 0.171 s | 96.84%, 96.95% |
| LeNet CNN, MNIST | 1.21 s | 11.9 s | 4.54 s | 98.39%, 97.92% |
| 2-block GPT, char-level | 0.276 s | 0.736 s | 1.03 s | 2.68, 2.58 bits/byte |

The gains are largest for small models, where PyTorch's per-operation overhead dominates. They
shrink when the time goes into large matrix multiplies, which both sides run on the same AMX
hardware. The repo's own report finds PyTorch's MPS backend 5.4× faster than Anvil on a larger
CNN, and the CUDA backend has not been run on an NVIDIA GPU.

## Try it

```bash
bin/anvil run examples/mnist.anvil
python3 -m pytest tests
```
(Apple Silicon Mac, Python 3.10+, Xcode command line tools.)
