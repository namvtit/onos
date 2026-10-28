"use client";

import { useSite } from "@/components/interactions/SiteContext";
import { inquiryHref } from "@/data/onos-content";

export function Services() {
  const { language, t } = useSite();

  return (
    <section id="capabilities" className="service-section section-spacing-top">
      <span id="services" className="onos-anchor-alias" aria-hidden="true" />
      <div className="container-full">
        <div className="service-details-main">
          <div
            data-w-id="238c3f25-28e9-d07e-772d-22cc173e9e24"
            className="service-details-wrap"
          >
            <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
              <div className="pre-section-title-inner">
                <div className="pre-section-title-square"></div>
                <div className="pre-section-title">{t("What We Do")}</div>
              </div>
            </div>
            <div className="section-title-wrap">
              <h2 className="section-title">
                {language === "vi" ? (
                  <>
                    Năng lực <span className="text-linear-gradient">sản xuất</span> cho mọi nhu cầu
                  </>
                ) : (
                  <>
                    Scalable <span className="text-linear-gradient">capabilities</span> for every challenge
                  </>
                )}
              </h2>
              <div id="w-node-e23adfcb-92aa-cd61-ca12-ef84ce0764ac-f8801f19" className="section-button-wrap">
                <a
                  data-wf--button-arrow--variant="base"
                  data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                  href="#production-fit"
                  className="primary-button w-inline-block"
                >
                  <div className="button-primary-inner">
                    <div className="button-text-wrap">
                      <div className="button-text-inner">
                        <div className="button-text">{t("Explore All Methods")}</div>
                        <div className="button-hover-text">{t("Explore All Methods")}</div>
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

          <div className="service-info">
            {/* Service 1: DTG Printing */}
            <div className="service-list-wrapper one w-dyn-list">
              <div role="list" className="service-list w-dyn-items">
                <div role="listitem" className="service-list-item w-dyn-item">
                  <a
                    data-w-id="bc23f244-bfd2-2ac7-1a49-5f880f92e2a4"
                    href={inquiryHref(language, "DTG printing")}
                    className="service-info-link w-inline-block"
                  >
                    <div className="service-info-inner">
                      <div className="service-image-main">
                        <img
                          src="/assets/0c25ad641304-68e2214d3f9f7fd1a8412201_Award--3-.svg"
                          loading="lazy"
                          alt="DTG Icon"
                          className="service-icon"
                        />
                        <div className="service-image-wrap">
                          <img
                            src="/assets/onos-dtg-machine-detail.webp"
                            loading="lazy"
                            alt="DTG printing machine"
                            className="service-image"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="service-content-wrap">
                        <div className="service-name-wrapper">
                          <h3 className="service-name">{t("DTG printing")}</h3>
                        </div>
                        <div className="service-feature-list">
                          <div className="service-feature-text">{t("Features")}</div>
                          <div className="feature-list-item">
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Detailed gradient artwork")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Single unit to bulk runs")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("OEKO-TEX certified inks")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Fast 2-4 day turnaround")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-arrow">
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-icon-01"
                      />
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-hover-icon"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Service 2: Computerised Embroidery */}
            <div className="service-list-wrapper two w-dyn-list">
              <div role="list" className="service-list w-dyn-items">
                <div role="listitem" className="service-list-item w-dyn-item">
                  <a
                    data-w-id="77cde797-b601-13a8-b976-f135a003b69f"
                    href={inquiryHref(language, "Computerised embroidery")}
                    className="service-info-link w-inline-block"
                  >
                    <div className="service-info-inner">
                      <div className="service-image-main">
                        <img
                          src="/assets/3d82ea8adf9e-68dd0f0f45f09a74e7a4e083_68dd045c0438e2e8731b21c1_Icon-2002.svg"
                          loading="lazy"
                          alt="Embroidery Icon"
                          className="service-icon"
                        />
                        <div className="service-image-wrap">
                          <img
                            src="/assets/onos-equipment-embroidery.webp"
                            loading="lazy"
                            alt="Computerised embroidery"
                            className="service-image"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="service-content-wrap">
                        <div className="service-name-wrapper">
                          <h3 className="service-name">{t("Computerised embroidery")}</h3>
                        </div>
                        <div className="service-feature-list">
                          <div className="service-feature-text">{t("Features")}</div>
                          <div className="feature-list-item">
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("High-density 3D puff embroidery")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Tajima & Barudan multi-head lines")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Premium durable threads")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Caps, hoodies and polo uniforms")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-arrow">
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-icon-01"
                      />
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-hover-icon"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Service 3: Sublimation Printing */}
            <div className="service-list-wrapper three w-dyn-list">
              <div role="list" className="service-list w-dyn-items">
                <div role="listitem" className="service-list-item w-dyn-item">
                  <a
                    data-w-id="fd6444eb-66fc-2dbd-3d3a-042d56ad9110"
                    href={inquiryHref(language, "Sublimation printing")}
                    className="service-info-link w-inline-block"
                  >
                    <div className="service-info-inner">
                      <div className="service-image-main">
                        <img
                          src="/assets/ec61ce0ba60c-68e5fa805e7632fa2bde6893_Service-Fratures-Icon--2-.svg"
                          loading="lazy"
                          alt="Sublimation Icon"
                          className="service-icon"
                        />
                        <div className="service-image-wrap">
                          <img
                            src="/assets/onos-press-machines-row.webp"
                            loading="lazy"
                            alt="Sublimation printing"
                            className="service-image"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="service-content-wrap">
                        <div className="service-name-wrapper">
                          <h3 className="service-name">{t("Sublimation printing")}</h3>
                        </div>
                        <div className="service-feature-list">
                          <div className="service-feature-text">{t("Features")}</div>
                          <div className="feature-list-item">
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Full-bleed edge-to-edge printing")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Permanent wash-fast sublimation dyes")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Cut & sew sportswear production")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Rich vibrant colour gamut")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-arrow">
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-icon-01"
                      />
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-hover-icon"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Service 4: Laser Cutting & Engraving */}
            <div className="service-list-wrapper four w-dyn-list">
              <div role="list" className="service-list w-dyn-items">
                <div role="listitem" className="service-list-item w-dyn-item">
                  <a
                    data-w-id="ea75087c-806d-fa5f-23d1-e85b71fbeb55"
                    href={inquiryHref(language, "Laser cutting & engraving")}
                    className="service-info-link w-inline-block"
                  >
                    <div className="service-info-inner">
                      <div className="service-image-main">
                        <img
                          src="/assets/a9658e3178bd-68dd10d7260632638bde8850_Icon-03.svg"
                          loading="lazy"
                          alt="Laser Icon"
                          className="service-icon"
                        />
                        <div className="service-image-wrap">
                          <img
                            src="/assets/onos-laser-cut-gifts.webp"
                            loading="lazy"
                            alt="Laser cutting & engraving"
                            className="service-image"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="service-content-wrap">
                        <div className="service-name-wrapper">
                          <h3 className="service-name">{t("Laser cutting & engraving")}</h3>
                        </div>
                        <div className="service-feature-list">
                          <div className="service-feature-text">{t("Features")}</div>
                          <div className="feature-list-item">
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Sub-millimeter cutting accuracy")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Wood, acrylic and leather crafts")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Custom geometric fabric shapes")}</div>
                            </div>
                            <div className="feature-item-inner">
                              <img
                                src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                loading="lazy"
                                alt="Check"
                                className="feature-item-icon"
                              />
                              <div className="feature-item">{t("Personalised gift production")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-arrow">
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-icon-01"
                      />
                      <img
                        src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                        loading="lazy"
                        alt="Arrow"
                        className="service-hover-icon"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="service-box-height"></div>
          </div>

          {/* Honeycomb CTA Banner */}
          <div className="cta-wrap">
            <div
              data-w-id="2a6fecb6-c324-2a47-4e56-63bf9666fe76"
              className="cta-info-wrapper"
              style={{ backgroundImage: "url('/assets/886c8689ec84-68e0f9a032b17a59b69e7ecb_CTA-bg--2-.webp')" }}
            >
              <div className="cta-info-inner">
                <h2 className="cta-text">
                  {language === "vi" ? (
                    <>
                      Sẵn sàng khởi động <br />
                      dự án tiếp theo?
                    </>
                  ) : (
                    <>
                      Ready to start your <br />
                      next project?
                    </>
                  )}
                </h2>
                <div className="cta-button">
                  <a
                    data-wf--button-arrow--variant="button-white-bg"
                    data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                    href="#contact"
                    className="primary-button w-variant-e5ebfb29-ba2d-88c3-9b4e-1bbc038e3a15 w-inline-block"
                  >
                    <div className="button-primary-inner">
                      <div className="button-text-wrap">
                        <div className="button-text-inner">
                          <div className="button-text">{t("Email Project Brief")}</div>
                          <div className="button-hover-text">{t("Email Project Brief")}</div>
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
        </div>
      </div>
    </section>
  );
}
