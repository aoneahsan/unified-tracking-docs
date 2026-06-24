import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const PROVIDERS = [
  'Google Analytics',
  'Firebase',
  'Amplitude',
  'Mixpanel',
  'Segment',
  'PostHog',
  'Heap',
  'Matomo',
  'Sentry',
  'Crashlytics',
  'DataDog',
  'Bugsnag',
  'Rollbar',
  'LogRocket',
  'Raygun',
  'AppCenter',
];

const FEATURES: Array<{ title: string; body: string }> = [
  {
    title: 'One API, sixteen providers',
    body: 'Call track, identify, logError, logRevenue, and logScreenView once. The core fans each call out to every provider you enable — swap or add SDKs without touching call sites.',
  },
  {
    title: 'Consent gate built in',
    body: 'setConsent denies a category and the engine drops the matching events before any provider sees them. analytics and errorTracking gate dispatch; the rest forward to provider-native consent APIs.',
  },
  {
    title: 'Privacy minimization',
    body: 'settings.privacy.excludedProperties strips listed keys from every event, trait, and context before providers receive them. Secrets and DSNs are redacted from logs.',
  },
  {
    title: 'React without providers',
    body: 'Import useUnifiedTracking and useTrackEvent from unified-tracking/react. No context, no HOC, no <Provider> wrapper — the hooks bind to a shared singleton with stable identity.',
  },
  {
    title: 'Capacitor-ready',
    body: 'registerCapacitorPlugin() wires the same core into a Capacitor WebPlugin so the plugin, the React hooks, and the main entry all share one instance and one init state.',
  },
  {
    title: 'Typed, tree-shakeable, zero runtime deps',
    body: 'Ships as ESM with full .d.ts types and three subpath exports (., /react, /capacitor). The package itself pulls in no runtime dependencies — provider SDKs load only when configured.',
  },
];

function Hero(): ReactNode {
  return (
    <header className="ut-hero">
      <h1 className="ut-hero__title">Unified Tracking</h1>
      <p className="ut-hero__subtitle">
        One TypeScript API for analytics and error tracking across React, web, and Capacitor.
        Configure once, and the same calls reach every provider you enable — consent-aware and
        privacy-minimizing by design.
      </p>
      <div className="ut-cta-row">
        <Link className="button button--primary button--lg" to="/getting-started/quick-start">
          Quick Start
        </Link>
        <Link className="button button--secondary button--lg" to="/intro">
          Read the docs
        </Link>
        <Link
          className="button button--outline button--lg"
          to="https://www.npmjs.com/package/unified-tracking"
        >
          View on npm
        </Link>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Unified Tracking — one API for analytics + error tracking"
      description="Documentation for unified-tracking: a unified analytics and error-tracking facade for React, web, and Capacitor apps. One API fans out to 16 providers with a consent gate and privacy minimization."
    >
      <Hero />
      <main>
        <div className="ut-pillrow">
          {PROVIDERS.map((p) => (
            <span className="ut-pill" key={p}>
              {p}
            </span>
          ))}
        </div>
        <section className="ut-grid">
          {FEATURES.map((f) => (
            <div className="ut-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
