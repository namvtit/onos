'use client';
import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { vietnamese, type Language } from '@/data/translations';
const subscribeMotion = (callback: () => void) => { const query = matchMedia('(prefers-reduced-motion: reduce)'); query.addEventListener('change', callback); window.addEventListener('onos-motion', callback); window.addEventListener('storage', callback); return () => { query.removeEventListener('change', callback); window.removeEventListener('onos-motion', callback); window.removeEventListener('storage', callback); }; };
const reducedSnapshot = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let pausedFallback = false;
const pausedSnapshot = () => { try { return localStorage.getItem('onos-motion-paused') === 'true'; } catch { return pausedFallback; } };
const SiteContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string; paused: boolean; reduced: boolean; toggleMotion: () => void } | null>(null);
export function SiteProvider({ children, initialLanguage = 'en' }: { children: React.ReactNode; initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const reduced = useSyncExternalStore(subscribeMotion, reducedSnapshot, () => false);
  const userPaused = useSyncExternalStore(subscribeMotion, pausedSnapshot, () => false);
  const paused = reduced || userPaused;
  const t = useCallback((text: string) => language === 'vi' ? vietnamese[text] ?? text : text, [language]);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'ONOS Global | POD Manufacturing & Fulfillment' : 'ONOS Global | Sản xuất POD và hoàn tất đơn hàng quốc tế';
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('A production partner for ambitious brands. Printing, embroidery and fulfillment, connected across Vietnam and the United States.'));
  }, [language, t]);
  useEffect(() => { document.documentElement.classList.toggle('motion-paused', paused); }, [paused]);
  const toggleMotion = () => { pausedFallback = !userPaused; try { localStorage.setItem('onos-motion-paused', String(!userPaused)); } catch { /* Storage may be disabled. */ } window.dispatchEvent(new Event('onos-motion')); };
  return <SiteContext.Provider value={{ language, setLanguage, t, paused, reduced, toggleMotion }}>{children}</SiteContext.Provider>;
}
export function useSite() { const context = useContext(SiteContext); if (!context) throw new Error('SiteProvider is required'); return context; }
export function MotionControl() {
  const { t, paused, reduced, toggleMotion } = useSite();
  const label = t(reduced ? 'Motion reduced by system setting' : paused ? 'Play animations' : 'Pause animations');
  return <button type="button" className="motion-control" aria-label={label} title={label} aria-pressed={paused} disabled={reduced} onClick={toggleMotion}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button>;
}
export function PageMotion() {
  const { paused } = useSite();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (paused) { elements.forEach(element => element.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .06 });
    elements.forEach(element => { if (element.getBoundingClientRect().top > innerHeight) element.classList.add('will-reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, [paused]);
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-count]');
    const frames: number[] = [];
    elements.forEach(element => { element.dataset.finalCount ??= element.textContent ?? ''; });
    const finish = () => elements.forEach(element => { element.textContent = element.dataset.finalCount!; });
    if (paused) { finish(); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      observer.unobserve(element);
      if (element.dataset.counted) return;
      element.dataset.counted = 'true';
      const target = Number(element.dataset.count), final = element.dataset.finalCount!;
      const padding = final.startsWith('0') ? final.length : 1;
      const started = performance.now();
      const tick = (time: number) => {
        const progress = Math.min(1, (time - started) / 950);
        element.textContent = progress === 1 ? final : String(Math.round(target * (1 - (1 - progress) ** 3))).padStart(padding, '0') + (final.endsWith('+') ? '+' : '');
        if (progress < 1) frames.push(requestAnimationFrame(tick));
      };
      frames.push(requestAnimationFrame(tick));
    }), { threshold: .18 });
    elements.forEach(element => observer.observe(element));
    return () => { observer.disconnect(); frames.forEach(cancelAnimationFrame); finish(); };
  }, [paused]);
  return null;
}
