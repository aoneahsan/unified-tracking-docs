---
id: consent-and-privacy
title: Consent & Privacy
description: How unified-tracking gates events by consent category and strips excluded properties from every event, trait, and error context before providers see the data.
sidebar_position: 3
---

# Consent & Privacy

Consent and data minimization run inside the engine, before any provider SDK receives data. This means a denied category or an excluded property is enforced centrally — you do not have to remember to gate each call site, and you cannot leak data to a provider by forgetting one.

## The consent gate

`setConsent(consent)` updates the engine's consent state. When a category is denied, the engine drops the matching events at dispatch; the provider SDKs never see them.

```ts
await UnifiedTracking.setConsent({
  analytics: false,     // analytics events are now dropped
  errorTracking: true,  // error events still flow
});
```

Two categories gate dispatch directly inside the engine:

- `analytics: false` drops `track`, `identify`, `logRevenue`, and `logScreenView`.
- `errorTracking: false` drops `logError`.

The remaining categories — `marketing`, `personalization`, `advertising`, `functional`, `performance` — are forwarded to provider-native consent APIs (such as Google Consent Mode) where the provider supports them. As of 3.1.0, `marketing` and `personalization` default to `false` (opt-in) rather than being assumed granted.

### Seeding consent at init

Set the starting state with `settings.defaultConsent` so the gate is correct before your first `setConsent` call:

```ts
await UnifiedTracking.initialize({
  analytics: { providers: ['google'], google: { measurementId: 'G-XXXXXXX' } },
  settings: {
    defaultConsent: { analytics: false, errorTracking: true, marketing: false },
  },
});
```

A common flow is to default analytics to denied, then grant it once the user accepts your cookie banner:

```ts
function onAcceptAnalytics() {
  UnifiedTracking.setConsent({ analytics: true });
}
```

## Property minimization

`settings.privacy.excludedProperties` lists keys to remove from every event, trait, and error context before providers receive them. The stripping happens in the engine, so it applies uniformly across all providers.

```ts
await UnifiedTracking.initialize({
  analytics: { providers: ['mixpanel'], mixpanel: { token: 'TOKEN' } },
  settings: {
    privacy: {
      anonymizeIp: true,
      excludedProperties: ['email', 'ssn', 'password', 'creditCard'],
    },
  },
});

// `email` is removed before Mixpanel sees this event:
await UnifiedTracking.track('signup', { email: 'ada@example.com', plan: 'pro' });
```

`anonymizeIp` is forwarded to providers that support IP anonymization. `dataRetentionDays` records your retention intent for providers that accept it.

## Log redaction

Provider keys, tokens, and DSNs are redacted from the package's own log output, and the default log level is `warn`, so secrets do not reach the console even in verbose flows. Enable richer diagnostics deliberately with `enableDebugMode(true)` or `settings.debug: true`.

## Reset on logout

Call `reset()` when a user logs out. It clears the identity in the engine and asks each provider to reset its own user caches, so the next session starts clean.

```ts
await UnifiedTracking.reset();
```
