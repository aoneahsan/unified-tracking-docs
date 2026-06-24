---
id: quick-start
title: Quick Start
description: Initialize unified-tracking with one analytics and one error provider, then send your first event, identify a user, and log an error in a few minutes.
sidebar_position: 2
---

# Quick Start

This walkthrough initializes `unified-tracking` with one analytics provider and one error provider, then sends an event, identifies a user, and logs an error. It assumes the package is already [installed](/getting-started/installation).

## 1. Initialize once at app startup

Call `initialize` a single time, as early as your app boots. The config lists which providers to enable and supplies each provider's keys.

```ts
import { UnifiedTracking } from 'unified-tracking';

await UnifiedTracking.initialize({
  analytics: {
    providers: ['google'],
    google: { measurementId: 'G-XXXXXXX' },
  },
  errorTracking: {
    providers: ['sentry'],
    sentry: { dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' },
  },
  settings: {
    debug: false,
    defaultConsent: { analytics: true, errorTracking: true },
  },
});
```

`initialize` resolves to an `InitializeResult` containing `success`, the list of `activeProviders`, and any `warnings`. Events you call before `initialize` finishes are buffered and replayed once the engine is ready, so you do not have to gate every call behind an init flag.

## 2. Track an event

```ts
await UnifiedTracking.track('checkout_started', {
  plan: 'pro',
  cartValue: 49,
  currency: 'USD',
});
```

The event reaches every enabled analytics provider. Property names and values are passed through unchanged, except for any keys you exclude via privacy settings (see [Consent and privacy](/guides/consent-and-privacy)).

## 3. Identify the user

```ts
await UnifiedTracking.identify('user_8675309', {
  email: 'ada@example.com',
  plan: 'pro',
});

// Update traits later without re-identifying:
await UnifiedTracking.setUserProperties({ plan: 'enterprise' });
```

`identify` ties subsequent events to a stable user id across providers. Call `reset()` on logout to clear the identity and any provider-side caches.

## 4. Log an error

```ts
try {
  await riskyOperation();
} catch (err) {
  await UnifiedTracking.logError(err as Error, {
    severity: 'error',
    tags: { area: 'checkout' },
    extra: { step: 'payment' },
  });
}
```

The error fans out to every enabled error-tracking provider with the context attached. Severity, tags, extra data, user info, and breadcrumbs all map to the provider's native fields where supported.

## 5. Track revenue and screens

```ts
await UnifiedTracking.logRevenue({
  amount: 49,
  currency: 'USD',
  productId: 'pro_monthly',
  transactionId: 'txn_123',
});

await UnifiedTracking.logScreenView('Pricing', { referrer: 'homepage' });
```

## 6. Flush before exit (optional)

Some providers buffer events. Before a page unload or a critical handoff, force a flush:

```ts
await UnifiedTracking.flush();
```

That is the full happy path. From here, wire it into [React](/guides/react) or [Capacitor](/guides/capacitor), tune the [consent gate](/guides/consent-and-privacy), or browse the complete [API reference](/reference/api/core-methods).
