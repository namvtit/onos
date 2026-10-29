"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";

interface ServiceItem {
  id: string;
  methodId: "dtg" | "embroidery" | "sublimation" | "laser";
  nameKey: string;
  tagKey: string;
  modelKey: string;
  descriptionKey: string;
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
    methodId: "dtg",
    nameKey: "DTG printing",
    tagKey: "T-shirts · Apparel",
    modelKey: "Machine: SL-DTG-X2S",
    descriptionKey: "Direct-to-garment printing for photographs, gradients and detailed artwork on cotton and cotton-rich apparel.",
    wrapperClass: "one",
    iconSrc: "/assets/919b6e982e1e-68dd10c0b38ff642330975ce_Icon-04.svg",
    iconAlt: "DTG Icon",
    imageSrc: "/assets/onos-dtg-machine-detail.webp",
    imageAlt: "DTG printing machine at Onos",
    features: [
      "Machine: SL-DTG-X2S",
      "Cotton and cotton-rich apparel",
      "Photographs, gradients & detailed artwork",
      "Physical sample colour approval",
    ],
    dataWId: "bc23f244-bfd2-2ac7-1a49-5f880f92e2a4",
    imgDataWId: "d4d290b2-cf1f-2b7c-1c15-7a88dddc2d17",
    arrow1DataWId: "6c3d66a0-b420-e0a5-aade-cb7ede5a2f49",
    arrow2DataWId: "1b0d8c68-7925-4e4c-b357-5d041e365520",
  },
  {
    id: "computerised-embroidery",
    methodId: "embroidery",
    nameKey: "Computerised embroidery",
    tagKey: "Caps · Polos · Bags",
    modelKey: "Equipment: multi-head embroidery",
    descriptionKey: "Digitised designs and multi-head embroidery bring texture and a distinctive finish to your brand identity.",
    wrapperClass: "two",
    iconSrc: "/assets/3d82ea8adf9e-68dd0f0f45f09a74e7a4e083_68dd045c0438e2e8731b21c1_Icon-2002.svg",
    iconAlt: "Embroidery Icon",
    imageSrc: "/assets/onos-equipment-embroidery.webp",
    imageAlt: "An Onos operator checking embroidery on garments",
    features: [
      "Equipment: multi-head embroidery",
      "Caps, polos and bags",
      "Digitised stitch-file review",
      "Distinctive texture & premium finish",
    ],
    dataWId: "77cde797-b601-13a8-b976-f135a003b69f",
    imgDataWId: "77cde797-b601-13a8-b976-f135a003b6a3",
    arrow1DataWId: "77cde797-b601-13a8-b976-f135a003b6b7",
    arrow2DataWId: "77cde797-b601-13a8-b976-f135a003b6b8",
  },
  {
    id: "sublimation-printing",
    methodId: "sublimation",
    nameKey: "Sublimation printing",
    tagKey: "All-over print · Sportswear",
    modelKey: "Epson SC-F11030 · heat press PD-1800D-800",
    descriptionKey: "All-over printing bonds colour into polyester fibres for expressive, full-coverage apparel and sportswear.",
    wrapperClass: "three",
    iconSrc: "/assets/7b73a5e3512f-68dd0f10a657fd757cc63f70_68dd097ddfef66551e348204_Icon-2001.svg",
    iconAlt: "Sublimation Icon",
    imageSrc: "/assets/onos-press-machines-row.webp",
    imageAlt: "Heat press equipment on the Onos production floor",
    features: [
      "Epson SC-F11030 · PD-1800D-800 heat press",
      "Polyester apparel and sportswear",
      "All-over printing bonded into fibres",
      "Material colour testing before run",
    ],
    dataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9110",
    imgDataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9114",
    arrow1DataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9128",
    arrow2DataWId: "fd6444eb-66fc-2dbd-3d3a-042d56ad9129",
  },
  {
    id: "laser-cutting-engraving",
    methodId: "laser",
    nameKey: "Laser cutting & engraving",
    tagKey: "Decor · Personalised gifts",
    modelKey: "Laser FW-1822 · auto cutter LP-2219",
    descriptionKey: "Precision cutting and engraving for personalised gifts and decor in wood, acrylic, leather and fabric.",
    wrapperClass: "four",
    iconSrc: "/assets/a9658e3178bd-68dd10d7260632638bde8850_Icon-03.svg",
    iconAlt: "Laser Icon",
    imageSrc: "/assets/onos-laser-cut-gifts.webp",
    imageAlt: "Laser-cut wooden decor and gift samples",
    features: [
      "Laser FW-1822 · LP-2219 auto cutter",
      "Wood, acrylic, leather & fabric",
      "Custom cutting paths & vector specs",
      "Sample finish approval before run",
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

  const toggle = (idx: number) => {
    setActiveService(idx);
  };

  return (
    <section id="capabilities" className="service-section section-spacing-top">
      <span id="services" className="onos-anchor-alias" aria-hidden="true" />
      <div className="container-full">
        <div className="service-details-main">
          {/* Section Header */}
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
                    Ý tưởng lớn. <span className="text-linear-gradient">Thành hình sắc nét.</span>
                  </>
                ) : (
                  <>
                    Good ideas. <span className="text-linear-gradient">Made tangible.</span>
                  </>
                )}
              </h2>
            </div>
          </div>

          {/* Accordion Rows */}
          <div className="service-info">
            {serviceItems.map((item, idx) => {
              const isExpanded = activeService === idx;

              return (
                <div
                  key={item.id}
                  className={`service-list-wrapper ${item.wrapperClass} w-dyn-list`}
                >
                  <div role="list" className="service-list w-dyn-items">
                    <div role="listitem" className="service-list-item w-dyn-item">
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        onClick={() => toggle(idx)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggle(idx);
                          }
                        }}
                        data-w-id={item.dataWId}
                        className={`service-info-link w-inline-block ${
                          isExpanded ? "is-expanded" : ""
                        }`}
                        style={{ cursor: "pointer" }}
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
                                alt={t(item.imageAlt)}
                                className="service-image"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </div>

                          <div className="service-content-wrap">
                            <div className="service-name-wrapper">
                              <div>
                                <div
                                  style={{
                                    display: "inline-block",
                                    fontSize: "0.82rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "var(--color--primary-1, #f66234)",
                                    marginBottom: "4px",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {t(item.tagKey)}
                                </div>
                                <h3 className="service-name">{t(item.nameKey)}</h3>
                                <p
                                  style={{
                                    fontSize: "0.92rem",
                                    color: "#666",
                                    marginTop: "6px",
                                    marginBottom: 0,
                                    lineHeight: 1.5,
                                    maxWidth: "520px",
                                  }}
                                >
                                  {t(item.descriptionKey)}
                                </p>
                              </div>
                            </div>

                            <div className="service-feature-list">
                              <div className="service-feature-text">
                                {t("Features")} · {t(item.modelKey)}
                              </div>
                              <div className="feature-list-item">
                                {item.features.map((feat, fIdx) => (
                                  <div key={fIdx} className="feature-item-inner">
                                    <img
                                      src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                                      loading="lazy"
                                      alt="Check"
                                      className="feature-item-icon"
                                    />
                                    <div className="feature-item">{t(feat)}</div>
                                  </div>
                                ))}
                              </div>

                              <div style={{ marginTop: "14px" }}>
                                <a
                                  href="#production-fit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="text-link"
                                  style={{
                                    fontSize: "0.88rem",
                                    fontWeight: 600,
                                    color: "var(--color--primary-1, #f66234)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    textDecoration: "none",
                                  }}
                                >
                                  <span>{t("Explore this technique")}</span>
                                  <span>→</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow Micro-Interaction */}
                        <div className="service-arrow">
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
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="service-box-height"></div>
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
    </section>
  );
}
