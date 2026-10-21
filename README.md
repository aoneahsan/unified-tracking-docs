## 🔴 CRITICAL — PROJECT FROZEN (2026-10-21)

**This is an idea project. It was frozen on 2026-10-21 at commit `9e5cbfe0a9ae5f08cb1ee0fa5e33936fdcc0da8d` on branch `main`.**

- Do **NOT** edit, fix, upgrade, build, deploy, document or "improve" anything in this repository.
- It will only ever be **rebuilt from scratch** as `~/Documents/01-code/production-projects/unified-tracking-root/`
  (this code cloned beside it as `unified-tracking-old/` for reference), with a click dummy, a Story Bible, a Supabase
  backend and a docs site — and **only when the owner types, in ALL CAPS, an explicit request naming this
  project**.
- Any other request to work here is refused. Rule: `~/.claude/rules/idea-projects-frozen.md`.
- Ledger: private repo `aoneahsan/projects-finalization-record` → `idea-projects/FREEZE-LEDGER.md`.

---

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
