"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { inquiryHref } from "@/data/onos-content";

interface ServiceItem {
  id: string;
  nameKey: string;
  wrapperClass: string;
  iconSrc: string;
  iconAlt: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  dataWId: string;
  imgDataWId: string;
  arrow1DataWId: string;
  arrow2DataWId: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: "dtg-printing",
    nameKey: "DTG printing",
    wrapperClass: "one",
    iconSrc: "/assets/919b6e982e1e-68dd10c0b38ff642330975ce_Icon-04.svg",
    iconAlt: "DTG Icon",
    imageSrc: "/assets/onos-dtg-machine-detail.webp",
    imageAlt: "DTG printing machine",
    features: [
      "Detailed gradient artwork",
      "Single unit to bulk runs",
      "OEKO-TEX certified inks",
      "Fast 2-4 day turnaround",
    ],
    dataWId: "bc23f244-bfd2-2ac7-1a49-5f880f92e2a4",
    imgDataWId: "d4d290b2-cf1f-2b7c-1c15-7a88dddc2d17",
    arrow1DataWId: "6c3d66a0-b420-e0a5-aade-cb7ede5a2f49",
    arrow2DataWId: "1b0d8c68-7925-4e4c-b357-5d041e365520",
  },
  {
    id: "computerised-embroidery",
    nameKey: "Computerised embroidery",
    wrapperClass: "two",
    iconSrc: "/assets/3d82ea8adf9e-68dd0f0f45f09a74e7a4e083_68dd045c0438e2e8731b21c1_Icon-2002.svg",
    iconAlt: "Embroidery Icon",
    imageSrc: "/assets/onos-equipment-embroidery.webp",
    imageAlt: "Computerised embroidery",
    features: [
      "High-density 3D puff embroidery",
      "Tajima & Barudan multi-head lines",
      "Premium durable threads",
      "Caps, hoodies and polo uniforms",
    ],
    dataWId: "77cde797-b601-13a8-b976-f135a003b69f",
    imgDataWId: "77cde797-b601-13a8-b976-f135a003b6a3",
    arrow1DataWId: "77cde797-b601-13a8-b976-f135a003b6b7",
    arrow2DataWId: "77cde797-b601-13a8-b976-f135a003b6b8",
  },
  {
    id: "sublimation-printing",
    nameKey: "Sublimation printing",
    wrapperClass: "three",
    iconSrc: "/assets/7b73a5e3512f-68dd0f10a657fd757cc63f70_68dd097ddfef66551e348204_Icon-2001.svg",
    iconAlt: "Sublimation Icon",
    imageSrc: "/assets/onos-press-machines-row.webp",
    imageAlt: "Sublimation printing",
    features: [
      "Full-bleed edge-to-edge printing",
      "Permanent wash-fast sublimation dyes",
      "Cut & sew sportswear production",
      "Rich vibrant colour gamut",
    ],
    dataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9110",
    imgDataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9114",
    arrow1DataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9128",
    arrow2DataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9129",
  },
  {
    id: "laser-cutting-engraving",
    nameKey: "Laser cutting & engraving",
    wrapperClass: "four",
    iconSrc: "/assets/a9658e3178bd-68dd10d7260632638bde8850_Icon-03.svg",
    iconAlt: "Laser Icon",
    imageSrc: "/assets/onos-laser-cut-gifts.webp",
    imageAlt: "Laser cutting & engraving",
    features: [
      "Sub-millimeter cutting accuracy",
      "Wood, acrylic and leather crafts",
      "Custom geometric fabric shapes",
      "Personalised gift production",
    ],
    dataWId: "ea75087c-806d-fa5f-23d1-e85b71fbeb55",
    imgDataWId: "ea75087c-806d-fa5f-23d1-e85b71fbeb59",
    arrow1DataWId: "ea75087c-806d-fa5f-23d1-e85b71fbeb6d",
    arrow2DataWId: "ea75087c-806d-fa5f-23d1-e85b71fbeb6e",
  },
];

export function Services() {
  const { language, t } = useSite();
  const [activeService, setActiveService] = useState<number>(0);

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

          <div className="service-info" role="region" aria-label="Services List">
            {serviceItems.map((item, index) => {
              const isExpanded = activeService === index;
              return (
                <div
                  key={item.id}
                  className={`service-list-wrapper ${item.wrapperClass} w-dyn-list`}
                >
                  <div role="list" className="service-list w-dyn-items">
                    <div role="listitem" className="service-list-item w-dyn-item">
                      <a
                        data-w-id={item.dataWId}
                        href={inquiryHref(language, item.nameKey)}
                        className={`service-info-link w-inline-block${isExpanded ? " is-expanded" : ""}`}
                        aria-expanded={isExpanded}
                        onMouseEnter={() => setActiveService(index)}
                        onFocus={() => setActiveService(index)}
                        onClick={(e) => {
                          if (activeService !== index) {
                            e.preventDefault();
                            setActiveService(index);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            if (activeService !== index) {
                              e.preventDefault();
                              setActiveService(index);
                            }
                          }
                        }}
                      >
                        <div className="service-info-inner">
                          <div className="service-image-main">
                            <img
                              src={item.iconSrc}
                              loading="lazy"
                              alt={item.iconAlt}
                              className="service-icon"
                            />
                            <div className="service-image-wrap">
                              <img
                                src={item.imageSrc}
                                loading="lazy"
                                data-w-id={item.imgDataWId}
                                alt={item.imageAlt}
                                className="service-image"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </div>
                          <div className="service-content-wrap">
                            <div className="service-name-wrapper">
                              <h3 className="service-name">{t(item.nameKey)}</h3>
                            </div>
                            <div className="service-feature-list">
                              <div className="service-feature-text">{t("Features")}</div>
                              <div className="feature-list-item">
                                {item.features.map((featureKey) => (
                                  <div key={featureKey} className="feature-item-inner">
                                    <img
                                      src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                      loading="lazy"
                                      alt="Check"
                                      className="feature-item-icon"
                                    />
                                    <div className="feature-item">{t(featureKey)}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="service-arrow" aria-hidden="true">
                          <img
                            src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                            loading="lazy"
                            data-w-id={item.arrow1DataWId}
                            alt="Arrow"
                            className="service-icon-01"
                          />
                          <img
                            src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                            loading="lazy"
                            data-w-id={item.arrow2DataWId}
                            alt="Arrow"
                            className="service-hover-icon"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

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
