# Migration report

See [FINAL_REPORT.md](FINAL_REPORT.md) for the final status, limitations, and next steps. The user accepted the current fidelity baseline and requested that exhaustive visual QA stop.

## Audit and baseline

`AUDIT.md` documents the 39 HTML snapshots, 37 routes, original breakpoints, fonts, sections, external dependencies, malformed crawl URLs, Webflow runtime, and interactions. Machine-readable inventories and source hashes are in `audit/`.

The migration uses Next.js 16.4.3, React 19.3.1, TypeScript, and Tailwind CSS. Original layout styling remains in the restored Webflow stylesheet; Tailwind Preflight is omitted and utilities are prefixed. Exact images, SVGs, responsive variants, fonts, videos, and the brochure are local. CSS URLs, relative navigation, pagination, video posters, and malformed lightbox data were repaired without changing the source crawl.

## Components and behavior

Generated TSX preserves the source structure. Shared navbar/footer variants are in `src/components/SiteChrome.tsx`; Hero, HeroVideo, Services, About, Projects, and Testimonials are in `src/components/sections/HomeSections.tsx`. `ContactForm` retains the original form node and fields while handling native validation and honest local feedback.

`SiteRuntime`, `site-controls.ts`, and `source-animations.ts` provide local interactions. The original IX2 action values and timing are retained in `src/generated/interactions.json` and played through local GSAP. Webflow, jQuery, remote font-loader, and tracking/form scripts are not executed by the application. Original CSS has not been pruned.

Browser QA fixed a dropdown conflict at narrow widths and a child-ID selector issue in the Home 2 marquee. Subsequent slider test failures were fixture/assertion problems, and targeted tests passed after their correction; no slider implementation changes were made for those failures.

## Verification and artifacts

Final typecheck, lint, asset verification, and production-build results are saved in `audit/qa/final-checks.json` and `audit/qa/*-final.log`. Asset verification also confirms that the source HTML hashes remain unchanged.

Existing browser logs, font proof, and before/reference/after screenshots are retained in `audit/qa/`. Before captures span 12 representative pages at four widths. The final after-comparison pass was stopped at the user’s request; no exhaustive visual sign-off is claimed. The source’s service-detail overflow near 1024px, external YouTube dependence, demo forms/authentication, and production metadata configuration remain documented limitations.

No deployment, push, or ONOS customization was performed.
