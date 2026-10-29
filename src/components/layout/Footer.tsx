'use client';

import React from 'react';
import { useSite } from '@/components/interactions/SiteContext';
import { contact, ecosystem } from '@/data/onos-content';

export function Footer() {
  const { t } = useSite();

  return (
    <section id="Footer" data-wf--footer--variant="base" className="footer">
      <div data-w-id="84eea156-668a-6145-cebb-c3051d65f2bd" className="footer-main section-spacing-top">
        <div className="footer-bg-wrap">
          <div className="w-layout-grid grid-footer">
            {/* Left Brand Identity Column (Replaces generic newsletter) */}
            <div className="footer-subscribe">
              <div data-w-id="9807520c-65b7-e828-71bd-909a6cfe182e" className="subscribe-wrap">
                <a
                  href="https://onosgroup.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-brand-lockup"
                  style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color--white, #fff)', letterSpacing: '0.04em' }}>
                      ONOS
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color--primary-1, #f66234)', textTransform: 'uppercase', letterSpacing: '0.08em', borderLeft: '1px solid #444', paddingLeft: '10px' }}>
                      POD FULFILLMENT SOLUTION ↗
                    </span>
                  </div>
                </a>
                <p className="subscribe-description" style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'rgb(170, 170, 170)', margin: '0 0 20px 0', maxWidth: '340px' }}>
                  {t(
                    'A production partner for ambitious brands. Printing, embroidery and fulfillment, connected across Vietnam and the United States.'
                  )}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="primary-button w-inline-block"
                    style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                  >
                    <div className="button-primary-inner">
                      <div className="button-text-wrap">
                        <div className="button-text-inner">
                          <div className="button-text">{contact.email}</div>
                          <div className="button-hover-text">{contact.email}</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Navigation & Info Grid */}
            <div id="w-node-_9807520c-65b7-e828-71bd-909a6cfe1805-6cfe1801" className="footer-item">
              <div className="w-layout-grid grid-footer-menu">
                {/* Column 1: Main Links */}
                <div data-w-id="66876f43-9ec4-1dbd-0ca0-ca548397b94e" className="footer-link-item">
                  <h2 className="footer-title">{t('Main links')}</h2>
                  <div className="footer-links">
                    <a href="#home" className="footer-link">{t('Home')}</a>
                    <a href="#about" className="footer-link">{t('About')}</a>
                    <a href="#capabilities" className="footer-link">{t('Capabilities')}</a>
                    <a href="#production-fit" className="footer-link">{t('Production Fit')}</a>
                    <a href="#network" className="footer-link">{t('Our network')}</a>
                    <a href="#workflow" className="footer-link">{t('Workflow')}</a>
                    <a href="#gallery" className="footer-link">{t('Gallery')}</a>
                    <a href="#ecosystem" className="footer-link">{t('Our ecosystem')}</a>
                    <a href="#faq" className="footer-link">{t('FAQ')}</a>
                    <a href="#contact" className="footer-link">{t('Contact')}</a>
                  </div>
                </div>

                {/* Column 2: Our Ecosystem */}
                <div data-w-id="c3c71fa1-678a-c8f3-2483-91e8980a3ade" className="footer-link-item">
                  <h2 className="footer-title">{t('Our ecosystem')}</h2>
                  <div className="footer-links">
                    {ecosystem.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                      >
                        {item.name} ↗
                      </a>
                    ))}
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span style={{ fontSize: '0.78rem', color: '#777', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {t('Vietnam ↔ USA')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Contact Info */}
                <div data-w-id="64c645f9-8fac-49b8-f082-3f384284032e" className="footer-contact-list">
                  <h2 className="footer-title">{t('Contact')}</h2>
                  <div className="footer-contact-item">
                    <div className="footer-address" style={{ fontSize: '0.88rem', color: '#999', lineHeight: 1.5, marginBottom: '8px' }}>
                      {contact.address}
                    </div>
                    <a href={`tel:${contact.telephone}`} className="footer-link" style={{ display: 'block', marginBottom: '4px' }}>
                      {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="footer-link" style={{ display: 'block' }}>
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Column 4: Working Hours */}
                <div data-w-id="2421dafb-c91b-f351-19c3-69d4e8192796" className="footer-contact-list">
                  <h2 className="footer-title">{t('// Working hours //')}</h2>
                  <div className="footer-contact-item">
                    <div className="working-text" style={{ fontSize: '0.88rem', color: 'rgb(170, 170, 170)', lineHeight: 1.6 }}>
                      Mon–Fri: 7:30–17:30
                    </div>
                    <div className="working-text" style={{ fontSize: '0.88rem', color: 'rgb(170, 170, 170)', lineHeight: 1.6 }}>
                      Saturday: 8:00–17:00
                    </div>
                    <div className="working-text" style={{ fontSize: '0.82rem', color: '#777', marginTop: '4px' }}>
                      (Vietnam time / ICT)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* Bottom Copyright Strip */}
          <div className="footer-bottom-wrap">
            <div data-w-id="d283640d-fc6a-1283-2d22-21620e76ddab" className="footer-copyright-wrap">
              <p className="footer-copyright">
                © 2026 Onos Group. {t('All rights reserved.')}{' '}
                <a href="https://onosgroup.pages.dev/" target="_blank" rel="noopener noreferrer" className="footer-copyright-link">
                  Onos Group ↗
                </a>
              </p>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#777' }}>
              <span>ONOS Global · Dai Tu (Thai Nguyen) · Me Linh (Hanoi) · California (USA)</span>
            </div>
          </div>

          <div className="footer-logo-info">
            <img
              src="/assets/onos-wordmark-light.svg"
              loading="lazy"
              data-w-id="65ddfbf8-98dc-79d4-6020-0e2cf17451cf"
              alt="ONOS Global"
              className="footer-logo"
            />
          </div>
        </div>
      </div>

      <img src="/assets/62379ae07751-68d6314bdbf908695fdc3d3e_blur.svg" loading="lazy" alt="" aria-hidden="true" className="footer-shadow _01" style={{ zIndex: 0, pointerEvents: "none" }} />
      <img src="/assets/62379ae07751-68d6314bdbf908695fdc3d3e_blur.svg" loading="lazy" alt="" aria-hidden="true" className="footer-shadow _02" style={{ zIndex: 0, pointerEvents: "none" }} />

      <div className="line-wrapper">
        <div className="section-line"></div>
        <div className="section-line"></div>
        <div className="section-line"></div>
        <div className="section-line"></div>
        <div className="section-line"></div>
      </div>
    </section>
  );
}
