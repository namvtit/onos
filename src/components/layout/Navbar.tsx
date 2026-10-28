"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";

export function Navbar() {
  const { language, setLanguage, t } = useSite();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "capabilities", "products", "network", "faq", "contact"];
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

  return (
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="navbar w-nav"
    >
      <div className="container-full">
        <div className="grid-nav">
          <a href="#home" aria-current="page" className="brand w-nav-brand">
            <img
              src="/assets/onos-wordmark.svg"
              loading="eager"
              alt="ONOS Global"
              className="logo"
            />
          </a>

          <nav role="navigation" className="nav-menu w-nav-menu">
            <a
              href="#home"
              className={`nav-link w-nav-link ${activeSection === "home" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("Home")}</div>
            </a>
            <a
              href="#about"
              className={`nav-link w-nav-link ${activeSection === "about" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("About")}</div>
            </a>
            <a
              href="#capabilities"
              className={`nav-link w-nav-link ${activeSection === "capabilities" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("Capabilities")}</div>
            </a>
            <a
              href="#products"
              className={`nav-link w-nav-link ${activeSection === "products" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("What we make")}</div>
            </a>
            <a
              href="#network"
              className={`nav-link w-nav-link ${activeSection === "network" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("Our network")}</div>
            </a>
            <a
              href="#faq"
              className={`nav-link w-nav-link ${activeSection === "faq" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("FAQ")}</div>
            </a>
            <a
              href="#contact"
              className={`nav-link w-nav-link ${activeSection === "contact" ? "w--current" : ""}`}
            >
              <img
                src="/assets/8ced890523aa-6900a140f61795ffd32bd64a_Nav-Hover-Dot.svg"
                loading="lazy"
                alt="Dot"
                className="nav-dot"
              />
              <div>{t("Contact")}</div>
            </a>
          </nav>

          <div className="right-nav">
            <div className="nav-lang-switch">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`nav-lang-btn ${language === "en" ? "active" : ""}`}
                aria-pressed={language === "en"}
              >
                EN
              </button>
              <span className="nav-lang-divider">|</span>
              <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`nav-lang-btn ${language === "vi" ? "active" : ""}`}
                aria-pressed={language === "vi"}
              >
                VI
              </button>
            </div>

            <div className="nav-button">
              <a
                href="#contact"
                className="primary-button w-variant-5ae0b7d1-2e18-9989-4375-c73c98041680 w-inline-block"
              >
                <div className="button-primary-inner">
                  <div className="button-text-wrap">
                    <div className="button-text-inner">
                      <div className="button-text">{t("Get A Quote")}</div>
                      <div className="button-hover-text">{t("Get A Quote")}</div>
                    </div>
                  </div>
                  <div className="button-icon-bg w-variant-5ae0b7d1-2e18-9989-4375-c73c98041680">
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

            <div
              className="menu-button w-nav-button"
              aria-label="menu"
              role="button"
              tabIndex={0}
            >
              <div className="menu-icon">
                <div className="menu-line"></div>
                <div className="menu-line _02"></div>
                <div className="menu-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
