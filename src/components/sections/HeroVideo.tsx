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
        <div aria-live="polite">
          <button
            type="button"
            data-w-bg-video-control="true"
            className="w-backgroundvideo-backgroundvideoplaypausebutton video-button w-background-video--control"
            aria-label="Pause video"
          >
            <span className="play-state">
              <img
                src="/assets/a3a417ca617f-68ecdd3c431234be644acd0a_video-Icon-Puse.svg"
                loading="lazy"
                alt="Pause video"
                className="video-button-image"
              />
            </span>
            <span hidden={true} className="pause-state">
              <img
                loading="lazy"
                alt="Play video"
                src="/assets/f905b540fb48-68ecdd3d945e5b3131e0c22d_Video-Icon-Play.svg"
                className="video-button-image"
              />
            </span>
          </button>
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
