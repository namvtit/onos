# Manufactt Next.js migration

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm run start`.

The original crawl is preserved in `raw-webflow/`. Application routes are in `src/app/`, converted page JSX in `src/generated/`, shared UI in `src/components/`, and exact restored dependencies in `public/assets/`.

Read [FINAL_REPORT.md](FINAL_REPORT.md), [AUDIT.md](AUDIT.md), and [MIGRATION_REPORT.md](MIGRATION_REPORT.md). QA evidence is in `audit/qa/`; the final visual pass is intentionally partial.

Available checks: `npm run typecheck`, `npm run lint`, `npm run verify:assets`, `npm run build`. Playwright interaction tests are in `tests/`; they require an installed Chromium browser and a production build. The final full-suite rerun was intentionally omitted at the user’s request.

Migration scripts preserve the source and are retained for traceability. Python scripts require Beautiful Soup (`beautifulsoup4`). Do not regenerate page JSX to make routine UI edits unless deliberately updating the conversion. Forms are local demos; no submission or authentication backend is configured.
