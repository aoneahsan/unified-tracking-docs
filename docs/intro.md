---
id: intro
title: Introduction
description: unified-tracking is a single TypeScript API that sends analytics and error events to 16 providers across React, web, and Capacitor apps, with a built-in consent gate.
slug: /intro
sidebar_position: 1
---

# Unified Tracking

`unified-tracking` is a facade that gives you one TypeScript API for analytics and error tracking and forwards each call to every provider you enable. You write `track('checkout_started', { plan: 'pro' })` once; the engine delivers it to Google Analytics, Mixpanel, Segment, and any other configured provider in the same call. Swapping or adding an SDK is a config change, not a refactor of your call sites.

The package targets three runtimes from one codebase: plain web/JS, React (through provider-free hooks), and Capacitor (through a registered `WebPlugin`). It ships as ESM with full type declarations and carries **zero runtime dependencies** — a provider's SDK only loads when you configure that provider.

## What it covers

The API surface is small and intentional. Every method exists on the `UnifiedTrackingPlugin` interface and is implemented by a single core engine:

- **Events** — `track(event, properties?)`
- **Identity** — `identify(userId, traits?)`, `setUserProperties(properties)`, `reset()`
- **Errors** — `logError(error, context?)`
- **Revenue** — `logRevenue(revenue)`
- **Screens** — `logScreenView(screenName, properties?)`
- **Consent** — `setConsent(consent)`
- **Lifecycle** — `initialize(options?)`, `flush()`, `getActiveProviders()`, `enableDebugMode(enabled)`, `addListener(eventName, fn)`

## Supported providers

Sixteen providers are implemented at the web/JS layer, split into two families.

**Analytics (8):** Google Analytics, Firebase, Amplitude, Mixpanel, Segment, PostHog, Heap, Matomo.

**Error tracking (8):** Sentry, Firebase Crashlytics, DataDog RUM, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter.

You enable a provider by listing its id under `analytics.providers` or `errorTracking.providers` and supplying its config block. Providers you don't list never load.

## Consent and privacy are first-class

Two controls run inside the engine before any provider sees data. `setConsent({ analytics: false })` makes the engine drop analytics events at dispatch — the provider SDKs never receive them. `settings.privacy.excludedProperties` strips named keys from every event, trait, and error context, so a property like `ssn` or `email` can be excluded globally in one place. Provider keys and DSNs are redacted from logs, and the default log level is `warn`.

## Platform status (honest)

The shipped npm release (`3.3.0`) delivers tracking through the **web/JS layer**, which runs both in browsers and inside the Capacitor WebView. Native iOS and Android SDK bridges have been written on a branch but are **not yet build-verified or published** — they need a native toolchain and device build to confirm. Until then, treat web/WebView delivery as the supported path. See [Platforms → Native](/platforms/native) for the full status.

## Where to go next

Install the package in [Installation](/getting-started/installation), then send your first event in the [Quick Start](/getting-started/quick-start). The [Configuration](/getting-started/configuration) page documents the complete `UnifiedTrackingConfig` shape, and the [API Reference](/reference/api/core-methods) details every method.
