# ONOS content in the Manufactt design

The final application uses the existing local Manufactt export. Its shared stylesheet (`public/assets/32f49076361a-manufactt-wbs.webflow.shared.edef070c1.min.css`) and font stylesheet are byte-identical to `restore/manufactt-baseline`. No ONOS backup CSS or layout is imported.

| Final section | Manufactt source composition | Adaptation |
|---|---|---|
| Navbar | `navbar`, `container-full`, `grid-nav`, `nav-link`, arrow CTA | Four ONOS anchors, EN/VI controls, accessible medium-breakpoint menu |
| Hero | `hero-section`, `grid-hero`, `hero-title`, gradient emphasis, bottom metadata strip | Original ONOS positioning and production-fit CTA; genuine embroidery photo occupies original full-width media container |
| About / metrics | `grid-about`, `about-info-inner`, circular `about-info-box` / `about-image-box` | Verified three plants, two countries, 50+ machines, 2019; genuine team and production photos |
| Capabilities | `service-info-link`, `service-info-inner`, `service-image-main`, `service-content-wrap`, orange arrow | Four original technologies with machine details; clicking a row selects the corresponding finder method |
| Production finder | `industry-tabs`, vertical `industry-tabs-menu`, `industry-tabs-pane`, split image/detail panel | Four accessible tabs and synchronized selector; faithful material, application, artwork and preparation guidance |
| Production network | Template full-width photography, slider arrows, editorial three-column cards | Four source factory photographs with controls; all three original facility descriptions |
| Process | Home 2 `step-main`, `step-info one/two/three/four` orange gradient rows | Four original stages, full descriptions and genuine sample-development photography |
| Gallery | Dark product section, `product-info-main`, `product-image-wrapper`, image treatment and arrow | Four original production photos in a scrollable rail; accessible modal within the same color and button system |
| Ecosystem | Template bordered card/grid vocabulary | Three verified ONOS destinations, audiences and original descriptions |
| FAQ | Template `accordion-heading` / `accordion-content`, two-column editorial composition | Four native keyboard-operable details/summary accordions with original answers |
| Contact | Template section heading, two-column contact composition, accent arrow button, grid/noise background | Verified contact details and localized prefilled mailto; explicit email-app disclosure |
| Footer | `footer`, `grid-footer`, link columns, `footer-bottom-wrap`, full-width wordmark | ONOS section links, ecosystem and verified contacts; no newsletter or demo/utility links |

Retained design foundations: Geist body and Mona Sans headings; original orange/charcoal/white/gray tokens; template containers and section spacing; dashed vertical lines and noise; rounded arrow buttons; image cropping; reveal/count-up and hover patterns. Responsive adaptations follow 991px, 767px and 479px template breakpoints. The decorative lines are clipped inside their own layer to avoid tablet overflow.

Relevant screenshots are in `audit/final/screenshots/`. Original QA screenshots and `raw-webflow/` remain untouched. The original site's content, scripts and bilingual behavior audit are in `audit/final/reference/`. Photography is locally served; all 15 original asset files match the live source SHA-256 checks in `audit/final/live-media-verification.json`.

Unused generated demo components and 476 unused application assets were removed after reference checking; the retained CSS dependencies, fonts, brand assets and original ONOS photographs remain. The removal inventory is `audit/final/pruned-assets.json`. Baseline/history, raw sources and source licensing records remain preserved. Existing licensing terms continue to apply; copying source assets does not create new rights.
