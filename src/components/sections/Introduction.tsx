'use client';
import { useSite } from '@/components/interactions/SiteContext';
import { Button, Eyebrow, Photo, Texture } from '@/components/layout/Primitives';
export function Hero() {
  const { t } = useSite();
  return <><section id="home" className="hero-section section-spacing-top"><span id="top" className="onos-anchor-alias" aria-hidden="true" /><div className="container-full"><div className="hero-wrap"><div className="w-layout-grid grid-hero">
    <div className="hero-left-wrap"><div className="hero-left-inner"><Eyebrow>{t('ONOS GLOBAL / PRINT-ON-DEMAND')}</Eyebrow><div className="hero-title-wrap"><h1 className="hero-title">{t('Innovating without limits.')} <span className="text-linear-gradient">{t('Elevating value.')}</span></h1></div></div></div>
    <div className="hero-right-wrap"><div className="hero-content-text">{'// '}{t('VIETNAM + UNITED STATES')} {' //'}</div><p className="hero-description">{t('A production partner for ambitious brands. Printing, embroidery and fulfillment, connected across Vietnam and the United States.')}</p><div className="hero-button"><Button href="#production-fit">{t('Find your production fit')}</Button></div></div>
  </div><div className="hero-bottom-wrap"><span className="hero-bottom-text">{t('Vietnam ↔ USA')}</span><a className="hero-bottom-link" href="#network">{t('Step inside Onos')} ↓</a><span className="hero-bottom-text">{t('Founded in 2019')}</span></div></div></div><Texture /></section>
  <div className="hero-video-wrap onos-hero-photo"><Photo name="embroidery-hero" className="onos-hero-image" priority sizes="100vw" /><div className="hero-quote-wrap"><div className="hero-quote-info" data-reveal><div className="hero-quote-card"><Photo name="sample-development" className="hero-quote-image" sizes="240px" /><div className="quote-founder-info"><div className="quote-founder-name">ONOS Global</div><div className="quote-founder-job">{t('Production network')}</div></div></div><p className="quote-description">{t('Craft, at an industrial scale.')}</p></div></div></div></>;
}
export function About() {
  const { t } = useSite();
  return <section id="about" className="about-section"><div className="about-main section-spacing"><div className="about-info"><div className="container"><div className="w-layout-grid grid-about">
    <div className="about-left-wrap" data-reveal><Eyebrow>{t('Who we are')}</Eyebrow><div className="onos-about-index">ONOS<span className="text-linear-gradient">GLOBAL</span></div><p>{t('3 plants. 2 countries. One Onos.')}</p></div>
    <div className="about-right-wrap" data-reveal><div className="about-section-title"><h2 className="section-title">{t('Local expertise.')}<br /><span className="text-linear-gradient">{t('A global outlook.')}</span></h2></div><p className="about-description">{t('Production in Vietnam. Fulfillment closer to the US market. A connected network built around where your customers are.')}</p><div className="about-button-wrap"><Button href="#network">{t('Explore our network')}</Button><a className="download-link" href="#capabilities">{t('Explore our capabilities')}</a></div></div>
  </div></div></div><div className="container-full"><div className="about-info-inner onos-metrics" data-reveal>
    <div className="about-info-box"><div className="about-info-inner-wrap"><div className="about-content">{'// '}{t('Production network')} {' //'}</div><div className="inner-number"><span className="count" data-count="3">03</span></div><p className="about-content-description">{t('Production plants')}</p></div><img src="/assets/onos-connection.svg" alt="" className="about-box-vector" /></div>
    <Photo name="production-floor" className="about-image-box" sizes="290px" />
    <div className="about-info-box box-bg-white"><div className="inner-number"><span className="count text-linear-gradient" data-count="2">02</span></div><p>{t('Countries, connected')}</p><div className="onos-machine-count"><strong data-count="50">50+</strong><span>{t('Production machines')}</span></div></div>
    <div className="about-info-box box-bg-dark"><Photo name="partner-meeting" className="onos-metric-photo" sizes="290px" /><div className="onos-metric-text"><strong className="like-score">2019</strong><p>{t('The year we began')}</p></div></div>
  </div></div><Texture /></div></section>;
}
