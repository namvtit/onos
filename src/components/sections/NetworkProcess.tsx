'use client';
import { factories, processSteps } from '@/data/onos-content';
import { useSite } from '@/components/interactions/SiteContext';
import { FactoryCarousel } from '@/components/interactions/FactoryCarousel';
import { Photo, SectionHeading, Texture } from '@/components/layout/Primitives';
export function Network() {
  const { t } = useSite();
  return <section id="network" className="onos-network section-spacing"><span id="facilities" className="onos-anchor-alias" aria-hidden="true" /><div className="container-full"><SectionHeading eyebrow="Local craft. Global reach." title="Three plants. One connected team." description="Production in Vietnam. Fulfillment closer to the US market. A connected network built around where your customers are." /><div data-reveal><FactoryCarousel /></div><div className="onos-factory-grid">{factories.map(factory => <article className="onos-factory-card" key={factory.code} data-reveal><span className="onos-label">{factory.code}</span><h3>{t(factory.name)}</h3><p className="onos-factory-role">{t(factory.role)}</p><p>{t(factory.description)}</p><span className="onos-label">{t(factory.location)}</span></article>)}</div></div><Texture /></section>;
}
export function ManufacturingProcess() {
  const { t } = useSite();
  return <section id="process" className="step-section onos-process section-spacing"><div className="step-main"><div className="container"><SectionHeading eyebrow="From file to finished" title="Your next collection starts here." description="A clear process, with people alongside you at every handoff." center /><figure className="onos-process-photo" data-reveal><Photo name="sample-development" sizes="(max-width: 767px) 100vw, 70vw" /><figcaption>{t('Product development starts with a conversation.')}</figcaption></figure></div><div className="step-info-main">{processSteps.map((step, index) => <article className={`step-info ${['one','two','three','four'][index]} onos-process-step`} key={step.title} data-reveal><span className="step-text">{t('Step')} 0{index + 1}</span><div><h3 className="step-name">{t(step.title)}</h3><p>{t(step.description)}</p></div><span className="onos-step-arrow" aria-hidden="true">↗</span></article>)}</div></div></section>;
}
