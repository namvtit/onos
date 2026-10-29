# ONOS GLOBAL SOURCE-TO-CODE PARITY MATRIX

> Complete audit comparing the LIVE original ONOS website (`https://onosglobal.pages.dev/` and `https://onosglobal.pages.dev/?lang=vi`) against the current Next.js implementation (`final/onos-manufactt-transplant`).
> Audit date: 2026-10-29.

---

## 1. Global Navigation & Header

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Skip Link** | "Skip to content" / "Đến nội dung chính" | None | `#main` | `src/components/OnosHome.tsx` | Present, links to `#main` | **EXACT** | Keep intact | Automated Playwright check |
| **Brand Logo** | ONOS GLOBAL brand logo linking to `#top` | `onos-wordmark.svg` | `#top` | `src/components/layout/Navbar.tsx` | Brand logo linking to `#home` | **EXACT** | Ensure smooth scroll to `#top` / `#home` | DOM inspection & click test |
| **Nav Links** | Capabilities, Our network, How we work, Our ecosystem, Contact | None | `#capabilities`, `#facilities`, `#process`, `#ecosystem`, `#contact` | `src/components/layout/Navbar.tsx` | Contains Home, About, Capabilities, What we make, Our network, FAQ, Contact | **PARTIAL / EXTRA** | Remove `#products` ("What we make"), add `#ecosystem`, ensure all anchors resolve | Navbar link audit script |
| **Language Switcher** | EN / VI toggle buttons, switches text and `data-vi` / `data-en` without page reload | None | In-page state | `src/components/interactions/SiteContext.tsx`, `Navbar.tsx` | Updates React context and translates content | **EXACT** | Verify all components consume `useSite().t()` | Bilingual toggle test |

---

## 2. Hero Section

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Pre-title Badge** | "ONOS GLOBAL / SẢN XUẤT THEO YÊU CẦU" / "ONOS GLOBAL / PRINT-ON-DEMAND" | Square dot icon | None | `src/components/sections/Hero.tsx` | Displays pre-section title | **EXACT** | Keep verified copy | Text comparison |
| **Hero Title** | "Innovating without limits. Elevating value." / "Sáng Tạo Không Ngừng. Nâng tầm giá trị." | None | None | `src/components/sections/Hero.tsx` | Matches title with gradient text | **EXACT** | Preserve typography and gradient | Visual inspection |
| **Hero Lead** | "A production partner for ambitious brands. Printing, embroidery and fulfillment, connected across Vietnam and the United States." | None | None | `src/components/sections/Hero.tsx` | Matches lead text | **EXACT** | Verify bilingual copy | Bilingual text check |
| **Primary CTA** | "Find your production fit ↗" / "Chọn công nghệ phù hợp ↗" | Arrow icon | `#production-fit` | `src/components/sections/Hero.tsx` | Primary button linking to `#production-fit` | **EXACT** | Preserve arrow hover micro-interaction | Interaction test |
| **Hero Media** | Multi-head embroidery machines producing garments at Onos | `embroidery-hero.webp` | None | `src/components/sections/HeroVideo.tsx` | Hero background video/image component | **EXACT** | Ensure image loaded with authentic alt text and lightbox | Media inspection |

---

## 3. Company Overview / About Section

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Overview Copy** | "Local expertise, backed by scale, focused on manufacturing excellence" / "Tay nghề địa phương, quy mô toàn cầu..." | None | None | `src/components/sections/About.tsx` | Matches headline and intro paragraph | **EXACT** | Retain verified text | Text comparison |
| **Network CTA** | "Explore Our Network" / "Khám phá mạng lưới" | Arrow icon | `#network` | `src/components/sections/About.tsx` | Links to `#network` | **EXACT** | Maintain hover effect | Anchor resolution test |
| **Verified Metrics** | 2019 founding year, 03 production plants, 02 connected countries | Circular cards, `onos-network-badge.svg` | None | `src/components/sections/About.tsx` | Displays 2019, 03 plants, 02 countries | **EXACT** | Remove any unverified ratings or statistics | Content verification script |
| **Unverified Spec Sheet Link** | None in original ONOS | None | None | `src/components/sections/About.tsx` | Contains download-link to `#capabilities` | **EXTRA** | Clean up into authentic secondary action | DOM audit |

---

## 4. Manufacturing Capabilities (P0 Priority)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Count of Capabilities** | Exactly 4 primary capabilities: DTG, Computerised embroidery, Sublimation, Laser cutting & engraving | 4 distinct photos | `#production-fit` | `src/components/sections/Services.tsx` | 4 accordion rows | **EXACT** | Retain exactly 4 rows | Count & heading assertion |
| **DTG Printing** | Direct-to-garment printing for photographs, gradients and detailed artwork on cotton and cotton-rich apparel. Machine: SL-DTG-X2S. Applications: T-shirts · Apparel. | `dtg-machine-detail.webp` | `#production-fit` | `Services.tsx` | Contains invented features: "OEKO-TEX certified inks", "Fast 2-4 day turnaround" | **WRONG / EXTRA** | Replace invented claims with authentic equipment and applications facts | Content gap test |
| **Computerised Embroidery** | Digitised designs and multi-head embroidery bring texture and a distinctive finish to your brand identity. Equipment: multi-head embroidery. Applications: Caps · Polos · Bags. | `equipment-embroidery.webp` | `#production-fit` | `Services.tsx` | Contains invented features: "Tajima & Barudan multi-head lines" | **PARTIAL** | Replace with authentic ONOS facts and equipment specifications | Content gap test |
| **Sublimation Printing** | All-over printing bonds colour into polyester fibres for expressive, full-coverage apparel and sportswear. Epson SC-F11030 · heat press PD-1800D-800. Applications: All-over print · Sportswear. | `press-machines-row.webp` | `#production-fit` | `Services.tsx` | Displays sublimation with generic bullet points | **PARTIAL** | Restore exact machine model and verified applications | Content gap test |
| **Laser Cutting & Engraving** | Precision cutting and engraving for personalised gifts and decor in wood, acrylic, leather and fabric. Laser FW-1822 · auto cutter LP-2219. Applications: Decor · Personalised gifts. | `laser-cut-gifts.webp` | `#production-fit` | `Services.tsx` | Contains invented claim: "Sub-millimeter cutting accuracy" | **WRONG** | Remove invented tolerances; restore exact verified materials and machine models | Content gap test |
| **Accordion Animation** | Smooth downward accordion expansion, arrow reveal, keyboard support | Arrow icons | None | `Services.tsx`, `interactions.css` | React state + CSS transitions | **EXACT** | Ensure keyboard accessibility (Enter/Space) and ARIA attributes | Keyboard interaction test |

---

## 5. Production Finder (P0 Priority)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **4 Methods Selection** | DTG, Embroidery, Sublimation, Laser cutting selectable tabs/buttons | Tab buttons | Tab switch | `src/components/sections/IndustryFinder.tsx` | 4 tabs with Manufactt styling | **EXACT** | Retain tab navigation | Tab click & state test |
| **Method 1: DTG** | Material: Cotton and cotton-rich apparel. Before production: Confirm fabric composition, garment colour, artwork size and placement. Approve colour on a physical sample. | `production-floor.webp` | Mailto draft with DTG context | `IndustryFinder.tsx` | Displays DTG info and enquiry button | **EXACT** | Ensure before-production requirements match source verbatim | Text comparison |
| **Method 2: Embroidery** | Material: Caps, polos and bags suitable for embroidery. Before production: Share the logo size and placement. Small lettering and fine details need review when digitising the stitch file. | `embroidery.webp` | Mailto draft with Embroidery context | `IndustryFinder.tsx` | Displays Embroidery info | **EXACT** | Ensure before-production requirements match source verbatim | Text comparison |
| **Method 3: Sublimation** | Material: Polyester apparel and sportswear suitable for sublimation. Before production: Confirm fabric composition, base colour, pattern layout and seams. Test colour on the intended material. | `press-machines-row.webp` | Mailto draft with Sublimation context | `IndustryFinder.tsx` | Displays Sublimation info | **EXACT** | Ensure before-production requirements match source verbatim | Text comparison |
| **Method 4: Laser** | Material: Wood, acrylic, leather or fabric confirmed as suitable by the team. Before production: Provide material type, thickness and cutting paths. Confirm the finish on a sample before approving the run. | `laser-cut-gifts.webp` | Mailto draft with Laser context | `IndustryFinder.tsx` | Displays Laser info | **EXACT** | Ensure before-production requirements match source verbatim | Text comparison |
| **Enquiry CTA Action** | Opens mailto with specific subject and pre-filled body including selected production method | Arrow icon | Mailto link | `IndustryFinder.tsx` | Generates `inquiryHref(language, method)` | **EXACT** | Verify exact URL encoding and prefilled subject/body | Mailto href test |

---

## 6. Factory Network (P0 Priority)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Facility Count** | Exactly THREE facilities: VN—01 Thai Nguyen, VN—02 Me Linh, US—01 California | Carousel slides | None | `src/components/sections/NetworkSlider.tsx` | Shows 3 slides mapping 1:1 to facilities, missing 4th photo | **WRONG / PARTIAL** | Decouple 4 carousel slides from 3 facilities. Ensure all 3 facilities and all 4 photos are fully accessible | Count & slide test |
| **Photo 1: Thai Nguyen Sewing** | Sewing floor at the Thai Nguyen plant / A skilled team at work / THAI NGUYEN / VIETNAM | `facility-thai-nguyen.webp` | None | `NetworkSlider.tsx` | Present | **EXACT** | Synchronize with VN—01 Thai Nguyen details | Slide inspection |
| **Photo 2: Me Linh Cutting** | Automated fabric cutting at the Me Linh plant / Automated fabric cutting / ME LINH / HANOI | `facility-me-linh.webp` | None | `NetworkSlider.tsx` | Present | **EXACT** | Synchronize with VN—02 Me Linh details | Slide inspection |
| **Photo 3: California Team** | Onos team discussing operations in California / Our California team at work / CALIFORNIA / UNITED STATES | `facility-california.webp` | None | `NetworkSlider.tsx` | Present | **EXACT** | Synchronize with US—01 California details | Slide inspection |
| **Photo 4: Thai Nguyen Conveyor** | Epson print production with an automated conveyor at Onos / Automated Epson conveyor line / THAI NGUYEN / VIETNAM | `production-floor.webp` | None | `NetworkSlider.tsx` | MISSING from carousel! | **MISSING** | Restore 4th carousel photo linked to VN—01 Thai Nguyen | Photo asset & slide test |
| **VN—01 Thai Nguyen Details** | Code: VN—01, Location: Dai Tu · Thai Nguyen · Vietnam, Role: High-volume production. Description: DTG, sublimation, embroidery and laser production, supported by a five-step quality control process. | Photos 1 & 4 | `#contact` | `NetworkSlider.tsx` | Present in slide text | **PARTIAL** | Ensure 5-step QC process is explicitly mentioned | Content check |
| **VN—02 Me Linh Details** | Code: VN—02, Location: Me Linh · Hanoi · Vietnam, Role: Sampling & coordination. Description: Sampling, production, final inspection and packing, with direct links to international carriers. | Photo 2 | `#contact` | `NetworkSlider.tsx` | Present in slide text | **EXACT** | Keep verified copy | Content check |
| **US—01 California Details** | Code: US—01, Location: California · United States, Role: US print & fulfillment. Description: DTG and DTF production for the North American market, operated by ONOS American Ventures Corp. | Photo 3 | `#contact` | `NetworkSlider.tsx` | Present in slide text | **EXACT** | Ensure ONOS American Ventures Corp is present. Never Florida. | Content check |
| **Slider Controls** | Previous / Next buttons, 4 photo dots, play/pause slideshow toggle, touch swipe & Arrow key support | Arrow & pause SVGs | In-slider navigation | `NetworkSlider.tsx` | Prev/Next only, lacks pause/play and 4 photo dots | **PARTIAL** | Add 4 photo dot indicators, pause/play toggle, touch swipe and keyboard listeners | Interaction test |

---

## 7. Unsupported Product Catalog (Phase 5)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Products Section** | NOT present in original ONOS (original has 4 capabilities & 4 finder methods, no separate product catalog) | Template SVGs / images | None | `src/components/sections/WhatWeManufacture.tsx` | Contains 3 cards with fabricated size ranges ("XS to 5XL sizing", "54-62cm adjustable"), invented tolerances | **EXTRA / FABRICATED** | Cleanly remove the unsupported product catalog section and associated navbar/footer links | Section presence check |

---

## 8. Workflow & Quality Control (Phase 9)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **4-Step Workflow** | 1. Share the idea, 2. Get it production-ready, 3. Make. Check. Finish., 4. On its way | `sample-development.webp` | None | `src/components/sections/WhyChoose.tsx` | Lists 4 steps with check icons | **EXACT** | Verify verbatim translations and distinguish from 5-step QC | Text check |
| **Workflow Image** | Team reviewing product samples and materials | `sample-development.webp` | None | `WhyChoose.tsx` | Uses `production-floor.webp` as background | **PARTIAL** | Integrate `sample-development.webp` matching authentic context | Media verification |
| **QC Distinction** | Factory 5-step QC process is distinct from the 4 customer-facing steps | None | None | In site copy | Mentioned in VN-01 description | **EXACT** | Ensure clarity across EN and VI | Text check |

---

## 9. Production Gallery (Phase 7)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Photo 1: Working Meeting** | The Onos team at a working meeting / Better, together. | `partner-meeting.webp` | Lightbox | `src/components/sections/GalleryTestimonials.tsx` | Present in tab strip & preview | **EXACT** | Lightbox modal verification | Lightbox test |
| **Photo 2: Finishing Table** | Printed garments organised at the finishing table / The finishing touches. | `finishing-table.webp` | Lightbox | `GalleryTestimonials.tsx` | Present in tab strip & preview | **EXACT** | Lightbox modal verification | Lightbox test |
| **Photo 3: Laser Gifts** | Personalised laser-cut wooden decor and gift products / Ideas you can hold. | `laser-cut-gifts.webp` | Lightbox | `GalleryTestimonials.tsx` | Present in tab strip & preview | **EXACT** | Lightbox modal verification | Lightbox test |
| **Photo 4: Garment Inventory** | Organised garment inventory at the Onos warehouse / Ready for the next order. | `warehouse-inventory.webp` | Lightbox | `GalleryTestimonials.tsx` | Present in tab strip & preview | **EXACT** | Lightbox modal verification | Lightbox test |
| **Lightbox Interactions** | Click to enlarge, prev/next arrows, Escape to close, focus trapped/restored | None | Modal dialog | `GalleryTestimonials.tsx` + `SiteRuntime.tsx` | Uses Webflow-style lightbox trigger | **PARTIAL** | Ensure full keyboard navigation (Escape, Left, Right) and focus return | Modal test |
| **Removed Extras** | No fake client testimonials, no fake reviewer names, no 5-star icons | None | None | `GalleryTestimonials.tsx` | Replaced with gallery captions | **EXACT** | Confirm 0 fake testimonials remain | DOM regex scan |

---

## 10. ONOS Ecosystem (Phase 8)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Ecosystem Section** | Dedicated section with 3 entities: Onos Global, OnosPOD, Onos Group | Symbols: ◒, ✳, ⊕ | External URLs | `src/components/sections/ContactEcosystem.tsx` (unrendered in `OnosHome.tsx`) | NOT rendered on homepage! Only marquee exists in `WhyChoose.tsx` | **MISSING FROM HOMEPAGE** | Mount dedicated Ecosystem section in `OnosHome.tsx` using Manufactt dark card styling | Section presence & link audit |
| **Entity 1: Onos Global** | Audience: FOR INTERNATIONAL BRANDS / Role: Manufacturing and fulfillment across borders. | Symbol ◒ | `https://onosglobal.pages.dev/` | `ContactEcosystem.tsx` / `data/onos-content.ts` | Configured with correct URL | **EXACT** | Render on homepage with target="_blank" | Link click test |
| **Entity 2: OnosPOD** | Audience: FOR VIETNAMESE SELLERS / Role: The production partner for your POD business. | Symbol ✳ | `https://onospod.pages.dev/` | `ContactEcosystem.tsx` / `data/onos-content.ts` | Configured with correct URL | **EXACT** | Render on homepage with target="_blank" | Link click test |
| **Entity 3: Onos Group** | Audience: THE PEOPLE BEHIND IT ALL / Role: Our company, our people and the next chapter. | Symbol ⊕ | `https://onosgroup.pages.dev/` | `ContactEcosystem.tsx` / `data/onos-content.ts` | Configured with correct URL | **EXACT** | Render on homepage with target="_blank" | Link click test |

---

## 11. FAQ Section (Phase 10)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Question 1: Small order** | Can I start with a small order? Yes. DTG and sublimation orders can start from a single unit. Custom blanks and made-to-measure uniforms have minimum quantities agreed for each project. | Plus/minus icon | Accordion expand | `src/components/sections/FAQSection.tsx` | Present, accordion toggle | **EXACT** | Verify exact bilingual wording | Text check |
| **Question 2: Artwork files** | What artwork files do you need? Send vector artwork (AI, EPS, SVG or PDF), or a transparent PNG at 300 DPI at the final print size. Our team checks the file before it moves into production. | Plus/minus icon | Accordion expand | `FAQSection.tsx` | Present, accordion toggle | **EXACT** | Verify exact bilingual wording | Text check |
| **Question 3: Approve sample** | Can we approve a sample first? Yes. Our Me Linh plant has a dedicated sampling line. For larger orders, we recommend agreeing a sample before the full production run. | Plus/minus icon | Accordion expand | `FAQSection.tsx` | Present, accordion toggle | **EXACT** | Verify exact bilingual wording | Text check |
| **Question 4: Pricing & lead time** | How do we confirm pricing and lead time? Share the product, design, expected quantity and shipping destination. We will review the production requirements and discuss pricing, timing and shipping with you before you proceed. | Plus/minus icon | Accordion expand | `FAQSection.tsx` | Present, accordion toggle | **EXACT** | Verify exact bilingual wording | Text check |

---

## 12. Contact & Project Inquiry (Phase 11)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Email** | `onospod.com@gmail.com` | None | `mailto:onospod.com@gmail.com` | `src/components/sections/ContactSection.tsx` | Configured and displayed | **EXACT** | Keep verified contact | Clickable link test |
| **Phone** | `+84 986 385 112` | None | `tel:+84986385112` | `ContactSection.tsx` | Configured and displayed | **EXACT** | Keep verified phone | Clickable link test |
| **Office Address** | 3rd floor, 705 Lac Long Quan, Tay Ho, Hanoi, Vietnam | None | None | `ContactSection.tsx` | Displayed verbatim | **EXACT** | Keep verified address | Text check |
| **Working Hours** | Mon–Fri: 7:30–17:30 · Sat: 8:00–17:00 (Vietnam time) | None | None | `ContactSection.tsx` | Displayed verbatim | **EXACT** | Keep verified hours | Text check |
| **Inquiry Email Action** | Opens email draft with template fields: Product, Expected quantity, Destination, Target date, Artwork link | Arrow icon | Mailto link | `ContactSection.tsx` | Form composes mailto draft | **EXACT** | Ensure no false claim of server submission; state clearly that email app opens | Form submit test |

---

## 13. Footer Section (Phases 11, 12, 13)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Newsletter Form** | NOT present in original ONOS | None | None | `src/components/layout/Footer.tsx` | Contains newsletter input, submit button and feedback messages | **EXTRA / UNRELATED** | REMOVE newsletter form and feedback containers completely | DOM inspection |
| **Brand Lockup** | ONOS POD FULFILLMENT SOLUTION linking to Onos Group | ONOS 3-color icon | `https://onosgroup.pages.dev/` | `Footer.tsx` | ONOS wordmark | **PARTIAL** | Link to `https://onosgroup.pages.dev/` with authentic lockup | Link test |
| **Copyright & Links** | © 2026 Onos Group. Links: Capabilities, Our ecosystem, Questions, Contact | None | In-page anchors | `Footer.tsx` | Contains demo links | **PARTIAL** | Align links strictly to authentic page sections | Anchor test |

---

## 14. Motion & Language System (Phases 14, 15)

| Item | Original Content / Behavior | Original Media Asset | Original Destination | Current Implementation | Current Behavior | Status | Required Fix | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Motion Toggle** | Floating pause/play motion button, respects `prefers-reduced-motion` | Pause / Play SVGs | None | `src/components/interactions/SiteContext.tsx` | Floating `MotionControl` button | **EXACT** | Ensure pause stops counter animations and carousel ticking | Motion test |
| **Bilingual Dictionary** | Full Vietnamese translations for 100% of visible texts, alt texts, and aria-labels | None | In-page state | `src/data/translations.ts` | Extensive dictionary | **PARTIAL** | Ensure every single element in all sections has verified Vietnamese translation | Missing translation scan |
