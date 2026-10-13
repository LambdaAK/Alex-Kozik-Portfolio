---
title: Orb
tagline: A real-time 2D particle sandbox in C++17 with SDL2 and an OpenGL 3.2 core-profile renderer, featuring gravity wells, mass-weighted elastic collisions with restitution, and additive-blended trails.
date: '2026'
role: Solo
description: A 2D sandbox where you place particles and gravity wells by click-dragging and watch them orbit, collide and leave glowing trails, with 0.1× to 10× time control.
group: systems
order: 6
tech:
- C++17
- SDL2
- OpenGL 3.2
- GLSL
github: https://github.com/LambdaAK/Orb
image: ../../assets/logos/orb.png
media: ../../assets/media/orb.png
mediaAlt: Seventy particles orbiting two gravity wells, rendered offscreen by Orb's own OpenGL renderer.
video: /media/orb.mp4
highlights:
- Particle–particle collisions resolved along the contact normal, with masses proportional to r², positional overlap correction, and configurable restitution (default 0.9).
- Gravity wells apply a constant-magnitude 400 px/s² pull within range; the time step is clamped to 1/30 s for stability, and time scale runs from 0.1× to 10×.
- OpenGL 3.2 core renderer with its own GLSL shaders, triangle-fan circles, and additive blending for 60-sample particle trails.
---

## How it works
`Simulation::update` runs one semi-implicit step per frame. It applies the well pull to velocities, integrates positions, and then resolves every overlapping particle pair (O(n²)). Each pair is pushed apart in proportion to the other particle's mass and given an impulse (1+e)(v₁ₙ−v₂ₙ)/(m₁+m₂) along the normal. Walls reflect velocity scaled by restitution, and very slow particles are zeroed to avoid jitter when no wells exist. `Renderer` creates an OpenGL 3.2 core context through SDL2, compiles a small vertex/fragment shader pair, and draws trails, wells and particles with additive blending. A separate SDL window holds the "Place" menu and the time slider, with labels drawn by SDL2_ttf.

## Try it
```
brew install sdl2 sdl2_ttf
make run
```
