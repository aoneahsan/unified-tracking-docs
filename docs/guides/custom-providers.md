---
id: custom-providers
title: Custom Providers
description: Extend BaseAnalyticsProvider or BaseErrorTrackingProvider and register it with the @RegisterProvider decorator or ProviderRegistry to add a provider unified-tracking does not ship.
sidebar_position: 4
---

# Custom Providers

When you need a provider the package does not ship, implement one of the abstract base classes and register it. The engine then treats your provider exactly like a built-in one — your `track`/`logError` calls fan out to it alongside the rest.

## Analytics providers

Extend `BaseAnalyticsProvider`. The base class implements the public-facing behavior (consent checks, lifecycle, super-properties) and calls a set of `doXxx` template methods you implement.

```ts
import { BaseAnalyticsProvider } from 'unified-tracking';
import type { RevenueData } from 'unified-tracking';

class MyAnalyticsProvider extends BaseAnalyticsProvider {
  readonly id = 'my-analytics';
  readonly name = 'My Analytics';
  readonly type = 'analytics' as const;
  readonly version = '1.0.0';

  protected async doInitialize(config: Record<string, unknown>): Promise<void> {
    // load your SDK with config keys
  }
  protected async doTrack(eventName: string, properties: Record<string, unknown>): Promise<void> {
    // forward the event to your SDK
  }
  protected async doIdentifyUser(userId: string, traits: Record<string, unknown>): Promise<void> {}
  protected async doSetUserProperties(properties: Record<string, unknown>): Promise<void> {}
  protected async doLogScreenView(screenName: string, properties: Record<string, unknown>): Promise<void> {}
  protected async doLogRevenue(data: RevenueData): Promise<void> {}
  protected async doUpdateConsent(consent: Record<string, boolean | undefined>): Promise<void> {}
  protected async doProviderReset(): Promise<void> {}
  protected async doShutdown(): Promise<void> {}
}
```

The base class only calls `doTrack` after the analytics consent check passes, so your implementation never needs to re-check consent.

## Error-tracking providers

Extend `BaseErrorTrackingProvider`. It exposes a different set of template methods focused on error capture and context.

```ts
import { BaseErrorTrackingProvider } from 'unified-tracking';
import type { ErrorContext } from 'unified-tracking';

class MyErrorProvider extends BaseErrorTrackingProvider {
  readonly id = 'my-errors';
  readonly name = 'My Errors';
  readonly type = 'error-tracking' as const;
  readonly version = '1.0.0';

  protected async doInitialize(config: Record<string, unknown>): Promise<void> {}
  protected async doLogError(error: Error, context: ErrorContext): Promise<void> {}
  protected async doCaptureException(exception: Error, context: ErrorContext): Promise<void> {}
  protected doSetUserContext(user: Record<string, unknown>): void {}
  protected doSetExtraContext(key: string, value: unknown): void {}
  protected doSetTags(tags: Record<string, string>): void {}
  protected async doUpdateConsent(consent: Record<string, boolean | undefined>): Promise<void> {}
  protected async doProviderReset(): Promise<void> {}
  protected async doShutdown(): Promise<void> {}
}
```

## Registering your provider

Two registration paths exist, both backed by the `ProviderRegistry` singleton.

### Decorator

Annotate the class with `@RegisterProvider`. It registers the constructor at import time, so importing the module is enough to make the provider available.

```ts
import { RegisterProvider } from 'unified-tracking';

@RegisterProvider({
  id: 'my-analytics',
  name: 'My Analytics',
  type: 'analytics',
  version: '1.0.0',
  supportedPlatforms: ['web'],
})
class MyAnalyticsProvider extends BaseAnalyticsProvider {
  /* … */
}
```

### Imperative

Call the registry directly when you cannot use decorators.

```ts
import { ProviderRegistry } from 'unified-tracking';

ProviderRegistry.getInstance().register({
  metadata: {
    id: 'my-analytics',
    name: 'My Analytics',
    type: 'analytics',
    version: '1.0.0',
    supportedPlatforms: ['web'],
  },
  constructor: MyAnalyticsProvider,
});
```

The `ProviderMetadata` shape is `{ id, name, type, version, supportedPlatforms, configSchema? }`, where `supportedPlatforms` is an array of `'web' | 'ios' | 'android'`. Once registered, list your provider id in `analytics.providers` (or `errorTracking.providers`) and pass its config block to `initialize` just like a built-in provider.
