"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { factories, factoryPhotos } from "@/data/onos-content";

export function NetworkSlider() {
  const { language, t } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activePhoto = factoryPhotos[currentSlide];
  const activeFacility =
    factories.find((f) => f.code === activePhoto.facilityCode) || factories[0];

  const totalSlides = factoryPhotos.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => goToSlide(currentSlide - 1), [goToSlide, currentSlide]);
  const next = useCallback(() => goToSlide(currentSlide + 1), [goToSlide, currentSlide]);

  const goToFacility = (code: string) => {
    const fac = factories.find((f) => f.code === code);
    if (fac) {
      goToSlide(fac.primarySlide);
    }
  };

  // Slideshow auto-advance (5200ms) matching original ONOS facilities-carousel.js
  useEffect(() => {
    if (isPaused || isHovered) return;
    const timer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5200);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused, isHovered, goToSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0) next();
      else prev();
    }
    touchStartRef.current = null;
  };

  return (
    <section id="network" className="case-study-section section-spacing">
      <div className="container-full">
        {/* Section Title Header */}
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

        {/* 3-Facility Quick Discover Switcher */}
        <div
          className="facility-tabs-bar"
          role="tablist"
          aria-label={t("Three plants. One connected team.")}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {factories.map((fac) => {
            const isSelected = activeFacility.code === fac.code;
            return (
              <button
                key={fac.code}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => goToFacility(fac.code)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "24px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backgroundColor: isSelected ? "var(--color--primary-1, #f66234)" : "rgba(255, 255, 255, 0.06)",
                  color: isSelected ? "white" : "var(--color--white)",
                  border: isSelected ? "1px solid var(--color--primary-1, #f66234)" : "1px solid rgba(255, 255, 255, 0.15)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ opacity: isSelected ? 1 : 0.7, fontWeight: 700 }}>{fac.code}</span>
                <span>{t(fac.name)}</span>
              </button>
            );
          })}
        </div>

        {/* Main Slider Container */}
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-w-id="07cc8b02-829c-0744-9683-1d2336d4de7f"
          className="case-study-info"
          style={{ outline: "none" }}
        >
          <div
            className="case-study-slider w-slider"
            role="region"
            aria-roledescription="carousel"
            aria-label={t("Onos production facilities")}
          >
            <div className="case-study-slider-mask w-slider-mask">
              {factoryPhotos.map((photo, idx) => {
                const isActive = idx === currentSlide;
                const photoFacility =
                  factories.find((f) => f.code === photo.facilityCode) || activeFacility;

                return (
                  <div
                    key={photo.id}
                    className={`case-study-slide w-slide ${isActive ? "" : "w-hidden"}`}
                    style={{
                      display: isActive ? "block" : "none",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                    role="group"
                    aria-label={`Slide ${idx + 1} of ${totalSlides}: ${t(photo.caption)}`}
                  >
                    <div className="case-study-list-wrapper w-dyn-list">
                      <div role="list" className="case-study-list w-dyn-items">
                        <div role="listitem" className="case-study-list-item w-dyn-item">
                          <div className="w-layout-grid grid-case-study">
                            {/* Left Info Panel */}
                            <div className="case-study-info-left">
                              <div className="case-study-inner">
                                <div className="case-study-content-wrap">
                                  {/* Facility Code & Name */}
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        padding: "3px 8px",
                                        borderRadius: "4px",
                                        backgroundColor: "rgba(246, 98, 52, 0.15)",
                                        color: "var(--color--primary-1, #f66234)",
                                        fontSize: "0.85rem",
                                        fontWeight: 700,
                                        fontFamily: "var(--font-mono, monospace)",
                                      }}
                                    >
                                      {photoFacility.code}
                                    </span>
                                    <span style={{ fontSize: "0.85rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                      {t(photo.location)}
                                    </span>
                                  </div>

                                  <h3 className="case-study-name" style={{ marginTop: "4px" }}>
                                    {t(photoFacility.name)} · {t(photoFacility.role)}
                                  </h3>
                                  <p className="case-study-description">
                                    {t(photoFacility.description)}
                                  </p>

                                  {/* Verified Equipment & Process Highlight */}
                                  <div
                                    style={{
                                      marginTop: "16px",
                                      padding: "12px 14px",
                                      borderRadius: "6px",
                                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                                      borderLeft: "3px solid var(--color--primary-1, #f66234)",
                                    }}
                                  >
                                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color--white)" }}>
                                      {t(photo.caption)}
                                    </div>
                                    <div style={{ fontSize: "0.82rem", color: "#999", marginTop: "4px" }}>
                                      {t(photo.equipmentNote)}
                                    </div>
                                  </div>
                                </div>

                                <div className="case-study-score-info">
                                  <div className="case-study-score-info-inner">
                                    <h3 className="case-study-score">{photoFacility.code}</h3>
                                    <div className="case-study-score-text">
                                      {t(photoFacility.location)}
                                    </div>
                                  </div>
                                  <div className="case-study-button">
                                    <a
                                      data-wf--button-arrow--variant="button-white-bg"
                                      data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                                      href="#contact"
                                      className="primary-button w-variant-e5ebfb29-ba2d-88c3-9b4e-1bbc038e3a15 w-inline-block"
                                    >
                                      <div className="button-primary-inner">
                                        <div className="button-text-wrap">
                                          <div className="button-text">
                                            {t("View Plant Details")}
                                          </div>
                                          <div className="button-hover-text">
                                            {t("View Plant Details")}
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

                            {/* Right Image Panel */}
                            <div className="case-study-image-wrapper">
                              <a
                                href={`/assets/onos-${photo.image}.webp`}
                                className="case-study-image-link w-inline-block w-lightbox"
                                data-lightbox={JSON.stringify({
                                  items: factoryPhotos.map((p) => ({
                                    type: "image",
                                    url: `/assets/onos-${p.image}.webp`,
                                  })),
                                  group: "factory-network",
                                })}
                                aria-label={`${t("Expand facility photograph")}: ${t(photo.caption)}`}
                              >
                                <img
                                  src={`/assets/onos-${photo.image}.webp`}
                                  loading={idx === 0 ? "eager" : "lazy"}
                                  alt={t(photo.alt)}
                                  className="case-study-image"
                                  style={{ objectFit: "cover" }}
                                />
                                <div className="case-study-image-layout">
                                  <div
                                    style={{
                                      position: "absolute",
                                      bottom: "16px",
                                      left: "16px",
                                      backgroundColor: "rgba(0, 0, 0, 0.65)",
                                      backdropFilter: "blur(4px)",
                                      padding: "6px 12px",
                                      borderRadius: "4px",
                                      color: "white",
                                      fontSize: "0.82rem",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    <span style={{ fontWeight: 600 }}>{t(photo.caption)}</span>
                                    <span style={{ opacity: 0.6 }}>·</span>
                                    <span style={{ opacity: 0.75 }}>{idx + 1} / {totalSlides}</span>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Navigation Arrows */}
            <button
              type="button"
              onClick={prev}
              className="slider-arrow-left _01 w-slider-arrow-left"
              aria-label={t("Previous photo")}
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
              aria-label={t("Next photo")}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img
                src="/assets/2b24032b0ac7-68e1e92ebc2f8e7f7dd6d052_testimonial-Slide-Arrow--1-.svg"
                loading="lazy"
                alt="Next"
                className="slide-arrow"
              />
            </button>

            {/* Photo Pagination Dots + Pause/Play Controls */}
            <div
              className="facility-bottom-controls"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <div
                className="facility-dots"
                role="group"
                aria-label={t("Choose a photo")}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {factoryPhotos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    aria-label={`${t("Show photo")} ${i + 1}`}
                    aria-current={i === currentSlide ? "step" : "false"}
                    style={{
                      width: i === currentSlide ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor: i === currentSlide ? "var(--color--primary-1, #f66234)" : "rgba(255, 255, 255, 0.25)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Pause / Play Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? t("Play slideshow") : t("Pause slideshow")}
                aria-pressed={isPaused}
                style={{
                  background: "none",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color--white)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
              >
                {isPaused ? "▶" : "Ⅱ"}
              </button>
            </div>
          </div>

          {/* Under-slider Support Strip (Sampling Line Assistance) */}
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
