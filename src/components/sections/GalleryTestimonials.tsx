"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { galleryPhotos } from "@/data/onos-content";

export function GalleryTestimonials() {
  const { language, t } = useSite();
  const [activePhoto, setActivePhoto] = useState(0);

  const current = galleryPhotos[activePhoto];

  return (
    <section id="gallery" className="testimonial-section section-spacing">
      <div className="container-full">
        <div className="testimonial-info-main">
          <div
            data-w-id="70c67abc-bbb2-0225-8b62-b34415172d4c"
            className="section-title-center _01"
          >
            <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
              <div className="pre-section-title-inner">
                <div className="pre-section-title-square"></div>
                <div className="pre-section-title">{t("A Closer Look")}</div>
              </div>
            </div>
            <h2 className="section-title title-center">
              {language === "vi" ? (
                <>
                  Con người thật. <span className="text-linear-gradient">Sản xuất thật.</span>
                </>
              ) : (
                <>
                  Real people. <span className="text-linear-gradient">Real production.</span>
                </>
              )}
            </h2>
          </div>

          <div className="w-layout-grid grid-testimonial">
            <div
              data-w-id="5b9d076c-a381-6e6a-9705-5ca5cc1c9344"
              className="testimonial-tabs w-tabs"
            >
              {/* Left thumbnail strip */}
              <div className="testimonial-tabs-menu w-tab-menu" role="tablist">
                {galleryPhotos.map((p, idx) => (
                  <button
                    key={p.image}
                    type="button"
                    role="tab"
                    aria-selected={activePhoto === idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`testimonial-tabs-link w-inline-block w-tab-link ${
                      activePhoto === idx ? "w--current" : ""
                    }`}
                    style={{ background: "none", border: "none", padding: 0 }}
                  >
                    <img
                      src={`/assets/onos-${p.image}.webp`}
                      alt={t(p.caption)}
                      loading="lazy"
                      className="testimonial-image"
                      style={{ objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>

              {/* Main preview card with Lightbox interaction */}
              <div className="testimonial-tabs-content w-tab-content">
                <div className="testimonial-tabs-pane w-tab-pane w--tab-active">
                  <div className="testimonial-info">
                    <div className="testimonial-info-inner">
                      <div className="pre-section-title-wrap" style={{ marginBottom: "10px" }}>
                        <div className="pre-section-title-inner">
                          <div className="pre-section-title-square"></div>
                          <div className="pre-section-title" style={{ color: "var(--color--primary)", letterSpacing: "1px" }}>
                            {t("A Closer Look")}
                          </div>
                        </div>
                      </div>
                      <p className="testimonial-description">{t(current.caption)}</p>
                      <div style={{ marginTop: "16px", borderRadius: "8px", overflow: "hidden" }}>
                        <a
                          href={`/assets/onos-${current.image}.webp`}
                          className="w-lightbox"
                          data-lightbox={JSON.stringify({
                            items: galleryPhotos.map((p) => ({
                              type: "image",
                              url: `/assets/onos-${p.image}.webp`,
                            })),
                            group: "gallery",
                          })}
                        >
                          <img
                            src={`/assets/onos-${current.image}.webp`}
                            alt={t(current.caption)}
                            loading="lazy"
                            style={{
                              width: "100%",
                              maxHeight: "320px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              cursor: "zoom-in",
                            }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="author-details">
                      <h3 className="author-name">{t(current.caption)}</h3>
                      <div className="author-job-title">
                        {t("ONOS / PRODUCTION")} · {activePhoto + 1}/{galleryPhotos.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle and Right side stacked cards */}
            <div className="testimonial-more-info">
              <div
                data-w-id="3c0ff7e9-dac1-81ef-d189-54acdf24a6e9"
                className="testimonial-inner"
              >
                <div className="testimonial-image-wrap">
                  <img
                    src="/assets/onos-production-floor.webp"
                    loading="lazy"
                    alt="ONOS Production Floor"
                    className="testimonial-info-image"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="testimonial-layout">
                    <div className="logo-info-text">{"// ONOS GLOBAL //"}</div>
                    <img
                      src="/assets/onos-wordmark-light.svg"
                      loading="lazy"
                      alt="ONOS Global"
                      className="logo-image"
                      style={{ maxHeight: "24px", width: "auto" }}
                    />
                  </div>
                </div>

                <div className="testimonial-counter-wrapper">
                  <div className="counter-inner-wrap">
                    <div className="counter">
                      <div className="inner-number testimonial-counter">
                        <div className="numbers-counts">
                          <div data-target="3" data-pad="2" className="count">
                            03
                          </div>
                        </div>
                        <div className="counter-symbol text-dark">
                          <div></div>
                        </div>
                      </div>
                      <div className="counter-text">{t("Production plants")}</div>
                    </div>
                    <div className="counter">
                      <div className="inner-number testimonial-counter">
                        <div className="numbers-counts">
                          <div data-target="50" className="count">
                            50
                          </div>
                        </div>
                        <div className="counter-symbol text-dark">
                          <div>+</div>
                        </div>
                      </div>
                      <div className="counter-text">{t("Production machines")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div
                data-w-id="875f79ed-bce3-0f38-c930-0a98b0b95d77"
                className="support-info-wrap"
              >
                <img
                  src="/assets/1fa0b5bc68d0-68e0c2f936f3a375961dd0a0_shadow.png"
                  loading="lazy"
                  alt="Shadow"
                  className="box-shadow"
                />
                <div className="support-info-inner">
                  <img
                    src="/assets/5c6703911d28-68e0bd5d66fbd6635638ea42_Icon.svg"
                    loading="lazy"
                    alt="Support"
                    className="support-icon"
                  />
                  <div>
                    <h3 className="support-title">
                      {t("Need help choosing the right product?")}
                    </h3>
                    <p className="support-description">
                      {t(
                        "Always ready with guidance, product details, and after-sales support."
                      )}
                    </p>
                  </div>
                  <div className="support-button">
                    <a
                      data-wf--button-arrow--variant="button-white-bg"
                      data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                      href="#faq"
                      className="primary-button w-variant-e5ebfb29-ba2d-88c3-9b4e-1bbc038e3a15 w-inline-block"
                    >
                      <div className="button-primary-inner">
                        <div className="button-text-wrap">
                          <div className="button-text-inner">
                            <div className="button-text">{t("Ask Our Team")}</div>
                            <div className="button-hover-text">{t("Ask Our Team")}</div>
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
      </div>
    </section>
  );
}
