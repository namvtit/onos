import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function compareSections() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://onosglobal.pages.dev/', { waitUntil: 'networkidle' });

  const enSections = await page.evaluate(() => {
    const res = {};
    const sectionIds = ['top', 'capabilities', 'production-fit', 'facilities', 'process', 'inside-onos', 'ecosystem', 'faq', 'contact'];
    
    // Header/Hero
    res.hero = {
      badge: document.querySelector('.enterprise-badge')?.innerText.trim(),
      h1: document.querySelector('.enterprise-hero h1')?.innerText.trim(),
      subtitle: document.querySelector('.enterprise-hero .enterprise-lead')?.innerText.trim(),
      quickLinks: Array.from(document.querySelectorAll('.enterprise-hero a')).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })),
      facts: Array.from(document.querySelectorAll('.enterprise-hero .facts .fact')).map(f => f.innerText.trim())
    };

    // Capabilities
    res.capabilities = Array.from(document.querySelectorAll('#capabilities .capability-card')).map(c => ({
      tag: c.querySelector('.tag')?.innerText.trim(),
      model: c.querySelector('.machine-model')?.innerText.trim(),
      title: c.querySelector('h3')?.innerText.trim(),
      desc: c.querySelector('p')?.innerText.trim(),
      action: c.querySelector('a')?.innerText.trim()
    }));

    // Production Fit (Finder)
    res.finderMethods = Array.from(document.querySelectorAll('#production-fit [data-method]')).map(p => ({
      methodId: p.dataset.method,
      title: p.querySelector('h3')?.innerText.trim(),
      lead: p.querySelector('.fit-lead')?.innerText.trim(),
      specs: Array.from(p.querySelectorAll('.fit-specs > div')).map(d => ({
        label: d.querySelector('dt')?.innerText.trim(),
        value: d.querySelector('dd')?.innerText.trim()
      })),
      ctaText: p.querySelector('a')?.innerText.trim(),
      ctaHref: p.querySelector('a')?.getAttribute('href')
    }));

    // Facilities
    res.facilities = {
      h2: document.querySelector('#facilities h2')?.innerText.trim(),
      intro: document.querySelector('#facilities .section-intro, #facilities p')?.innerText.trim(),
      plants: Array.from(document.querySelectorAll('#facilities .plant')).map(pl => ({
        code: pl.querySelector('.plant-code')?.innerText.trim(),
        title: pl.querySelector('h3')?.innerText.trim(),
        location: pl.querySelector('.plant-location')?.innerText.trim(),
        role: pl.querySelector('.plant-role')?.innerText.trim()
      })),
      slides: Array.from(document.querySelectorAll('.facility-slide')).map(s => ({
        img: s.querySelector('img')?.getAttribute('src'),
        alt: s.querySelector('img')?.getAttribute('alt'),
        caption: s.querySelector('figcaption')?.innerText.trim()
      }))
    };

    // Process / Workflow
    res.process = {
      h2: document.querySelector('#process h2')?.innerText.trim(),
      steps: Array.from(document.querySelectorAll('#process .process-step')).map(st => ({
        num: st.querySelector('.step-num')?.innerText.trim(),
        title: st.querySelector('h3')?.innerText.trim(),
        desc: st.querySelector('p')?.innerText.trim()
      }))
    };

    // Gallery
    res.gallery = {
      h2: document.querySelector('#inside-onos h2')?.innerText.trim(),
      items: Array.from(document.querySelectorAll('#inside-onos figure')).map(f => ({
        img: f.querySelector('img')?.getAttribute('src'),
        alt: f.querySelector('img')?.getAttribute('alt'),
        caption: f.querySelector('figcaption')?.innerText.trim()
      }))
    };

    // Ecosystem
    res.ecosystem = {
      h2: document.querySelector('#ecosystem h2')?.innerText.trim(),
      entities: Array.from(document.querySelectorAll('#ecosystem .ecosystem-card')).map(card => ({
        eyebrow: card.querySelector('.eyebrow')?.innerText.trim(),
        title: card.querySelector('h3')?.innerText.trim(),
        desc: card.querySelector('p')?.innerText.trim(),
        linkText: card.querySelector('a')?.innerText.trim(),
        href: card.querySelector('a')?.getAttribute('href')
      }))
    };

    // FAQ
    res.faq = {
      h2: document.querySelector('#faq h2')?.innerText.trim(),
      questions: Array.from(document.querySelectorAll('#faq details')).map(d => ({
        summary: d.querySelector('summary')?.innerText.trim().replace(/\+$/, '').trim(),
        answer: d.querySelector('p')?.innerText.trim()
      }))
    };

    // Contact
    res.contact = {
      h2: document.querySelector('#contact h2')?.innerText.trim(),
      lead: document.querySelector('#contact .lead')?.innerText.trim(),
      briefCta: document.querySelector('#email-brief')?.innerText.trim(),
      briefHref: document.querySelector('#email-brief')?.getAttribute('href'),
      channels: Array.from(document.querySelectorAll('#contact .contact-channels a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      })),
      address: document.querySelector('#contact address')?.innerText.trim(),
      hours: document.querySelector('#contact .contact-hours')?.innerText.trim()
    };

    return res;
  });

  // Switch to VI and extract
  await page.evaluate(() => {
    // Call the translate function if bound or trigger via URL
  });

  await page.goto('https://onosglobal.pages.dev/?lang=vi', { waitUntil: 'networkidle' });
  // wait a bit for scripts
  await page.waitForTimeout(500);

  // In case translate needs to be triggered
  await page.evaluate(() => {
    document.querySelectorAll('[data-en][data-vi]').forEach(el => { el.textContent = el.dataset.vi; });
    document.querySelectorAll('[data-alt-en][data-alt-vi]').forEach(el => { el.alt = el.getAttribute('data-alt-vi'); });
    const intro = 'Chào đội ngũ Onos,\n\nSản phẩm:\nSố lượng dự kiến:\nĐịa chỉ nhận:\nThời gian dự kiến:\nLink thiết kế:\n';
    const emailBrief = document.querySelector('#email-brief');
    if (emailBrief) emailBrief.href = 'mailto:onospod.com@gmail.com?subject=' + encodeURIComponent('Yêu cầu sản xuất — Onos Global') + '&body=' + encodeURIComponent(intro);
  });

  const viSections = await page.evaluate(() => {
    const res = {};

    res.hero = {
      badge: document.querySelector('.enterprise-badge')?.innerText.trim(),
      h1: document.querySelector('.enterprise-hero h1')?.innerText.trim(),
      subtitle: document.querySelector('.enterprise-hero .enterprise-lead')?.innerText.trim(),
      quickLinks: Array.from(document.querySelectorAll('.enterprise-hero a')).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })),
      facts: Array.from(document.querySelectorAll('.enterprise-hero .facts .fact')).map(f => f.innerText.trim())
    };

    res.capabilities = Array.from(document.querySelectorAll('#capabilities .capability-card')).map(c => ({
      tag: c.querySelector('.tag')?.innerText.trim(),
      model: c.querySelector('.machine-model')?.innerText.trim(),
      title: c.querySelector('h3')?.innerText.trim(),
      desc: c.querySelector('p')?.innerText.trim(),
      action: c.querySelector('a')?.innerText.trim()
    }));

    res.finderMethods = Array.from(document.querySelectorAll('#production-fit [data-method]')).map(p => ({
      methodId: p.dataset.method,
      title: p.querySelector('h3')?.innerText.trim(),
      lead: p.querySelector('.fit-lead')?.innerText.trim(),
      specs: Array.from(p.querySelectorAll('.fit-specs > div')).map(d => ({
        label: d.querySelector('dt')?.innerText.trim(),
        value: d.querySelector('dd')?.innerText.trim()
      })),
      ctaText: p.querySelector('a')?.innerText.trim(),
      ctaHref: p.querySelector('a')?.getAttribute('href')
    }));

    res.facilities = {
      h2: document.querySelector('#facilities h2')?.innerText.trim(),
      intro: document.querySelector('#facilities .section-intro, #facilities p')?.innerText.trim(),
      plants: Array.from(document.querySelectorAll('#facilities .plant')).map(pl => ({
        code: pl.querySelector('.plant-code')?.innerText.trim(),
        title: pl.querySelector('h3')?.innerText.trim(),
        location: pl.querySelector('.plant-location')?.innerText.trim(),
        role: pl.querySelector('.plant-role')?.innerText.trim()
      })),
      slides: Array.from(document.querySelectorAll('.facility-slide')).map(s => ({
        img: s.querySelector('img')?.getAttribute('src'),
        alt: s.querySelector('img')?.getAttribute('alt'),
        caption: s.querySelector('figcaption')?.innerText.trim()
      }))
    };

    res.process = {
      h2: document.querySelector('#process h2')?.innerText.trim(),
      steps: Array.from(document.querySelectorAll('#process .process-step')).map(st => ({
        num: st.querySelector('.step-num')?.innerText.trim(),
        title: st.querySelector('h3')?.innerText.trim(),
        desc: st.querySelector('p')?.innerText.trim()
      }))
    };

    res.gallery = {
      h2: document.querySelector('#inside-onos h2')?.innerText.trim(),
      items: Array.from(document.querySelectorAll('#inside-onos figure')).map(f => ({
        img: f.querySelector('img')?.getAttribute('src'),
        alt: f.querySelector('img')?.getAttribute('alt'),
        caption: f.querySelector('figcaption')?.innerText.trim()
      }))
    };

    res.ecosystem = {
      h2: document.querySelector('#ecosystem h2')?.innerText.trim(),
      entities: Array.from(document.querySelectorAll('#ecosystem .ecosystem-card')).map(card => ({
        eyebrow: card.querySelector('.eyebrow')?.innerText.trim(),
        title: card.querySelector('h3')?.innerText.trim(),
        desc: card.querySelector('p')?.innerText.trim(),
        linkText: card.querySelector('a')?.innerText.trim(),
        href: card.querySelector('a')?.getAttribute('href')
      }))
    };

    res.faq = {
      h2: document.querySelector('#faq h2')?.innerText.trim(),
      questions: Array.from(document.querySelectorAll('#faq details')).map(d => ({
        summary: d.querySelector('summary')?.innerText.trim().replace(/\+$/, '').trim(),
        answer: d.querySelector('p')?.innerText.trim()
      }))
    };

    res.contact = {
      h2: document.querySelector('#contact h2')?.innerText.trim(),
      lead: document.querySelector('#contact .lead')?.innerText.trim(),
      briefCta: document.querySelector('#email-brief')?.innerText.trim(),
      briefHref: document.querySelector('#email-brief')?.getAttribute('href'),
      channels: Array.from(document.querySelectorAll('#contact .contact-channels a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      })),
      address: document.querySelector('#contact address')?.innerText.trim(),
      hours: document.querySelector('#contact .contact-hours')?.innerText.trim()
    };

    return res;
  });

  fs.writeFileSync('audit/complete-onos-en.json', JSON.stringify(enSections, null, 2));
  fs.writeFileSync('audit/complete-onos-vi.json', JSON.stringify(viSections, null, 2));
  console.log('Saved audit/complete-onos-en.json and audit/complete-onos-vi.json');

  await browser.close();
}

compareSections().catch(console.error);
