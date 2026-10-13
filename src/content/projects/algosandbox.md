---
title: AlgoSandbox
tagline: A step-through visualizer for 10 classic algorithms and data structures (5 sorts, 3 searches, stack, queue), with reference code in Python, Java, C++ and JavaScript.
summary: "Step-through visualizations of classic sorting and search algorithms."
date: 2023–24
role: Solo
description: A React + TypeScript site that animates sorting and searching algorithms on editable arrays and provides interactive stack and queue sandboxes, each paired with complexity tables and implementations in four languages.
group: systems
order: 5
tech:
- React
- TypeScript
- Vite
- SCSS
github: https://github.com/LambdaAK/AlgoSandbox
demo: https://algosandbox.alexkozik.com/
image: ../../assets/logos/algosandbox.png
mediaAlt: AlgoSandbox stepping through merge sort on an array.
highlights:
- Animated sandboxes for selection, insertion, bubble, recursive and iterative merge sort, linear search, and left and right bisection.
- Interactive stack and queue sandboxes.
- Algorithm index with tag filtering; each page has best, average and worst time/space complexity and syntax-highlighted code in 4 languages.
---

## How it works
Each algorithm page is a React route built on a shared `AlgoPage` template, which holds the description, a complexity table, and Prism-highlighted implementations. Sort and search pages embed an array sandbox that replays the algorithm step by step on a timer, highlighting compared and swapped elements. The `/algos` index filters pages by tag.

## Try it
Live: https://algosandbox.alexkozik.com/
