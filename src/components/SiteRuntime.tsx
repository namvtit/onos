"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mountSiteControls } from "@/lib/site-controls";
import { mountSourceAnimations } from "@/lib/source-animations";

type LightboxItem = { type: "image" | "video"; url: string; html?: string; originalUrl?: string };
type Gallery = { items: LightboxItem[]; index: number; alt: string };

/** Local behavior only: the Webflow runtime, remote forms, and tracking are never loaded. */
export function SiteRuntime({ pageId }: { pageId: string }) {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.wfPage = pageId;
    const disposeControls = mountSiteControls();
    const disposeAnimations = mountSourceAnimations(pageId);
    document.documentElement.classList.add("site-ready");
    function open(event: MouseEvent) {
      const link = (event.target as Element).closest<HTMLElement>(".w-lightbox[data-lightbox]");
      if (!link) return;
      event.preventDefault();
      const config = JSON.parse(link.dataset.lightbox!) as { items: LightboxItem[]; group?: string };
      const grouped = config.group ? Array.from(document.querySelectorAll<HTMLElement>(".w-lightbox[data-lightbox]")).filter(element => {
        const other = JSON.parse(element.dataset.lightbox!) as { group?: string };
        return other.group === config.group;
      }) : [link];
      const items = grouped.flatMap(element => (JSON.parse(element.dataset.lightbox!) as { items: LightboxItem[] }).items);
      opener.current = link;
      setGallery({ items, index: items.findIndex(item => item.url === config.items[0].url), alt: link.querySelector("img")?.alt || "Project image" });
    }
    document.addEventListener("click", open);
    return () => {
      document.removeEventListener("click", open); disposeAnimations(); disposeControls();
      document.documentElement.classList.remove("site-ready");
    };
  }, [pageId]);

  useEffect(() => {
    if (!gallery || !dialog.current) return;
    const element = dialog.current;
    if (!element.open) element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [gallery]);

  const close = () => { setGallery(null); opener.current?.focus(); };
  const step = (delta: number) => setGallery(value => value ? { ...value, index: (value.index + delta + value.items.length) % value.items.length } : null);
  if (!gallery) return null;
  const item = gallery.items[gallery.index];
  let embed = "";
  if (item?.type === "video") {
    // Keep the original video provider/ID. Do not execute embedded HTML from the crawl.
    embed = item.html?.match(/src=["']([^"']+)/)?.[1]?.replaceAll("&amp;", "&") || "";
    if (embed.startsWith("//")) embed = `https:${embed}`;
    const youtubeId = item.url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];
    if (!embed && youtubeId) embed = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  }
  return createPortal(<dialog ref={dialog} className="migration-lightbox" aria-label="Media viewer"
    onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={event => { if (event.key === "ArrowLeft") step(-1); if (event.key === "ArrowRight") step(1); }}>
    <button type="button" className="lightbox-close" onClick={close} aria-label="Close media viewer">×</button>
    {item?.type === "image" ? <img className="lightbox-media" src={item.url} alt={gallery.alt} /> :
      <iframe className="lightbox-media lightbox-video" src={embed} title="Show Reels" allow="autoplay; fullscreen" allowFullScreen />}
    {gallery.items.length > 1 && <>
      <button type="button" className="lightbox-previous" onClick={() => step(-1)} aria-label="Previous image">‹</button>
      <button type="button" className="lightbox-next" onClick={() => step(1)} aria-label="Next image">›</button>
      <div className="lightbox-count" aria-live="polite">{gallery.index + 1} / {gallery.items.length}</div>
    </>}
  </dialog>, document.body);
}
