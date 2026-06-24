---
id: react-hooks
title: React Hooks
description: Signatures and return values for the useUnifiedTracking and useTrackEvent hooks exported from unified-tracking/react.
sidebar_position: 4
---

# React Hooks

Both hooks come from the `unified-tracking/react` subpath and bind to the shared core singleton. See the [React integration guide](/guides/react) for usage patterns.

```ts
import { useUnifiedTracking, useTrackEvent } from 'unified-tracking/react';
```

## useUnifiedTracking

```ts
function useUnifiedTracking(): {
  track(event: string, properties?: Record<string, unknown>): Promise<void>;
  identify(userId: string, traits?: Record<string, unknown>): Promise<void>;
  setUserProperties(properties: Record<string, unknown>): Promise<void>;
  logError(error: Error | string, context?: ErrorContext): Promise<void>;
  logRevenue(revenue: RevenueData): Promise<void>;
  logScreenView(screenName: string, properties?: Record<string, unknown>): Promise<void>;
  setConsent(consent: ConsentSettings): Promise<void>;
  reset(): Promise<void>;
  flush(): Promise<void>;
  getActiveProviders(): Promise<ActiveProvidersResult>;
  enableDebugMode(enabled: boolean): Promise<void>;
}
```

Returns a memoized object whose identity is stable across renders, so it is safe in dependency arrays. Each method is pre-bound to the singleton; destructuring keeps the binding. The methods mirror the [core methods](/reference/api/core-methods) one-to-one (it omits `initialize` and `addListener`, which belong at app-bootstrap level rather than in a component).

## useTrackEvent

```ts
function useTrackEvent(): {
  trackEvent(event: string, properties?: Record<string, unknown>): Promise<void>;
  isTracking: boolean;
  lastError: Error | null;
}
```

A focused hook for firing an event from a handler with built-in state.

- `trackEvent` — memoized with `useCallback`, so it has a stable identity. Resolves after the underlying `track` completes; rethrows on failure after recording it.
- `isTracking` — `true` while a `trackEvent` call is in flight.
- `lastError` — the most recent thrown `Error`, or `null` if the last call succeeded.

```tsx
const { trackEvent, isTracking, lastError } = useTrackEvent();

<button disabled={isTracking} onClick={() => trackEvent('cta_clicked')}>
  {isTracking ? 'Sending…' : 'Click me'}
</button>
```
