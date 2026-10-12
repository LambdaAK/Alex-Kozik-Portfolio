---
title: ObsidianDB
tagline: An in-memory SQL engine in about 1,150 lines of dependency-free C++, covering lexer, recursive-descent parser, typed tables, WHERE with AND/OR/NOT, ORDER BY, and a REPL.
question: What is the smallest complete path from a SQL string to a result table?
date: '2026'
role: Solo
description: A small in-memory SQL database in C++17 with no external libraries. It tokenizes, parses into an AST, and executes CREATE TABLE, INSERT and SELECT against typed in-memory tables.
group: systems
order: 2
tech:
- C++17
- CMake
github: https://github.com/LambdaAK/ObsidianDB
image: ../../assets/logos/obsidiandb.png
media: ../../assets/media/obsidiandb.png
mediaAlt: 'A real ObsidianDB REPL session: creating a table, inserting rows, and running filtered, ordered SELECTs.'
highlights:
- Hand-written lexer and recursive-descent parser producing a typed AST (literal, column-ref, binary and unary expressions).
- CREATE TABLE with INT, FLOAT and STRING columns; INSERT; and SELECT with projection, WHERE (=, <>, <, <=, >, >=, AND, OR, NOT) and ORDER BY ASC/DESC.
- Interactive REPL with colored output and the meta-commands .tables, .schema, .help and .exit. It can also run a .sql script file.
---

## How it works
A query goes through three stages. The **lexer** (`src/lexer.cpp`) turns the input into tokens: keywords, identifiers, numeric and string literals, and comparison operators. The **parser** (`src/parser.cpp`) is recursive descent with operator precedence for NOT > AND > OR. It builds statement nodes (`CreateTableStmt`, `InsertStmt`, `SelectStmt`) over an expression tree (`src/ast.hpp`). The **executor** (`src/execution.cpp`) keeps a catalog of tables as vectors of typed rows. It checks INSERT values against the column types, evaluates the WHERE expression per row, projects the selected columns, and sorts on the ORDER BY key.

The engine is purely in memory. There is no persistence, indexing, joins or aggregation. The point was to build the parsing and execution path end to end without a parser generator or SQL library. The code is about 870 lines of engine in `src/` plus a 283-line REPL in `main.cpp`.

## Try it
```
make && make run
./build/obsidian_sql_main script.sql
```
