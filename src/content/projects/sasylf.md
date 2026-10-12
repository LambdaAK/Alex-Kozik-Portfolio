---
title: SASyLF parameterized modules
tagline: Added parameterized (functor-style) modules to the SASyLF proof assistant during a 2024 NSF REU at CMU; 204 commits merged upstream and released as SASyLF 1.6.0 "Polymorphic modules".
question: Can a proof assistant for programming-language metatheory reuse syntax, judgments and theorems generically, the way ML functors reuse code?
date: '2024'
role: NSF REU at CMU (summer 2024) · implemented module parameters, instantiation and checking, and the regression test harness, in the existing Java codebase maintained by John Boyland
description: SASyLF is an educational proof checker for type-system and semantics proofs. I added modules that take syntax, judgments and theorems as parameters and can be instantiated with concrete arguments, with structural checking of those arguments and specific error messages.
group: systems
order: 3
tech:
- Java
- Python
- Proof assistants
- Type theory
github: https://github.com/LambdaAK/sasylf
links:
- label: Upstream merge (boyland/sasylf PR
  href: https://github.com/boyland/sasylf/pull/128
image: ../../assets/logos/cmu.png
media: ../../assets/media/sasylf.png
mediaAlt: A generic maybe-of-either module parameterized over syntax a and b (left), instantiated with booleans and naturals and used in proofs (right); from the regression suite I added.
results:
- metric: Commits merged upstream
  value: '204'
  baseline: all of my fork commits (2024-06-12 to 2024-08-05) are in boyland/sasylf master via PR
- metric: Source change
  value: +3,592 / −156 lines
  baseline: 84 Java files under src/, from his first to his last commit
highlights:
- 'Module application: `module M = pkg.functor[args]` substitutes syntax, judgments and theorems through the whole AST. This needed side-effect-free substitution and identity-preserving deep copies (CopyData / SubstitutionData over an IdentityHashMap), plus fixes for a variable-capture bug.'
- 'Argument checking: arguments must match parameter kind (syntax, judgment or theorem), production count, judgment arity, and the relationships between nonterminals. Each failure has its own error code, e.g. MOD_ARG_TYPE_MISMATCH and MOD_ARG_SYNTAX_WRONG_NUM_PRODUCTIONS.'
- Wrote tests.py, a regression runner that checks each .slf file's expected-error markers (//!) against the checker's reported line numbers, with unit tests, progress output and a verbose mode. Added 79 regression files, including 19 multi-file module tests (modulegood01–10, modulebad01–09).
- 'Large cleanup of the AST layer: encapsulated fields, removed dead APIs, and documented ModulePart, Clause, SyntaxDeclaration, Theorem and others.'
---

## How it works
SASyLF checks proofs about languages written as syntax (BNF), judgments (inference rules) and theorems. Version 1.5 had modules without parameters. My work lets a module declare `requires abstract syntax a ...` (plus judgments and theorems) and lets a client write `module m = pkg.maybe[e]`.

Instantiating a module means:
1. Check each argument against its parameter: the same kind, the same number of productions, the same judgment form, and nonterminal relationships preserved.
2. Deep-copy the module's declarations with an identity map, so that shared AST nodes stay shared.
3. Substitute the arguments through every node type: clauses, rules, derivations and sugar.

Getting the copy and substitution right was most of the work. The commit log records fixes for null types on nonterminals, stale context after copying, constructor names not being substituted, and variable capture. Late in the summer he made term substitution pure and moved the module checking to an object-oriented design (`ModuleComponent`, `Part.argsParams()`).

## Results
All 204 of my commits are in upstream `boyland/sasylf` master. PR #128 was merged on 2026-01-17, and the upstream ChangeLog lists 1.6.0 as "Polymorphic modules: modules with parameters can now be instantiated".
