---
title: Forge
tagline: A statically typed functional language in OCaml with Hindley-Milner inference, traits and macros; its compiler emits LLVM IR, and native binaries ran 2.9-17× faster than CPython on three benchmark programs. Try it in your browser.
question: What does it take to build a real functional language, from type inference to native code?
date: 2023–26
role: Solo
description: A functional language with type inference, algebraic data types, traits (typeclasses) and Rust-style macros. One OCaml front end feeds a tree-walking interpreter, a native compiler (Min IR → LLVM IR → clang), and an in-browser playground compiled with js_of_ocaml.
group: featured
order: 1
tech:
- OCaml
- LLVM IR
- C
- clang
- js_of_ocaml
- dune
github: https://github.com/LambdaAK/Forge
demo: https://forgepl.netlify.app/
website: https://forgepl.netlify.app/
links:
- label: Playground
  href: /projects/forge/#playground
image: ../../assets/logos/forge.png
media: ../../assets/media/forge.svg
mediaAlt: 'Forge''s pipeline: one OCaml front end (parsing, macros, Hindley-Milner inference) feeds an LLVM-based native compiler, a tree-walking interpreter, and a js_of_ocaml build for the browser.'
results:
- metric: Native vs CPython
  value: 2.9–16.9× faster
  baseline: CPython 3.14 running the same algorithm; 3 programs, median of 5 runs, Apple M3 Max (measured)
- metric: Test suite
  value: 2,776 / 2,777 pass
  baseline: dune test, including 544 compile-run-compare cases (543 pass) (measured)
- metric: Browser build
  value: 88 KB gzip
  baseline: front end + type checker + interpreter via js_of_ocaml; output matches the native interpreter on all 544 cases
highlights:
- Hindley-Milner type inference with algebraic data types, records, pattern matching, and higher-kinded traits (Functor, Monad, ...) compiled by dictionary passing.
- 'Native backend: typed core → Min IR → LLVM IR → clang -O1, linked with a small C runtime.'
- macro_rules! token-tree macros with fragment matching and repetition, expanded before type checking.
- 544 end-to-end tests compile each program to a native binary, run it and compare stdout; 2,777 tests in all.
- 'Runs in the browser: the OCaml front end and interpreter compile to a 339 KB JavaScript file with a step limit for runaway programs.'
---

## How it works

A Forge program is lexed and parsed together with a 300-line standard prelude that defines
`List`, `Option` and the trait hierarchy (Show, Eq, Ord, Functor, Applicative, Monad, Foldable,
Semigroup, Monoid). `macro_rules!` macros and modules are expanded first, then the program is
"condensed" into a smaller core language and type-checked with constraint-based Hindley-Milner
inference: `let compose f g x = f (g x)` gets `(b -> c) -> (a -> b) -> a -> c` with no annotations.
Traits, including higher-kinded ones like `Functor<f<_>>`, are resolved by passing dictionaries
explicitly, which the elaboration step inserts at call sites.

The typed core has two back ends. The interpreter evaluates it directly and powers a REPL and an
editor hover tool. The compiler lowers it to Min IR, a small first-order IR with explicit closures,
then emits LLVM IR, which clang turns into an arm64 executable linked against a C runtime for
allocation, variants and strings. The same OCaml code also compiles to JavaScript, which runs the
playground on this page.

## Results

Measured on an Apple M3 Max under load from other jobs (load average 9-16), wall time including
process start, median of 5 runs. Each Python program runs the same algorithm with the same data
structures (cons cells as tuples, recursive functions).

| program | Forge native | CPython 3.14 | |
|---|---|---|---|
| `fib 32`, naive recursion | 8 ms | 135 ms | 16.9× |
| list of 10,000: map, sum, ×200 | 81 ms | 372 ms | 4.6× |
| build + sum a binary tree of depth 21 | 104 ms | 302 ms | 2.9× |

Caveats: `Int` is 32-bit in the native code, and the runtime allocates with `malloc` and never frees
(there is no garbage collector), which favours short programs like these. The tree-walking
interpreter is far slower than CPython (15-80× on smaller inputs); it is meant for the REPL and
tooling, not speed.

## Try it

```bash
dune build && make compile-forge FILE=programs/minimal.forge && ./a.out
dune test
```
