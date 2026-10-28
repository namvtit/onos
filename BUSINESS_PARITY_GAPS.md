# BUSINESS CONTENT & FUNCTIONAL PARITY AUDIT REPORT

**Audit Date:** 2026-10-29  
**Business Source of Truth:** https://onosglobal.pages.dev/  
**Current Implementation:** http://localhost:3000/  

---

## Executive Summary
This audit validates the accuracy of company data, product offerings, production parameters, manufacturing network locations, and interactive workflows against the official ONOS Global source of truth (`https://onosglobal.pages.dev/`).

---

## Business Parity Gap Inventory

### Gap BG-01: Company Metrics & Verified Statistics
- **Official ONOS Source:**
  - `03` Production plants
  - `02` Countries, connected (Vietnam & United States)
  - `50+` Production machines
  - `2019` The year we began
- **Current State:**
  - In `About.tsx` and `WhatWeManufacture.tsx`, some placeholder numbers from the template (e.g. `2005-2K25`, `20+ years`, `100+ clients`, `1 million+ components delivered`) were present or partially mapped.
- **Correction Required:**
  - Map genuine ONOS statistics strictly into the Manufactt metric slots:
    - Counter 1: `2019` ("The year we began")
    - Counter 2: `03` ("Production plants across Vietnam & USA")
    - Counter 3: `50+` ("Production machines & automated lines")
    - Counter 4: `02` ("Countries connected: Vietnam + United States")
  - Never fabricate ISO numbers, 99.9% on-time delivery guarantees, or fake client reviews.

---

### Gap BG-02: Production Capabilities & Machinery Specifications
- **Official ONOS Source:**
  1. **DTG Printing (01 / DTG):** Direct-to-garment printing for photographs, gradients, and detailed artwork on cotton and cotton-rich apparel. Equipment: `SL-DTG-X2S`. Products: T-shirts · Apparel.
  2. **Computerised Embroidery (02 / EMBROIDERY):** Digitised designs and multi-head embroidery bringing texture and distinctive finish. Equipment: Multi-head embroidery. Products: Caps · Polos · Bags.
  3. **Sublimation Printing (03 / SUBLIMATION):** All-over printing bonding colour into polyester fibres for expressive, full-coverage sportswear. Equipment: `Epson SC-F11030` + heat press `PD-1800D-800`. Products: All-over print · Sportswear.
  4. **Laser Cutting & Engraving (04 / LASER):** Precision cutting and engraving for personalised gifts and decor in wood, acrylic, leather, and fabric. Equipment: Laser `FW-1822` + auto cutter `LP-2219`. Products: Decor · Personalised gifts.
- **Current State:**
  - Capabilities are present but technical machinery references and material preparation specs need strict alignment in both English and Vietnamese translations.
- **Correction Required:**
  - Ensure all 4 capabilities, exact machinery names (`SL-DTG-X2S`, `Epson SC-F11030`, `PD-1800D-800`, `FW-1822`, `LP-2219`), and specific substrate suitability are prominently and accurately presented.

---

### Gap BG-03: Manufacturing Network & Facility Data
- **Official ONOS Source:**
  - Exactly 3 facilities across 2 countries:
    - **VN—01 (Thai Nguyen):** High-volume production. DTG, sublimation, embroidery and laser production, supported by a 5-step quality control process. Location: `Dai Tu · Thai Nguyen · Vietnam`.
    - **VN—02 (Me Linh):** Sampling & coordination. Sampling, production, final inspection and packing, with direct links to international carriers. Location: `Me Linh · Hanoi · Vietnam`.
    - **US—01 (California):** US print & fulfillment. DTG and DTF production for the North American market, operated by `ONOS American Ventures Corp`. Location: `California · United States`.
- **Current State:**
  - Current slider in `NetworkSlider.tsx` has the 3 facilities but needs verification of coordinates and operator details.
- **Correction Required:**
  - Lock facility identifiers strictly to `VN—01`, `VN—02`, and `US—01`. Maintain the exact scope of each plant.

---

### Gap BG-04: Production Fit Decision Matrix (Artwork & Pre-Production Rules)
- **Official ONOS Source:**
  - **DTG:** Confirm fabric composition, garment colour, artwork size and placement. Approve colour on a physical sample.
  - **Embroidery:** Vector artwork, digitized stitch file, thread color palette, backing stabilization.
  - **Sublimation:** High-resolution 300 DPI CMYK layout, seam bleed margins, polyester fiber content.
  - **Laser:** Hairline cut vectors, grayscale raster engraving, material density check.
- **Current State:**
  - Tab links in `IndustryFinder.tsx` switch methods, but pre-production preparation text was summarized.
- **Correction Required:**
  - Display the complete pre-production checklists directly inside the interactive tab panels in both EN and VI.

---

### Gap BG-05: Honest Form Feedback for Newsletter & Project Brief
- **Official Requirement:**
  - Newsletter opens `mailto:` draft. Feedback message must state:
    - EN: *"Your email app has been opened. Please send the prepared email to complete your subscription request."*
    - VI: *"Ứng dụng email đã được mở. Vui lòng gửi email đã soạn để hoàn tất yêu cầu đăng ký."*
  - Must NOT claim "submission has been received".
  - Gracefully handle cases where mailto handler fails or is blocked.
- **Current State:**
  - Verified implemented in commit `99e7e9e` on `Footer.tsx` and `ContactSection.tsx`.
- **Correction Required:**
  - Retain this honest feedback architecture while restoring full Manufactt visual and animation fidelity.
