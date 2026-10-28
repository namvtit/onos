# Final Manufactt → ONOS mapping report

Completed locally on `restore/manufactt-baseline`. ONOS business content and source photography now occupy the original Manufactt page templates. No redesign or one-page rebuild was performed.

## Content mapped

- Homepage and Home 2: ONOS apparel production and fulfillment positioning, company story, capabilities, apparel/merchandise categories, verified metrics, production imagery, RFQ copy and contact information.
- About: the 2019 company story, Thai Nguyen / Me Linh / California network, ONOS American Ventures Corp. and verified ecosystem links. Existing people-card slots use network and production information.
- Services: six original detail routes now describe DTG printing, sublimation, embroidery, laser cutting/engraving, apparel fulfillment and sampling/quality control. Existing feature, table, workflow and FAQ structures remain.
- Products: cotton T-shirts, all-over apparel, polyester sportswear, embroidered polos/caps/bags, personalized laser-cut gifts and decor. Photos illustrate production/categories; no invented SKUs or prices.
- Projects and articles: seven project templates show source-based production applications; eight article templates show individual production guides. No fabricated customers, outcomes, technical specifications or publication dates.
- Testimonials: original tabs/slides and author slots remain, with explicit content-review placeholders. No fabricated endorsements or customer ratings.
- Contact and footer: verified email, phone, headquarters, hours and ecosystem links. Forms retain native validation and honest demo feedback; RFQ links use the verified email address.
- Metadata: ONOS titles, descriptions, local social images and favicon. Legacy service/project/article slugs remain functional and are noindex; utility/legal routes remain available and identified for review.

Business source: https://onosglobal.pages.dev/, captured on 28 October 2026. All 15 downloaded image files match their counterparts in `backup/onos-before-manufactt-restore-20261028`. Only business copy and media from the backup were reused.

## Design preservation

The design-lock verification compares the final JSX against `b85079d329df16414d1ed2bf6810f521290e4a05` across 42 page/shared-component files. Element hierarchy, component boundaries, classes, animation identifiers and non-content attributes remain unchanged.

- All four original CSS files are unchanged, including global CSS, the Webflow stylesheet, fonts and interaction CSS.
- Original section order, grids, spacing rules, fonts, colors, breakpoints, navbar/footer structures and animation/runtime files are unchanged.
- All 302 original assets and all 444 raw Webflow/original QA files are unchanged.
- All 39 original route entries, including case-study pagination variants, remain functional.
- New photographs use 196 crops/resizes matching the original image-slot proportions and responsive width descriptors. Decorative shadows, line artwork, noise and controls remain.
- Background-photo URLs are overridden on the existing elements, retaining the original gradients and opacity. No stylesheet is edited.
- Original video and iframe elements retain their controls. A silent nine-second reel uses three genuine ONOS still photographs; it is a photo derivative, not claimed factory footage.

The baseline remains at `b85079d329df16414d1ed2bf6810f521290e4a05`. The backup branch remains at `c0010d5ca2f2993f9c3cb2378eb0ff0037c43709`.

## Verification

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run verify:assets` | Passed — 273 references; no missing assets, broken internal links, external media dependencies or changed raw sources |
| `npm run build` | Passed |
| Existing Playwright suite | All 16 tests passed; assertions updated for ONOS copy, verified quote links and local photo media |
| `node scripts/verify-content-mapping.mjs` | Passed — no structural, stylesheet, original-asset, source-file or media-hash failures |
| Business-content scan | 39 route entries checked; no unrelated industrial copy, demo contact details or generic social-profile links on active business pages |
| Limited visual review | Homepage at 1440px and 375px, plus About/Services/Products/Contact desktop views; original layout and ONOS media checked |
| Responsive behavior | No homepage horizontal overflow at checked sizes; navigation, tabs, sliders, accordions, lightboxes, video controls, fonts and animations pass the existing tests |

The original 16 test cases and interaction coverage remain. Content-specific assertions now target ONOS labels; the unsupported demo brochure is replaced by a verified RFQ link. No exhaustive pixel-perfect QA was performed.

## Remaining gaps

Approved testimonials, customer case studies, employee profiles, product catalog assets, official vector brand files, ONOS video footage and approved legal copy remain unavailable. Forms/newsletter have no submission backend and clearly say so. The existing `metadataBase` build warning and previously documented baseline limitations remain. Details are in `ONOS_CONTENT_GAPS.md`.

## Deliverables and evidence

- `MANUFACTT_ONOS_MAPPING.md`: route/section mapping, per-route ONOS titles and lead media, source facts and media treatment.
- `ONOS_CONTENT_GAPS.md`: missing evidence, assets and backend details.
- `audit/content-mapping/`: source snapshot, exact image mappings, source/crop/reel provenance and hashes, design-lock results, build/check logs, Playwright JSON/log and limited-review screenshots.
- `scripts/verify-content-mapping.mjs`: repeatable baseline/design/media preservation check.

Changes remain uncommitted in the working tree. No push, deployment, merge, branch reset, email or external form submission was performed. Work stopped after content mapping and verification.
