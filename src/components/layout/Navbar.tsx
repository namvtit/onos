"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";

export function Navbar() {
  const { language, setLanguage, t } = useSite();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "capabilities", "production-fit", "network", "workflow", "ecosystem", "faq", "contact"];
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      data-wf--navbar--variant="base"
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="navbar w-nav"
    >
      <div className="container-full w-container">
        <div className="w-layout-grid grid-nav">
          {/* Brand Logo */}
          <a
            href="#home"
            id="w-node-e6ff9f79-f479-fa42-6f69-a3df18a8ef3f-18a8ef3c"
            aria-current="page"
            className="brand w-nav-brand"
            aria-label="Onos Global"
          >
            <img
              src="/assets/onos-wordmark.svg"
              loading="eager"
              alt="ONOS Global"
              className="logo"
            />
          </a>

          {/* Navigation Links */}
          <nav
            role="navigation"
            id="w-node-e6ff9f79-f479-fa42-6f69-a3df18a8ef41-18a8ef3c"
            className={`nav-menu w-nav-menu ${menuOpen ? "w--nav-menu-open" : ""}`}
            aria-label={language === "en" ? "Main navigation" : "Điều hướng chính"}
          >
            <a
              href="#home"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "home" ? "w--current" : ""}`}
            >
              {t("Home")}
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "about" ? "w--current" : ""}`}
            >
              {t("About")}
            </a>
            <a
              href="#capabilities"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "capabilities" ? "w--current" : ""}`}
            >
              {t("Capabilities")}
            </a>
            <a
              href="#production-fit"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "production-fit" ? "w--current" : ""}`}
            >
              {t("Production Fit")}
            </a>
            <a
              href="#network"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "network" ? "w--current" : ""}`}
            >
              {t("Our network")}
            </a>
            <a
              href="#workflow"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "workflow" ? "w--current" : ""}`}
            >
              {t("Workflow")}
            </a>
            <a
              href="#ecosystem"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "ecosystem" ? "w--current" : ""}`}
            >
              {t("Our ecosystem")}
            </a>
            <a
              href="#faq"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "faq" ? "w--current" : ""}`}
            >
              {t("FAQ")}
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className={`nav-link w-nav-link ${activeSection === "contact" ? "w--current" : ""}`}
            >
              {t("Contact")}
            </a>
          </nav>

          {/* Right Nav: Language Switcher + CTA */}
          <div
            id="w-node-e6ff9f79-f479-fa42-6f69-a3df18a8ef64-18a8ef3c"
            className="right-nav"
          >
            {/* Bilingual Toggle */}
            <div className="nav-lang-switch">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`nav-lang-btn ${language === "en" ? "active" : ""}`}
                aria-pressed={language === "en"}
                aria-label="English"
              >
                EN
              </button>
              <span className="nav-lang-divider">|</span>
              <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`nav-lang-btn ${language === "vi" ? "active" : ""}`}
                aria-pressed={language === "vi"}
                aria-label="Tiếng Việt"
              >
                VI
              </button>
            </div>

            {/* Let's Talk CTA */}
            <div className="nav-button">
              <a
                data-wf--button-arrow--variant="base"
                data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                href="#contact"
                className="primary-button w-inline-block"
              >
                <div className="button-primary-inner">
                  <div className="button-text-wrap">
                    <div className="button-text-inner">
                      <div className="button-text">{t("Let's talk")}</div>
                      <div className="button-hover-text">{t("Let's talk")}</div>
                    </div>
                  </div>
                  <div className="button-icon-bg">
                    <img
                      src="/assets/75e8f722a505-68d527b447e1a5cc60cc1c27_button-icon.svg"
                      loading="eager"
                      alt="Arrow"
                      className="button-icon"
                    />
                    <img
                      src="/assets/75e8f722a505-68d527b447e1a5cc60cc1c27_button-icon.svg"
                      loading="lazy"
                      alt="Arrow"
                      className="button-icon-hover"
                    />
                  </div>
                </div>
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div
              className={`menu-button w-nav-button ${menuOpen ? "w--open" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="menu-icon-wrap">
                <div className="menu-icon-inner">
                  <div className="menu-icon-line"></div>
                  <div className="menu-icon-line center"></div>
                  <div className="menu-icon-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
