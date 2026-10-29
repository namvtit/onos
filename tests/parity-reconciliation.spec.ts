import { test, expect } from '@playwright/test';

test.describe('ONOS Global Business & Functional Parity Verification', () => {
  const BASE_URL = 'http://localhost:3000';

  test('P0: Complete Factory Network (3 facilities, 4 carousel photographs)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const networkSection = page.locator('#network');
    await expect(networkSection).toBeVisible();

    // 1. Verify 3 facilities exist and are discoverable
    const facilityTabs = networkSection.locator('.facility-tabs-bar button');
    await expect(facilityTabs).toHaveCount(3);
    await expect(facilityTabs.nth(0)).toContainText('VN—01');
    await expect(facilityTabs.nth(0)).toContainText('Thai Nguyen');
    await expect(facilityTabs.nth(1)).toContainText('VN—02');
    await expect(facilityTabs.nth(1)).toContainText('Me Linh');
    await expect(facilityTabs.nth(2)).toContainText('US—01');
    await expect(facilityTabs.nth(2)).toContainText('California');

    // 2. Verify 4 photo dots exist
    const photoDots = networkSection.locator('.facility-dots button');
    await expect(photoDots).toHaveCount(4);

    // 3. Verify California operating entity
    await facilityTabs.nth(2).click();
    await expect(networkSection).toContainText('ONOS American Ventures Corp.');
    await expect(networkSection).not.toContainText('Florida');

    // 4. Verify 5-step QC for Thai Nguyen
    await facilityTabs.nth(0).click();
    await expect(networkSection).toContainText('five-step quality control process');

    // 5. Verify Previous and Next buttons work
    const prevBtn = networkSection.locator('.slider-arrow-left');
    const nextBtn = networkSection.locator('.slider-arrow-right');
    await prevBtn.scrollIntoViewIfNeeded();
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();

    // 6. Verify pause/play slideshow button
    const toggleBtn = networkSection.locator('button[aria-label*="slideshow"]');
    await expect(toggleBtn).toBeVisible();
  });

  test('P0: Exact Manufacturing Capabilities (4 primary capabilities, no invented claims)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const services = page.locator('#capabilities');
    await expect(services).toBeVisible();

    // Verify exactly 4 capabilities
    const capabilityRows = services.locator('.service-info-link');
    await expect(capabilityRows).toHaveCount(4);

    // Verify names
    await expect(services).toContainText('DTG printing');
    await expect(services).toContainText('Computerised embroidery');
    await expect(services).toContainText('Sublimation printing');
    await expect(services).toContainText('Laser cutting & engraving');

    // Verify machine models
    await expect(services).toContainText('Machine: SL-DTG-X2S');
    await expect(services).toContainText('Equipment: multi-head embroidery');
    await expect(services).toContainText('Epson SC-F11030');
    await expect(services).toContainText('Laser FW-1822');

    // Verify absence of invented claims
    const servicesText = await services.innerText();
    expect(servicesText).not.toContain('OEKO-TEX');
    expect(servicesText).not.toContain('2-4 day turnaround');
    expect(servicesText).not.toContain('Sub-millimeter cutting accuracy');
    expect(servicesText).not.toContain('Tajima & Barudan');
    expect(servicesText).not.toContain('Screen printing');

    // Verify accordion expansion
    await capabilityRows.nth(1).click();
    await expect(capabilityRows.nth(1)).toHaveClass(/is-expanded/);
  });

  test('P0: Exact Production Finder (4 selectable methods & context mailto)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const finder = page.locator('#production-fit');
    await expect(finder).toBeVisible();

    const tabs = finder.locator('.industry-tabs-menu button');
    await expect(tabs).toHaveCount(4);

    // Tab 1: DTG
    await tabs.nth(0).click();
    await expect(finder).toContainText('Cotton and cotton-rich apparel.');
    await expect(finder).toContainText('Approve colour on a physical sample.');
    const cta = finder.locator('#method-email');
    let href = await cta.getAttribute('href');
    expect(href).toContain('onospod.com@gmail.com');
    expect(href).toContain('DTG%20printing');

    // Tab 2: Embroidery
    await tabs.nth(1).click();
    await expect(finder).toContainText('Caps, polos and bags suitable for embroidery.');
    await expect(finder).toContainText('Small lettering and fine details need review');
    href = await cta.getAttribute('href');
    expect(href).toContain('Computerised%20embroidery');

    // Tab 3: Sublimation
    await tabs.nth(2).click();
    await expect(finder).toContainText('Polyester apparel and sportswear suitable for sublimation.');
    await expect(finder).toContainText('Test colour on the intended material.');
    href = await cta.getAttribute('href');
    expect(href).toContain('Sublimation%20printing');

    // Tab 4: Laser
    await tabs.nth(3).click();
    await expect(finder).toContainText('Wood, acrylic, leather or fabric');
    await expect(finder).toContainText('cutting paths');
    href = await cta.getAttribute('href');
    expect(href).toContain('Laser%20cutting');
  });

  test('P1: Production Gallery (4 authentic photos & lightbox)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const gallery = page.locator('#gallery');
    await expect(gallery).toBeVisible();

    // Verify 4 thumbnails
    const thumbnails = gallery.locator('.testimonial-tabs-menu button');
    await expect(thumbnails).toHaveCount(4);

    // Verify captions
    await expect(gallery).toContainText('Better, together.');
    await thumbnails.nth(1).click();
    await expect(gallery).toContainText('The finishing touches.');
    await thumbnails.nth(2).click();
    await expect(gallery).toContainText('Ideas you can hold.');
    await thumbnails.nth(3).click();
    await expect(gallery).toContainText('Ready for the next order.');

    // Verify absence of fake testimonials/stars
    const text = await gallery.innerText();
    expect(text).not.toContain('5.0');
    expect(text).not.toContain('★★★★★');
    expect(text).not.toContain('CEO');
    expect(text).not.toContain('Verified Customer');

    // Test Lightbox open and close with Escape
    const zoomBtn = gallery.locator('button[aria-label*="Expand facility photograph"]');
    await zoomBtn.click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('P1: Complete ONOS Ecosystem (3 entities with verified links)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const ecosystemSection = page.locator('#ecosystem');
    await expect(ecosystemSection).toBeVisible();

    const cards = ecosystemSection.locator('.ecosystem-card');
    await expect(cards).toHaveCount(3);

    // Entity 1: Onos Global
    await expect(cards.nth(0)).toContainText('Onos Global');
    await expect(cards.nth(0)).toContainText('FOR INTERNATIONAL BRANDS');
    await expect(cards.nth(0)).toContainText('Manufacturing and fulfillment across borders.');
    await expect(cards.nth(0)).toHaveAttribute('href', 'https://onosglobal.pages.dev/');
    await expect(cards.nth(0)).toHaveAttribute('target', '_blank');

    // Entity 2: onospod
    await expect(cards.nth(1)).toContainText('onospod');
    await expect(cards.nth(1)).toContainText('FOR VIETNAMESE SELLERS');
    await expect(cards.nth(1)).toContainText('The production partner for your POD business.');
    await expect(cards.nth(1)).toHaveAttribute('href', 'https://onospod.pages.dev/');
    await expect(cards.nth(1)).toHaveAttribute('target', '_blank');

    // Entity 3: Onos Group
    await expect(cards.nth(2)).toContainText('Onos Group');
    await expect(cards.nth(2)).toContainText('THE PEOPLE BEHIND IT ALL');
    await expect(cards.nth(2)).toContainText('Our company, our people and the next chapter.');
    await expect(cards.nth(2)).toHaveAttribute('href', 'https://onosgroup.pages.dev/');
    await expect(cards.nth(2)).toHaveAttribute('target', '_blank');
  });

  test('P1: 4-Step Workflow and Distinction from 5-step QC', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const workflow = page.locator('#workflow');
    await expect(workflow).toBeVisible();

    await expect(workflow).toContainText('Share the idea');
    await expect(workflow).toContainText('Get it production-ready');
    await expect(workflow).toContainText('Make. Check. Finish.');
    await expect(workflow).toContainText('On its way');
    await expect(workflow).toContainText('5-step factory quality control process');
  });

  test('P1: FAQ Parity (4 questions & authentic answers)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const faq = page.locator('#faq');
    await expect(faq).toBeVisible();

    const items = faq.locator('.accordion-item');
    await expect(items).toHaveCount(4);

    await expect(items.nth(0)).toContainText('Can I start with a small order?');
    await expect(items.nth(0)).toContainText('DTG and sublimation orders can start from a single unit');

    await expect(items.nth(1)).toContainText('What artwork files do you need?');
    await expect(items.nth(1)).toContainText('300 DPI');

    await expect(items.nth(2)).toContainText('Can we approve a sample first?');
    await expect(items.nth(2)).toContainText('dedicated sampling line');

    await expect(items.nth(3)).toContainText('How do we confirm pricing and lead time?');
  });

  test('P1: Contact & Project Inquiry', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    await expect(contactSection).toContainText('onospod.com@gmail.com');
    await expect(contactSection).toContainText('+84 986 385 112');
    await expect(contactSection).toContainText('705 Lac Long Quan');

    const emailBrief = contactSection.locator('#email-brief');
    await expect(emailBrief).toBeVisible();
    const href = await emailBrief.getAttribute('href');
    expect(href).toContain('mailto:onospod.com@gmail.com');
  });

  test('P1: Content Cleanup (No newsletter, no unsupported product catalog)', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // 1. Verify products catalog section is removed
    const productsSection = page.locator('#products');
    await expect(productsSection).toHaveCount(0);

    // 2. Verify newsletter subscription form is removed from footer
    const newsletter = page.locator('form.form-subscribe, #wf-form-Subscribe-Form');
    await expect(newsletter).toHaveCount(0);

    // 3. Verify no dead spec sheet download links
    const deadDownloads = page.locator('a:has-text("Download Brochure"), a:has-text("Download Spec Sheet")');
    await expect(deadDownloads).toHaveCount(0);
  });

  test('P1: Bilingual Support (English and Vietnamese)', async ({ page }) => {
    // English default
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await expect(page.locator('h1.hero-title')).toContainText('Innovating without limits');

    // Switch to Vietnamese via URL
    await page.goto(`${BASE_URL}/?lang=vi`, { waitUntil: 'networkidle' });
    await expect(page.locator('h1.hero-title')).toContainText('Sáng Tạo Không Ngừng');
    await expect(page.locator('#capabilities')).toContainText('In DTG');
    await expect(page.locator('#capabilities')).toContainText('Thêu vi tính');
    await expect(page.locator('#ecosystem')).toContainText('Kết nối bởi một tầm nhìn');
    await expect(page.locator('#faq')).toContainText('Tôi có thể bắt đầu với số lượng ít không?');
    await expect(page.locator('#contact')).toContainText('Cùng bắt đầu dự án');
  });

  test('Responsive & No Horizontal Overflow at 1440, 1024, 768, 375px', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 812 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Verify page does not have horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allow subpixel rounding
    }
  });
});
