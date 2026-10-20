# Unified Tracking public docs guidance

**Last context pass:** 2026-10-20. **Next routine context pass:** 2026-11-19.

This public `aoneahsan/unified-tracking-docs` repository documents npm package `unified-tracking` from `/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/unified-tracking`. GitHub Pages deploys `main` to `https://unified-tracking-docs.aoneahsan.com`; `static/CNAME` and `.github/workflows/deploy-pages.yml` are the hosting authority.

Use package source, exports, changelog, open issues, and native-status records for technical claims. Current package version is `3.3.2`. Web and Capacitor WebView delivery are supported. Native Swift and Android sources are included in the tarball but remain unverified and unsupported for native SDK delivery until platform and device gates pass.

`docs/` contains public pages and excluded maintenance records. `src/` contains the Docusaurus home and styles; `static/` contains public assets and discovery files. Keep internal guide pairs and `docs/tracking/` excluded from publication.

Use Yarn only and never install owner-created client packages. Run `yarn install --immutable`, `yarn typecheck`, and `yarn build`; inspect exact `build/` output in controlled desktop and mobile Chrome before pushing. After a `main` push, verify the Pages run, representative routes, `robots.txt`, `llms.txt`, and live mobile output.

Context optimization is complete for this pass. Do not repeat before 2026-11-19 unless the owner requests it, the tree changes materially, a hard cap is breached, or stale guidance can cause wrong work.
