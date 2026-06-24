import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for the unified-tracking documentation site.
 * Every entry maps to a real markdown file under docs/.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/react',
        'guides/capacitor',
        'guides/consent-and-privacy',
        'guides/custom-providers',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: [
        'reference/api/core-methods',
        'reference/api/configuration',
        'reference/api/types',
        'reference/api/react-hooks',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      collapsed: true,
      items: [
        'reference/providers/analytics',
        'reference/providers/error-tracking',
      ],
    },
    {
      type: 'category',
      label: 'Platforms',
      collapsed: true,
      items: ['platforms/web', 'platforms/native'],
    },
    'faq',
    'changelog',
    'about-the-author',
  ],
};

export default sidebars;
