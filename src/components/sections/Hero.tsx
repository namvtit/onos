"use client";

import { useSite } from "@/components/interactions/SiteContext";

export function Hero() {
  const { language, t } = useSite();

  return (
    <section id="home" className="hero-section section-spacing-top">
      <div className="container-full">
        <div className="hero-wrap">
          <div className="w-layout-grid grid-hero">
            <div className="hero-left-wrap">
              <div
                data-w-id="257211a5-2a9d-1221-d387-56b813a33b41"
                className="hero-left-inner"
              >
                <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
                  <div className="pre-section-title-inner">
                    <div className="pre-section-title-square"></div>
                    <div className="pre-section-title">
                      {t("ONOS GLOBAL / PRINT-ON-DEMAND")}
                    </div>
                  </div>
                </div>
                <div className="hero-title-wrap">
                  <h1 className="hero-title">
                    {language === "vi" ? (
                      <>
                        Sáng Tạo Không Ngừng.{" "}
                        <span className="text-linear-gradient">Nâng tầm giá trị.</span>
                      </>
                    ) : (
                      <>
                        Innovating without limits.{" "}
                        <span className="text-linear-gradient">Elevating value.</span>
                      </>
                    )}
                  </h1>
                </div>
              </div>
            </div>

            <div
              data-w-id="89b15f62-94c9-1c8d-5eb8-ed12f4e88666"
              className="hero-right-wrap"
            >
              <div className="hero-content-text">
                {"// " + t("VIETNAM + UNITED STATES") + " //"}
              </div>
              <p className="hero-description">
                {t(
                  "A production partner for ambitious brands. Printing, embroidery and fulfillment, connected across Vietnam and the United States."
                )}
              </p>
              <div className="hero-button">
                <a
                  data-wf--button-arrow--variant="base"
                  data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                  href="#capabilities"
                  className="primary-button w-inline-block"
                >
                  <div className="button-primary-inner">
                    <div className="button-text-wrap">
                      <div className="button-text-inner">
                        <div className="button-text">{t("Find your production fit")}</div>
                        <div className="button-hover-text">{t("Find your production fit")}</div>
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

          <div className="hero-bottom-wrap">
            <div
              id="w-node-_7dec0c57-d1b2-b423-ef21-282893928583-f8801f19"
              data-w-id="7dec0c57-d1b2-b423-ef21-282893928583"
              className="hero-bottom-text"
            >
              {t("Vietnam ↔ USA")}
            </div>
            <a
              id="w-node-_33e8caeb-8f86-0a37-d251-e7111d4b615c-f8801f19"
              data-w-id="33e8caeb-8f86-0a37-d251-e7111d4b615c"
              href="#about"
              className="hero-bottom-link"
            >
              {t("SCROLL DOWN")}
            </a>
            <div
              id="w-node-_22ca442b-6b4e-ae70-b69a-dc7eb35ab8aa-f8801f19"
              data-w-id="22ca442b-6b4e-ae70-b69a-dc7eb35ab8aa"
              className="hero-bottom-text"
            >
              {"21.0278° N, 105.8342° E"}
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
      <div className="noise-overlay"></div>
    </section>
  );
}
