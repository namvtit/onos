'use client';

import React, { useState } from 'react';
import { useSite } from '@/components/interactions/SiteContext';
import { contact, ecosystem } from '@/data/onos-content';

export function Footer() {
  const { language, t } = useSite();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const isEn = language === 'en';
      const subject = isEn ? 'Newsletter Subscription | Onos Global' : 'Đăng ký nhận tin | Onos Global';
      const body = isEn
        ? `Hello Onos team,\n\nPlease subscribe my email (${email}) to manufacturing updates and production capacity highlights.\n\nThank you!`
        : `Chào đội ngũ Onos,\n\nNhờ Onos cập nhật thông tin sản xuất và công nghệ mới cho email: ${email}.\n\nCảm ơn!`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubscribed(true);
    }
  };

  return (
    <section id="Footer" data-wf--footer--variant="base" className="footer">
      <div data-w-id="84eea156-668a-6145-cebb-c3051d65f2bd" className="footer-main section-spacing-top">
        <div className="footer-bg-wrap">
          <div className="w-layout-grid grid-footer">
            <div className="footer-subscribe">
              <div data-w-id="9807520c-65b7-e828-71bd-909a6cfe182e" className="subscribe-wrap">
                <h2 className="subscribe-title">{t('Stay connected')}</h2>
                <p className="subscribe-description">
                  {t('Join our newsletter for manufacturing insights, production capacity updates, and supply chain highlights.')}
                </p>
                <div className="form-subscribe-wrap w-form">
                  {!subscribed ? (
                    <form
                      id="wf-form-Subscribe-Form"
                      name="wf-form-Subscribe-Form"
                      data-name="Subscribe Form"
                      className="form-subscribe"
                      onSubmit={handleSubscribe}
                    >
                      <input
                        className="form-input form-input-subscribe w-input"
                        maxLength={256}
                        name="Email"
                        data-name="Email"
                        placeholder={t('Enter your email')}
                        type="email"
                        id="Subscribe-Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        type="submit"
                        data-wait=""
                        className="button-subscribe w-button"
                        value=""
                        aria-label="Subscribe"
                      />
                    </form>
                  ) : null}
                  <div
                    className="success-message w-form-done"
                    style={{
                      display: subscribed ? 'block' : 'none',
                      backgroundColor: 'rgba(255, 107, 0, 0.1)',
                      border: '1px solid rgba(255, 107, 0, 0.3)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: 'var(--color--white)',
                    }}
                  >
                    <div style={{ lineHeight: 1.4 }}>
                      {language === 'vi'
                        ? 'Ứng dụng email đã được mở. Vui lòng gửi email đã soạn để hoàn tất yêu cầu đăng ký.'
                        : 'Your email app has been opened. Please send the prepared email to complete your subscription request.'}
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.8rem', opacity: 0.85 }}>
                      {language === 'vi' ? (
                        <>
                          Nếu ứng dụng không tự mở, vui lòng gửi email tới{' '}
                          <a href={`mailto:${contact.email}`} style={{ color: 'var(--color--primary)', textDecoration: 'underline' }}>
                            {contact.email}
                          </a>
                          .
                        </>
                      ) : (
                        <>
                          If your email app did not open, please send directly to{' '}
                          <a href={`mailto:${contact.email}`} style={{ color: 'var(--color--primary)', textDecoration: 'underline' }}>
                            {contact.email}
                          </a>
                          .
                        </>
                      )}
                    </div>
                  </div>
                  <div className="error-message w-form-fail">
                    <div>{t('Oops! Something went wrong while submitting the form.')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div id="w-node-_9807520c-65b7-e828-71bd-909a6cfe1805-6cfe1801" className="footer-item">
              <div className="w-layout-grid grid-footer-menu">
                <div data-w-id="66876f43-9ec4-1dbd-0ca0-ca548397b94e" className="footer-link-item">
                  <h2 className="footer-title">{t('Main links')}</h2>
                  <div className="footer-links">
                    <a href="#home" className="footer-link">{t('Home')}</a>
                    <a href="#about" className="footer-link">{t('About')}</a>
                    <a href="#services" className="footer-link">{t('Services')}</a>
                    <a href="#products" className="footer-link">{t('Products')}</a>
                    <a href="#finder" className="footer-link">{t('Production Fit')}</a>
                    <a href="#network" className="footer-link">{t('Our Network')}</a>
                    <a href="#workflow" className="footer-link">{t('Workflow')}</a>
                    <a href="#contact" className="footer-link">{t('Contact')}</a>
                  </div>
                </div>

                <div data-w-id="c3c71fa1-678a-c8f3-2483-91e8980a3ade" className="footer-link-item">
                  <h2 className="footer-title">{t('Our Ecosystem')}</h2>
                  <div className="footer-links">
                    {ecosystem.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                      >
                        {item.name}
                      </a>
                    ))}
                    <a href="#gallery" className="footer-link">{t('Gallery')}</a>
                    <a href="#faq" className="footer-link">{t('FAQs')}</a>
                  </div>
                </div>

                <div data-w-id="64c645f9-8fac-49b8-f082-3f384284032e" className="footer-contact-list">
                  <h2 className="footer-title">{t('Contact info')}</h2>
                  <div className="footer-contact-item">
                    <div className="footer-address">{contact.address}</div>
                    <a href={`tel:${contact.telephone}`} className="footer-link">
                      {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="footer-link">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div data-w-id="2421dafb-c91b-f351-19c3-69d4e8192796" className="footer-contact-list">
                  <h2 className="footer-title">{t('Working hours')}</h2>
                  <div className="footer-contact-item">
                    <div className="working-text">Mon–Fri: 7:30–17:30 (ICT)</div>
                    <div className="working-text">Saturday: 8:00–17:00 (ICT)</div>
                    <div className="working-text">{t('Sunday: Closed')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom-wrap">
            <div data-w-id="d283640d-fc6a-1283-2d22-21620e76ddab" className="footer-copyright-wrap">
              <p className="footer-copyright">
                © 2026 Onos Group. {t('All rights reserved.')}{' '}
                <a href="#home" className="footer-copyright-link">
                  Vietnam ↔ USA Manufacturing Network
                </a>
              </p>
            </div>
            <div data-w-id="9807520c-65b7-e828-71bd-909a6cfe1841" className="footer-social-inline">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link w-inline-block">
                <img src="/assets/e5179c696018-68d1288562216d12f8801fb5_facebook.svg" loading="eager" alt="Facebook" className="footer-social-icon" />
                <div>Facebook</div>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link w-inline-block">
                <img src="/assets/888aef57e2e7-69030fdd6a4a78c789fc1f69_twitter-x.svg" loading="eager" alt="Twitter" className="footer-social-icon" />
                <div>Twitter</div>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link w-inline-block">
                <img src="/assets/6f9dc32e8554-68d1288562216d12f8801f6e_instagram.svg" loading="eager" alt="Instagram" className="footer-social-icon" />
                <div>Instagram</div>
              </a>
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

      <img src="/assets/62379ae07751-68d6314bdbf908695fdc3d3e_blur.svg" loading="lazy" alt="Footer Shadow" className="footer-shadow _01" />
      <img src="/assets/62379ae07751-68d6314bdbf908695fdc3d3e_blur.svg" loading="lazy" alt="Footer Shadow" className="footer-shadow _02" />

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
