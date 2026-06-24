# Unified Tracking — Documentation Site

Public documentation for the [`unified-tracking`](https://www.npmjs.com/package/unified-tracking)
npm package — a unified analytics and error-tracking facade for React, web, and Capacitor apps.

Built with [Docusaurus 3](https://docusaurus.io/). Source for the package itself lives at
[github.com/aoneahsan/unified-tracking](https://github.com/aoneahsan/unified-tracking).

- **Live docs:** https://unified-tracking-docs.aoneahsan.com (after deploy)
- **Package:** https://www.npmjs.com/package/unified-tracking
- **Author:** [Ahsan Mahmood](https://aoneahsan.com)

## Local development

This is a yarn-only repo (Node 18+).

```bash
yarn install
yarn start        # local dev server (port 5972)
yarn build        # production build into build/
yarn serve        # serve the production build (port 5973)
yarn typecheck    # tsc --noEmit
```

## Hosting (dual)

The site is configured for two hosts; pick either (or both) at deploy time.

- **Firebase Hosting** — `firebase.json` + `.firebaserc` (site `unified-tracking-docs`).
  Deploy: `yarn firebase:deploy`.
- **GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on push to `main`
  once Pages is enabled (Settings → Pages → Source: GitHub Actions). Custom domain via
  `static/CNAME`.

DNS for the custom domain and the actual deploy are owner-only steps.

## Structure

```
docs/                      Markdown content (routeBasePath '/')
  intro.md
  getting-started/         installation, quick-start, configuration
  guides/                  react, capacitor, consent-and-privacy, custom-providers
  reference/api/           core-methods, configuration, types, react-hooks
  reference/providers/     analytics, error-tracking
  platforms/               web, native
  faq.md  changelog.md  about-the-author.md
src/                       homepage + custom CSS
static/                    robots.txt, llms.txt, humans.txt, CNAME, img/, .well-known/
docusaurus.config.ts       site config + SEO head tags (JSON-LD)
sidebars.ts                sidebar layout
```

## License

MIT © Ahsan Mahmood. Documentation content describes the MIT-licensed `unified-tracking` package.
