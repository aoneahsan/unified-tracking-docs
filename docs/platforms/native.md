---
id: native
title: Native (iOS / Android)
description: Honest status of unified-tracking's native iOS and Android SDK bridges — written on-branch, not yet build-verified or published. WebView delivery is the supported path today.
sidebar_position: 2
---

# Native (iOS / Android)

This page states the native status plainly so you can plan around it.

## What ships today

Inside a Capacitor app, tracking runs through the **web/JS provider layer inside the WebView** — the same layer documented across this site. That is the shipped, supported path in npm `3.3.0`, and it covers all 16 providers. For most apps, WebView delivery is sufficient: events, identity, errors, revenue, and screen views all flow.

## What is on-branch but unverified

Native vendor-SDK bridges have been written for a subset of providers, reachable through the `@CapacitorPlugin` classes via `registerCapacitorPlugin()`:

- **iOS** — Firebase Analytics, Sentry (sentry-cocoa), Mixpanel (mixpanel-swift), Amplitude (AmplitudeSwift), Segment (Analytics-Swift/ObjC), Bugsnag (bugsnag-cocoa), Rollbar (RollbarNotifier).
- **Android** — Firebase, Sentry (sentry-android), Mixpanel (mixpanel-android), Amplitude (amplitude-android), Segment (analytics-android), Bugsnag (bugsnag-android), Rollbar (rollbar-android).

Both native plugin classes parse the same `UnifiedTrackingConfig` shape the JS core uses. The `google` provider id routes through Firebase Analytics on device (GA4 is Firebase natively). Web-only providers — PostHog, Heap, Matomo, DataDog, LogRocket, Raygun, AppCenter — log a "no native implementation (web-only); skipped on native" notice and defer to the JS core.

## The honest caveat

The native code is written but **not build-verified** in the maintainer's environment (no Xcode / Android Studio / CocoaPods / Gradle there), and it is **not published to npm**. Every touched native file carries a `// NOTE(unverified)` marker. Until a successful native build is confirmed on a real toolchain and device, do not rely on native-SDK delivery — and the npm `latest` tag stays on the web-layer `3.3.0`.

If you want to validate the native path yourself:

```bash
# iOS
cd ios && pod install && xcodebuild -workspace Plugin.xcworkspace -scheme Plugin

# Android
cd android && ./gradlew clean build test
```

The full native contract lives in the package repo at `docs/features/polish-audit-release/round04-native-overview.md`.

## Recommendation

Build against the WebView/web layer today. It is consistent across platforms and fully supported. Treat native-SDK delivery as a future enhancement that the maintainer will publish once it is build-verified.
