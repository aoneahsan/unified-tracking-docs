---
id: analytics
title: Analytics Providers
description: Configuration reference for the eight analytics providers — Google Analytics, Firebase, Amplitude, Mixpanel, Segment, PostHog, Heap, and Matomo.
sidebar_position: 1
---

# Analytics Providers

Eight analytics providers are implemented at the web/JS layer. Enable a provider by adding its id to `analytics.providers` and supplying the matching config block. Each interface below is the exact shape the engine accepts.

## Google Analytics (`google`)

```ts
interface GoogleAnalyticsConfig {
  measurementId: string;                       // required, e.g. "G-XXXXXXX"
  customDimensions?: Record<string, string>;
  customMetrics?: Record<string, number>;
  sendPageView?: boolean;
}
```

On native, the `google` id is routed through Firebase Analytics (GA4 is Firebase on device).

## Firebase (`firebase`)

```ts
interface FirebaseAnalyticsConfig {
  enabled?: boolean;
  customParameters?: Record<string, unknown>;
}
```

## Amplitude (`amplitude`)

```ts
interface AmplitudeConfig {
  apiKey: string;                              // required
  serverUrl?: string;
  trackingOptions?: {
    disableCookies?: boolean;
    trackingSessionEvents?: boolean;
  };
}
```

## Mixpanel (`mixpanel`)

```ts
interface MixpanelConfig {
  token: string;                               // required
  apiHost?: string;
  debug?: boolean;
  trackAutomaticEvents?: boolean;
  persistence?: 'localStorage' | 'cookie' | 'none';
  persistencePrefix?: string;
  cookieDomain?: string;
  crossSiteCookie?: boolean;
  secureCookie?: boolean;
  ipTracking?: boolean;
  propertyBlocklist?: string[];
  sessionDuration?: number;
  optOutByDefault?: boolean;
  batching?: boolean;
  batchSize?: number;
  batchFlushInterval?: number;
  disableNotifications?: boolean;
  superProperties?: Record<string, unknown>;
}
```

## Segment (`segment`)

```ts
interface SegmentConfig {
  writeKey: string;                            // required
  defaultIntegrations?: boolean;
  enabledIntegrations?: Record<string, boolean>;
  /** @deprecated use enabledIntegrations */
  integrations?: Record<string, boolean>;
}
```

Enabling Segment injects the standard analytics.js snippet.

## PostHog (`posthog`)

```ts
interface PostHogConfig {
  apiKey: string;                              // required
  apiHost?: string;                            // e.g. https://app.posthog.com
  /** @deprecated use apiHost */
  host?: string;
  featureFlags?: boolean | Record<string, unknown>;
  sessionRecording?:
    | boolean
    | {
        enabled?: boolean;
        maskAllInputs?: boolean;
        maskInputOptions?: Record<string, boolean>;
        sampleRate?: number;
        minimumDuration?: number;
      };
}
```

## Heap (`heap`)

```ts
interface HeapConfig {
  appId: string;                               // required
  enableAutocapture?: boolean;
}
```

## Matomo (`matomo`)

```ts
interface MatomoConfig {
  siteId: string | number;                     // required
  trackerUrl: string;                          // required, e.g. https://analytics.example.com
  /** @deprecated use trackerUrl */
  url?: string;
  customDimensions?: Record<number, string>;
}
```

## Platform support

All eight deliver through the web/JS layer (browser and Capacitor WebView). On native, a subset has on-branch SDK bridges; the others log a "web-only; skipped on native" notice and defer to the JS core. See [Platforms → Native](/platforms/native).
