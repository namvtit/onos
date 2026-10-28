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

          <div
            data-current={`Tab ${activeTab + 1}`}
            data-easing="ease-in"
            data-duration-in="0"
            data-duration-out="0"
            className="industry-tabs w-tabs"
          >
            {/* Tab links */}
            <div
              data-w-id="b1ef9828-72eb-84fa-b442-e2f6281f5c8c"
              className="industry-tabs-menu w-tab-menu"
              role="tablist"
            >
              {methods.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                  className={`industry-tabs-link w-inline-block w-tab-link ${
                    activeTab === idx ? "w--current" : ""
                  }`}
                  style={{ textAlign: "left", width: "100%", background: "none", border: "none" }}
                >
                  <div>{t(m.title)}</div>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              data-w-id="b1ef9828-72eb-84fa-b442-e2f6281f5c96"
              className="industry-tabs-content w-tab-content"
            >
              <div className="industry-tabs-pane w-tab-pane w--tab-active" role="tabpanel">
                <div className="industry-content-info">
                  <div className="industry-image-wrapper">
                    <img
                      src={`/assets/onos-${currentMethod.image}.webp`}
                      alt={t(currentMethod.title)}
                      loading="lazy"
                      className="industry-image"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="industry-content">
                    <div className="industry-icon-box">
                      <img
                        loading="lazy"
                        src="/assets/7ffd01c4687d-68dfa2eeedefd61b2678f7ae_Industry-icon.svg"
                        alt="Method Icon"
                        className="industry-icon"
                      />
                    </div>
                    <h3 className="industry-name">{t(currentMethod.title)}</h3>
                    <p className="industry-description">{t(currentMethod.description)}</p>

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

                    <div style={{ marginTop: "28px" }}>
                      <a
                        data-wf--button-arrow--variant="base"
                        data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                        href={inquiryHref(language, currentMethod.title)}
                        className="primary-button w-inline-block"
                      >
                        <div className="button-primary-inner">
                          <div className="button-text-wrap">
                            <div className="button-text-inner">
                              <div className="button-text">{t("Enquire About This Method")}</div>
                              <div className="button-hover-text">{t("Enquire About This Method")}</div>
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
      <img
        src="/assets/ae27370f52d3-68dfaa6a28c7a7c7d48d1369_Industry-image-bg--5-.png"
        loading="lazy"
        data-w-id="bb1d146f-3020-9314-d86a-8b5d20f602bd"
        alt="Industry image BG"
        className="industry-image-bg two"
      />
      <img
        src="/assets/a18541310af5-68dfaa6a72a48addb404ecaf_Industry-image-bg--1-.png"
        loading="lazy"
        data-w-id="ec80440d-ee55-273b-2ae9-ce265c3afa17"
        alt="Industry image BG"
        className="industry-image-bg three"
      />
      <img
        src="/assets/b38b158ba43b-68dfaa6ba66a9dbc9c52d860_Industry-image-bg--3-.png"
        loading="lazy"
        data-w-id="17719652-441a-8e4d-6709-ab16c3504a7d"
        alt="Industry image BG"
        className="industry-image-bg four"
      />
      <img
        src="/assets/69f77842671e-68dfaae5b689f779b96d4111_Industry-image-bg--4-.png"
        loading="lazy"
        data-w-id="67adcfec-de99-018d-1042-48952abe5b3f"
        alt="Industry image BG"
        className="industry-image-bg five"
      />

      <div className="line-wrapper">
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
      </div>
      <div className="noise-overlay"></div>
    </section>
  );
}
