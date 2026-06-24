---
id: configuration
title: Configuration Types
description: Type reference for UnifiedTrackingConfig, AnalyticsConfig, ErrorTrackingConfig, GlobalSettings, BatchingSettings, and PrivacySettings.
sidebar_position: 2
---

# Configuration Types

These interfaces describe the object passed to [`initialize`](/reference/api/core-methods#initialize). The [Configuration guide](/getting-started/configuration) walks through them with examples; this page is the type-level reference.

## UnifiedTrackingConfig

```ts
interface UnifiedTrackingConfig {
  analytics?: AnalyticsConfig;
  errorTracking?: ErrorTrackingConfig;
  settings?: GlobalSettings;
  autoDetect?: boolean;
}
```

## AnalyticsConfig

```ts
interface AnalyticsConfig {
  providers?: AnalyticsProvider[];
  google?: GoogleAnalyticsConfig;
  firebase?: FirebaseAnalyticsConfig;
  amplitude?: AmplitudeConfig;
  mixpanel?: MixpanelConfig;
  segment?: SegmentConfig;
  posthog?: PostHogConfig;
  heap?: HeapConfig;
  matomo?: MatomoConfig;
}

type AnalyticsProvider =
  | 'google' | 'firebase' | 'amplitude' | 'mixpanel'
  | 'segment' | 'posthog' | 'heap' | 'matomo';
```

Per-provider config blocks are documented under [Analytics providers](/reference/providers/analytics).

## ErrorTrackingConfig

```ts
interface ErrorTrackingConfig {
  providers?: ErrorProvider[];
  sentry?: SentryConfig;
  crashlytics?: CrashlyticsConfig;
  datadog?: DataDogConfig;
  bugsnag?: BugsnagConfig;
  rollbar?: RollbarConfig;
  logrocket?: LogRocketConfig;
  raygun?: RaygunConfig;
  appcenter?: AppCenterConfig;
}

type ErrorProvider =
  | 'sentry' | 'crashlytics' | 'datadog' | 'bugsnag'
  | 'rollbar' | 'logrocket' | 'raygun' | 'appcenter';
```

Per-provider config blocks are documented under [Error-tracking providers](/reference/providers/error-tracking).

## GlobalSettings

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

## BatchingSettings

```ts
interface BatchingSettings {
  enabled: boolean;
  maxSize?: number;   // events per batch
  timeout?: number;   // flush interval in ms
}
```

## PrivacySettings

```ts
interface PrivacySettings {
  anonymizeIp?: boolean;
  excludedProperties?: string[];   // stripped from every event/trait/context
  dataRetentionDays?: number;
}
```

See [Consent and privacy](/guides/consent-and-privacy) for how `excludedProperties` and `anonymizeIp` are enforced inside the engine.
