import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function extract() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Load EN
  await page.goto('https://onosglobal.pages.dev/', { waitUntil: 'networkidle' });

  const enDetails = await page.evaluate(async () => {
    const res = {};
    
    // Hero
    res.hero = {
      h1: document.querySelector('.enterprise-hero h1')?.innerText.trim(),
      subtitle: document.querySelector('.enterprise-hero p')?.innerText.trim(),
      ctas: Array.from(document.querySelectorAll('.enterprise-hero a, .enterprise-hero button')).map(el => ({
        text: el.innerText.trim(),
        href: el.getAttribute('href')
      }))
    };

    // Capabilities
    res.capabilities = Array.from(document.querySelectorAll('#capabilities .capability-card, #capabilities article')).map(el => ({
      title: el.querySelector('h3')?.innerText.trim(),
      description: el.querySelector('p')?.innerText.trim(),
      img: el.querySelector('img')?.getAttribute('src'),
      imgAlt: el.querySelector('img')?.getAttribute('alt'),
      link: el.querySelector('a')?.getAttribute('href')
    }));

    // Production Finder
    res.finder = [];
    const finderMethods = ['dtg', 'embroidery', 'sublimation', 'laser'];
    for (const m of finderMethods) {
      const btn = document.querySelector(`[data-method-choice="${m}"]`);
      if (btn) btn.click();
      const panel = document.querySelector(`[data-method="${m}"]`);
      if (panel) {
        res.finder.push({
          id: m,
          title: panel.querySelector('h3')?.innerText.trim(),
          lead: panel.querySelector('.fit-lead, p')?.innerText.trim(),
          material: panel.querySelector('.fit-specs dd, dl')?.innerText.trim(),
          allText: panel.innerText.trim(),
          img: panel.querySelector('img')?.getAttribute('src'),
          imgAlt: panel.querySelector('img')?.getAttribute('alt'),
          ctaText: panel.querySelector('a')?.innerText.trim(),
          ctaHref: panel.querySelector('a')?.getAttribute('href')
        });
      }
    }

    // Facilities (3 plants and carousel)
    res.plants = Array.from(document.querySelectorAll('#facilities .plant')).map(p => ({
      code: p.querySelector('.plant-code')?.innerText.trim(),
      title: p.querySelector('h3')?.innerText.trim(),
      location: p.querySelector('.plant-location')?.innerText.trim(),
      role: p.querySelector('.plant-role')?.innerText.trim(),
      text: p.innerText.trim()
    }));

    res.carouselSlides = Array.from(document.querySelectorAll('[data-facility-slide], .facility-slide, [class*="facility-carousel"] figure, .network figure')).map(f => ({
      img: f.querySelector('img')?.getAttribute('src'),
      alt: f.querySelector('img')?.getAttribute('alt'),
      caption: f.querySelector('figcaption, p')?.innerText.trim()
    }));

    // Workflow
    res.workflow = Array.from(document.querySelectorAll('#process .process-step, #process [class*="step"]')).map(s => ({
      stepNum: s.querySelector('.step-num, .step-number')?.innerText.trim(),
      title: s.querySelector('h3')?.innerText.trim(),
      desc: s.querySelector('p')?.innerText.trim(),
      text: s.innerText.trim()
    }));

    // Inside Onos (Gallery)
    res.gallery = Array.from(document.querySelectorAll('#inside-onos figure, #inside-onos .gallery-item, #inside-onos [data-gallery-item]')).map(g => ({
      img: g.querySelector('img')?.getAttribute('src'),
      alt: g.querySelector('img')?.getAttribute('alt'),
      caption: g.querySelector('figcaption')?.innerText.trim(),
      viewBtn: g.querySelector('button')?.getAttribute('aria-label')
    }));

    // Ecosystem
    res.ecosystem = Array.from(document.querySelectorAll('#ecosystem .ecosystem-card, #ecosystem article')).map(e => ({
      eyebrow: e.querySelector('.ecosystem-label, .eyebrow')?.innerText.trim(),
      title: e.querySelector('h3')?.innerText.trim(),
      desc: e.querySelector('p')?.innerText.trim(),
      linkText: e.querySelector('a')?.innerText.trim(),
      href: e.querySelector('a')?.getAttribute('href')
    }));

    // FAQ
    // expand all FAQs
    for (const d of document.querySelectorAll('details')) {
      d.open = true;
    }
    res.faq = Array.from(document.querySelectorAll('#faq details, details')).map(d => ({
      summary: d.querySelector('summary')?.innerText.trim(),
      content: d.querySelector('p, div:not(summary)')?.innerText.trim(),
      full: d.innerText.trim()
    }));

    // Contact
    res.contact = {
      h2: document.querySelector('#contact h2')?.innerText.trim(),
      lead: document.querySelector('#contact .lead, #contact p')?.innerText.trim(),
      email: document.querySelector('#contact a[href^="mailto:"]')?.innerText.trim(),
      emailHref: document.querySelector('#contact a[href^="mailto:"]')?.getAttribute('href'),
      phone: document.querySelector('#contact a[href^="tel:"]')?.innerText.trim(),
      phoneHref: document.querySelector('#contact a[href^="tel:"]')?.getAttribute('href'),
      address: document.querySelector('#contact address')?.innerText.trim(),
      allText: document.querySelector('#contact')?.innerText.trim()
    };

    return res;
  });

  fs.writeFileSync('audit/onos-en-structured.json', JSON.stringify(enDetails, null, 2));

  // 2. Load VI
  await page.goto('https://onosglobal.pages.dev/?lang=vi', { waitUntil: 'networkidle' });

  const viDetails = await page.evaluate(async () => {
    const res = {};
    
    // Hero
    res.hero = {
      h1: document.querySelector('.enterprise-hero h1')?.innerText.trim(),
      subtitle: document.querySelector('.enterprise-hero p')?.innerText.trim(),
      ctas: Array.from(document.querySelectorAll('.enterprise-hero a, .enterprise-hero button')).map(el => ({
        text: el.innerText.trim(),
        href: el.getAttribute('href')
      }))
    };

    // Capabilities
    res.capabilities = Array.from(document.querySelectorAll('#capabilities .capability-card, #capabilities article')).map(el => ({
      title: el.querySelector('h3')?.innerText.trim(),
      description: el.querySelector('p')?.innerText.trim(),
      img: el.querySelector('img')?.getAttribute('src'),
      imgAlt: el.querySelector('img')?.getAttribute('alt'),
      link: el.querySelector('a')?.getAttribute('href')
    }));

    // Production Finder
    res.finder = [];
    const finderMethods = ['dtg', 'embroidery', 'sublimation', 'laser'];
    for (const m of finderMethods) {
      const btn = document.querySelector(`[data-method-choice="${m}"]`);
      if (btn) btn.click();
      const panel = document.querySelector(`[data-method="${m}"]`);
      if (panel) {
        res.finder.push({
          id: m,
          title: panel.querySelector('h3')?.innerText.trim(),
          lead: panel.querySelector('.fit-lead, p')?.innerText.trim(),
          allText: panel.innerText.trim(),
          img: panel.querySelector('img')?.getAttribute('src'),
          imgAlt: panel.querySelector('img')?.getAttribute('alt'),
          ctaText: panel.querySelector('a')?.innerText.trim(),
          ctaHref: panel.querySelector('a')?.getAttribute('href')
        });
      }
    }

    // Facilities
    res.plants = Array.from(document.querySelectorAll('#facilities .plant')).map(p => ({
      code: p.querySelector('.plant-code')?.innerText.trim(),
      title: p.querySelector('h3')?.innerText.trim(),
      location: p.querySelector('.plant-location')?.innerText.trim(),
      role: p.querySelector('.plant-role')?.innerText.trim(),
      text: p.innerText.trim()
    }));

    res.carouselSlides = Array.from(document.querySelectorAll('[data-facility-slide], .facility-slide, [class*="facility-carousel"] figure, .network figure')).map(f => ({
      img: f.querySelector('img')?.getAttribute('src'),
      alt: f.querySelector('img')?.getAttribute('alt'),
      caption: f.querySelector('figcaption, p')?.innerText.trim()
    }));

    // Workflow
    res.workflow = Array.from(document.querySelectorAll('#process .process-step, #process [class*="step"]')).map(s => ({
      stepNum: s.querySelector('.step-num, .step-number')?.innerText.trim(),
      title: s.querySelector('h3')?.innerText.trim(),
      desc: s.querySelector('p')?.innerText.trim(),
      text: s.innerText.trim()
    }));

    // Inside Onos (Gallery)
    res.gallery = Array.from(document.querySelectorAll('#inside-onos figure, #inside-onos .gallery-item, #inside-onos [data-gallery-item]')).map(g => ({
      img: g.querySelector('img')?.getAttribute('src'),
      alt: g.querySelector('img')?.getAttribute('alt'),
      caption: g.querySelector('figcaption')?.innerText.trim(),
      viewBtn: g.querySelector('button')?.getAttribute('aria-label')
    }));

    // Ecosystem
    res.ecosystem = Array.from(document.querySelectorAll('#ecosystem .ecosystem-card, #ecosystem article')).map(e => ({
      eyebrow: e.querySelector('.ecosystem-label, .eyebrow')?.innerText.trim(),
      title: e.querySelector('h3')?.innerText.trim(),
      desc: e.querySelector('p')?.innerText.trim(),
      linkText: e.querySelector('a')?.innerText.trim(),
      href: e.querySelector('a')?.getAttribute('href')
    }));

    // FAQ
    for (const d of document.querySelectorAll('details')) {
      d.open = true;
    }
    res.faq = Array.from(document.querySelectorAll('#faq details, details')).map(d => ({
      summary: d.querySelector('summary')?.innerText.trim(),
      content: d.querySelector('p, div:not(summary)')?.innerText.trim(),
      full: d.innerText.trim()
    }));

    // Contact
    res.contact = {
      h2: document.querySelector('#contact h2')?.innerText.trim(),
      lead: document.querySelector('#contact .lead, #contact p')?.innerText.trim(),
      email: document.querySelector('#contact a[href^="mailto:"]')?.innerText.trim(),
      emailHref: document.querySelector('#contact a[href^="mailto:"]')?.getAttribute('href'),
      phone: document.querySelector('#contact a[href^="tel:"]')?.innerText.trim(),
      phoneHref: document.querySelector('#contact a[href^="tel:"]')?.getAttribute('href'),
      address: document.querySelector('#contact address')?.innerText.trim(),
      allText: document.querySelector('#contact')?.innerText.trim()
    };

    return res;
  });

  fs.writeFileSync('audit/onos-vi-structured.json', JSON.stringify(viDetails, null, 2));

  console.log('Extraction complete! Files written to audit/onos-en-structured.json and audit/onos-vi-structured.json');
  await browser.close();
}

extract().catch(console.error);
