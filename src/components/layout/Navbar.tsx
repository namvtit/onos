'use client';
import { useEffect, useRef, useState } from 'react';
import { useSite } from '@/components/interactions/SiteContext';
import { Button } from './Primitives';
export const navigation = [ ['#capabilities', 'Capabilities'], ['#network', 'Our network'], ['#process', 'How we work'], ['#ecosystem', 'Our ecosystem'] ];
export function Navbar() {
  const { language, setLanguage, t } = useSite(); const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null); const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function dismiss(event: PointerEvent) { if (!header.current?.contains(event.target as Node)) setOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === 'Escape' && open) { setOpen(false); menu.current?.focus(); } }
    const desktop = matchMedia('(min-width: 992px)'); const resize = () => setOpen(false);
    document.addEventListener('pointerdown', dismiss); document.addEventListener('keydown', escape); desktop.addEventListener('change', resize);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); desktop.removeEventListener('change', resize); };
  }, [open]);
  return <header ref={header} className="navbar w-nav onos-navbar"><div className="container-full w-container"><div className="w-layout-grid grid-nav">
    <a href="#home" className="brand w-nav-brand" aria-label="ONOS Global"><img src="/assets/onos-wordmark.svg" width="196" height="32" alt="ONOS Global" className="logo" /></a>
    <nav id="main-navigation" className={`nav-menu w-nav-menu${open ? ' onos-menu-open' : ''}`} aria-label={t('Main navigation')}>
      {navigation.map(([href, label]) => <a key={href} className="nav-link" href={href} onClick={() => setOpen(false)}>{t(label)}</a>)}
      <a className="nav-link onos-mobile-contact" href="#contact" onClick={() => setOpen(false)}>{t('Contact')}</a>
    </nav>
    <div className="right-nav onos-right-nav"><div className="onos-language" role="group" aria-label={t('Choose language')}>
      {(['en', 'vi'] as const).map(lang => <button key={lang} type="button" lang={lang} aria-label={lang === 'en' ? 'English' : 'Tiếng Việt'} aria-pressed={language === lang} onClick={() => { setLanguage(lang); setOpen(false); }}>{lang.toUpperCase()}</button>)}
    </div><div className="nav-button-wrap"><Button href="#contact" accent>{t("Let's talk")}</Button></div>
    <button ref={menu} type="button" className="menu-button onos-menu-button" aria-label={t(open ? 'Close navigation' : 'Open navigation')} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button></div>
  </div></div></header>;
}
