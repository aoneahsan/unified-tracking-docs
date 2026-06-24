---
id: react
title: React Integration
description: Use unified-tracking in React with the provider-free useUnifiedTracking and useTrackEvent hooks — no context, no HOC, no Provider wrapper required.
sidebar_position: 1
---

# React Integration

The React integration is deliberately provider-free: there is no `<Provider>` to mount, no context, and no higher-order component. You import a hook and call it. Both hooks bind to the same shared `UnifiedTracking` singleton that the core and Capacitor entry use, so init state and identity are consistent everywhere.

```ts
import { useUnifiedTracking, useTrackEvent } from 'unified-tracking/react';
```

## Initialize once, outside React

Initialization is a one-time, app-level concern, so do it where your app boots — not inside a component render. The hooks then read from the already-initialized singleton.

```ts
// main.tsx (or your app entry)
import { UnifiedTracking } from 'unified-tracking';

await UnifiedTracking.initialize({
  analytics: { providers: ['google'], google: { measurementId: 'G-XXXXXXX' } },
});
```

## useUnifiedTracking

Returns the full bound API with a stable reference. Because the object identity does not change between renders, it is safe to list in a `useEffect`, `useMemo`, or `useCallback` dependency array.

```tsx
import { useEffect } from 'react';
import { useUnifiedTracking } from 'unified-tracking/react';

function PricingPage() {
  const tracking = useUnifiedTracking();

  useEffect(() => {
    tracking.logScreenView('Pricing');
  }, [tracking]);

  return (
    <button onClick={() => tracking.track('upgrade_clicked', { plan: 'pro' })}>
      Upgrade
    </button>
  );
}
```

The returned object exposes `track`, `identify`, `setUserProperties`, `logError`, `logRevenue`, `logScreenView`, `setConsent`, `reset`, `flush`, `getActiveProviders`, and `enableDebugMode`. Each is pre-bound to the singleton, so destructuring is safe:

```tsx
const { track, logError } = useUnifiedTracking();
```

## useTrackEvent

A focused hook for the common case of firing an event from a handler, with built-in pending and error state. It is handy when a button should reflect an in-flight tracking call or surface a failure.

```tsx
import { useTrackEvent } from 'unified-tracking/react';

function FeedbackButton() {
  const { trackEvent, isTracking, lastError } = useTrackEvent();

  return (
    <>
      <button
        disabled={isTracking}
        onClick={() => trackEvent('feedback_opened', { source: 'footer' })}
      >
        {isTracking ? 'Sending…' : 'Send feedback'}
      </button>
      {lastError && <span role="alert">Could not record that action.</span>}
    </>
  );
}
```

`trackEvent(event, properties?)` is memoized with `useCallback`, so it has a stable identity too. `isTracking` is `true` while the call is in flight; `lastError` holds the most recent thrown `Error` or `null`.

## Why no provider?

A context provider would force every consumer to live inside a subtree and would re-render that subtree whenever the value changed. Since tracking is a singleton with no per-render state, a provider adds ceremony without benefit. Binding the methods once at module scope gives the hooks a stable identity while keeping the call sites tiny. See the [React hooks reference](/reference/api/react-hooks) for the exact signatures.
