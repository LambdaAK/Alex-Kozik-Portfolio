---
title: ObsidianDB
tagline: An in-memory SQL database written in C++ with no dependencies, from the lexer to the REPL.
summary: "A SQL database engine in dependency-free C++, with its own lexer, parser and REPL."
date: '2026'
group: systems
order: 2
tech: []
github: https://github.com/LambdaAK/ObsidianDB
---

## Example

A real session.

```
obsidian> CREATE TABLE planets (name STRING, moons INT, radius FLOAT);
Created table planets.
obsidian> INSERT INTO planets VALUES ("Mercury", 0, 2439.7);
Inserted 1 row(s).
obsidian> INSERT INTO planets VALUES ("Earth", 1, 6371.0);
Inserted 1 row(s).
obsidian> INSERT INTO planets VALUES ("Mars", 2, 3389.5);
Inserted 1 row(s).
obsidian> INSERT INTO planets VALUES ("Jupiter", 95, 69911.0);
Inserted 1 row(s).
obsidian> INSERT INTO planets VALUES ("Neptune", 16, 24622.0);
Inserted 1 row(s).

obsidian> SELECT name, moons FROM planets
obsidian> WHERE moons > 0 AND NOT name = "Jupiter" ORDER BY moons DESC;
name | moons
----+----
"Neptune" | 16
"Mars" | 2
"Earth" | 1

obsidian> INSERT INTO planets VALUES ("Pluto", "five", 1188.3);
Error: Type mismatch for column moons
```

## How it's built

```
SQL → lexer → recursive-descent parser → AST → executor → in-memory tables
```

```
statements   CREATE TABLE, INSERT, SELECT
types        INT, FLOAT, STRING, checked on INSERT
WHERE        = <> < <= > >=, with NOT > AND > OR precedence
ORDER BY     ASC, DESC
REPL         .tables, .schema, .help, .exit, or run a .sql file
```
