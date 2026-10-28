# VISUAL DEFECTS AUDIT REPORT

**Audit Date:** 2026-10-29  
**Reference Design:** https://manufactt-wbs.webflow.io/ (Manufactt Webflow HTML Template)  
**Current Implementation:** http://localhost:3000/ (`final/onos-manufactt-transplant`)  
**Baseline Git Tag:** `manufactt-baseline` (`raw-webflow/index.html`)

---

## Executive Summary
A comprehensive cross-viewport browser forensics audit (at 1440px desktop, 1024px tablet, and 375px mobile) was performed comparing the live Webflow reference against the current Next.js implementation. The audit uncovered critical structural, dimensional, and aesthetic deviations that explain why the user visually rejected the current state:
1. **Navbar Geometry & Distortion:** Local navbar is bloated to 118.8px height (template is 95.4px) due to vertically stacked `.nav-dot` SVGs and padding inflation.
2. **Card Proportions & Asymmetric Heights:** Product cards measure 936px tall (template is 506.25px), nearly double the reference height, due to unconstrained photography aspect ratios. Service cards in row 2 and 3 balloon to 384px and 619.8px (template is uniform 311.9px).
3. **Missing Background Composition:** Ambient glow vector layers (`.bg-shadow`, `.bg-vector`, `.noise-overlay`) and Webflow section line grids (`.line-wrapper` with 5 vertical separator lines) are either unrendered, mislayered, or detached from section containers.
4. **Hero Bottom Coordinates & Alignment:** In the baseline Hero, the bottom info bar aligns 3 elements across the grid: "Based in: Los Angeles, USA" / "SCROLL DOWN" / geographic coordinates. The current rebuild altered this layout and lacks the entrance opacity triggers.
5. **Section Gutters & Spacing Inflation:** Overall page length is substantially distorted (`Services` is +383px, `Products` is +430px, `Why Choose` is +140px), breaking the original Manufactt visual rhythm and breathing room.

---

## Defect Inventory

### Defect VD-01: Navbar Height Inflation and Nav-Dot Vertical Stacking
- **Reference Behavior (`https://manufactt-wbs.webflow.io/`):**
  - Navbar total height is precisely `95.4px` (container `59.4px` + padding `18px` top/bottom).
  - Nav links (`.nav-link`) contain clean text only (`height: 23.4px`), horizontally aligned in flex row with zero vertical overflow.
  - No `.nav-dot` element exists on the primary navbar.
- **Current Behavior (`localhost:3000`):**
  - Navbar total height is `118.8px` (+23.4px higher, visually bulky and encroaching on the hero section).
  - Each `.nav-link` has an injected `<img src="...Nav-Hover-Dot.svg" className="nav-dot" />` stacked above the text, inflating link height to `46.8px` and `.nav-menu` to `82.8px`.
- **Exact Files & Lines:**
  - `src/components/layout/Navbar.tsx`: Lines 48-132 (`.nav-dot` elements injected inside every `<a className="nav-link">`).
  - `src/components/layout/Navbar.tsx`: Line 155 (`className="nav-button"` instead of baseline `.nav-button-wrap`).
- **Impact:** Distorts top header proportions, misaligns the brand wordmark relative to CTA, and causes noticeable jump when scrolling.
- **Proposed Fix:** Remove the injected `.nav-dot` elements from `Navbar.tsx` to match baseline `Navbar5de3fbdae5` in `manufactt-baseline:src/components/SiteChrome.tsx`. Restore `.nav-button-wrap` and exact baseline flex alignment.

---

### Defect VD-02: Product Card Dimensional Distortion (Nearly 2x Height Inflation)
- **Reference Behavior (`https://manufactt-wbs.webflow.io/`):**
  - All 8 product cards in `.grid-products` have a locked, uniform height of `506.25px`.
  - Grid columns are strictly `4 x 323.75px` with `15px` gutters.
  - Images inside `.product-image-wrapper` have fixed height constraints (`height: 180px; object-fit: contain`) so descriptions and specification lists align horizontally across all 4 cards in each row.
- **Current Behavior (`localhost:3000`):**
  - Product cards balloon to `936.1px` height (+429.85px taller than template!).
  - Unconstrained image wrappers cause huge vertical variations (card 1 image: 165px, card 2: 211px, card 3: 376px).
  - Descriptions and specification lists are completely misaligned between adjacent columns.
- **Exact Files & Lines:**
  - `src/components/sections/WhatWeManufacture.tsx`: Lines 63-280 (Card items missing baseline aspect ratio & max-height styles).
  - `src/app/globals.css` / `src/app/onos.css`: Missing baseline `.product-image-wrapper` and `.product-image` dimensional rules.
- **Impact:** Destroys the tight, industrial aesthetic of the Manufactt product showcase. Cards feel loose, stretched, and unpolished.
- **Proposed Fix:** Reinstate baseline card image container styles (`.product-image-wrapper` with fixed height `180px`, `display: flex; align-items: center; justify-content: center; overflow: hidden`), ensuring `.product-info-main` height strictly conforms to `506.25px` across all cards.

---

### Defect VD-03: Service Row Height Discrepancy & Jagged Layout
- **Reference Behavior (`https://manufactt-wbs.webflow.io/`):**
  - Service rows 1, 2, and 3 have an exact uniform height of `311.9px`. Row 4 has height `268.0px`.
  - The preview photography wrapper `.service-image-wrap` has a strictly defined width and aspect ratio (`width: 320px; height: 230.9px; overflow: hidden; border-radius: 8px`).
  - Feature lists (`.service-feature-list`) align seamlessly with the thumbnail and title.
- **Current Behavior (`localhost:3000`):**
  - Row 1: `317.5px`.
  - Row 2: `384.0px` (+72.1px too tall).
  - Row 3: `619.8px` (+307.9px too tall, nearly double!).
  - Row 4: `268.0px`.
- **Exact Files & Lines:**
  - `src/components/sections/Services.tsx`: Lines 80-450.
  - Image tags in row 2 (Embroidery) and row 3 (Sublimation) expand vertically according to raw image intrinsic dimensions instead of conforming to `.service-image-wrap`.
- **Impact:** Severe visual jank. The service section appears lopsided and amateurish, with massive whitespace gaps in row 3.
- **Proposed Fix:** Re-bind `.service-image-wrap` with baseline CSS (`overflow: hidden; height: 230.9px; width: 320px`) and ensure `object-fit: cover` with proper aspect ratio is enforced.

---

### Defect VD-04: Section Line Grid (`.line-wrapper`) Missing or Misaligned
- **Reference Behavior (`https://manufactt-wbs.webflow.io/`):**
  - Each major section (`.hero-section`, `.about-section`, `.service-section`, `.case-study-section`, `.footer`) contains a `.line-wrapper` with 5 vertical lines (`.section-line.border-grey-1`) absolutely positioned across the 1340px grid container.
  - This provides the iconic Manufactt architectural grid watermark throughout the entire page.
- **Current Behavior (`localhost:3000`):**
  - Some modular section components omit `.line-wrapper` or place it outside container coordinate spaces, causing lines to misalign with column boundaries or disappear entirely behind backgrounds.
- **Exact Files & Lines:**
  - `src/components/sections/Hero.tsx`: Missing line wrappers or improperly placed relative to `noise-overlay`.
  - `src/components/sections/IndustryFinder.tsx`: Missing `.line-wrapper`.
  - `src/components/sections/ContactSection.tsx`: Missing `.line-wrapper`.
- **Impact:** Loses the distinct high-end architectural identity of the Manufactt template.
- **Proposed Fix:** Restore the baseline 5-line `.line-wrapper` in every corresponding section component, styled with `border-color: var(--color--grey-1)`.

---

### Defect VD-05: About Section Circular Metric Coordinates and Central Image Sizing
- **Reference Behavior (`https://manufactt-wbs.webflow.io/`):**
  - Section height is `1165px`.
  - Central photo box `.about-image-box` is centered between metric cards with `data-w-id="2b6ca78d-f30a-dcb3-72dd-ee239194fdde"` and smooth `growIn` animation.
  - Central connector vector `Group.png` connects the metric boxes with central alignment.
- **Current Behavior (`localhost:3000`):**
  - Height is `1141px` with uneven margins.
  - Metric cards shift vertically, creating an awkward gap on the right card (`box-bg-dark`).
- **Exact Files & Lines:**
  - `src/components/sections/About.tsx`: Lines 120-220.
- **Impact:** Metric boxes feel unanchored; the graphic relationship between the center photo and the surrounding cards is broken.
- **Proposed Fix:** Revert container hierarchy to match `HomeSections.tsx:L180-L320` from `manufactt-baseline`.

---

### Defect VD-06: Crude CSS Overrides in `onos.css` Breaking Button Transitions
- **Reference Behavior (`https://manufactt-wbs.webflow.io/`):**
  - Primary button hover operates via transform translations: `.button-text` moves up from `0%` to `-100%`, while `.button-hover-text` moves from `100%` to `-100%` (smooth infinite loop or slide).
  - Arrow icon `.button-icon` slides right `30px`, while `.button-icon-hover` slides in from `-30px` to `0px`.
- **Current Behavior (`localhost:3000`):**
  - `onos.css` added:
    ```css
    .primary-button .button-icon { display: block; }
    .primary-button .button-icon-hover { display: none; }
    .primary-button:hover .button-icon { display: none; }
    .primary-button:hover .button-icon-hover { display: block; }
    ```
  - This abrupt `display: none / block` toggle bypasses GSAP, kills the slide transition, and creates an instant jarring flicker.
- **Exact Files & Lines:**
  - `src/app/onos.css`: Lines 116-128.
- **Impact:** Destroys one of the most prominent micro-interactions of the Manufactt template.
- **Proposed Fix:** Delete the crude `display` toggles in `onos.css`. Restore `data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"` to all primary buttons and allow GSAP actions `a-21` and `a-22` to animate transforms cleanly.
