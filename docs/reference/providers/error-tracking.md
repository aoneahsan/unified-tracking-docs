---
id: error-tracking
title: Error-Tracking Providers
description: Configuration reference for the eight error-tracking providers — Sentry, Firebase Crashlytics, DataDog, Bugsnag, Rollbar, LogRocket, Raygun, and AppCenter.
sidebar_position: 2
---

# Error-Tracking Providers

Eight error-tracking providers are implemented at the web/JS layer. Enable one by adding its id to `errorTracking.providers` and supplying the matching config block.

## Sentry (`sentry`)

```ts
interface SentryConfig {
  dsn: string;                                 // required
  environment?: string;
  release?: string;
  tracesSampleRate?: number;
  attachStacktrace?: boolean;
}
```

## Firebase Crashlytics (`crashlytics`)

```ts
interface CrashlyticsConfig {
  enabled?: boolean;
  collectionEnabled?: boolean;
}
```

Crashlytics has no web/JS SDK — it is a native-only product. On web it is intentionally a no-op that logs an honest "not supported on web" notice. Use Sentry for web error tracking. Note: the `@capacitor-firebase/crashlytics` wrapper is deliberately **not** a dependency of this package.

## DataDog RUM (`datadog`)

```ts
interface DataDogConfig {
  clientToken: string;                         // required
  applicationId: string;                       // required
  site?: string;
  service?: string;
  env?: string;
}
```

## Bugsnag (`bugsnag`)

```ts
interface BugsnagConfig {
  apiKey: string;                              // required
  releaseStage?: string;
  enabledReleaseStages?: string[];
  appVersion?: string;
}
```

## Rollbar (`rollbar`)

```ts
interface RollbarConfig {
  accessToken: string;                         // required
  environment?: string;
  captureUncaught?: boolean;
  captureUnhandledRejections?: boolean;
}
```

## LogRocket (`logrocket`)

```ts
interface LogRocketConfig {
  appId: string;                               // required, e.g. "org/app"
  /** @deprecated casing alias for appId */
  appID?: string;
  shouldCaptureIP?: boolean;
  network?: {
    isEnabled?: boolean;
    requestSanitizer?: (request: unknown) => unknown;
  };
}
```

## Raygun (`raygun`)

```ts
interface RaygunConfig {
  apiKey: string;                              // required
  version?: string;
  enableCrashReporting?: boolean;
  enableRealUserMonitoring?: boolean;
}
```

## AppCenter (`appcenter`)

```ts
interface AppCenterConfig {
  appSecret: string;                           // required
  analytics?: { enableAutoPageTracking?: boolean };
  crashes?: { askBeforeSending?: boolean };
}
```

## Error context

All providers receive the same [`ErrorContext`](/reference/api/types#errorcontext) you pass to `logError` — severity, tags, extra data, user info, and breadcrumbs — mapped to each provider's native fields where supported. Error dispatch is gated by the `errorTracking` consent category. See [Consent and privacy](/guides/consent-and-privacy).
