'use client';
import Image from 'next/image';
import { media } from '@/data/onos-content';
import { useSite } from '@/components/interactions/SiteContext';
export function Button({ children, href, accent = false, onClick, id }: { children: React.ReactNode; href: string; accent?: boolean; onClick?: () => void; id?: string }) {
  return <a id={id} href={href} onClick={onClick} className={`primary-button w-inline-block${accent ? ' onos-button-accent' : ''}`}><span className="button-primary-inner"><span className="button-text-wrap"><span className="button-text-inner"><span className="button-text">{children}</span><span className="button-hover-text" aria-hidden="true">{children}</span></span></span><span className="button-icon-bg"><span className="onos-button-arrow" aria-hidden="true">↗</span></span></span></a>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="pre-section-title-wrap"><div className="pre-section-title-inner"><span className="pre-section-title-square" /><span className="pre-section-title">{children}</span></div></div>; }
export function Texture() { return <><div className="line-wrapper" aria-hidden="true">{[0, 1, 2, 3, 4].map(n => <div key={n} className="section-line border-grey-1" />)}</div><div className="noise-overlay" aria-hidden="true" /></>; }
export function Photo({ name, className, priority = false, sizes = '(max-width: 767px) 100vw, 50vw', full = false }: { name: string; className?: string; priority?: boolean; sizes?: string; full?: boolean }) {
  const { t } = useSite(); const item = media[name];
  return <Image src={`/assets/onos-${name}.webp`} alt={t(item.alt)} width={item.width} height={item.height} className={className} sizes={sizes} priority={priority} quality={full ? 90 : 85} unoptimized={full} />;
}
export function SectionHeading({ eyebrow, title, description, center = false }: { eyebrow: string; title: string; description?: string; center?: boolean }) {
  const { t } = useSite();
  return <div className={center ? 'section-title-center onos-section-heading' : 'onos-section-heading'} data-reveal><Eyebrow>{t(eyebrow)}</Eyebrow><h2 className="section-title">{t(title)}</h2>{description && <p className="onos-section-intro">{t(description)}</p>}</div>;
}
