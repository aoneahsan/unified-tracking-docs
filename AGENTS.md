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


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) for ANY work in
   this project — they cannot invoke /skills, which RULE #0 makes mandatory. Do ALL work (planning, implementation,
   review, exploration) in the MAIN context. A sub-agent is allowed ONLY when a CUSTOM agent exists in
   `.claude/agents/` for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a needed
   skill is missing, download/enable/install it (or use the nearest installed equivalent and say so) — never
   proceed skill-less.
3. **Model workflow:** PLAN and REVIEW on **Fable 5**; EXECUTE the approved plan on **Opus 4.8**. Plans in
   `~/.claude/plans/`; multi-phase features keep a resumable tracker (`docs/features/<slug>/00-tracker.json`),
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
