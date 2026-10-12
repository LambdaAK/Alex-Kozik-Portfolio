---
title: Simple-Compiler
tagline: A compiler in Rust from a small C-like language straight to ARM64 assembly, written in about two weeks; 43 unit tests pass.
question: What is the shortest path from source text to a native ARM64 binary without LLVM?
date: '2026'
role: Solo
description: Lexer, recursive-descent parser, type checking during lowering, a stack-based IR and an ARM64 code generator for a C subset with ints, bools, chars, arrays, strings, structs, pointers and functions.
group: archive
order: 9
tech:
- Rust
- ARM64 assembly
- clang (linking)
github: https://github.com/LambdaAK/Simple-Compiler
mediaAlt: none
results:
- metric: Unit tests
  value: 43 / 43 pass
  baseline: cargo test (measured)
highlights:
- Emits ARM64 assembly directly (no LLVM); clang only assembles and links.
- Functions follow the AArch64 calling convention, spilling arguments past x0-x7 to the stack.
- Structs, arrays, pointers and typedefs; type rules enforced while lowering to IR.
---

## How it works
Source is lexed and parsed with a precedence-climbing grammar (documented as EBNF in the README),
then lowered to a small IR; type checks (e.g., conditions must be `bool`, `char` is one byte) are
enforced during lowering. The code generator assigns every variable a 64-bit stack slot and emits
AArch64 assembly that clang links into an executable.

## Try it
```bash
cargo run -- example.src && clang output.s -o program && ./program
```
