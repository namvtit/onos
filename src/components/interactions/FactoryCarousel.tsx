'use client';
import { useEffect, useRef, useState } from 'react';
import { factoryPhotos } from '@/data/onos-content';
import { useSite } from './SiteContext';
import { Photo } from '@/components/layout/Primitives';
export function FactoryCarousel() {
  const { t, paused } = useSite(); const [active, setActive] = useState(0); const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false); const [hovered, setHovered] = useState(false); const [focused, setFocused] = useState(false);
  const [announced, setAnnounced] = useState<number | null>(null);
  const pointerInput = useRef(false);
  const region = useRef<HTMLDivElement>(null); const touch = useRef<{ x: number; y: number } | null>(null);
  const select = (index: number) => { setActive(index); setAnnounced(index); };
  const step = (delta: number) => select((active + delta + factoryPhotos.length) % factoryPhotos.length);
  useEffect(() => { const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: .25 }); if (region.current) observer.observe(region.current); return () => observer.disconnect(); }, []);
  useEffect(() => {
    if (!inView || hovered || focused || paused || userPaused) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const schedule = () => { clearInterval(timer); if (!document.hidden) timer = setInterval(() => setActive(current => (current + 1) % factoryPhotos.length), 5200); };
    schedule(); document.addEventListener('visibilitychange', schedule);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', schedule); };
  }, [inView, hovered, focused, paused, userPaused]);
  const photo = factoryPhotos[active];
  return <div ref={region} className="onos-factory-carousel" role="region" aria-roledescription={t('Production photography')} aria-label={t('Onos production facilities')} tabIndex={0}
    onPointerDownCapture={() => { pointerInput.current = true; }} onKeyDownCapture={() => { pointerInput.current = false; setFocused(true); }}
    onMouseEnter={() => { if (matchMedia('(hover: hover) and (pointer: fine)').matches) setHovered(true); }} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(!pointerInput.current)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); } }}>
    <figure className="onos-factory-slide" aria-label={`${t('Slide')} ${active + 1} ${t('of')} 4: ${t(photo.caption)}`}
      onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={event => { if (touch.current) { const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) step(dx < 0 ? 1 : -1); } touch.current = null; }} onTouchCancel={() => { touch.current = null; }}>
      <Photo name={photo.image} className="onos-factory-image" sizes="(max-width: 767px) 100vw, 90vw" /><figcaption><span>{t(photo.caption)}</span><span>{t(photo.location)}</span></figcaption>
    </figure><div className="onos-carousel-toolbar"><div className="onos-carousel-buttons"><button type="button" className="onos-control" aria-label={t('Previous photo')} onClick={() => step(-1)}>←</button><button type="button" className="onos-control" aria-label={t('Next photo')} onClick={() => step(1)}>→</button></div><div className="onos-carousel-dots">{factoryPhotos.map((item, index) => <button type="button" key={item.image} aria-label={`${t('Show photo')} ${index + 1}`} aria-current={active === index ? 'step' : undefined} onClick={() => select(index)}><span /></button>)}</div><button type="button" className="onos-control" aria-label={t(userPaused || paused ? 'Play slideshow' : 'Pause slideshow')} aria-pressed={userPaused || paused} disabled={paused} onClick={() => setUserPaused(!userPaused)}>{userPaused || paused ? '▶' : 'Ⅱ'}</button></div>
    <p className="onos-sr-only" aria-live="polite" aria-atomic="true">{announced !== null && `${t('Slide')} ${announced + 1} ${t('of')} 4: ${t(factoryPhotos[announced].caption)}`}</p>
  </div>;
}
