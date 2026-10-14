---
title: Forge
tagline: A statically typed functional language, written in OCaml, that compiles to native code through LLVM.
summary: "A statically typed functional language built from scratch in OCaml, with Hindley–Milner type inference, traits, macros, and an LLVM backend whose native binaries run 3–17× faster than Python."
date: 2023–26
group: featured
order: 1
tech: []
github: https://github.com/LambdaAK/Forge
website: https://forgepl.netlify.app/
image: ../../assets/logos/forge.svg
imageDark: ../../assets/logos/forge-dark.svg
---

## The language

Types are inferred. Nothing below has an annotation.

```
let compose f g x = f (g x)
// compose : (b -> c) -> (a -> b) -> a -> c
```

Generic data types, and traits over type constructors like `Functor<f<_>>`.

```
type rec Tree<a> =
  | Leaf
  | Node of (Tree<a>, a, Tree<a>)

impl Functor for Tree where
  fmap f t =
    case t do
    | Leaf -> Leaf
    | Node (l, x, r) -> Node (fmap f l, f x, fmap f r)
end

let t = fmap (fn x -> x * 10) (Node (Leaf, 1, Node (Leaf, 2, Leaf)))
// t = Node (Leaf, 10, Node (Leaf, 20, Leaf)) : Tree<Int>
```

Monads. `>>=` is defined once in the standard library for every `Monad`.

```
let safe_div x y = if y == 0 then None else Some (x / y)

let a = Some 100 >>= (fn x -> safe_div x 4)   // Some 25
let b = Some 100 >>= (fn x -> safe_div x 0)   // None
```

`macro_rules!` macros with repetition, expanded before type checking.

```
macro_rules! sum_all where
  ($($x:expr),*) => (0 $(+ $x)*)
end

let total = sum_all!(1, 2, 3, 4)   // 10
```

## How it's built

```
source
 → lexer, parser          2.7k lines of OCaml
 → macros, modules        1.7k
 → core language          1.2k
 → type inference         3.3k
 ├→ interpreter           1.2k   REPL and the playground above
 └→ Min IR                5.2k   SSA, basic blocks, explicit closures
    → LLVM IR             1.6k
    → clang + C runtime   native arm64 binary
```

About 24k lines of OCaml, a 132-line C runtime, and a 300-line standard library written in Forge.

## Performance

Native binaries against CPython 3.14 running the same algorithm. Median of 5 runs on an M3 Max, including process start.

| program | Forge | CPython | speedup |
|---|---|---|---|
| `fib 32`, naive recursion | 8 ms | 135 ms | 16.9× |
| map and sum a 10,000-element list, 200 times | 81 ms | 372 ms | 4.6× |
| build and sum a binary tree of depth 21 | 104 ms | 302 ms | 2.9× |

There is no garbage collector yet, and `Int` is 32-bit in native code.

2,777 tests. 544 of them compile a program to a native binary, run it, and compare the output.

## Tooling

A REPL, and a VS Code extension that shows inferred types on hover.
