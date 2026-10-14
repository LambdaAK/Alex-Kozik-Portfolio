---
title: Orb
tagline: A 2D particle and gravity sandbox in C++ where you drag out particles and gravity wells and watch them orbit, collide and leave trails.
summary: "A real-time particle and gravity sandbox in C++ with its own OpenGL renderer."
date: '2026'
group: systems
order: 6
tech: []
github: https://github.com/LambdaAK/Orb
media: ../../assets/media/orb.png
mediaAlt: Particles orbiting two gravity wells.
video: /media/orb.mp4
---

## What's in it

```
physics      gravity wells pull at 400 px/s², elastic collisions with restitution 0.9,
             mass ∝ r², time step capped at 1/30 s
controls     click-drag to place, drag wells to move, time scale 0.1× to 10×
renderer     OpenGL 3.2 core via SDL2, own GLSL shaders, additive blending, 60-point trails
```
