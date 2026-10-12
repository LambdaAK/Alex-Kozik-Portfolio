---
title: Forge
tagline: A statically typed functional language in OCaml with Hindley–Milner type inference, an interpreter and an LLVM-based native compiler; 500+ commits over three years.
question: "Can a small functional language with full type inference compile to fast native code?"
date: 2023–26
description: Forge is a functional programming language with a tree-walking interpreter, constraint-based type inference and a native backend. Programs are typechecked, lowered to a minimal IR, then to LLVM IR, and linked against a C runtime with clang.
group: systems
order: 1
tech: [OCaml, LLVM, C]
github: https://github.com/LambdaAK/Forge
demo: https://forgepl.netlify.app/
image: ../../assets/logos/forge.png
role: Solo
highlights:
  - Ahead-of-time compiler that lowers to LLVM IR and links native executables with clang.
  - Constraint-based type checker and inference covering 20+ language features, with developer-facing error messages.
  - Pattern matching, first-class functions, polymorphism, tuples, lists and control flow.
  - "Native pipeline: typechecked core → Min IR → LLVM IR → clang-linked executable with the C runtime."
  - Monomorphized lowering with curried closures; the typed subset is integration-tested end to end.
---
