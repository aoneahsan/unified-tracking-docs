---
id: capacitor
title: Capacitor Integration
description: Register unified-tracking as a Capacitor plugin with registerCapacitorPlugin() so the plugin, React hooks, and core all share one tracking instance.
sidebar_position: 2
---

# Capacitor Integration

In a Capacitor app, `unified-tracking` registers as a `WebPlugin` that wraps the same core engine the web and React entries use. Registration is lazy and guarded, so importing the module never breaks a build that does not have Capacitor installed.

```ts
import { registerCapacitorPlugin } from 'unified-tracking/capacitor';

const UnifiedTracking = await registerCapacitorPlugin();
```

`registerCapacitorPlugin()` dynamically imports `@capacitor/core`, calls `registerPlugin('UnifiedTracking', …)`, and returns the plugin proxy. If `@capacitor/core` is not available, it returns `null` instead of throwing — so the same code path is safe in a plain web build.

## One shared instance

The Capacitor plugin, the React hooks, and the root `unified-tracking` import all operate on the **same** core singleton. Init state, provider registrations, and listeners live on that instance, so you can initialize from any entry and read consistent state from the others. Initializing through the plugin and then reading `getActiveProviders()` from a React hook returns the providers you just enabled — there is no second, diverging core.

```ts
const UnifiedTracking = await registerCapacitorPlugin();

await UnifiedTracking?.initialize({
  analytics: { providers: ['firebase'], firebase: { enabled: true } },
  errorTracking: { providers: ['sentry'], sentry: { dsn: 'https://...' } },
});

await UnifiedTracking?.track('app_opened');
```

## Listening for events

The plugin implements `addListener` for three event names. The listener receives a typed `TrackingEventPayload`; which fields are populated depends on the event.

```ts
const handle = await UnifiedTracking?.addListener('trackingEvent', (event) => {
  console.log('tracked', event.event, event.properties);
});

// later
await handle?.remove();
```

| Event name | Populated payload fields |
| --- | --- |
| `trackingEvent` | `event`, `properties`, `timestamp` |
| `error` | `error`, `context` |
| `providerStatusChange` | `provider`, `status` |

The returned handle's `remove()` detaches the core listener cleanly. Listeners are registered on the core (which emits via `notifyListeners`), not twice on the WebPlugin, so there is no leak.

## Web versus native delivery

Inside the Capacitor WebView, delivery runs through the same web/JS provider layer documented across this site — that is the shipped path. Native iOS/Android SDK bridges have been written but are not yet build-verified or published; see [Platforms → Native](/platforms/native) for the current status before relying on native-SDK delivery.
