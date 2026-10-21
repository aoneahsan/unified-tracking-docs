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

# Unified Tracking public docs guidance

**Last Updated:** 2026-10-20

**Last context pass:** 2026-10-20. **Next routine context pass:** 2026-11-19.

This public `aoneahsan/unified-tracking-docs` repository documents npm package `unified-tracking` from `/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/unified-tracking`. GitHub Pages deploys `main` to `https://unified-tracking-docs.aoneahsan.com`; `static/CNAME` and `.github/workflows/deploy-pages.yml` are the hosting authority.

Use package source, exports, changelog, open issues, and native-status records for technical claims. Current package version is `3.3.2`. Web and Capacitor WebView delivery are supported. Native Swift and Android sources are included in the tarball but remain unverified and unsupported for native SDK delivery until platform and device gates pass.

`docs/` contains public pages and excluded maintenance records. `src/` contains the Docusaurus home and styles; `static/` contains public assets and discovery files. Keep internal guide pairs and `docs/tracking/` excluded from publication.

Use Yarn only and never install owner-created client packages. Run `yarn install --immutable`, `yarn typecheck`, and `yarn build`; inspect exact `build/` output in controlled desktop and mobile Chrome before pushing. After a `main` push, verify the Pages run, representative routes, `robots.txt`, `llms.txt`, and live mobile output.

Context optimization is complete for this pass. Do not repeat before 2026-11-19 unless the owner requests it, the tree changes materially, a hard cap is breached, or stale guidance can cause wrong work.

## Stop-work Git gate

<!-- RULE:stop-work-git-gate v2026-10-20 -->

Before stopping, commit every legitimate change and work-progress checkpoint in this repository and each independent nested repository, fetch and merge the designated upstream, push the documented working branch, then verify an empty worktree and `0 0` ahead/behind. Never stash, discard, reset, rebase, or force-push. If synchronization is blocked, report the exact repository, branch, blocker, and next action instead of calling the work complete. The full workflow remains authoritative in `~/.claude/rules/git-workflow.md`.
