---
id: types
title: Data Types
description: Reference for the data objects unified-tracking accepts and returns — ErrorContext, RevenueData, ConsentSettings, InitializeResult, ProviderStatus, and TrackingEventPayload.
sidebar_position: 3
---

# Data Types

The objects you pass to and receive from the [core methods](/reference/api/core-methods).

## ErrorContext

Passed to [`logError`](/reference/api/core-methods#logerror). Every field is optional; providers map the fields they support.

```ts
interface ErrorContext {
  severity?: 'debug' | 'info' | 'warning' | 'error' | 'fatal';
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  user?: { id?: string; email?: string; username?: string };
  breadcrumbs?: Array<{
    message: string;
    category?: string;
    timestamp?: number;
    data?: Record<string, unknown>;
  }>;
  timestamp?: string;
  platform?: string;
}
```

## RevenueData

Passed to [`logRevenue`](/reference/api/core-methods#logrevenue). Only `amount` is required.

```ts
interface RevenueData {
  amount: number;
  currency?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  transactionId?: string;
  items?: Array<{
    itemId?: string;
    itemName?: string;
    itemCategory?: string;
    itemVariant?: string;
    itemBrand?: string;
    price?: number;
    quantity?: number;
    currency?: string;
    index?: number;
  }>;
  properties?: Record<string, unknown>;
}
```

The `items` array maps to ecommerce line items for providers (such as GA4) that model purchases as itemized transactions.

## ConsentSettings

Passed to [`setConsent`](/reference/api/core-methods#setconsent) and `settings.defaultConsent`. The index signature lets you carry provider-specific categories alongside the named ones.

```ts
interface ConsentSettings {
  analytics?: boolean;
  errorTracking?: boolean;
  marketing?: boolean;
  personalization?: boolean;
  advertising?: boolean;
  functional?: boolean;
  performance?: boolean;
  [key: string]: boolean | undefined;
}
```

Only `analytics` and `errorTracking` gate dispatch inside the engine; the rest forward to provider-native consent APIs. See [Consent and privacy](/guides/consent-and-privacy).

## InitializeResult

Returned by [`initialize`](/reference/api/core-methods#initialize).

```ts
interface InitializeResult {
  success: boolean;
  activeProviders: ActiveProvidersResult;
  warnings?: string[];
}
```

## ActiveProvidersResult & ProviderStatus {#providerstatus}

Returned by [`getActiveProviders`](/reference/api/core-methods#getactiveproviders).

```ts
interface ActiveProvidersResult {
  analytics: ProviderStatus[];
  errorTracking: ProviderStatus[];
}

interface ProviderStatus {
  name: string;
  enabled: boolean;
  initialized: boolean;
  version?: string;
}
```

## TrackingEventPayload

Delivered to [`addListener`](/reference/api/core-methods#addlistener) callbacks. Which fields are populated depends on the event: `trackingEvent` carries `event` + `properties` (+ `timestamp`); `error` carries `error` + `context`; `providerStatusChange` carries `provider` + `status`.

```ts
interface TrackingEventPayload {
  event?: string;
  properties?: Record<string, unknown>;
  error?: Error | string;
  context?: ErrorContext;
  provider?: string;
  status?: string;
  message?: string;
  timestamp?: string;
}
```
