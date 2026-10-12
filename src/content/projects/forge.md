---
title: Forge
tagline: A functional language with type inference and an LLVM backend; compiled code runs 2.5× faster than Python.
description: Forge is a functional programming language with a tree-walking interpreter, constraint-based type inference and a native backend. Programs are typechecked, lowered to a minimal IR, then to LLVM IR, and linked against a C runtime with clang.
group: featured
order: 1
tech: [OCaml, LLVM, C]
github: https://github.com/LambdaAK/Forge
demo: https://forgepl.netlify.app/
image: ../../assets/logos/forge.png
highlights:
  - LLVM-based compiler that lowers to native code, yielding a 2.5× speedup over Python; the interpreter alone is ~50% faster than Python.
  - Constraint-based type checker and inference covering 20+ language features, with developer-facing error messages.
  - Pattern matching, first-class functions, polymorphism, tuples, lists and control flow.
  - "Native pipeline: typechecked core → Min IR → LLVM IR → clang-linked executable with the C runtime."
  - Monomorphized lowering with curried closures; the typed subset is integration-tested end to end.
---
