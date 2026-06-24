---
id: faq
title: FAQ
description: Frequently asked questions about unified-tracking — provider support, consent, SSR, React without a provider, native status, and how it differs from a CDP.
sidebar_position: 97
---

# Frequently Asked Questions

## What problem does unified-tracking solve?

It removes the per-provider glue code from your app. Instead of calling each SDK's API in every component, you call one set of methods (`track`, `identify`, `logError`, …) and the engine forwards to every configured provider. Adding, removing, or swapping a provider becomes a config change rather than a refactor of your call sites.

## Which providers are supported?

Eight analytics providers (Google Analytics, Firebase, Amplitude, Mixpanel, Segment, PostHog, Heap, Matomo) and eight error-tracking providers (Sentry, Firebase Crashlytics, DataDog RUM, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter). See [Analytics providers](/reference/providers/analytics) and [Error-tracking providers](/reference/providers/error-tracking).

## Is this a CDP like Segment?

No. It is a client-side facade, not a server-side customer data platform. It does not store, transform, or route data on a server — it dispatches your events to the provider SDKs running in the client. You can list Segment as one of its providers, but unified-tracking itself adds no backend.

## Does it run on the server (SSR)?

The package guards against non-browser environments, so importing it during a server render is safe and provider calls made without a `window` are ignored rather than throwing. Initialize and track on the client. See [Platforms → Web](/platforms/web#server-side-rendering).

## Why is there no React `<Provider>`?

Tracking is a singleton with no per-render state, so a context provider would add ceremony without benefit. The hooks bind to that singleton with a stable identity, which keeps call sites tiny and dependency arrays correct. See [React integration](/guides/react#why-no-provider).

## Does it work on iOS and Android?

Yes, through the Capacitor WebView (the web/JS layer), which is the shipped path. Native vendor-SDK bridges exist on a branch but are not yet build-verified or published. See [Platforms → Native](/platforms/native).

## How does consent work?

`setConsent({ analytics: false })` makes the engine drop analytics events at dispatch before any provider sees them; `errorTracking: false` does the same for errors. Other categories forward to provider-native consent APIs. See [Consent and privacy](/guides/consent-and-privacy).

## Can I stop a property from reaching providers?

Yes. Add it to `settings.privacy.excludedProperties` and the engine strips that key from every event, trait, and error context before providers receive the data.

## Why does Crashlytics do nothing on web?

Firebase Crashlytics has no web/JS SDK — it is native-only. On web the adapter is an honest no-op that logs a notice. Use Sentry for web error tracking. The package deliberately does not depend on the `@capacitor-firebase/crashlytics` wrapper.

## Does it add runtime dependencies to my bundle?

The package itself has zero runtime dependencies. A provider's SDK loads only when you enable that provider, and the subpath exports let bundlers tree-shake the entries you do not import.

## Can I add a provider it doesn't ship?

Yes. Extend `BaseAnalyticsProvider` or `BaseErrorTrackingProvider` and register it with the `@RegisterProvider` decorator or `ProviderRegistry`. See [Custom providers](/guides/custom-providers).

## Where do I report a bug or request a provider?

Open an issue on the [GitHub repository](https://github.com/aoneahsan/unified-tracking/issues).
