---
id: web
title: Web
description: The web/JS delivery layer is the shipped path for unified-tracking — it runs in browsers and inside the Capacitor WebView and supports all 16 providers.
sidebar_position: 1
---

# Web

The web/JS layer is the shipped delivery path for `unified-tracking` (npm `3.3.0`). It runs in any browser and inside the Capacitor WebView, and it supports all 16 providers. Everything in the [Quick Start](/getting-started/quick-start) and [API reference](/reference/api/core-methods) targets this layer.

## How delivery works

When you call `initialize`, the engine loads only the providers you listed. Each provider adapter wraps its vendor SDK — for example, the Segment adapter injects analytics.js, and the Sentry adapter loads the Sentry browser SDK. Your `track`/`logError` calls then fan out to every loaded adapter. The package ships no vendor SDK as a hard dependency; adapters load lazily so an app that enables two providers does not pay for the other fourteen.

## Server-side rendering

The engine guards against non-browser environments with a single SSR check, so importing the package during a server render does not throw. Calls made where `window` is absent are safely ignored rather than crashing the render. Initialize and track on the client — typically in a `useEffect` or an app-bootstrap module that only runs in the browser.

```tsx
import { useEffect } from 'react';
import { UnifiedTracking } from 'unified-tracking';

useEffect(() => {
  UnifiedTracking.initialize({
    analytics: { providers: ['google'], google: { measurementId: 'G-XXXXXXX' } },
  });
}, []);
```

## Pre-init buffering

Events called before `initialize` resolves are buffered by the engine's event queue and replayed once providers are ready. This removes the need to thread an "is initialized" flag through your components — fire events whenever they happen and let the engine order them.

## Build target

The package is ESM with NodeNext module resolution and full `.d.ts` types. It works in Vite, Next.js, Remix, and any bundler that understands ESM and the `exports` map. Import from the [subpath](/getting-started/installation#subpath-exports) that matches your usage so unused code tree-shakes away.
