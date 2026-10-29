"use client";

import { useSite } from "@/components/interactions/SiteContext";
import { ecosystem } from "@/data/onos-content";

export function Ecosystem() {
  const { language, t } = useSite();

  return (
    <section id="ecosystem" className="ecosystem-section section-spacing">
      <div className="container-full">
        {/* Section Heading */}
        <div className="section-title-wrap one" style={{ marginBottom: "40px" }}>
          <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
            <div className="pre-section-title-inner">
              <div className="pre-section-title-square"></div>
              <div className="pre-section-title">{t("The Onos ecosystem")}</div>
            </div>
          </div>
          <div className="section-title-wrap one">
            <h2
              data-w-id="e0996841-f620-1bfa-e60f-90db2077eef1"
              className="section-title"
            >
              {language === "vi" ? (
                <>
                  Kết nối bởi <span className="text-linear-gradient">một tầm nhìn</span>
                </>
              ) : (
                <>
                  Connected by <span className="text-linear-gradient">one ambition</span>
                </>
              )}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#777",
                marginTop: "12px",
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              {t("Three doors into Onos. Find the team that fits where you want to go.")}
            </p>
          </div>
        </div>

        {/* 3 Ecosystem Cards */}
        <div
          className="ecosystem-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {ecosystem.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ecosystem-card w-inline-block"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "36px 32px",
                borderRadius: "12px",
                backgroundColor: "var(--color--black, #141414)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--color--primary-1, #f66234)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div>
                {/* Header: Symbol & Audience */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color--primary-1, #f66234)",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {item.symbol}
                  </span>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#888",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    {t(item.audience)}
                  </span>
                </div>

                {/* Entity Name & Arrow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--color--white, #fff)",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--color--primary-1, #f66234)",
                      transition: "transform 0.3s ease",
                    }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgb(170, 170, 170)",
                    lineHeight: 1.6,
                    margin: "0 0 24px 0",
                  }}
                >
                  {t(item.description)}
                </p>
              </div>

              {/* Destination Domain */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#999",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono, monospace)",
                  width: "fit-content",
                }}
              >
                <span>{item.domain}</span>
              </div>
            </a>
          ))}
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
