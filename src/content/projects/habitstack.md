---
title: HabitStack
tagline: A full-stack habit tracker with 18 Express endpoints, Firebase Realtime Database persistence, token-verified writes, and Socket.IO chat servers.
date: '2023'
role: Solo
description: A habit-tracking web app (habit stacks, habits to build or resist, daily tasks, daily ratings, a monthly calendar) with chat servers users can create, join via invite, and message in.
group: systems
order: 3
tech:
- React
- TypeScript
- Express
- Socket.IO
- Firebase
github: https://github.com/LambdaAK/HabitStack
image: ../../assets/logos/habitstack.png
mediaAlt: HabitStack's daily task list.
highlights:
- Express backend with 18 POST endpoints for habits, habit stacks, tasks, daily ratings, users and chat servers, each verifying Firebase ID tokens.
- Chat servers with invites, join/leave and rename, live over Socket.IO and Realtime Database listeners.
- Firebase email/password auth, plus Realtime Database security rules written in Bolt.
---

## How it works
A React + TypeScript (Vite, Tailwind/SCSS) frontend talks to a Node/Express backend (`backend/src/endpoints.js`). The backend verifies the caller's Firebase ID token, checks membership, and writes to Firebase Realtime Database through firebase-admin. Clients subscribe to Realtime Database paths for live updates, and a Socket.IO server handles chat. Access rules live in `security rules/` (Bolt compiled to JSON).
