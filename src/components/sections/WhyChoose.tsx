"use client";

import { useSite } from "@/components/interactions/SiteContext";
import { processSteps } from "@/data/onos-content";

export function WhyChoose() {
  const { language, t } = useSite();

  return (
    <section id="workflow" className="why-choose-section">
      {/* Ecosystem Logo Marquee (decorative branding) */}
      <div data-w-id="8b9c8801-a35a-405a-c54c-28f8a68a688b" className="client-marquee">
        <div className="client-marquee-list">
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 800, fontSize: "1.25rem", color: "#666" }}>
              ONOS GLOBAL
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 800, fontSize: "1.25rem", color: "#666" }}>
              OnosPOD
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 800, fontSize: "1.25rem", color: "#666" }}>
              ONOS GROUP
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 700, fontSize: "1.1rem", color: "#888" }}>
              VIETNAM
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 700, fontSize: "1.1rem", color: "#888" }}>
              UNITED STATES
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 800, fontSize: "1.25rem", color: "#666" }}>
              ONOS GLOBAL
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 800, fontSize: "1.25rem", color: "#666" }}>
              OnosPOD
            </span>
          </div>
          <div className="client-marquee-item">
            <span style={{ fontFamily: "var(--_typography---font-family--heading)", fontWeight: 800, fontSize: "1.25rem", color: "#666" }}>
              ONOS GROUP
            </span>
          </div>
        </div>
      </div>

      {/* 4-Step Process Section with Authentic Media */}
      <div
        className="why-choose-info"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('/assets/onos-sample-development.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div
            data-w-id="3bbcdcf0-25d3-d1c7-ebaa-51304b662dba"
            className="why-choose-content"
          >
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color--primary-1, #f66234)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              {"// " + t("4-step customer workflow · Complemented by a 5-step factory quality control process") + " //"}
            </div>

            <h2 className="why-choose-title">
              {language === "vi" ? (
                <>
                  Bộ sưu tập tiếp theo <span className="text-linear-gradient">bắt đầu từ đây</span>
                </>
              ) : (
                <>
                  Your next collection <span className="text-linear-gradient">starts here</span>
                </>
              )}
            </h2>

            <div className="why-choose-list">
              {processSteps.map((step) => (
                <div key={step.num} className="why-choose-list-item">
                  <img
                    src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                    loading="lazy"
                    alt="Check"
                    className="why-choose-item-icon"
                  />
                  <div className="why-choose-item">
                    <strong>{step.num}. {t(step.title)}:</strong> {t(step.description)}
                  </div>
                </div>
              ))}
            </div>

            <div className="why-choose-button">
              <a
                data-wf--button-arrow--variant="base"
                data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                href="#contact"
                className="primary-button w-inline-block"
              >
                <div className="button-primary-inner">
                  <div className="button-text-wrap">
                    <div className="button-text-inner">
                      <div className="button-text">{t("Start Your Project")}</div>
                      <div className="button-hover-text">{t("Start Your Project")}</div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
