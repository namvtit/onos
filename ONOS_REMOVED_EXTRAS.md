# ONOS GLOBAL — AUDIT OF REMOVED TEMPLATE EXTRAS

> Complete record of all template-derived, unverified, fabricated, and extraneous elements removed during the ONOS Global content and business parity reconciliation pass.
> Date: 2026-10-29.

---

## 1. Overview

During the visual transplantation from Manufactt to ONOS Global, several placeholder template sections, fabricated business statistics, unverified guarantees, and demo industrial copy were introduced to fill template visual slots. In accordance with the project source-of-truth guidelines (`https://onosglobal.pages.dev/`), all unverified and fabricated elements have been cleanly removed while preserving Manufactt's visual design, grid geometry, and animations.

---

## 2. Inventory of Removed Elements

### 2.1. Unsupported Product Catalog Cards (`WhatWeManufacture.tsx`)
- **Reason for Removal**: The live ONOS source contains exactly four manufacturing capabilities (DTG, Computerised embroidery, Sublimation, Laser cutting) and four corresponding production fit methods. The separate product catalog introduced fabricated specifications:
  - Fabricated size ranges ("XS to 5XL sizing", "54-62cm adjustable headwear").
  - Fabricated tolerances ("Sub-millimeter cutting accuracy").
  - Unverified textile compositions ("100% Combed & Ring-Spun Cotton").
- **Resolution**: Removed the redundant product cards section completely. Capabilities are fully and authentically represented in the Services accordion and Production Finder without inventing product SKUs.

### 2.2. Newsletter Subscription Form & Confirmation (`Footer.tsx`)
- **Reason for Removal**: The original ONOS website does not have a newsletter program or list-building subscription flow. The template footer contained an email input form and simulated success/error states.
- **Resolution**: Removed the newsletter form, input field, submit button, and simulated submission containers (`w-form-done`, `w-form-fail`). Replaced with authentic ONOS brand lockup ("ONOS POD FULFILLMENT SOLUTION"), direct contact links, and official Onos Group company positioning.

### 2.3. Unverified Certifications & Turnaround Guarantees (`Services.tsx`)
- **Removed Items**:
  - `OEKO-TEX certified inks`: Unverified technical certification not claimed on the original site.
  - `Fast 2-4 day turnaround`: Unverified turnaround guarantee; lead times are quoted project-by-project.
  - `Tajima & Barudan multi-head lines`: Specific machine brand claims not found in ONOS source equipment listings.
  - `Sub-millimeter cutting accuracy`: Invented engineering tolerance.
- **Restored Authentic Information**:
  - Exact machine models: `SL-DTG-X2S`, `Equipment: multi-head embroidery`, `Epson SC-F11030 · heat press PD-1800D-800`, `Laser FW-1822 · auto cutter LP-2219`.
  - Authentic preparation requirements: Physical sample color approval, vector/stitch file review, material color testing, and custom cutting path specifications.

### 2.4. Dead Brochure and Spec Sheet Download Links (`About.tsx`)
- **Reason for Removal**: The template contained buttons referencing "Download Brochure" and "Download Spec Sheet" without corresponding real files in the repository.
- **Resolution**: Replaced with functional in-page anchors (`#capabilities`, `#network`) that directly navigate to verified manufacturing information.

### 2.5. Fake Testimonials, 5-Star Ratings & Fake Reviewers (`GalleryTestimonials.tsx`)
- **Reason for Removal**: The template testimonials featured fictitious customer quotes, simulated five-star rating SVGs, and generic executive titles.
- **Resolution**: Restored the authentic ONOS production gallery format with verified photographs, original captions (`Better, together.`, `The finishing touches.`, `Ideas you can hold.`, `Ready for the next order.`), and interactive lightbox enlargement with focus trapping and keyboard navigation.

### 2.6. Unverified Social Media Links (`Footer.tsx`)
- **Reason for Removal**: Generic links pointing to `https://www.facebook.com/`, `https://twitter.com/`, `https://www.instagram.com/`.
- **Resolution**: Removed placeholder social links. Added verified external link to parent organization Onos Group (`https://onosgroup.pages.dev/`).

### 2.7. Duplicate and Misleading Navigation Items (`Navbar.tsx` & `Footer.tsx`)
- **Removed Items**:
  - `#products` ("What we make"): Removed link to non-existent demo product catalog.
- **Restored Authentic Items**:
  - Added dedicated navigation anchor to `#ecosystem` ("Our ecosystem").
  - Verified all navbar anchors resolve to genuine visible sections: `#home`, `#about`, `#capabilities`, `#production-fit`, `#network`, `#workflow`, `#ecosystem`, `#faq`, `#contact`.

---

## 3. Summary of Cleanup

| Category | Items Removed | Authentic Replacement | Verification Status |
| :--- | :--- | :--- | :--- |
| **Product Catalog** | Fabricated size ranges, tolerances, redundant cards | Authentic Capabilities & Production Finder | Verified Clean |
| **Newsletter** | Form input, simulated submit, success/error containers | ONOS Brand Lockup & Direct Email Action | Verified Clean |
| **Certifications** | OEKO-TEX, 2-4 day turnaround, Tajima/Barudan | Verified machine models & sample approval | Verified Clean |
| **Downloads** | Spec sheet & brochure dead links | Direct in-page anchor navigation | Verified Clean |
| **Testimonials** | Fake 5-star ratings, fake client quotes | Authentic gallery photographs & lightbox | Verified Clean |
| **Social Links** | Generic Facebook/Twitter/Instagram placeholders | Official Onos Group corporate link | Verified Clean |
| **Navbar** | `#products` link | `#ecosystem` link, authentic 5-section core | Verified Clean |
