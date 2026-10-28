'use client';
import { useEffect, useRef, useState } from 'react';
import { galleryPhotos, media } from '@/data/onos-content';
import { useSite } from './SiteContext';
import { Photo, SectionHeading } from '@/components/layout/Primitives';
export function ProductionGallery() {
  const { t, paused } = useSite(); const [selected, setSelected] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null); const dialog = useRef<HTMLDialogElement>(null); const opener = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null); const isOpen = selected !== null;
  const close = () => dialog.current?.close();
  const step = (delta: number) => setSelected(current => current === null ? null : (current + delta + galleryPhotos.length) % galleryPhotos.length);
  useEffect(() => {
    if (!isOpen) return;
    dialog.current?.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [isOpen]);
  const scroll = (direction: number) => { const width = rail.current?.querySelector('figure')?.getBoundingClientRect().width ?? 300; rail.current?.scrollBy({ left: direction * (width + 30), behavior: paused ? 'instant' : 'smooth' }); };
  return <section id="gallery" className="onos-gallery product-section section-spacing"><div className="container-full"><div className="onos-heading-controls"><SectionHeading eyebrow="A closer look" title="Real people. Real production." /><div className="onos-carousel-buttons"><button type="button" className="onos-control" aria-label={t('Previous photos')} onClick={() => scroll(-1)}>←</button><button type="button" className="onos-control" aria-label={t('Next photos')} onClick={() => scroll(1)}>→</button></div></div>
    <div className="onos-gallery-rail" ref={rail} role="region" aria-label={t('Production photography')} tabIndex={0} onKeyDown={event => { if (event.target === event.currentTarget && ['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); scroll(event.key === 'ArrowRight' ? 1 : -1); } }}>
      {galleryPhotos.map((photo, index) => <figure key={photo.image} className="product-info-main onos-gallery-card"><button type="button" className="product-image-wrapper onos-gallery-open" aria-label={`${t('Enlarge')}: ${t(media[photo.image].alt)}`} onClick={event => { opener.current = event.currentTarget; setSelected(index); }}><Photo name={photo.image} className="product-image" sizes="(max-width: 767px) 85vw, 40vw" /><span className="service-arrow" aria-hidden="true">↗</span></button><figcaption><span className="onos-label">0{index + 1}</span><h3 className="product-name">{t(photo.caption)}</h3></figcaption></figure>)}
    </div><p className="onos-gallery-hint">{t('Scroll to explore. Select a photograph for a closer look.')}</p>
  </div><dialog ref={dialog} className="onos-lightbox" aria-label={t('Photograph viewer')} aria-describedby="lightbox-help" onCancel={event => { event.preventDefault(); close(); }} onClose={() => { setSelected(null); opener.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); } if (event.key === 'Tab') { const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button')); const first = buttons[0], last = buttons[buttons.length - 1]; if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }}>
    <button type="button" className="onos-lightbox-close onos-control" aria-label={t('Close photograph')} onClick={close}>×</button>
    {selected !== null && <figure className="onos-lightbox-figure" onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={event => { if (touch.current) { const dx = event.changedTouches[0].clientX - touch.current.x, dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) step(dx < 0 ? 1 : -1); } touch.current = null; }} onTouchCancel={() => { touch.current = null; }}><Photo name={galleryPhotos[selected].image} full className="onos-lightbox-image" sizes="100vw" /><figcaption aria-live="polite"><span>{t(galleryPhotos[selected].caption)}</span><span>{selected + 1} / {galleryPhotos.length}</span></figcaption></figure>}
    <button type="button" className="onos-lightbox-previous onos-control" aria-label={t('Previous photo')} onClick={() => step(-1)}>←</button><button type="button" className="onos-lightbox-next onos-control" aria-label={t('Next photo')} onClick={() => step(1)}>→</button><p id="lightbox-help" className="onos-lightbox-help">{t('Use arrow keys to browse. Escape to close.')}</p>
  </dialog></section>;
}
