"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { factories } from "@/data/onos-content";

export function NetworkSlider() {
  const { language, t } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () => setCurrentSlide((c) => (c - 1 + factories.length) % factories.length);
  const next = () => setCurrentSlide((c) => (c + 1) % factories.length);

  return (
    <section id="network" className="case-study-section section-spacing">
      <div className="container-full">
        <div className="section-title-wrap one">
          <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
            <div className="pre-section-title-inner">
              <div className="pre-section-title-square"></div>
              <div className="pre-section-title">{t("Manufacturing Network")}</div>
            </div>
          </div>
          <div className="section-title-wrap one">
            <h2
              data-w-id="9d872462-3a61-1c11-5760-a0f5066f94a7"
              className="section-title"
            >
              {language === "vi" ? (
                <>
                  Ba nhà máy. <span className="text-linear-gradient">Một đội ngũ</span> kết nối
                </>
              ) : (
                <>
                  Three plants. <span className="text-linear-gradient">One connected</span> team
                </>
              )}
            </h2>
          </div>
        </div>

        <div className="case-study-info">
          <div
            data-delay="4000"
            data-animation="fade"
            data-autoplay="false"
            data-easing="ease-in-out"
            data-hide-arrows="false"
            data-disable-swipe="false"
            data-duration="500"
            data-infinite="true"
            className="case-study-slider w-slider"
            role="region"
            aria-label="carousel"
          >
            <div className="case-study-slider-mask w-slider-mask">
              {factories.map((f, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <div
                    key={f.code}
                    className={`case-study-slide w-slide ${isActive ? "" : "w-hidden"}`}
                    style={{
                      display: isActive ? "block" : "none",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                    role="group"
                    aria-label={`Slide ${idx + 1} of ${factories.length}`}
                  >
                    <div className="case-study-list-wrapper w-dyn-list">
                      <div role="list" className="case-study-list w-dyn-items">
                        <div role="listitem" className="case-study-list-item w-dyn-item">
                          <div className="w-layout-grid grid-case-study">
                            <div className="case-study-info-left">
                              <div className="case-study-inner">
                                <div className="case-study-content-wrap">
                                  <h3 className="case-study-name">
                                    {f.name} · {t(f.role)}
                                  </h3>
                                  <p className="case-study-description">
                                    {t(f.description)}
                                  </p>
                                </div>
                                <div className="case-study-score-info">
                                  <div className="case-study-score-info-inner">
                                    <h3 className="case-study-score">{f.code}</h3>
                                    <div className="case-study-score-text">
                                      {t(f.location)}
                                    </div>
                                  </div>
                                  <div className="case-study-button">
                                    <a
                                      data-wf--button-arrow--variant="button-white-bg"
                                      href="#contact"
                                      className="primary-button w-variant-e5ebfb29-ba2d-88c3-9b4e-1bbc038e3a15 w-inline-block"
                                    >
                                      <div className="button-primary-inner">
                                        <div className="button-text-wrap">
                                          <div className="button-text-inner">
                                            <div className="button-text">
                                              {t("View Plant Details")}
                                            </div>
                                            <div className="button-hover-text">
                                              {t("View Plant Details")}
                                            </div>
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
                              <img
                                src="/assets/1fa0b5bc68d0-68e0c2f936f3a375961dd0a0_shadow.png"
                                loading="lazy"
                                alt="Shadow"
                                className="case-study-box-shadow"
                              />
                            </div>
                            <div className="case-study-info-right">
                              <div className="case-study-image-info">
                                <img
                                  src={`/assets/onos-${f.image}.webp`}
                                  loading="lazy"
                                  alt={f.name}
                                  className="case-study-image"
                                  style={{ objectFit: "cover" }}
                                />
                                <div className="case-study-image-layout"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider arrows */}
            <button
              type="button"
              onClick={prev}
              className="slider-arrow-left _01 w-slider-arrow-left"
              aria-label="Previous slide"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img
                src="/assets/d0719d01877a-68e1e92efee16c7f8fdae6b1_testimonial-Slide-Arrow--2-.svg"
                loading="lazy"
                alt="Previous"
                className="slide-arrow"
              />
            </button>
            <button
              type="button"
              onClick={next}
              className="slider-arrow-right _02 w-slider-arrow-right"
              aria-label="Next slide"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img
                src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                loading="lazy"
                alt="Next"
                className="slide-arrow"
              />
            </button>
            <div className="slide-nav w-slider-nav w-round w-num"></div>
          </div>

          {/* Under-slider support strip */}
          <div className="info-help-wrap">
            <div
              data-w-id="6db9d72d-320a-8c44-bd97-18e1a89657ba"
              className="w-layout-grid grid-help-line"
            >
              <div className="help-info-left">
                <div className="help-info-inner">
                  <div className="help-line-image-wrap">
                    <img
                      src="/assets/onos-sample-development.webp"
                      loading="lazy"
                      alt="Team"
                      className="help-line-image"
                    />
                    <img
                      src="/assets/onos-partner-meeting.webp"
                      loading="lazy"
                      alt="Team"
                      className="help-line-image one"
                    />
                  </div>
                  <div className="help-line-content-wrap">
                    <h3 className="help-line-title">{t("Need some help?")}</h3>
                    <div className="help-line-text">
                      {t("We’re here to provide support and assistance.")}
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="w-node-a89d5963-17c9-fd1f-c13a-f4715b752d09-f8801f19"
                className="help-line-button"
              >
                <a
                  data-wf--button-arrow--variant="base"
                  data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                  href="#contact"
                  className="primary-button w-inline-block"
                >
                  <div className="button-primary-inner">
                    <div className="button-text-wrap">
                      <div className="button-text-inner">
                        <div className="button-text">{t("Request A Sample")}</div>
                        <div className="button-hover-text">{t("Request A Sample")}</div>
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
    </section>
  );
}
