---
id: native
title: Native (iOS / Android)
description: Status of unified-tracking's native iOS and Android SDK sources in 3.3.2. They are included but unverified; WebView delivery is supported.
sidebar_position: 2
---

# Native (iOS / Android)

This page states the native status plainly so you can plan around it.

## What ships today

Inside a Capacitor app, tracking runs through the **web/JS provider layer inside the WebView** — the same layer documented across this site. That is the supported path in npm `3.3.2`, and it covers all 16 providers. For most apps, WebView delivery is sufficient: events, identity, errors, revenue, and screen views all flow.

## What is on-branch but unverified

Native vendor-SDK bridges have been written for a subset of providers, reachable through the `@CapacitorPlugin` classes via `registerCapacitorPlugin()`:

- **iOS** — Firebase Analytics, Sentry (sentry-cocoa), Mixpanel (mixpanel-swift), Amplitude (AmplitudeSwift), Segment (Analytics-Swift/ObjC), Bugsnag (bugsnag-cocoa), Rollbar (RollbarNotifier).
- **Android** — Firebase, Sentry (sentry-android), Mixpanel (mixpanel-android), Amplitude (amplitude-android), Segment (analytics-android), Bugsnag (bugsnag-android), Rollbar (rollbar-android).

Both native plugin classes parse the same `UnifiedTrackingConfig` shape the JS core uses. The `google` provider id routes through Firebase Analytics on device (GA4 is Firebase natively). Web-only providers — PostHog, Heap, Matomo, DataDog, LogRocket, Raygun, AppCenter — log a "no native implementation (web-only); skipped on native" notice and defer to the JS core.

## The honest caveat

The native source is included in the `3.3.2` package, but it is **not build-verified** for native SDK delivery. Every affected native file carries a `// NOTE(unverified)` marker. Until successful platform builds and device checks are recorded, do not rely on the native provider path.

If you want to validate the native path yourself:

```bash
# iOS
cd ios && pod install && xcodebuild -workspace Plugin.xcworkspace -scheme Plugin

# Android
cd android && ./gradlew clean build test
```

The maintained native status lives in the package repository at `docs/native-implementation.md`.

## Recommendation

Build against the WebView/web layer today. It is consistent across platforms and fully supported. Treat native-SDK delivery as a future enhancement that the maintainer will publish once it is build-verified.
