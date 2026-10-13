---
title: dX
tagline: 30 interactive applied-math and ML labs (SDEs, Fokker–Planck, SVM via SMO, active-set QP, 3D heat equation) with every solver hand-written in TypeScript and run in the browser.
question: Can the numerical methods behind applied math and ML be implemented from scratch and explored live, with no backend or math library?
date: '2026'
role: Solo
description: A browser sandbox of 30 labs across probability, stochastic processes, linear algebra, optimization, supervised learning, clustering, RL and physics. The solvers (integrators, PDE stencils, LP/QP, SMO, factorizations) are written from scratch in about 7k lines of TypeScript.
group: ml
order: 1
tech:
- TypeScript
- React
- Vite
- Numerical Methods
github: https://github.com/LambdaAK/dX
demo: https://dxlab.netlify.app/
image: ../../assets/logos/dx.png
media: ../../assets/media/dx.jpg
mediaAlt: 'The K-means lab: three clusters and their centroids, computed in the browser.'
highlights:
- 'Stochastic PDE lab: Euler–Maruyama sample paths alongside the Fokker–Planck density, solved by explicit finite differences with the time step picked from the diffusion and advection CFL limits.'
- SVM trained with Platt's SMO, with linear, RBF and polynomial kernels; QP solver uses the active-set method (Nocedal & Wright, Ch. 16).
- LP solver using Big-M simplex, with pivot history shown; LU (partial pivoting), modified Gram–Schmidt QR, Cholesky, and SVD via Jacobi eigendecomposition of AᵀA.
- 2D/3D heat equation with 5- and 7-point Laplacians and forward Euler, with dt capped below the stability bound; pendulum integrated with RK4.
- 'RL labs: ε-greedy/UCB/Thompson bandits with regret curves; Value Iteration, Q-learning and SARSA on grid-world MDPs.'
---

## How it works
dX is a single-page React app; each lab is a component backed by a plain TypeScript module in `src/lib/` (about 7,000 lines of solver code, about 22,800 lines total). No numerics library is used.

- **Stochastic processes:** SDEs are simulated with Euler–Maruyama. The Fokker–Planck PDE for the same drift and diffusion is solved with central differences in space and explicit Euler in time, using dt ≤ min(dx²/2·max g², dx/max|f|). CTMCs use a rate matrix, a stationary distribution from a linear solve, and exp(Qt) by scaling and squaring with a Padé approximant.
- **Optimization:** Big-M tableau simplex, an active-set convex QP with Gaussian elimination for the KKT systems, and 1D gradient descent with momentum.
- **Learning:** OLS, logistic regression, KNN, CART (Gini), bagging, AdaBoost-style boosting, perceptron, kernel SVM (SMO), K-means, DBSCAN, PCA.
- **Linear algebra:** LU with partial pivoting, MGS QR, Cholesky, SVD (Jacobi eigen of AᵀA), RREF solve, one-sided and two-sided inverses.
- **Physics:** RK4 pendulum, and 1D/2D/3D heat equations with explicit stencils and stability-capped time steps.

Labs are routed at `/lab/<id>`, and everything runs client-side.

## Try it
```
npm install && npm run dev   # http://localhost:5173
```
Live: https://dxlab.netlify.app/
