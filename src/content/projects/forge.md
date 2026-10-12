---
title: Forge
tagline: A statically typed functional language in OCaml with Hindley–Milner type inference, an interpreter and an LLVM-based native compiler; 500+ commits over three years.
question: "What does it take to build a real functional language, from type inference to native code?"
date: 2023–26
description: Forge is a functional programming language with a tree-walking interpreter, constraint-based type inference and a native backend. Programs are typechecked, lowered to a minimal IR, then to LLVM IR, and linked against a C runtime with clang.
group: featured
order: 1
tech: [OCaml, LLVM, C]
github: https://github.com/LambdaAK/Forge
website: https://forgepl.netlify.app/
image: ../../assets/logos/forge.png
media: ../../assets/media/forge.jpg
mediaAlt: "Forge's website, forgepl.netlify.app: Fibonacci with pattern matching."
role: Solo
highlights:
  - Ahead-of-time compiler that lowers to LLVM IR and links native executables with clang.
  - Constraint-based type checker and inference covering 20+ language features, with developer-facing error messages.
  - Pattern matching, first-class functions, polymorphism, tuples, lists and control flow.
  - "Native pipeline: typechecked core → Min IR → LLVM IR → clang-linked executable with the C runtime."
  - Monomorphized lowering with curried closures; the typed subset is integration-tested end to end.
---
