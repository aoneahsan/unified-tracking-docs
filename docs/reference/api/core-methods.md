---
id: core-methods
title: Core Methods
description: Complete reference for every method on the UnifiedTrackingPlugin interface — initialize, track, identify, logError, logRevenue, setConsent, flush, and more.
sidebar_position: 1
---

# Core Methods

Every method below belongs to the `UnifiedTrackingPlugin` interface and is implemented by the shared core engine. All methods return promises; `await` them when ordering matters (for example, `initialize` before `track`).

## initialize

```ts
initialize(options?: UnifiedTrackingConfig): Promise<InitializeResult>
```

Initializes the engine and the providers named in `options`. Returns `{ success, activeProviders, warnings? }`. Call it once at startup. Calls made before initialization completes are buffered and replayed afterward. See [Configuration](/getting-started/configuration) for the full `options` shape.

## track

```ts
track(event: string, properties?: Record<string, unknown>): Promise<void>
```

Sends a named event with optional properties to every enabled analytics provider. Dropped when the `analytics` consent category is denied. Excluded properties are stripped before providers receive the event.

## identify

```ts
identify(userId: string, traits?: Record<string, unknown>): Promise<void>
```

Associates subsequent events with a stable user id and optional traits. Each provider maps `userId` to its own identity concept.

## setUserProperties

```ts
setUserProperties(properties: Record<string, unknown>): Promise<void>
```

Updates traits on the current user without re-identifying. Useful for changing a plan, role, or preference mid-session.

## logError

```ts
logError(error: Error | string, context?: ErrorContext): Promise<void>
```

Reports an error to every enabled error-tracking provider. Accepts an `Error` or a string. The optional [`ErrorContext`](/reference/api/types#errorcontext) carries severity, tags, extra data, user info, and breadcrumbs. Dropped when the `errorTracking` consent category is denied.

## logRevenue

```ts
logRevenue(revenue: RevenueData): Promise<void>
```

Records a revenue/purchase event. The [`RevenueData`](/reference/api/types#revenuedata) object carries `amount`, `currency`, product fields, a transaction id, and an optional line-item `items` array for ecommerce reporting.

## logScreenView

```ts
logScreenView(screenName: string, properties?: Record<string, unknown>): Promise<void>
```

Records a screen/page view. Pair with `settings.autoTrackScreens` if you want the engine to capture views automatically.

## setConsent

```ts
setConsent(consent: ConsentSettings): Promise<void>
```

Updates the consent gate. `analytics` and `errorTracking` gate dispatch inside the engine; other categories forward to provider-native consent APIs. See [Consent and privacy](/guides/consent-and-privacy).

## reset

```ts
reset(): Promise<void>
```

Clears the current identity in the engine and asks each provider to reset its user caches. Call on logout.

## flush

```ts
flush(): Promise<void>
```

Forces providers that buffer events (such as Segment and Sentry) to send immediately. Call before a page unload or critical handoff.

## getActiveProviders

```ts
getActiveProviders(): Promise<ActiveProvidersResult>
```

Returns `{ analytics: ProviderStatus[], errorTracking: ProviderStatus[] }`, where each [`ProviderStatus`](/reference/api/types#providerstatus) reports `name`, `enabled`, `initialized`, and optional `version`.

## enableDebugMode

```ts
enableDebugMode(enabled: boolean): Promise<void>
```

Toggles verbose diagnostics at runtime. Equivalent to `settings.debug` but changeable after init.

## addListener

```ts
addListener(
  eventName: 'trackingEvent' | 'error' | 'providerStatusChange',
  listenerFunc: (event: TrackingEventPayload) => void,
): Promise<PluginListenerHandle>
```

Subscribes to engine events. The callback receives a [`TrackingEventPayload`](/reference/api/types#trackingeventpayload); the populated fields depend on the event name. The returned handle has a `remove()` method — call it to unsubscribe.

```ts
const handle = await UnifiedTracking.addListener('error', (e) => {
  reportToDashboard(e.error, e.context);
});
await handle.remove();
```
