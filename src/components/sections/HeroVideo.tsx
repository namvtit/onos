"use client";

import { useSite } from "@/components/interactions/SiteContext";

export function HeroVideo() {
  const { t } = useSite();

  return (
    <div className="hero-video-wrap">
      <div
        data-poster-url="/assets/onos-embroidery-hero.webp"
        data-video-urls=""
        data-autoplay="true"
        data-loop="true"
        data-wf-ignore="true"
        className="hero-background-video w-background-video w-background-video-atom"
      >
        <img
          src="/assets/onos-embroidery-hero.webp"
          alt={t("Multi-head embroidery machines producing garments at Onos")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="hero-video-image"
        />
        <div className="hero-facility-indicator-bar">
          <div className="hero-facility-badge">
            <span className="facility-pulse-dot"></span>
            <span>{t("Active Facility · Thai Nguyen")}</span>
          </div>
          <a
            href="/assets/onos-embroidery-hero.webp"
            className="w-lightbox hero-lightbox-trigger"
            data-lightbox={JSON.stringify({
              items: [{
                type: "image",
                url: "/assets/onos-embroidery-hero.webp",
              }],
            })}
            aria-label={t("Expand facility photograph")}
            title={t("Expand facility photograph")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-quote-wrap">
        <div
          data-w-id="8094fac9-4cf8-16af-6b25-90966716d9c7"
          className="hero-quote-info"
        >
          <div className="hero-quote-card">
            <img
              src="/assets/onos-sample-development.webp"
              loading="lazy"
              alt="ONOS Production"
              className="hero-quote-image"
            />
            <div className="quote-founder-info">
              <div className="quote-founder-name">ONOS Global</div>
              <div className="quote-founder-job">{t("Production network")}</div>
            </div>
          </div>
          <p className="quote-description">{t("Craft, at an industrial scale.")}</p>
        </div>
      </div>
      <div className="bg"></div>
    </div>
  );
}
