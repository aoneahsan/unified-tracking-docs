# unified-tracking-docs — Agent Notes (AGENTS.md mirror of CLAUDE.md)

**Last Updated:** 2026-06-24

Public documentation site (Docusaurus 3) for the `unified-tracking` npm package
(https://www.npmjs.com/package/unified-tracking). This repo is **PUBLIC** (free GitHub Pages /
Firebase Hosting). It contains NO secrets — keep `.env*` git-ignored.

## What this is

- Stack: Docusaurus 3 + React 19 + TypeScript. yarn-only (Node 18+). `routeBasePath: '/'`.
- Content describes the REAL package API, read from the package source (`src/definitions.ts`,
  `src/core`, `src/react`, `src/capacitor`). Keep it honest — never document an unshipped feature
  as available. The native iOS/Android SDK bridges are on-branch + unverified; the docs say so
  (see `docs/platforms/native.md`).
- Brand: indigo `#4f46e5` primary, cyan `#06b6d4` accent. Logo/favicon/social SVGs in `static/img/`.

## Commands

```bash
yarn install
yarn build        # production build -> build/  (the verify gate; never run dev servers in CI/agents)
yarn typecheck
```

Per the global rule, do NOT run dev/preview servers (`yarn start`, `yarn serve`) automatically —
the owner runs those. Verify with `yarn build` + `yarn typecheck` only.

## Hosting (dual)

- Firebase Hosting: `firebase.json` + `.firebaserc` (site `unified-tracking-docs`). Deploy is owner-only.
- GitHub Pages: `.github/workflows/deploy.yml` + `static/CNAME` (`unified-tracking-docs.aoneahsan.com`).
  Enabling Pages + DNS are owner-only.

## SEO floor (keep intact)

- `static/robots.txt` — AI-bot allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) + Sitemap directive.
- `static/llms.txt` — llmstxt.org index. `static/humans.txt`, `static/.well-known/security.txt`.
- `docusaurus.config.ts` head tags — JSON-LD WebSite + Organization + SoftwareSourceCode + SoftwareApplication; per-page meta + OG.
- Sitemap is emitted by the classic preset on every build.

## SEO content enrichment

Long-tail enrichment progress: `docs/tracking/unified-tracking-docs-content-tracker.json`.
Playbook: `~/.claude/rules/seo-aeo-ranking.md`.

## CLAUDE.md + AGENTS.md sync

Keep this file and `AGENTS.md` in sync — update both when changing either.
