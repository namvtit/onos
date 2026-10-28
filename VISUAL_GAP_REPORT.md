# Visual Gap Report: Manufactt Webflow vs. Current ONOS Implementation

**Date:** October 28, 2026  
**Audited Targets:**
1. **Original Manufactt Reference:** `https://manufactt-wbs.webflow.io/` (and local `./raw-webflow/index.html`, git tag `manufactt-baseline`)
2. **Current Local Implementation:** Commit `4050b54` at `http://localhost:3000/`
3. **ONOS Business Content Source:** `https://onosglobal.pages.dev/`

---

## Executive Summary

The previous implementation (commit `4050b54`) attempted to integrate ONOS content by creating custom, hand-crafted React components (`Introduction.tsx`, `Capabilities.tsx`, `NetworkProcess.tsx`, `ContactEcosystem.tsx`, `Primitives.tsx`) and an overriding stylesheet (`onos.css`). 

In doing so, it deleted the original baseline JSX DOM and CSS class structure from `manufactt-baseline`, resulting in severe visual degradation:
1. **Broken Visual Identity & Composition:** Key signature design elements of the Manufactt template (the glowing dark Product section, circular About metrics cards, avatar stacks, interactive Industry tabs, Case Study slider cards, honeycomb CTA banners, and ambient glow Footer) were either deleted or replaced with rudimentary custom cards.
2. **Layout & Typography Deviations:** Heading accent gradients (`.text-linear-gradient`) were stripped or misapplied, button arrow icons were changed to diagonal arrows (`↗`) instead of the template's signature boxed horizontal arrows (`→`), and counter animations failed (displaying static `00`).
3. **Artifacts & Broken Overlays:** A "Skip to content" black box was permanently positioned over the header, covering the ONOS brand logo. An injected noise overlay texture was erroneously rendered at high opacity across sections.
4. **Failure to Use Template Slots:** Rather than fitting ONOS business copy and photography into Manufactt's existing layout containers, cards, and grids, the layout was rewritten from scratch.

---

## Detailed Section-by-Section Forensic Audit

### 1. Header / Navbar
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Geometry** | Height 95.4px, fixed/sticky container, 1440px max grid | Custom `.onos-navbar` header | Height roughly similar but DOM hierarchy altered |
| **Branding** | Left-aligned bold MANUFACTT logo with registered symbol | ONOS logo SVG | **Critical:** Obscured by overlapping black `.onos-skip-link` box |
| **Menu Items** | "Home", "About", "Pages ⌵", "Services", "Contact" with orange square dot on active item | "Capabilities", "Our Network", "How We Work", "Our Ecosystem" | No active dot indicator; anchor links lack Webflow classes (`.w-nav-link`) |
| **CTA Button** | Orange pill button (`#c5380c`) with dark square icon box containing horizontal right arrow (`→`) | Orange pill button with dark square icon containing diagonal up-arrow (`↗`) | Wrong arrow glyph and font styling |
| **Language Switch** | None (single language demo) | "EN / VI" buttons crammed next to CTA button | Poorly integrated; lacks template styling |
| **Mobile (375px)** | Clean hamburger menu toggle (`.w-nav-button`) with animated dropdown drawer | Custom mobile nav | Breaks Webflow drawer animations and layout |

---

### 2. Hero Section
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **DOM Hierarchy** | `.hero-section.section-spacing-top` > `.container-full` > `.hero-wrap` > `.grid-hero` | Custom JSX recreating parts of grid | Hand-rolled structure |
| **Pill Badge** | Rounded white badge with small orange square: `▪ Trusted Manufacturing Partner` | Rounded white badge: `▪ ONOS GLOBAL / PRINT-ON-DEMAND` | Correctly formatted, text fits |
| **Main H1** | "From raw <span class='text-linear-gradient'>material</span> to market-ready" (Mona Sans 72px / 79.2px) | "Innovating without limits. <span class='text-linear-gradient'>Elevating value.</span>" | Awkward two-line break; font size scaling differs |
| **Right Content** | `// SINCE - 2005 //` mono subhead + 3-line description + Black button with orange arrow | `// VIETNAM + UNITED STATES //` + description + Black button | Arrow is diagonal (`↗`) instead of template horizontal (`→`) |
| **Hero Bottom Bar** | 3-column grid: `Based in: Los Angeles, USA` (left), `SCROLL DOWN` link (center), coordinates (right) | `Vietnam ↔ USA` (left), `Step inside Onos ↓` (center), `Founded in 2019` (right) | Center link has inline arrow and lacks Manufactt link hover treatment |
| **Background** | Subtle vertical grey grid lines (`.line-wrapper` > `.section-line`) | Hand-rolled `.line-wrapper` + `.noise-overlay` | Noise overlay improperly handled |

---

### 3. Hero Video / Media Banner
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Media Slot** | Full-width 1000px height background video with dark gradient bottom scrim | Full-width 1000px height photo (`onos-embroidery-hero.webp`) | Photo ratio works, but lacks the video/motion polish |
| **Quote Card** | Floating dark rounded card: Leader portrait image (`240px`), Name ("Michael R. Bennett"), Role ("Founder & CEO"), Quote below | Dark rounded card: Team meeting photo, "ONOS Global", "Production network", "Craft, at an industrial scale." | Card composition retained, but font weights and paddings differ slightly from source CSS |
| **Controls** | Bottom-right circular video play/pause button | Custom SVG play/pause | Retained |

---

### 4. About Section ("Who We Are")
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Top Left** | Pill badge + 4-avatar overlap stack + "10+ Team of Passionate professionals" | Pill badge + Giant text "ONOS GLOBAL" | **Severe Regression:** Removed the signature avatar stack; substituted raw text |
| **Top Right** | Title: "Driven by technology, backed by experience, focused on <span class='text-linear-gradient'>manufacturing</span> excellence" | Title: "Local expertise. <span class='text-linear-gradient'>A global outlook.</span>" | Heading length and orange gradient reasonably aligned |
| **Buttons** | "Learn More About Us" (button) + "Download Brochure" (download link with icon) | "Explore our network" (button) + "Explore our capabilities" (plain link) | Link lacks download icon and hover behavior |
| **Bottom Feature Cards (The 4 Circles)** | 4 distinct circular cards in `.about-info-inner`: <br>1. White circle with year `// 2005-2K25 //`, `2+`, robot arm icon.<br>2. Circle machine photo.<br>3. White circle with MANUFACTT logo, `100+`, 5-star rating (`4.9 / 5.0`).<br>4. Dark circle with 3-image strip, `1 million+`, description. | Replaced with custom `.onos-metrics`: <br>1. Circle showing broken `00` count.<br>2. Circle photo.<br>3. Circle showing broken `00` count.<br>4. Circle with full photo and low-contrast white text `2019`. | **Severe Visual Damage:** The circular cards were stripped of icons, ratings, and multi-image strips. Counters show broken `00` because GSAP / scroll triggers were removed. |

---

### 5. Services / Capabilities Section
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Heading** | "Scalable <span class='text-linear-gradient'>capabilities</span> for every challenge" + Right button "Explore All Capabilities →" | "Good ideas. Made tangible." (No gradient) + Right button missing | Missing orange gradient keyword; missing header CTA button |
| **Row Structure** | 4 expandable rows with left technical icon, thumbnail image, title, "Features" checklist with orange checkmarks, orange arrow button | 4 rows with orange numbers `01..04`, thumbnail image, title, text, diagonal orange arrow `↗` | Removed template technical icons; replaced with arbitrary number typography |
| **Bottom Honeycomb CTA Banner** | Dark honeycomb-patterned banner: "Ready to start your next project? / Schedule Consultation →" | Completely omitted | **Missing Template Section Component:** High-impact visual break discarded |

---

### 6. Product Section ("What We Manufacture")
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Visual Atmosphere** | Dark luxury theme with top radiant orange curved glow, vertical dashed lines, counter `50,000+` | Replaced by a plain white `#production-fit` tabs section | **Catastrophic Design Loss:** The most visually impressive section of Manufactt was deleted and replaced with generic white tabs |
| **Schematic Feature** | Interactive technical mechanical exploded diagram with animated callout pins | Replaced with a `<select>` dropdown ("What are you making?") | Stripped the entire technical drawing showcase |
| **Cards Grid** | 4 dark specification cards (Material, Capability, Size Range) | Replaced with tab content | Loss of dense industrial card design |
| **Bottom CTA** | "Explore our complete product range across industries." + "Download Brochure" + "View All Products →" | "Have a product in mind?..." + "Discuss this product ↗" | Custom styling lacks dashed lines and typography hierarchy |

---

### 7. Industry Section ("Built For Every Industry")
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Structure** | Vertical tabs on left (Aerospace, Automotive, Medical Devices, etc.) with active orange border; right side large white rounded card with photo, icon badge, checklist with orange checkmarks | Merged and distorted into `#production-fit` | The clean Manufactt tabbed card interface was degraded |

---

### 8. Case Study / Network Section
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Structure** | Slider with left dark card (`35%` metric, title, description, button) and right photo card, slider prev/next controls, plus bottom support strip with avatars | Full-bleed slider with photo and bottom cards (`.onos-network`) | Missing the dual card layout (stat card + photo) and support strip |

---

### 9. Why Choose Us & Testimonials
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Why Choose Us** | Client logo marquee + Full-width machine background with glassmorphism card on left | Omitted | Valuable visual proof section discarded |
| **Testimonials** | Left avatar strip + 5-star quote card + middle photo/stat cards + right dark support card | Omitted | Sophisticated asymmetric grid discarded |

---

### 10. Footer Section
| Dimension | Original Manufactt Reference | Current Local ONOS (`4050b54`) | Gap / Defect |
| :--- | :--- | :--- | :--- |
| **Atmosphere** | Dark theme with radial orange glow, vertical dashed grid lines, prominent branding | Flat matte black background without glow or dashed lines | Lost atmospheric depth and visual polish |
| **Form** | Newsletter subscription input with inline white arrow button | None | Input slot removed |
| **Columns** | 5 balanced columns (Newsletter, Main Links, Utility Links, Contact Info, Working Hours) | 4 unbalanced sparse columns | Asymmetrical whitespace |
| **Wordmark** | Giant `MANUFACTT` typography cropped at the bottom edge | Giant `ONOS GLOBAL` typography cropped at bottom edge | Sizing and line heights do not match template SVG/type |

---

## Root Cause Analysis

1. **Abandonment of Baseline Code:** Instead of taking `src/generated/Page0eb5473046.tsx` or `src/components/sections/HomeSections.tsx` from `manufactt-baseline` and mapping ONOS content into the exact DOM slots, previous work created fresh components from scratch.
2. **CSS Fragmentation:** Introducing `onos.css` with 300+ lines of custom overrides conflicted with the original Webflow stylesheet (`32f49076361a-manufactt-wbs.webflow.shared.edef070c1.min.css`) and discarded original layout mechanics.
3. **Loss of Interactive Runtime:** Removing `site-controls.ts` broke Webflow tabs, sliders, accordions, and dropdowns, forcing crude hand-rolled replacements (such as HTML `<select>` elements).

---

## Action Plan for Phase 2 - Phase 7

1. **Restore Baseline Structural Truth:**
   - Restore the exact HTML/JSX structure and CSS classes from `manufactt-baseline` (`raw-webflow/index.html` and baseline `HomeSections.tsx`).
   - Restore `interactions.css` and local interaction runtime (`site-controls.ts` / `SiteRuntime.tsx`) for tabs, sliders, accordions, and lightbox without third-party bloat.
2. **Map ONOS Content Strictly into Template Slots:**
   - Map ONOS production methods into the Services accordion cards (retaining original icons, orange checkmarks, and arrow buttons).
   - Restore the dark glowing **What We Manufacture** section: Use the technical exploded diagram with ONOS garment / POD manufacturing callouts, and map ONOS methods into the 4 dark specification cards.
   - Restore the **About** section's 4 circular cards with ONOS metrics (3 Plants, 2 Countries, 50+ Machines, 2019 Founded) with working animated counters.
   - Restore the **Industry / Finder** vertical tabs with ONOS product choices (T-shirts/Apparel, Caps/Bags, Sportswear, Personalised Decor).
   - Restore the **Case Study / Network** slider for Thai Nguyen, Me Linh, and California plants.
   - Map ONOS testimonials, partner logos, and FAQ accordions into Manufactt's existing testimonial and FAQ slots.
   - Restore the 5-column Footer with ambient orange glow, vertical dashed lines, newsletter brief form, and cropped ONOS GLOBAL wordmark.
3. **Single-Page Architecture & Anchor Navigation:**
   - Link all navbar and footer links to `#home`, `#about`, `#capabilities`, `#production-fit`, `#network`, `#faq`, `#contact`.
   - Add seamless English / Vietnamese language toggle in the navbar.
4. **Iterative QA & Verification:**
   - Pixel-perfect verification at 1440px, 1024px, 768px, and 375px.
   - Ensure clean typecheck, lint, and production build.
