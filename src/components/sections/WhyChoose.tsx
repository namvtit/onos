"use client";

import { useSite } from "@/components/interactions/SiteContext";

export function WhyChoose() {
  const { t } = useSite();

  return (
    <section id="workflow" className="why-choose-section">
      {/* Ecosystem Logo Marquee */}
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

      <div
        className="why-choose-info"
        style={{
          backgroundImage: "url('/assets/onos-production-floor.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div
            data-w-id="3bbcdcf0-25d3-d1c7-ebaa-51304b662dba"
            className="why-choose-content"
          >
            <h2 className="why-choose-title">
              {t("Manufacturing solutions you can count on")}
            </h2>
            <div className="why-choose-list">
              <div className="why-choose-list-item">
                <img
                  src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                  loading="lazy"
                  alt="Check"
                  className="why-choose-item-icon"
                />
                <div className="why-choose-item">
                  <strong>1. {t("Share the idea")}:</strong> {t("Tell us your product, expected volume and destination. We recommend the material and production method.")}
                </div>
              </div>
              <div className="why-choose-list-item">
                <img
                  src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                  loading="lazy"
                  alt="Check"
                  className="why-choose-item-icon"
                />
                <div className="why-choose-item">
                  <strong>2. {t("Get it production-ready")}:</strong> {t("We review your artwork, colour and placement. For a bulk run, agree the sample before moving ahead.")}
                </div>
              </div>
              <div className="why-choose-list-item">
                <img
                  src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                  loading="lazy"
                  alt="Check"
                  className="why-choose-item-icon"
                />
                <div className="why-choose-item">
                  <strong>3. {t("Make. Check. Finish.")}:</strong> {t("The production team prints or stitches your design, inspects the output and prepares the finished product.")}
                </div>
              </div>
              <div className="why-choose-list-item">
                <img
                  src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                  loading="lazy"
                  alt="Check"
                  className="why-choose-item-icon"
                />
                <div className="why-choose-item">
                  <strong>4. {t("On its way")}:</strong> {t("Products are packed and handed to shipping partners, with tracking through the fulfillment process.")}
                </div>
              </div>
            </div>

            <div className="why-choose-button">
              <a
                data-wf--button-arrow--variant="button-primary-bg"
                data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                href="#capabilities"
                className="primary-button w-variant-5ae0b7d1-2e18-9989-4375-c73c98041680 w-inline-block"
              >
                <div className="button-primary-inner">
                  <div className="button-text-wrap">
                    <div className="button-text-inner">
                      <div className="button-text">{t("Explore Our Workflow")}</div>
                      <div className="button-hover-text">{t("Explore Our Workflow")}</div>
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

            <div className="why-choose-inner">
              <div className="avatar one">
                <div className="avatar-box">
                  <img
                    src="/assets/onos-sample-development.webp"
                    loading="lazy"
                    alt="Team"
                    className="avatar-image"
                  />
                </div>
                <div className="avatar-box one">
                  <img
                    src="/assets/onos-partner-meeting.webp"
                    loading="lazy"
                    alt="Team"
                    className="avatar-image"
                  />
                </div>
                <div className="avatar-box one">
                  <img
                    src="/assets/onos-production-floor.webp"
                    loading="lazy"
                    alt="Team"
                    className="avatar-image"
                  />
                </div>
                <div className="avatar-box one">
                  <img
                    src="/assets/onos-facility-thai-nguyen.webp"
                    loading="lazy"
                    alt="Team"
                    className="avatar-image"
                  />
                </div>
              </div>
              <div className="rating-info">
                <img
                  src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                  loading="lazy"
                  alt="Process"
                  className="rating-image"
                  style={{ width: "20px", height: "20px" }}
                />
                <div className="rating-text">
                  {t("Product development starts with a conversation.")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
