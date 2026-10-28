# MISSING EFFECTS AND INTERACTIONS AUDIT REPORT

**Audit Date:** 2026-10-29  
**Reference Design:** https://manufactt-wbs.webflow.io/  
**Current Implementation:** http://localhost:3000/  
**Source Interaction Engine:** `src/lib/source-animations.ts` & `src/generated/interactions.json`

---

## Executive Summary
The Webflow IX2 interaction system extracted from the original Manufactt website depends on strict three-part coordination:
1. **Interaction Triggers (`data-w-id`):** DOM elements must declare exact Webflow interaction GUIDs.
2. **Initial Transform State CSS:** Pre-animation transforms and opacity must be defined before GSAP/Webflow initializes to avoid layout shifts and enable tweens.
3. **GSAP Runtime Binding:** `SiteRuntime.tsx` + `mountSourceAnimations()` porting 275 events and 53 action lists.

The forensics scan revealed that **37 `data-w-id` bindings were stripped or omitted** across the Next.js components, effectively **disabling 29 high-priority animations and interactive effects**, leaving the current page feeling static, lifeless, and visually disjointed.

---

## Detailed Missing Effects Inventory

### Effect FX-01: Primary Button Text Roll & Dual Arrow Slide
- **Reference Behavior:**
  - On cursor enter (`mouseenter` / `MOUSE_OVER`), `.button-text` translates `y: 0% -> -100%` while `.button-hover-text` translates `y: 100% -> -100%`.
  - Concurrently, the primary arrow `.button-icon` slides right `x: 0 -> 30px`, while the secondary arrow `.button-icon-hover` slides from `x: -30px -> 0px`.
  - On cursor leave (`mouseleave` / `MOUSE_OUT`), both smoothly reset.
- **Current Behavior:**
  - Buttons are completely static or flicker instantly due to `.button-icon { display: block } / :hover { display: none }` hacks in `onos.css`. The rolling text effect never executes.
- **Root Cause & Trigger IDs:**
  - Missing trigger `data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"` on buttons in `Navbar.tsx`, `Hero.tsx`, `About.tsx`, `Services.tsx`.
  - Missing action bindings `a-21` (Hover [In]) and `a-22` (Hover [Out]).
- **Proposed Fix:** Re-add `data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"` to all primary buttons and remove CSS display overrides from `onos.css`.

---

### Effect FX-02: Service Row Arrow Slide & Image Scale on Hover
- **Reference Behavior:**
  - Hovering any service row triggers action `a-38`: the arrow `.service-icon-01` slides out `x: 0 -> 30px`, `.service-hover-icon` slides in `x: -30px -> 0px`, and the service thumbnail image zooms/scales subtly.
  - Hover out triggers `a-39`, smoothly restoring the default state.
- **Current Behavior:**
  - Service rows have no hover motion. Arrows remain frozen in place.
- **Root Cause & Trigger IDs:**
  - Missing IDs on service arrows and images in `Services.tsx`:
    - Row 1: `d4d290b2-cf1f-2b7c-1c15-7a88dddc2d17` (image), `6c3d66a0-b420-e0a5-aade-cb7ede5a2f49` (arrow 1), `1b0d8c68-7925-4e4c-b357-5d041e365520` (arrow 2).
    - Row 2: `77cde797-b601-13a8-b976-f135a003b6a3` (image), `77cde797-b601-13a8-b976-f135a003b6b7` (arrow 1), `77cde797-b601-13a8-b976-f135a003b6b8` (arrow 2).
    - Row 3: `fd6444eb-66fc-2dbd-3d3a-042d56ad9114` (image), `fd6444eb-66fc-2dbd-3d3a-042d56ad9128` (arrow 1), `fd6444eb-66fc-2dbd-3d3a-042d56ad9129` (arrow 2).
    - Row 4: `ea75087c-806d-fa5f-23d1-e85b71fbeb59` (image), `ea75087c-806d-fa5f-23d1-e85b71fbeb6d` (arrow 1), `ea75087c-806d-fa5f-23d1-e85b71fbeb6e` (arrow 2).
- **Proposed Fix:** Re-insert all baseline `data-w-id` attributes on arrows and images in `Services.tsx`.

---

### Effect FX-03: Staggered `slideInBottom` Scroll Entrance on Product Cards
- **Reference Behavior:**
  - As the user scrolls into the `.product-section`, the counter header (`5dc285f3-2c1b-5d8e-a87b-8fc080957d58`) and the 8 product cards animate upward from `y: 40px` with staggered opacity `0 -> 1`.
- **Current Behavior:**
  - Elements render immediately with static opacity `1` without any scroll entrance transition.
- **Root Cause & Trigger IDs:**
  - Product cards omitted initial style `style={{ opacity: 0 }}` and cards 5-8 (`b1ef9828-72eb-84fa-b442-e2f6281f5c8c`, `b1ef9828-72eb-84fa-b442-e2f6281f5c96`) lost their trigger associations.
- **Proposed Fix:** Restore `style={{ opacity: 0 }}` and verify `mountSourceAnimations` attaches ScrollTrigger triggers properly.

---

### Effect FX-04: Central About Photo `growIn` Entrance Animation
- **Reference Behavior:**
  - As the user reaches `.about-section`, the central photo box `.about-image-box` scales up from `0.8 -> 1.0` while fading in (`growIn` action).
- **Current Behavior:**
  - Central photo renders statically without the signature pop.
- **Root Cause & Trigger IDs:**
  - Missing trigger `data-w-id="2b6ca78d-f30a-dcb3-72dd-ee239194fdde"` and initial transform styles on `.about-image-box` in `src/components/sections/About.tsx`.
- **Proposed Fix:** Re-add `data-w-id="2b6ca78d-f30a-dcb3-72dd-ee239194fdde"` and initial opacity/transform in `About.tsx`.

---

### Effect FX-05: Case Studies / Network Slider Card Hover Zoom
- **Reference Behavior:**
  - Hovering over slider cards triggers action `a-38` on `.case-study-info-right`: the card image zooms smoothly and the title badge shifts.
- **Current Behavior:**
  - Cards in `NetworkSlider.tsx` do not respond to hover with the smooth Webflow scale transform.
- **Root Cause & Trigger IDs:**
  - Missing trigger IDs `8acda32a-e4ec-bc3a-243e-32b1eadb1dc1`, `6bffbb23-d411-347f-db2d-076268f89e48`, `e41d84f7-eb50-c101-59a2-4cd8c62f3064`, `29aa1c23-697a-a5b6-b178-a0342072fe9f`, `2f849f1b-3676-ed33-20c8-0819c11eb78c` on the card action anchors.
- **Proposed Fix:** Re-insert the baseline card action IDs and initial styles into `NetworkSlider.tsx`.

---

### Effect FX-06: Production Finder Tab Transitions (`growIn`)
- **Reference Behavior:**
  - Clicking tabs in `.industry-section` smoothly transitions the active background photography with `growIn` scale and fade effects.
- **Current Behavior:**
  - Tab image changes happen via sudden DOM swaps without the continuous Webflow scale transition.
- **Root Cause & Trigger IDs:**
  - Missing IDs: `68a88700-03b2-b1ae-401e-bd7fd327a74c`, `bb1d146f-3020-9314-d86a-8b5d20f602bd`, `ec80440d-ee55-273b-2ae9-ce265c3afa17`, `17719652-441a-8e4d-6709-ab16c3504a7d`, `67adcfec-de99-018d-1042-48952abe5b3f`.
- **Proposed Fix:** Restore the baseline tab image structure and data-w-ids in `IndustryFinder.tsx`.

---

### Effect FX-07: Numeric Counter GSAP ScrollTrigger
- **Reference Behavior:**
  - Counters (`.count[data-target]`) count up dynamically from `0` to their respective targets (`20+`, `100+`, `1 million+`, `50,000+`) when scrolled into view.
- **Current Behavior:**
  - Counters either display raw numbers statically or fail to re-trigger on language switch.
- **Root Cause & Trigger IDs:**
  - `data-target` attributes were inconsistently named (`data-count` vs `data-target`) in `WhatWeManufacture.tsx` and `About.tsx`.
- **Proposed Fix:** Standardize all counters to `data-target` and ensure `mountSourceAnimations` initializes GSAP counters on mount.
