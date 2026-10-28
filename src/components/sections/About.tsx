"use client";

import { useSite } from "@/components/interactions/SiteContext";

export function About() {
  const { language, t } = useSite();

  return (
    <section id="about" className="about-section">
      <div className="about-main section-spacing">
        <div className="about-info">
          <div className="w-layout-blockcontainer container w-container">
            <div className="w-layout-grid grid-about">
              <div
                data-w-id="92898b08-3165-2543-ee25-b82b2b7a592b"
                className="about-left-wrap"
              >
                <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
                  <div className="pre-section-title-inner">
                    <div className="pre-section-title-square"></div>
                    <div className="pre-section-title">{t("Who We Are")}</div>
                  </div>
                </div>

                <div className="avatar">
                  <div className="avatar-box">
                    <img
                      src="/assets/onos-sample-development.webp"
                      loading="lazy"
                      alt="Team Member"
                      className="avatar-image"
                    />
                  </div>
                  <div className="avatar-box one">
                    <img
                      src="/assets/onos-partner-meeting.webp"
                      loading="lazy"
                      alt="Team Member"
                      className="avatar-image"
                    />
                  </div>
                  <div className="avatar-box one">
                    <img
                      src="/assets/onos-production-floor.webp"
                      loading="lazy"
                      alt="Team Member"
                      className="avatar-image"
                    />
                  </div>
                  <div className="avatar-box one">
                    <img
                      src="/assets/onos-facility-thai-nguyen.webp"
                      loading="lazy"
                      alt="Team Member"
                      className="avatar-image"
                    />
                  </div>
                  <a href="#network" className="avatar-box one w-inline-block">
                    <div className="avatar-icon-box">
                      <div className="avatar-count">50</div>
                      <img
                        src="/assets/536a795c5a7c-68dcc369de4ced980408d673_-.svg"
                        loading="lazy"
                        alt="Avatar Icon"
                        className="avatar-icon"
                      />
                    </div>
                  </a>
                </div>

                <div className="avatar-info">
                  {t("Team Of passionate")}
                  <br />
                  {t("professionals")}
                </div>
              </div>

              <div className="about-right-wrap">
                <div className="about-section-title">
                  <h2
                    data-w-id="710a89bc-f9dd-2ab9-dd91-b12ed4a78144"
                    className="section-title"
                  >
                    {language === "vi" ? (
                      <>
                        Tay nghề địa phương, quy mô toàn cầu, tập trung vào{" "}
                        <span className="text-linear-gradient">sản xuất</span> chất lượng cao
                      </>
                    ) : (
                      <>
                        Local expertise, backed by scale, focused on{" "}
                        <span className="text-linear-gradient">manufacturing</span> excellence
                      </>
                    )}
                  </h2>
                </div>
                <p
                  data-w-id="017b83dc-7656-67a6-b23e-69b6032ef810"
                  className="about-description"
                >
                  {t(
                    "Production in Vietnam. Fulfillment closer to the US market. A connected network built around where your customers are."
                  )}
                </p>
                <div
                  data-w-id="5a23ee6f-035d-2255-fd4f-73aa8e89689a"
                  className="about-button-wrap"
                >
                  <a
                    data-wf--button-arrow--variant="base"
                    data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                    href="#network"
                    className="primary-button w-inline-block"
                  >
                    <div className="button-primary-inner">
                      <div className="button-text-wrap">
                        <div className="button-text-inner">
                          <div className="button-text">{t("Explore Our Network")}</div>
                          <div className="button-hover-text">{t("Explore Our Network")}</div>
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
                  <a href="#capabilities" className="download-link">
                    {t("Explore Capabilities")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-full">
          <div className="about-info-inner">
            {/* Circle 1 */}
            <div
              data-w-id="52b525da-7c1b-3a5f-e1d2-3e25e3d423eb"
              className="about-info-box"
            >
              <div className="about-info-inner-wrap">
                <div className="about-content">{"// 2019 //"}</div>
                <div className="inner-number">
                  <div className="numbers-counts">
                    <div data-target="2019" data-format="year" className="count">
                      2019
                    </div>
                  </div>
                  <div className="counter-symbol">
                    <div className="counter-symbol-text"></div>
                  </div>
                </div>
                <p className="about-content-description">
                  {t("The year we began.")}
                </p>
              </div>
              <img
                src="/assets/onos-connection.svg"
                loading="lazy"
                alt="About Box Vector"
                className="about-box-vector"
              />
            </div>

            {/* Circle 2: Photo with baseline growIn animation */}
            <img
              src="/assets/onos-production-floor.webp"
              loading="lazy"
              data-w-id="2b6ca78d-f30a-dcb3-72dd-ee239194fdde"
              alt="Production Floor"
              className="about-image-box"
              style={{ objectFit: "cover" }}
            />

            {/* Circle 3 */}
            <div
              data-w-id="e0a0517f-1ee8-9dfc-bba2-14c8a6a448da"
              className="about-info-box box-bg-white"
            >
              <img
                src="/assets/onos-wordmark.svg"
                loading="lazy"
                alt="ONOS Global"
                className="about-box-logo"
                style={{ maxHeight: "24px", width: "auto" }}
              />
              <div className="counter-run">
                <div className="inner-number about-counter">
                  <div className="numbers-counts text-linear-gradient">
                    <div data-target="3" data-pad="2" className="count">
                      03
                    </div>
                  </div>
                  <div className="counter-symbol">
                    <div className="counter-symbol-text"></div>
                  </div>
                </div>
              </div>
              <div className="about-info-text">
                {t("Production plants across Vietnam and USA")}
              </div>
              <div className="about-rating-wrap">
                <div className="about-rating-text">
                  02 <span className="rating-small-text">{" / " + t("Countries, connected")}</span>
                </div>
                <img
                  src="/assets/onos-network-badge.svg"
                  loading="lazy"
                  alt="Vietnam and USA Network"
                  className="rating-image"
                />
              </div>
            </div>

            {/* Circle 4 */}
            <div
              data-w-id="a502134d-7170-6735-c416-b637dce64a74"
              className="about-info-box box-bg-dark"
            >
              <div className="about-image-wrap">
                <img
                  src="/assets/onos-facility-thai-nguyen.webp"
                  loading="lazy"
                  alt="Thai Nguyen Facility"
                  className="about-image-small image-one"
                />
                <img
                  src="/assets/onos-facility-me-linh.webp"
                  loading="lazy"
                  alt="Me Linh Facility"
                  className="about-image-small image-two"
                />
                <img
                  src="/assets/onos-facility-california.webp"
                  loading="lazy"
                  alt="California Facility"
                  className="about-image-small image-three"
                />
              </div>
              <h2 className="like-score">
                <span data-target="50" className="count">50</span>
                <span className="icon-primary">+</span>
              </h2>
              <p className="about-content-description text-white">
                {t("Production machines and automated lines")}
              </p>
            </div>
          </div>
        </div>

        <div className="line-wrapper">
          <div className="section-line border-grey-1"></div>
          <div className="section-line border-grey-1"></div>
          <div className="section-line border-grey-1"></div>
          <div className="section-line border-grey-1"></div>
          <div className="section-line border-grey-1"></div>
        </div>
        <div className="noise-overlay"></div>
      </div>
    </section>
  );
}
