"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { methods, inquiryHref } from "@/data/onos-content";

export function IndustryFinder() {
  const { language, t } = useSite();
  const [activeTab, setActiveTab] = useState(0);

  const currentMethod = methods[activeTab];

  return (
    <section id="production-fit" className="industry-section">
      <span id="finder" className="onos-anchor-alias" aria-hidden="true" />
      <div className="container">
        <div className="industry-info-main section-spacing">
          {/* Section Heading */}
          <div
            data-w-id="cd4d3bf3-e255-714a-a12d-0490dd2d2cf9"
            className="section-title-center"
          >
            <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
              <div className="pre-section-title-inner">
                <div className="pre-section-title-square"></div>
                <div className="pre-section-title">{t("Choose A Production Method")}</div>
              </div>
            </div>
            <h2 className="section-title title-center">
              {language === "vi" ? (
                <>
                  Giải pháp <span className="text-linear-gradient">sản xuất</span> cho từng dòng sản phẩm
                </>
              ) : (
                <>
                  Manufacturing <span className="text-linear-gradient">solutions</span> for every product
                </>
              )}
            </h2>
          </div>

          {/* 4 Tabs Navigation */}
          <div
            data-current={`Tab ${activeTab + 1}`}
            className="industry-tabs w-tabs"
          >
            <div
              data-w-id="b1ef9828-72eb-84fa-b442-e2f6281f5c8c"
              className="industry-tabs-menu w-tab-menu"
              role="tablist"
              aria-label={t("Choose A Production Method")}
            >
              {methods.map((m, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    id={`tab-${m.id}`}
                    aria-controls={`panel-${m.id}`}
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(idx)}
                    className={`industry-tabs-link w-inline-block w-tab-link ${
                      isSelected ? "w--current" : ""
                    }`}
                    style={{ textAlign: "left", width: "100%", background: "none", border: "none", cursor: "pointer" }}
                  >
                    <div>{t(m.title)}</div>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div
              data-w-id="b1ef9828-72eb-84fa-b442-e2f6281f5c96"
              className="industry-tabs-content w-tab-content"
            >
              <div
                id={`panel-${currentMethod.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentMethod.id}`}
                className="industry-tabs-pane w-tab-pane w--tab-active"
              >
                <div className="industry-content-info">
                  {/* Left Technique Image */}
                  <div className="industry-image-wrapper">
                    <img
                      src={`/assets/onos-${currentMethod.finderImage}.webp`}
                      alt={t(currentMethod.title)}
                      loading="lazy"
                      className="industry-image"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Right Content */}
                  <div className="industry-content">
                    <div className="industry-icon-box">
                      <img
                        loading="lazy"
                        src="/assets/7ffd01c4687d-68dfa2eeedefd61b2678f7ae_Industry-icon.svg"
                        alt="Method Icon"
                        className="industry-icon"
                      />
                    </div>
                    <div style={{ display: "inline-block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color--primary-1, #f66234)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                      {t(currentMethod.model)}
                    </div>
                    <h3 className="industry-name">{t(currentMethod.title)}</h3>
                    <p className="industry-description">{t(currentMethod.description)}</p>

                    {/* Verified Specs / Requirements List */}
                    <div className="industry-list">
                      <div className="industry-list-item">
                        <img
                          loading="lazy"
                          src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                          alt="Check"
                          className="industry-list-icon"
                        />
                        <div className="industry-list-text">
                          <strong>{t("Material")}:</strong> {t(currentMethod.material)}
                        </div>
                      </div>
                      <div className="industry-list-item">
                        <img
                          loading="lazy"
                          src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                          alt="Check"
                          className="industry-list-icon"
                        />
                        <div className="industry-list-text">
                          <strong>{t("Applications")}:</strong> {t(currentMethod.applications)}
                        </div>
                      </div>
                      <div className="industry-list-item">
                        <img
                          loading="lazy"
                          src="/assets/050aeaa60359-68dfa44d1abc142af68c1e2d_list-icon.svg"
                          alt="Check"
                          className="industry-list-icon"
                        />
                        <div className="industry-list-text">
                          <strong>{t("Preparation")}:</strong> {t(currentMethod.preparation)}
                        </div>
                      </div>
                    </div>

                    {/* Discuss This Product / Enquiry Button */}
                    <div style={{ marginTop: "28px" }}>
                      <a
                        data-wf--button-arrow--variant="base"
                        data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                        href={inquiryHref(language, currentMethod.title)}
                        className="primary-button w-inline-block"
                        id="method-email"
                      >
                        <div className="button-primary-inner">
                          <div className="button-text-wrap">
                            <div className="button-text-inner">
                              <div className="button-text">{t("Discuss this product")} ↗</div>
                              <div className="button-hover-text">{t("Discuss this product")} ↗</div>
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
      </div>

      <img
        src="/assets/48c00c6655df-68dfaa6b3891620d3b4a31f5_Industry-image-bg--2-.png"
        loading="lazy"
        data-w-id="68a88700-03b2-b1ae-401e-bd7fd327a74c"
        alt="Industry image BG"
        className="industry-image-bg one"
      />
    </section>
  );
}
