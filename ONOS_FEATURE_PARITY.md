# ONOS feature parity

Sources inspected 2026-10-28: live https://onosglobal.pages.dev/ and `/vi/`, using Chromium; live source and scripts are preserved in `audit/final/reference/`. Manufactt supplies the visual system, never the old ONOS CSS. The initial content-mapping checkpoint is `8eddb6c`; final work is isolated on `final/onos-manufactt-transplant`.

This audit is the implementation contract. The final verification results are appended after testing.

| Feature | Original behavior / verified content and assets | Destination Manufactt component | Implementation approach | Verification criteria |
|---|---|---|---|---|
| EN / VI | Real language links; all copy and image alternatives translated; email drafts localized | Existing navbar and shared page components | React language context; English default; one URL; update document language, title and description | All sections, labels, FAQ, recommendations and draft switch without layout change |
| Anchor navbar | Capabilities, network, process, ecosystem, contact | Manufactt navbar / button | Local section anchors; native links | Every target exists; no demo links |
| Mobile menu | Toggle, link dismissal, outside click, Escape, desktop resize | Manufactt medium breakpoint menu | Accessible button, expanded state, focus restoration | Test at 375 / 768; keyboard and touch |
| Hero / meaningful CTAs | Find production fit, visit network, technique selection, discuss product, email brief, phone | Manufactt split hero and arrow buttons | Anchor links; capability links select finder method; verified mailto/tel | No dead or placeholder CTAs |
| About metrics | 3 plants, 2 countries, 50+ machines, 2019 | Manufactt circular about cards | Only original claims; source images | Four source metrics only |
| Four capabilities | DTG SL-DTG-X2S; multi-head embroidery; Epson SC-F11030 / PD-1800D-800; laser FW-1822 / LP-2219 | Manufactt service rows | Original descriptions, applications and machine information | All four match original in EN / VI |
| Production finder | Four tab choices + hidden native selector; corresponding material / application and preparation; contextual email | Manufactt industry tabs | Accessible tabs plus labeled selector; source-faithful recommendations; artwork guidance from source FAQ | Every method has correct material, preparation, application and mailto |
| Factory network | Thai Nguyen / Dai Tu production and 5-step QC; Me Linh sampling / inspection / packing / carriers; California DTG / DTF, ONOS American Ventures Corp. | Manufactt project/card grid | All three verified records, no invented street addresses | Complete copy and local images |
| Factory carousel | Four photographs (Thai Nguyen, Me Linh, California, Epson line); prev/next, dots, 5.2s autoplay, play/pause, touch and arrows | Manufactt image panel and slider controls | React carousel with in-view, hover, focus, background-tab, reduced-motion and global-pause guards | Wrap, direct selection, autoplay, pause, swipe, keyboard |
| Process | Share idea; production-ready; make/check/finish; shipping | Manufactt Home 2 four colored step rows | Retain four stages and full original descriptions | Four stages and genuine sampling photo |
| Gallery rail | Four original photos: meeting, finishing, laser gifts, warehouse; scroll buttons and keyboard | Manufactt product image cards | Horizontal responsive rail, native touch and directional controls | Scroll / swipe and image activation |
| Lightbox | Native modal, photograph/caption, close/Escape, opener focus restoration. Original does **not** advance photos with arrow keys | Manufactt media overlay | Preserve opening and closing; add required next/prev, arrow keys, explicit Tab / Shift+Tab trap and touch navigation | Next/prev wrap; Escape; backdrop; trap; restored focus; mobile |
| FAQ | Four original questions and answers; independently expandable native details | Manufactt accordion composition | Native details/summary, styled with template classes | Enter / Space, expanded state, both languages |
| Ecosystem | https://onosglobal.pages.dev/ ; https://onospod.pages.dev/ ; https://onosgroup.pages.dev/ | Manufactt cards and footer link columns | Exact verified external destinations, safe new tabs | Three links and original descriptions |
| Contact | onospod.com@gmail.com; +84 986 385 112; 3rd floor, 705 Lac Long Quan, Tay Ho, Hanoi; Mon–Fri 7:30–17:30, Sat 8:00–17:00 Vietnam time | Manufactt contact/footer | Semantic mailto, tel, address; localized labels | Exact verified values; no invented Sunday hours |
| Project inquiry | Email brief opens mail client with product, volume, destination, target date, artwork; finder includes selected technique and sampling/pricing/timing request | Manufactt arrow CTAs | Encoded localized mailto, no backend | Decode and verify subjects/bodies for both languages |
| Motion / hover | Reveals, counters, hover, reduced motion; persistent global motion pause | Manufactt reveal, count, button and image hover vocabulary | Template timing, local observer and persisted pause; honor OS reduction | Paused/reduced motion stops autoplay and animation; visible content remains |
| Accessibility extras | Skip link; translated alternatives; semantic regions | Navbar + page landmarks | Skip target; visible focus; native controls | Keyboard flow and translated accessible names |
| Responsive | Source mobile menu, rail swipe and stacked panels | Manufactt 991 / 767 / 479 breakpoints | Preserve template responsive philosophy | 375, 768, 1024, 1440: no overflow, no broken images |
| Genuine media | 15 source WebP files including source mobile hero variant | Manufactt hero, circles, services, finder, network, process, gallery | Local originals, responsive delivery, correct object-fit; no fabricated video | Hash/source provenance and successful browser decode |

No email, phone call, external message, deployment or push is performed during verification.

## Final comparison and verification

Final focused smoke: `npx playwright test --grep 'homepage smoke:'` — **1 passed (24.7s)**. Evidence: `audit/final/playwright-smoke.log` and `audit/final/playwright-results.json`. This was the only smoke run after the user's request to finish with focused verification.

| Original feature | Final result | Verification evidence |
|---|---|---|
| English / Vietnamese switching | Implemented; full copy and alternative text, language/title/description, controls and draft text switch; English default | Smoke + translation check: 170 checked strings, zero missing translations; initial bilingual browser tests passed |
| Anchor navigation | Implemented on the one page; all linked targets exist; original `#top` and `#facilities` fragments remain valid aliases | Smoke anchor audit; initial navigation test passed |
| Responsive mobile menu | Implemented including dismissal on outside click, Escape, link selection and desktop breakpoint | Smoke retested corrected outside-click target; initial test failure was the covered test target |
| All four manufacturing capabilities | Implemented, including original applications and named equipment | Smoke counts four rows; original copy in data module; initial bilingual tests passed |
| Interactive production finder | Implemented, four exact choices and corresponding source material/preparation; artwork guidance comes from the original FAQ | Smoke exercises all four; initial full recommendation comparison against live audit passed |
| Capability-to-finder CTAs | Implemented; matching method selection, anchor movement and focus | Smoke and initial finder test passed |
| Network and factory information | Implemented; all three plants and original descriptions, including California operator | Smoke counts three cards; initial original-content/bilingual checks passed |
| Factory previous/next and direct selection | Implemented; wraps, dots and captions | Smoke exercises controls; initial key/dot/wrap assertions passed before the malformed synthetic touch event |
| Factory autoplay / play / pause | Implemented at original 5.2-second interval; resumes after pointer-operated play; guarded by visibility, viewport, hover, keyboard focus and motion settings | Smoke verifies pause and resumed automatic advance; initial autoplay/persisted-pause/reduced-motion test passed |
| Factory keyboard and touch | Implemented; arrows, native buttons, swipe and live status | Initial keyboard assertions passed; smoke retests valid swipe events |
| Four-stage process | Implemented with all original descriptions and sampling photograph | Smoke counts four stages; initial translated content test passed |
| Production gallery and scroll controls | Implemented with all four original photographs; native horizontal/touch scrolling and directional controls | Initial gallery-rail test passed; smoke opens gallery |
| Fullscreen gallery modal | Implemented; next/previous wrap, close, caption, backdrop dismissal, mobile fitting | Initial gallery test passed; smoke tests desktop and mobile opening/closing |
| Gallery keyboard and focus | Required enhancement over original: arrow navigation plus Tab/Shift+Tab trap; native Escape and restored opener focus | Initial gallery test and final smoke passed |
| Gallery mobile swipe | Required enhancement implemented inside the same styled modal | Final smoke verifies swipe and translated content, then restores focus on close |
| FAQ | All four original questions/answers retained; independent native accordions | Initial FAQ keyboard/content test passed; smoke tests keyboard opening and source answer |
| Ecosystem | All three exact external URLs and original audience/descriptions retained | Initial destination test passed; smoke counts three cards |
| Email / phone / address / hours | Exact verified contact values retained; localized labels | Initial contact test passed; smoke verifies head office and localized draft |
| Prefilled inquiry flow | Original encoded subject/body fields retained in both languages, including selected-method draft | Initial draft tests and smoke passed; no message sent |
| Every meaningful CTA | Anchors, finder selection, gallery actions, mailto/tel and ecosystem links implemented; no placeholder links/forms | Initial destination test + smoke |
| Responsive behavior | Manufactt breakpoints retained; mobile panels/cards/menu/lightbox adapt | Initial 375/768/1440 bilingual tests passed; actual 1024 decoration overflow fixed; smoke rechecks all four widths |
| Animations and hover | Manufactt reveal/count-up/image/button patterns; persistent global pause and system reduced motion | Initial motion test passed; smoke verifies global pause; code applies pause to carousel and reveal/count-up |
| Skip link and accessible labels | Implemented with native controls, semantic landmarks and translated labels | Initial keyboard and bilingual tests; smoke focus checks |
| Genuine photography / local media | All 15 source files preserved (14 full-size photographs plus the mobile hero variant); images use local optimized delivery and object-fit | All 15 live SHA-256 checks match; local asset check has zero missing assets; initial responsive image-decode checks passed |
| Legacy URLs / removed demos | Relevant overview routes redirect to section anchors; obsolete demo pages return 404 | Initial targeted route test passed; production build contains `/` and internal not-found only |

Initial broad run: 10 passed, 3 failed. One was an actual 1024px decorative-layer overflow. The other two were test-input errors (missing Touch identifier and a click target behind the open menu). The final smoke specifically rechecked all three corrected cases. No exhaustive legacy-page testing was performed.

Deliberate differences required by the final architecture: language switching stays within `/` instead of publishing a separate `/vi/` page; `/vi` redirects to `/?lang=vi`. The hidden original native selector is presented as an accessible labeled selector alongside the styled tabs. The original single-image modal gains the requested multi-image navigation. No original business feature is knowingly omitted.
