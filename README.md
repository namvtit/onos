# ONOS Global — Manufactt design transplant

A single-page Next.js implementation of ONOS Global at `/`, using the preserved Manufactt template styling and genuine ONOS photography. English is the default; Vietnamese is available through the navbar. `/?lang=vi` also opens Vietnamese directly.

```sh
npm run dev
npm run typecheck
npm run lint
npm run verify:assets
npm run build
npm run start
npx playwright test --grep 'homepage smoke:'
```

The smoke test uses the production server on port 3000; Playwright starts it when necessary. Results and current screenshots go to `audit/final/`, separate from original QA evidence.

Business content and recommendations live in `src/data/onos-content.ts`; translations live in `src/data/translations.ts`. Layout, sections and interactions are under `src/components/`. `src/app/globals.css` imports the unchanged Manufactt font and shared stylesheets, followed by the local behavior adaptations in `onos.css`.

Only `/` is a normal content page. Relevant old overview URLs redirect to homepage anchors. Obsolete articles, case studies, industrial service details and utility/demo paths return 404. No contact backend, tracking, newsletter service or fabricated factory video is included. Inquiry buttons open localized email drafts for the visitor to review and send.

Current documentation: `ONOS_FEATURE_PARITY.md`, `ONOS_DESIGN_MAPPING.md`, `ONOS_REMAINING_ISSUES.md`, `FINAL_REPORT.md`. Earlier migration/mapping reports and scripts are historical source records. `raw-webflow/`, original QA evidence, the baseline branch, ONOS backup and the checkpoint branch are preserved.

No deployment or push is part of this work. Existing template and media license terms continue to apply.
