---
id: configuration
title: Configuration
description: The complete UnifiedTrackingConfig shape — analytics, errorTracking, and settings — that you pass to initialize(), including consent, batching, and privacy options.
sidebar_position: 3
---

# Configuration

`initialize(options?)` accepts a single `UnifiedTrackingConfig` object with three top-level sections plus an optional auto-detect flag. This page documents every field; per-provider config blocks are detailed under [Providers](/reference/providers/analytics).

```ts
interface UnifiedTrackingConfig {
  analytics?: AnalyticsConfig;
  errorTracking?: ErrorTrackingConfig;
  settings?: GlobalSettings;
  autoDetect?: boolean;
}
```

## analytics

Lists which analytics providers to enable and carries each provider's config block. A provider is active only if its id is in `providers` **and** the matching config block is present where required.

```ts
analytics: {
  providers: ['google', 'mixpanel', 'segment'],
  google: { measurementId: 'G-XXXXXXX' },
  mixpanel: { token: 'MIXPANEL_TOKEN' },
  segment: { writeKey: 'SEGMENT_WRITE_KEY' },
}
```

Valid provider ids: `google`, `firebase`, `amplitude`, `mixpanel`, `segment`, `posthog`, `heap`, `matomo`.

## errorTracking

The same pattern for error-tracking providers.

```ts
errorTracking: {
  providers: ['sentry', 'bugsnag'],
  sentry: { dsn: 'https://...', environment: 'production' },
  bugsnag: { apiKey: 'BUGSNAG_API_KEY' },
}
```

Valid provider ids: `sentry`, `crashlytics`, `datadog`, `bugsnag`, `rollbar`, `logrocket`, `raygun`, `appcenter`.

## settings

Global behavior that applies across providers.

```ts
interface GlobalSettings {
  debug?: boolean;
  defaultConsent?: ConsentSettings;
  sessionTimeout?: number;        // milliseconds
  autoTrackScreens?: boolean;
  autoTrackErrors?: boolean;
  userIdGenerator?: () => string;
  batching?: BatchingSettings;
  privacy?: PrivacySettings;
}
```

`debug` raises log verbosity. `defaultConsent` seeds the consent gate before any `setConsent` call. `autoTrackErrors` lets the engine capture uncaught errors. `userIdGenerator` supplies anonymous ids when you have not identified a user.

### defaultConsent

```ts
defaultConsent: {
  analytics: true,
  errorTracking: true,
  marketing: false,       // opt-in by default since 3.1.0
  personalization: false, // opt-in by default since 3.1.0
}
```

Only `analytics` and `errorTracking` gate event dispatch inside the engine. The other categories are forwarded to provider-native consent APIs (such as Google Consent Mode) where supported. See [Consent and privacy](/guides/consent-and-privacy).

### batching

```ts
batching: {
  enabled: true,
  maxSize: 20,       // events per batch
  timeout: 5000,     // flush interval in ms
}
```

### privacy

```ts
privacy: {
  anonymizeIp: true,
  excludedProperties: ['email', 'ssn', 'password'],
  dataRetentionDays: 90,
}
```

`anonymizeIp` is honored by providers that support IP anonymization. `excludedProperties` are stripped from every event, trait, and error context before providers receive them — this is enforced inside the engine as of 3.1.0.

## autoDetect

When `true`, the engine attempts to detect installed provider SDKs and enable them without an explicit `providers` list. Prefer an explicit `providers` array for predictable, reviewable configuration.

## A complete example

```ts
await UnifiedTracking.initialize({
  analytics: {
    providers: ['google', 'amplitude'],
    google: { measurementId: 'G-XXXXXXX', sendPageView: true },
    amplitude: { apiKey: 'AMP_KEY' },
  },
  errorTracking: {
    providers: ['sentry'],
    sentry: { dsn: 'https://...', environment: 'production', tracesSampleRate: 0.2 },
  },
  settings: {
    debug: false,
    defaultConsent: { analytics: true, errorTracking: true, marketing: false },
    batching: { enabled: true, maxSize: 20, timeout: 5000 },
    privacy: { anonymizeIp: true, excludedProperties: ['email'] },
  },
});
```
