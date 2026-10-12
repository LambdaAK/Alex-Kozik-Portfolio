---
title: SimpleML
tagline: A from-scratch Rust ML library (~3,900 lines, no linear-algebra crates) whose models minimize losses differentiated symbolically by its own expression engine.
question: What does it take to build ML models on top of a hand-written matrix library and a symbolic differentiator?
date: '2024'
role: Solo
description: A Rust library with its own dense matrix type (LU, row-reduction inverse, determinant, QR, QR-iteration eigendecomposition, RREF, nullspace) and a symbolic expression AST with a lexer, parser, derivatives, gradients and Hessians. Linear and logistic regression, a linear SVM, perceptron, kernel perceptron, KNN and a decision tree are built on these.
group: archive
order: 6
tech:
- Rust
github: https://github.com/LambdaAK/SimpleML
mediaAlt: ''
highlights:
- Losses are built as symbolic expressions over the training data, differentiated symbolically, and minimized by gradient descent.
- The eigendecomposition is an unshifted QR iteration that accumulates Q products for the eigenvectors; on a 4x4 symmetric test matrix it matches NumPy to about 1e-14.
- Kernels (linear, polynomial, RBF) are first-class closures used by the kernel perceptron.
---

## How it works
Everything sits on a hand-written `Matrix` type with `Vec<Vec<f64>>` storage. On top of it are Gram–Schmidt QR, an unshifted QR iteration for eigenvalues and eigenvectors, an inverse and determinant via row reduction, RREF and nullspace. A separate `math` module defines an expression AST (numbers, variables, + − × ÷, powers, ln, ReLU, max). It has a lexer and parser, so expressions can be written as strings, plus symbolic `diff`, `grad` and `hessian`. Models such as logistic regression (with L2) and the hinge-loss SVM write their full training loss as one expression, with one term per data point. The `Optim` optimizer then takes its symbolic gradient once and evaluates it by substitution at each gradient-descent step. This makes the math explicit, but the cost grows with dataset size on every step, so it only works on toy data.

## Try it
```bash
cargo run --release   # nightly toolchain (rust-toolchain.toml); demo: decision tree on toy points
```
