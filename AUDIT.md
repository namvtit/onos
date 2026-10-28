# Manufactt Webflow audit

Source: https://manufactt-wbs.webflow.io/ (checked 28 October 2026). The provided crawl is stamped 28 January 2026. `raw-webflow/` is the immutable migration source. Full source file hashes, page titles, sections, forms, widget counts, links, and external asset URLs are recorded in `audit/source-inventory.json`.

## Inventory

- 39 HTML files: 37 distinct routes plus two case-study pagination snapshots (pages 1 and 2). `robots.txt` is the only other local file. No CSS, JavaScript, SVG, images, fonts, or video files were included in the crawl.
- Main routes: `/`, `/home-2`, `/about`, `/services`, `/products`, `/case-studies`, `/blog`, `/faqs`, `/contact`, `/privacy-policy`, `/401`, `/404`.
- CMS pages: six `/service/*`, seven `/case-study/*`, eight `/blog/*`.
- Utility pages: `/utility-pages/style-guide`, `/utility-pages/licenses`, `/utility-pages/changelog`, `/utility-pages/instructions`.
- Pagination uses `a472e93b_page=1` and `a472e93b_page=2`; the crawler encoded the query into filenames and links.
- External references include one shared Webflow stylesheet (188,459 source bytes), jQuery 3.5.1, WebFont Loader, ten Webflow runtime/chunk files, and GSAP/ScrollTrigger 3.14.2 and 3.15.0. Every downloaded URL, local asset path, size, MIME type, and original checksum is in `audit/asset-manifest.json`. Counts and restoration results will be finalized in the migration report.

## Typography and responsive layout

- Exact Google Fonts requested by the source: **Mona Sans 400, 600, 700** and **Geist 400, 500**. They must be downloaded from the original provider and hosted locally, without substitution. The Webflow icon font is embedded as a data URL in the original CSS.
- Original layout media queries: max-width **991px**, **767px**, **479px**, min-width **1920px**; an additional Webflow lightbox rule uses min-width 768px.
- Interaction breakpoint ranges: desktop 992–10000px, tablet 768–991px, landscape phone 480–767px, portrait phone 0–479px.
- Preserve Webflow variables, grid node IDs, `w-variant-*` classes, DOM order, native image sizes/srcsets, and existing layout CSS. Tailwind must omit Preflight and use a prefix to avoid class collisions.

## Sections

The primary home page contains navbar; text hero; background video and founder quote; about and statistics; services; product specifications; industry tabs; case-study slider and client marquee; reasons to choose Manufactt; testimonial tabs; blog cards; footer and newsletter. Home 2 has an embedded alternate navbar, video hero, about, scrolling services, CTA, process steps, counters, product tabs, industries, testimonial slider, contact CTA, and footer. Other page section inventories are recorded per file in the source inventory.

## Interactions

The original Webflow IX2 configuration is embedded in `webflow.schunk.c1050d341df384dc.js`. It contains 275 events: 31 mouse-over, 24 mouse-out, 2 page-start, 8 first-click, 7 second-click, 197 scroll-into-view, 2 continuous scrolling, and 4 dropdown events. Original action lists and breakpoint definitions are extracted to `src/generated/interactions.json`; a readable index is in `audit/interactions-summary.json`.

Actions include opacity/reveal, size/accordion height, movement, scale, rotation, background color, and display changes. Other Webflow modules implement responsive navigation, hover/click dropdowns, industry/product/testimonial tabs, fade/slide carousels (including swipe), video controls, lightbox video, and forms. Inline GSAP code counts `.count` statistics on scroll with a stagger. These behaviors require local replacements; running the full Webflow runtime would reintroduce remote forms, badges, and unrelated platform dependencies.

## Broken paths and external dependencies

- All production styling and media are initially missing locally. Restore exact originals into `public/assets`; retain a manifest and report failures explicitly.
- Video `background-image` values contain a crawler-added site prefix and embedded quoted CDN URL. Repair using the exact `data-poster-url` on the parent video container.
- One CSS background URL contains escaped parentheses. URL collection must parse CSS escapes, otherwise it requests a truncated URL and gets HTTP 403. Download the full original URL rather than replacing the image.
- Brochure PDF and Open Graph image appear in links/metadata rather than `src`; include them in restoration.
- Relative HTML links need resolution against each source directory. Normalize `.html`, `index.html`, fragments, and encoded pagination queries into App Router paths.
- Social links are generic provider homepages in the source; retain them and record that they are placeholders. Telephone and email links are also demo content.
- Utility documents contain intentional external links to fonts, asset licenses, and Webflow documentation. Retain these editorial links. The about page video lightbox relies on an externally hosted YouTube video; document this dependency rather than inventing a local video.

## Required removals and limitations

Remove template promotional overlays (`.more-templates`, `.access-paas`), injected Webflow badges, Webflow/jQuery/WebFont script execution, Turnstile integration, external form/authentication actions, and platform form identifiers. Retain content branding and copy. Forms need native validation and honest local feedback, without claiming data was sent. The `/401` page is a visual demo, not an authentication system. A backend for email, newsletter, and authentication is outside the crawl.

The baseline should render original JSX and CSS first. Named components can then be extracted without adding layout wrappers. No CSS is to be deleted on speculative usage analysis. Visual identity must be assessed using browser comparisons at desktop, tablet, and phone widths; a successful build alone does not establish visual fidelity.
