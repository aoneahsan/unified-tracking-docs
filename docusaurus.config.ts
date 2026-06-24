import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// Unified Tracking — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// Source package: https://www.npmjs.com/package/unified-tracking
// ---------------------------------------------------------------------------

const SITE_URL = 'https://unified-tracking-docs.aoneahsan.com';
const NPM_URL = 'https://www.npmjs.com/package/unified-tracking';
const REPO_URL = 'https://github.com/aoneahsan/unified-tracking';
const DOCS_REPO_URL = 'https://github.com/aoneahsan/unified-tracking-docs';

const config: Config = {
  title: 'Unified Tracking Docs',
  tagline:
    'One API for analytics + error tracking across 16 providers — React, web, and Capacitor.',
  favicon: 'img/favicon.svg',

  // Production URL — served from Firebase Hosting + GitHub Pages.
  url: SITE_URL,
  baseUrl: '/',

  // GitHub metadata (drives OG tags + edit-this-page links + Pages deploy)
  organizationName: 'aoneahsan',
  projectName: 'unified-tracking-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags. JSON-LD payloads (WebSite, Organization,
  // SoftwareSourceCode, SoftwareApplication) help Google Rich Results,
  // Perplexity, ChatGPT, and Claude extract structured entity data when
  // citing this documentation.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: `${SITE_URL}/` },
    },
    {
      tagName: 'meta',
      attributes: { name: 'application-name', content: 'Unified Tracking Docs' },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-title',
        content: 'Unified Tracking Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#6366f1' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Unified Tracking Documentation',
        url: SITE_URL,
        description:
          'Documentation for unified-tracking, a unified analytics and error-tracking facade for React, web, and Capacitor apps. One API fans out to 16 providers with a consent gate and privacy minimization. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'unified-tracking',
        description:
          'A unified analytics + error-tracking facade. One TypeScript API (track, identify, logError, logRevenue, logScreenView, setConsent) fans out to 8 analytics providers (Google Analytics, Firebase, Amplitude, Mixpanel, Segment, PostHog, Heap, Matomo) and 8 error-tracking providers (Sentry, Crashlytics, DataDog, Bugsnag, Rollbar, LogRocket, Raygun, AppCenter), with a built-in consent gate and property minimization. MIT-licensed.',
        codeRepository: REPO_URL,
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Node.js, Browser, Capacitor (iOS, Android, Web)',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
        url: NPM_URL,
        sameAs: [NPM_URL, REPO_URL],
        version: '3.3.0',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'unified-tracking',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Android, iOS, Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: NPM_URL,
        author: { '@type': 'Person', name: 'Ahsan Mahmood', url: 'https://aoneahsan.com' },
        description:
          'Unified analytics and error-tracking plugin for React + Capacitor apps. One API, 16 providers, consent-aware. MIT-licensed.',
        softwareVersion: '3.3.0',
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
        founder: { '@type': 'Person', name: 'Ahsan Mahmood' },
      }),
    },
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  trailingSlash: false,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: `${DOCS_REPO_URL}/edit/main/`,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.7, lastmod: 'date' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for unified-tracking — a unified analytics and error-tracking facade for React, web, and Capacitor apps. One API fans out to 16 providers with a consent gate. Maintained by Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'unified-tracking, capacitor analytics, react analytics, error tracking, unified analytics, google analytics, firebase analytics, amplitude, mixpanel, segment, posthog, heap, matomo, sentry, bugsnag, rollbar, datadog rum, logrocket, raygun, appcenter, consent mode, privacy compliant analytics, typescript analytics',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Unified Tracking Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'Ahsan Mahmood' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: { hideable: true, autoCollapseCategories: true },
    },
    navbar: {
      title: 'Unified Tracking',
      logo: {
        alt: 'Unified Tracking logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Docs' },
        { to: '/getting-started/quick-start', label: 'Quick Start', position: 'left' },
        { to: '/reference/api/core-methods', label: 'API', position: 'left' },
        { to: '/about-the-author', label: 'Author', position: 'right' },
        { href: NPM_URL, label: 'npm', position: 'right' },
        { href: DOCS_REPO_URL, label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Installation', to: '/getting-started/installation' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'API Reference', to: '/reference/api/core-methods' },
          ],
        },
        {
          title: 'Package',
          items: [
            { label: 'npm package', href: NPM_URL },
            { label: 'Source code', href: REPO_URL },
            { label: 'Docs source', href: DOCS_REPO_URL },
            { label: 'Changelog', to: '/changelog' },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. unified-tracking is MIT-licensed.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'tsx', 'swift', 'java', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
