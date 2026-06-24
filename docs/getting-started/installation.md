---
id: installation
title: Installation
description: Install unified-tracking with yarn or npm, understand the optional peer dependencies, and learn the three subpath exports for web, React, and Capacitor.
sidebar_position: 1
---

# Installation

`unified-tracking` is published on npm as [`unified-tracking`](https://www.npmjs.com/package/unified-tracking). Install it with your package manager of choice.

```bash
yarn add unified-tracking
# or
npm install unified-tracking
```

The package requires **Node.js 24.13.0 or newer** for local development and ships as ESM only (`"type": "module"`). It builds with TypeScript's NodeNext module resolution, so importing it from another ESM or TypeScript project needs no extra configuration.

## Peer dependencies

Both peer dependencies are **optional** — install only the ones your app uses.

```json
"peerDependencies": {
  "@capacitor/core": "^7.4.3 || ^8.0.0",
  "react": ">=19.0.0"
}
```

If you import from `unified-tracking/react`, add `react` (19+). If you import from `unified-tracking/capacitor`, add `@capacitor/core`. A plain web/Node project that imports only the root entry needs neither.

## Subpath exports

The package exposes three entry points. Import from the one that matches your runtime so bundlers can tree-shake the rest.

| Import path | Use it for | Key exports |
| --- | --- | --- |
| `unified-tracking` | Framework-agnostic web/JS | `UnifiedTracking`, `UnifiedTrackingCore`, all types, `BaseAnalyticsProvider`, `ProviderRegistry` |
| `unified-tracking/react` | React apps | `useUnifiedTracking`, `useTrackEvent` |
| `unified-tracking/capacitor` | Capacitor apps | `registerCapacitorPlugin`, `UnifiedTrackingCapacitorPlugin` |

```ts
import { UnifiedTracking } from 'unified-tracking';
import { useUnifiedTracking } from 'unified-tracking/react';
import { registerCapacitorPlugin } from 'unified-tracking/capacitor';
```

## Provider SDKs

The package itself has no runtime dependencies. When you enable a provider, its underlying SDK loads at initialization — for example, enabling `segment` injects the analytics.js snippet, and enabling `sentry` loads the Sentry browser SDK. You do not add provider SDKs to your own `package.json`; the engine manages loading for the providers you configure.

## Setup CLI

A small interactive helper ships in the `bin` field:

```bash
npx unified-tracking-setup
```

It writes a starter configuration so you can fill in provider keys quickly. Configuration is plain TypeScript, so you can also skip the CLI and build the config object by hand — see [Configuration](/getting-started/configuration).

With the package installed, continue to the [Quick Start](/getting-started/quick-start) to initialize it and send your first event.
