---
id: changelog
title: Changelog
description: Version history for the unified-tracking npm package, latest first. The full changelog lives in the package repository.
sidebar_position: 98
---

# Changelog

Version history for `unified-tracking`, latest first. This mirrors the package's `CHANGELOG.md`; the repository file is the source of truth for every entry.

## Unreleased — native SDK bridges (on-branch, unverified)

Native iOS/Android vendor-SDK bridges are written on a branch behind `registerCapacitorPlugin()` for Firebase, Sentry, Mixpanel, Amplitude, Segment, Bugsnag, and Rollbar. They are **not build-verified** and **not published** — `npm latest` stays on `3.3.0` (web layer). See [Platforms → Native](/platforms/native).

## 3.3.0 — 2026-05-27

Completes the polish backlog from 3.2.0; all additive, no breaking changes.

- **Added** `flush()` across the main API, the `useUnifiedTracking()` hook, and the Capacitor adapter.
- **Added** typed `addListener` callbacks (`TrackingEventPayload`).
- **Changed** Firebase and Amplitude providers now extend `BaseAnalyticsProvider`, gaining super-properties and timed events.
- **Changed** clearer non-browser error message; tightened public `any` to `unknown`.
- **Changed** the `unified-tracking-setup` CLI now generates the correct object-shaped config and real hook usage.
- **Deprecated** `getProviderManager()`.

## 3.2.0 — 2026-05-26

A second independent deep audit fixed defects the 3.1.0 pass missed, including two that affected whether the package worked at all (Node-ESM importability and silent provider-registration failure). Added secret-log redaction, config-key aliases, pre-init event buffering, a unified consent model, and a single core singleton. No breaking public API changes.

## 3.1.0 — 2026-05-26

Polish and hardening: dependencies to latest stable, enforced privacy controls and the consent gate, script-src validation, removal of `eval` and dead code, tightened public types, zero lint warnings.

## 3.0.2 — 2026-03-25

Fixed provider-manager / web / Google-Analytics issues and removed a fragile docgen step from the default build.

## Earlier

For releases before 3.0.2 and the full, unabridged notes, see [`CHANGELOG.md`](https://github.com/aoneahsan/unified-tracking/blob/main/CHANGELOG.md) in the package repository.
