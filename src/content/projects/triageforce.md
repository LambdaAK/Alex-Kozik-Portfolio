---
title: TriageForce
tagline: "Finalist, Salesforce Agentforce Virtual Hackathon: a one-weekend front end for an Agentforce disaster-relief design; I built the Cesium 3D globe with live shipment routes and the dark-mode dashboard shell."
date: '2025'
role: Team of 5 · Salesforce Agentforce Virtual Hackathon · I built the globe/map view, route and flight-path rendering, sidebar and dark mode
description: A React dashboard prototype for routing surplus corporate donations to disaster sites, built on mock data for a hackathon prompt. The five-agent Agentforce design is described in the README but not implemented in this repo.
group: archive
order: 2
tech:
- React
- TypeScript
- CesiumJS
- Leaflet
- MUI
github: https://github.com/LambdaAK/agent-hackathon
image: ../../assets/logos/salesforce.svg
mediaAlt: TriageForce's dark-mode globe showing relief shipment routes.
highlights:
- CesiumJS 3D globe with disaster markers, shipment routes and flight paths; clicking a route shows its details.
- Dashboard views for disaster needs, inventory, shipment tracking and alerts, driven by a mock typhoon scenario.
---

## How it works
This is a Create React App (TypeScript, MUI) front end. CesiumJS renders a 3D globe; Leaflet is also a dependency. The views (Dashboard, DisasterNeedsView, InventoryView, ShipmentTrackingView, RouteDetailsView, AlertsPanel) read from `src/data/mockData.ts` and `typhoonGenesisScenario.ts`. There is no backend and no Salesforce or Agentforce integration in this repo. The five agents (ingestion, matching, logistics, tracking, reporting) are the team's proposed Agentforce design.
