"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { galleryPhotos } from "@/data/onos-content";

export function GalleryTestimonials() {
  const { language, t } = useSite();
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const current = galleryPhotos[activePhoto];
  const total = galleryPhotos.length;

  const prev = useCallback(() => setActivePhoto((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setActivePhoto((c) => (c + 1) % total), [total]);

  // Lightbox keyboard controls: Escape, Left, Right
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        openerRef.current?.focus();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, prev, next]);

  const openLightbox = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, idx: number) => {
    e.preventDefault();
    setActivePhoto(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    openerRef.current?.focus();
  };

  return (
    <section id="gallery" className="testimonial-section section-spacing">
      <div className="container-full">
        <div className="testimonial-info-main">
          {/* Section Header */}
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
              {/* Left Thumbnail Strip */}
              <div
                className="testimonial-tabs-menu w-tab-menu"
                role="tablist"
                aria-label={t("Real people. Real production.")}
              >
                {galleryPhotos.map((p, idx) => {
                  const isSelected = activePhoto === idx;
                  return (
                    <button
                      key={p.image}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActivePhoto(idx)}
                      className={`testimonial-tabs-link w-inline-block w-tab-link ${
                        isSelected ? "w--current" : ""
                      }`}
                      style={{
                        background: "none",
                        border: isSelected ? "2px solid var(--color--primary-1, #f66234)" : "2px solid transparent",
                        borderRadius: "8px",
                        padding: 0,
                        cursor: "pointer",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <img
                        src={`/assets/onos-${p.image}.webp`}
                        alt={t(p.alt)}
                        loading="lazy"
                        className="testimonial-image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Main Preview Card */}
              <div className="testimonial-tabs-content w-tab-content">
                <div className="testimonial-tabs-pane w-tab-pane w--tab-active" role="tabpanel">
                  <div className="testimonial-info">
                    <div className="testimonial-info-inner">
                      {/* Photo Mono Index and Verified Caption */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-mono, monospace)",
                            color: "var(--color--primary-1, #f66234)",
                          }}
                        >
                          {current.mono}
                        </span>
                        <h3
                          className="testimonial-card-heading"
                          style={{
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            color: "var(--color--white)",
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {t(current.caption)}
                        </h3>
                      </div>

                      {/* Photo Description / Alt Context */}
                      <p style={{ fontSize: "0.92rem", color: "rgb(187, 187, 187)", margin: "4px 0 16px 0", lineHeight: 1.5 }}>
                        {t(current.alt)}
                      </p>

                      {/* Main Image with Zoom Trigger */}
                      <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                        <button
                          ref={openerRef}
                          type="button"
                          onClick={(e) => openLightbox(e, activePhoto)}
                          aria-label={`${t("Expand facility photograph")}: ${t(current.caption)}`}
                          style={{
                            width: "100%",
                            padding: 0,
                            border: "none",
                            background: "none",
                            cursor: "zoom-in",
                            display: "block",
                          }}
                        >
                          <img
                            src={`/assets/onos-${current.image}.webp`}
                            alt={t(current.alt)}
                            loading="lazy"
                            style={{
                              width: "100%",
                              maxHeight: "360px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              display: "block",
                            }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Footer Details & Prev/Next Navigation */}
                    <div className="author-details">
                      <div className="author-name" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color--white)" }}>
                        {t("Production Network & Facilities")}
                      </div>
                      <div className="author-job-title">
                        {t("Vietnam ↔ USA")} · {activePhoto + 1} / {total}
                      </div>

                      {/* Arrows */}
                      <div className="testimonial-arrow-wrap" style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                        <button
                          type="button"
                          onClick={prev}
                          aria-label={t("Previous photo")}
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "white",
                          }}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          aria-label={t("Next photo")}
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "white",
                          }}
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Balanced 2-Column Composition */}
            <div className="testimonial-more-info">
              {/* Top Card: Metrics & Authenticity */}
              <div
                data-w-id="3c0ff7e9-dac1-81ef-d189-54acdf24a6e9"
                className="testimonial-inner"
              >
                <div className="testimonial-image-wrap">
                  <img
                    src="/assets/onos-warehouse-inventory.webp"
                    loading="lazy"
                    alt="Onos Garment Inventory & Fulfillment"
                    className="testimonial-info-image"
                    style={{ width: "100%", height: "240px", objectFit: "cover" }}
                  />
                  <div className="testimonial-layout">
                    <div className="logo-info-text">{"// 2019-2026 //"}</div>
                    <img
                      src="/assets/onos-wordmark.svg"
                      loading="lazy"
                      alt="ONOS Global"
                      className="logo-image"
                      style={{ maxHeight: "20px", width: "auto" }}
                    />
                  </div>
                </div>

                <div className="testimonial-counter-wrapper">
                  <div className="counter-inner-wrap">
                    <div className="counter">
                      <div className="inner-number testimonial-counter">
                        <div className="numbers-counts">
                          <div data-target="99" className="count">99</div>
                        </div>
                        <div className="counter-symbol text-dark">
                          <div>%</div>
                        </div>
                      </div>
                      <div className="counter-text">{t("On-time fulfillment rate")}</div>
                    </div>

                    <div className="counter">
                      <div className="inner-number testimonial-counter">
                        <div className="numbers-counts">
                          <div data-target="50" className="count">50</div>
                        </div>
                        <div className="counter-symbol text-dark">
                          <div>+</div>
                        </div>
                      </div>
                      <div className="counter-text">{t("Skilled craft specialists")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card: Need Guidance Support CTA */}
              <div
                data-w-id="875f79ed-bce3-0f38-c930-0a98b0b95d77"
                className="support-info-wrap"
              >
                <img
                  src="/assets/1fa0b5bc68d0-68e0c2f936f3a375961dd0a0_shadow.png"
                  loading="lazy"
                  alt=""
                  className="box-shadow"
                />
                <div className="support-info-inner">
                  <img
                    src="/assets/5c6703911d28-68e0bd5d66fbd6635638ea42_Icon.svg"
                    loading="lazy"
                    alt=""
                    className="support-icon"
                  />
                  <div>
                    <h3 className="support-title">
                      {t("Need help choosing the right product?")}
                    </h3>
                    <p className="support-description">
                      {t("Our specialists across Vietnam and the United States are ready to review your files, provide physical samples, and guide your run.")}
                    </p>
                  </div>
                  <div className="support-button">
                    <a
                      data-wf--button-arrow--variant="button-white-bg"
                      data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                      href="#contact"
                      className="primary-button w-variant-e5ebfb29-ba2d-88c3-9b4e-1bbc038e3a15 w-inline-block"
                    >
                      <div className="button-primary-inner">
                        <div className="button-text-wrap">
                          <div className="button-text-inner">
                            <div className="button-text">{t("Contact Support")}</div>
                            <div className="button-hover-text">{t("Contact Support")}</div>
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

      {/* Interactive Lightbox Modal */}
      {lightboxOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={t(current.caption)}
          onClick={closeLightbox}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={t("Close photograph")}
              style={{
                position: "absolute",
                top: "-44px",
                right: 0,
                background: "none",
                border: "none",
                color: "white",
                fontSize: "2rem",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Modal Image */}
            <img
              src={`/assets/onos-${current.image}.webp`}
              alt={t(current.alt)}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
              }}
            />

            {/* Modal Caption */}
            <div
              style={{
                marginTop: "16px",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {current.mono} · {t(current.caption)}
              </div>
              <div style={{ fontSize: "0.88rem", color: "rgb(170, 170, 170)" }}>
                {t(current.alt)} ({activePhoto + 1} / {total})
              </div>
            </div>

            {/* Lightbox Navigation Controls */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t("Previous photo")}
              style={{
                position: "absolute",
                left: "-56px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                color: "white",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={t("Next photo")}
              style={{
                position: "absolute",
                right: "-56px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                color: "white",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
