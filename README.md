# Unified Tracking Documentation

Public documentation for [`unified-tracking`](https://www.npmjs.com/package/unified-tracking), a consent-aware analytics and error-tracking facade for web, React, and Capacitor WebView applications.

- [Live documentation](https://unified-tracking-docs.aoneahsan.com)
- [Package source](https://github.com/aoneahsan/unified-tracking)
- [Docs source](https://github.com/aoneahsan/unified-tracking-docs)
- [npm package](https://www.npmjs.com/package/unified-tracking)

## Local verification

```bash
yarn install --immutable
yarn typecheck
yarn build
yarn serve
```

Inspect the generated `build/` site at desktop and mobile widths. Package behavior and compatibility claims must be checked against the maintained package source.

## Deployment

Pushing `main` runs `.github/workflows/deploy-pages.yml`. GitHub Pages serves the custom domain declared in `static/CNAME`. Verify the workflow, representative pages, discovery files, and the live mobile layout after deployment.

## License

Documentation is maintained by [Ahsan Mahmood](https://aoneahsan.com). Package licensing is recorded in the package repository.
