"use client";

import { useSite } from "@/components/interactions/SiteContext";

export function WhatWeManufacture() {
  const { t } = useSite();

  return (
    <section id="products" className="product-section">
      <div className="bg-shadow">
        <div className="bg-vector"></div>
      </div>
      <div className="product-main section-spacing">
        <div className="container">
          <div className="products-counter-main">
            <div
              data-w-id="5dc285f3-2c1b-5d8e-a87b-8fc080957d58"
              className="products-counter-wrap"
            >
              <div
                data-wf--pre-section-title--variant="bg-dark"
                className="pre-section-title-wrap w-variant-de5a90dc-c401-95a9-b09f-388955c5be35"
              >
                <div className="pre-section-title-inner">
                  <div className="pre-section-title-square"></div>
                  <div className="pre-section-title w-variant-de5a90dc-c401-95a9-b09f-388955c5be35">
                    {t("What we manufacture")}
                  </div>
                </div>
              </div>
              <div className="products-counter-inner">
                <div className="inner-number like-score">
                  <div className="numbers-counts">
                    <div data-target="50" className="count">
                      50
                    </div>
                  </div>
                  <div className="counter-symbol text-primary">
                    <div>+</div>
                  </div>
                </div>
                <p className="products-counter-description">
                  {t(
                    "Production machines and automated lines across our Vietnam and USA facilities."
                  )}
                </p>
              </div>
            </div>
            <img
              src="/assets/035525d00d02-68dfbb0effbd3efe695a9fe0_Products-Icon.svg"
              loading="lazy"
              data-w-id="af52d740-e50f-ce19-4cc3-814bbe0cdac6"
              alt="Product Info Graphic"
              className="product-info-image"
            />
          </div>
        </div>

        <div className="product-info-wrap">
          <div className="container-full">
            <div className="w-layout-grid grid-products">
              {/* Product Card 1 */}
              <div
                data-w-id="65983724-c324-f214-e8de-a17118ba2ece"
                className="product-info-main"
              >
                <h3 className="product-name">{t("DTG Cotton Apparel")}</h3>
                <div className="product-image-wrapper">
                  <img
                    src="/assets/onos-dtg-machine-detail.webp"
                    loading="lazy"
                    alt="DTG Apparel"
                    className="product-image"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="product-description">
                  {t(
                    "Direct-to-garment printing for photographs, gradients and detailed artwork on cotton and cotton-rich apparel."
                  )}
                </p>
                <div className="product-list">
                  <div className="product-list-item">
                    <div className="product-info">{t("Material")}</div>
                    <div className="product-info-text">
                      {t("100% Combed & Ring-Spun Cotton")}
                    </div>
                  </div>
                  <div className="product-list-item">
                    <div className="product-info">{t("Capability")}</div>
                    <div className="product-info-text">
                      {t("Single unit to bulk production")}
                    </div>
                  </div>
                  <div className="product-list-item last">
                    <div className="product-info">{t("Size Range")}</div>
                    <div className="product-info-text">{t("XS to 5XL sizing")}</div>
                  </div>
                </div>
              </div>

              {/* Product Card 2 */}
              <div
                data-w-id="c2ba7395-3c61-880b-0e5d-db3be41b693c"
                className="product-info-main"
              >
                <h3 className="product-name">
                  {t("Computerised Embroidered Headwear")}
                </h3>
                <div className="product-image-wrapper">
                  <img
                    src="/assets/onos-equipment-embroidery.webp"
                    loading="lazy"
                    alt="Embroidered Headwear"
                    className="product-image"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="product-description">
                  {t(
                    "Digitised designs and multi-head embroidery bring texture and a distinctive finish to your brand identity."
                  )}
                </p>
                <div className="product-list">
                  <div className="product-list-item">
                    <div className="product-info">{t("Material")}</div>
                    <div className="product-info-text">
                      {t("Cotton Twill, Wool Blend, Fleece")}
                    </div>
                  </div>
                  <div className="product-list-item">
                    <div className="product-info">{t("Capability")}</div>
                    <div className="product-info-text">
                      {t("3D puff & flat embroidery")}
                    </div>
                  </div>
                  <div className="product-list-item last">
                    <div className="product-info">{t("Size Range")}</div>
                    <div className="product-info-text">
                      {t("Caps, beanies, hoodie chest logos")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Card 3 */}
              <div
                data-w-id="b4c6cb8c-3886-37a5-d547-a30a7ddfc4d3"
                className="product-info-main"
              >
                <h3 className="product-name">
                  {t("All-Over Sublimation Sportswear")}
                </h3>
                <div className="product-image-wrapper">
                  <img
                    src="/assets/onos-press-machines-row.webp"
                    loading="lazy"
                    alt="Sublimation Sportswear"
                    className="product-image"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="product-description">
                  {t(
                    "All-over printing bonds colour into polyester fibres for expressive, full-coverage apparel and sportswear."
                  )}
                </p>
                <div className="product-list">
                  <div className="product-list-item">
                    <div className="product-info">{t("Material")}</div>
                    <div className="product-info-text">
                      {t("Moisture-wicking Performance Poly")}
                    </div>
                  </div>
                  <div className="product-list-item">
                    <div className="product-info">{t("Capability")}</div>
                    <div className="product-info-text">
                      {t("Full coverage all-over print")}
                    </div>
                  </div>
                  <div className="product-list-item last">
                    <div className="product-info">{t("Size Range")}</div>
                    <div className="product-info-text">
                      {t("Custom team & athletic apparel")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Card 4 */}
              <div
                data-w-id="46341948-216a-2f1c-951e-bce2e4a353f8"
                className="product-info-main"
              >
                <h3 className="product-name">
                  {t("Laser-Cut Gifts & Decorative Goods")}
                </h3>
                <div className="product-image-wrapper">
                  <img
                    src="/assets/onos-laser-cut-gifts.webp"
                    loading="lazy"
                    alt="Laser Cut Goods"
                    className="product-image"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="product-description">
                  {t(
                    "Precision cutting and engraving for personalised gifts and decor in wood, acrylic, leather and fabric."
                  )}
                </p>
                <div className="product-list">
                  <div className="product-list-item">
                    <div className="product-info">{t("Material")}</div>
                    <div className="product-info-text">
                      {t("Birch Ply, Acrylic, Genuine Leather")}
                    </div>
                  </div>
                  <div className="product-list-item">
                    <div className="product-info">{t("Capability")}</div>
                    <div className="product-info-text">
                      {t("Precision laser cut & etch")}
                    </div>
                  </div>
                  <div className="product-list-item last">
                    <div className="product-info">{t("Size Range")}</div>
                    <div className="product-info-text">
                      {t("Custom dimensions & packaging")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="product-inner-info">
            <h3
              data-w-id="272f39e4-51eb-e15a-5d52-d0b9bb610f28"
              className="product-info-title"
            >
              {t("Explore our complete product range across industries.")}
            </h3>
            <div
              data-w-id="2b4c5a0b-3ea6-4725-2cf9-ba9aec94d192"
              className="product-info-button-wrap"
            >
              <a href="#capabilities" className="download-link text-white">
                {t("Download Spec Sheet")}
              </a>
              <a
                data-wf--button-arrow--variant="button-primary-bg"
                data-w-id="d102baf6-0bbf-4311-9c79-6b424f8fe8a7"
                href="#contact"
                className="primary-button w-variant-5ae0b7d1-2e18-9989-4375-c73c98041680 w-inline-block"
              >
                <div className="button-primary-inner">
                  <div className="button-text-wrap">
                    <div className="button-text-inner">
                      <div className="button-text">{t("Discuss Your Product")}</div>
                      <div className="button-hover-text">{t("Discuss Your Product")}</div>
                    </div>
                  </div>
                  <div className="button-icon-bg w-variant-5ae0b7d1-2e18-9989-4375-c73c98041680">
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
      <div className="line-wrapper bg-dark-line">
        <div className="section-line"></div>
        <div className="section-line"></div>
        <div className="section-line"></div>
        <div className="section-line"></div>
        <div className="section-line"></div>
      </div>
    </section>
  );
}
