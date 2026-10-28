import { test, expect } from '@playwright/test';
import fs from 'node:fs';
const original = JSON.parse(fs.readFileSync('audit/final/reference/live-audit.json', 'utf8'));
const methodCases = [
  { id: 'dtg', name: 'DTG printing', material: 'Cotton and cotton-rich apparel.', prep: 'Confirm fabric composition, garment colour, artwork size and placement. Approve colour on a physical sample.' },
  { id: 'embroidery', name: 'Computerised embroidery', material: 'Caps, polos and bags suitable for embroidery.', prep: 'Share the logo size and placement. Small lettering and fine details need review when digitising the stitch file.' },
  { id: 'sublimation', name: 'Sublimation printing', material: 'Polyester apparel and sportswear suitable for sublimation.', prep: 'Confirm fabric composition, base colour, pattern layout and seams. Test colour on the intended material.' },
  { id: 'laser', name: 'Laser cutting & engraving', material: 'Wood, acrylic, leather or fabric confirmed as suitable by the team.', prep: 'Provide material type, thickness and cutting paths. Confirm the finish on a sample before approving the run.' },
];
for (const width of [375, 768, 1024, 1440]) {
  test(`responsive content and images at ${width}px in EN and VI`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 }); await page.goto('/');
    for (const lang of ['en', 'vi']) {
      if (lang === 'vi') { await page.evaluate(() => scrollTo(0, 0)); await page.getByRole('button', { name: 'Tiếng Việt', exact: true }).click(); }
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      for (const id of ['home','about','capabilities','production-fit','network','process','gallery','ecosystem','faq','contact']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await expect(page.locator(`#${id}`)).toBeVisible();
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      }
      await expect.poll(() => page.locator('main img').evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || !(image as HTMLImageElement).naturalWidth).map(image => image.getAttribute('src')))).toEqual([]);
      await page.screenshot({ path: `audit/final/screenshots/home-${width}-${lang}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('body')).not.toContainText(/Manufactt|CNC|aerospace|newsletter|Emily Carter|demo testimonial/i);
  });
}
test('navigation, every anchor, contact and ecosystem destinations', async ({ page }) => {
  await page.goto('/');
  const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))));
  expect(broken).toEqual([]);
  await page.getByRole('link', { name: 'Find your production fit', exact: true }).click(); await expect(page).toHaveURL(/#production-fit$/);
  for (const url of ['https://onosglobal.pages.dev/', 'https://onospod.pages.dev/', 'https://onosgroup.pages.dev/']) expect(original.links.some((link: { href: string }) => link.href === url)).toBe(true);
  await expect(page.locator('#ecosystem a')).toHaveCount(3);
  for (const [index, url] of ['https://onosglobal.pages.dev/', 'https://onospod.pages.dev/', 'https://onosgroup.pages.dev/'].entries()) await expect(page.locator('#ecosystem a').nth(index)).toHaveAttribute('href', url);
  await expect(page.locator('#contact a[href^="tel:"]')).toHaveAttribute('href', 'tel:+84986385112');
  await expect(page.locator('#contact')).toContainText('705 Lac Long Quan');
  await expect(page.locator('#contact')).toContainText('Mon–Fri: 7:30–17:30 · Sat: 8:00–17:00');
  await expect(page.locator('form')).toHaveCount(0);
});
test('four production recommendations, selector, tabs, capability CTAs and contextual drafts match original', async ({ page }) => {
  await page.goto('/');
  for (const item of methodCases) {
    const source = original.finder.find((entry: { value: string }) => entry.value === item.id);
    expect(source.text).toContain(item.material); expect(source.text).toContain(item.prep);
    await page.locator('#production-method').selectOption(item.id);
    const panel = page.getByRole('tabpanel'); await expect(panel).toContainText(item.name); await expect(panel).toContainText(item.material); await expect(panel).toContainText(item.prep);
    await expect(panel).toContainText('300 DPI'); await expect(page.locator(`#tab-${item.id}`)).toHaveAttribute('aria-selected', 'true');
    const draft = new URL((await page.locator('#method-email').getAttribute('href'))!);
    expect(draft.pathname).toBe('onospod.com@gmail.com'); expect(draft.searchParams.get('body')).toContain(`Production method: ${item.name}`);
    expect(draft.searchParams.get('body')).toContain('Destination country / postcode:');
  }
  await page.locator('#tab-laser').focus(); await page.keyboard.press('Home'); await expect(page.locator('#tab-dtg')).toBeFocused();
  await page.keyboard.press('ArrowDown'); await expect(page.locator('#tab-embroidery')).toBeFocused(); await expect(page.locator('#production-method')).toHaveValue('embroidery');
  await page.locator('#capabilities a').nth(2).click(); await expect(page.locator('#production-method')).toHaveValue('sublimation'); await expect(page.locator('#tab-sublimation')).toBeFocused();
});
test('Vietnamese covers full content, recommendations, FAQ, alt text, labels and email drafts', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: 'Tiếng Việt', exact: true }).click();
  await expect(page.locator('h1')).toContainText('Sáng Tạo Không Ngừng.');
  await expect(page.locator('#capabilities')).toContainText('Máy thêu vi tính nhiều đầu');
  await expect(page.locator('#network')).toContainText('Đại Từ · Thái Nguyên · Việt Nam');
  await expect(page.locator('#process')).toContainText('Sẵn sàng giao hàng');
  await expect(page.locator('#contact')).toContainText('Tầng 3, số 705 Lạc Long Quân');
  const enAlts = await page.locator('main img').evaluateAll(images => images.map(image => image.getAttribute('alt')).filter(alt => alt && /Onos|garment|production|equipment|team|plant|floor|wooden/.test(alt) && !/Onos$|Onos tại|ngũ Onos|tại Onos|Onos trao|Onos kiểm|xưởng|quần|gỗ|Thiết|Hệ thống/.test(alt)));
  expect(enAlts).toEqual([]);
  for (const id of ['dtg','embroidery','sublimation','laser']) { await page.locator('#production-method').selectOption(id); await expect(page.getByRole('tabpanel')).toContainText('Trước khi sản xuất'); expect(decodeURIComponent((await page.locator('#method-email').getAttribute('href'))!)).toContain('Công nghệ:'); }
  const summaries = page.locator('#faq summary');
  for (let index = 0; index < 4; index++) { await summaries.nth(index).click(); await expect(page.locator('#faq details').nth(index)).toHaveAttribute('open', ''); }
  await expect(page.locator('#faq')).toContainText('PNG nền trong suốt ở 300 DPI');
  const draft = new URL((await page.locator('#email-brief').getAttribute('href'))!); expect(draft.searchParams.get('body')).toContain('Số lượng dự kiến:'); expect(draft.searchParams.get('subject')).toContain('Yêu cầu sản xuất');
  await expect(page.locator('#contact')).toContainText('Không có biểu mẫu nào được gửi');
});
test('factory carousel previous, next, dots, wrap, keys, pause and swipe', async ({ page }) => {
  await page.goto('/'); const carousel = page.locator('.onos-factory-carousel'); await carousel.scrollIntoViewIfNeeded();
  const image = carousel.locator('img'); await expect(image).toHaveAttribute('alt', 'Sewing floor at the Thai Nguyen plant');
  await carousel.getByRole('button', { name: 'Next photo', exact: true }).click(); await expect(image).toHaveAttribute('alt', 'Automated fabric cutting at the Me Linh plant');
  await carousel.getByRole('button', { name: 'Previous photo', exact: true }).click(); await carousel.getByRole('button', { name: 'Previous photo', exact: true }).click(); await expect(image).toHaveAttribute('alt', /Epson/);
  await carousel.getByRole('button', { name: 'Show photo 3', exact: true }).click(); await expect(image).toHaveAttribute('alt', /California/);
  await carousel.focus(); await page.keyboard.press('ArrowRight'); await expect(image).toHaveAttribute('alt', /Epson/);
  await carousel.getByRole('button', { name: 'Pause slideshow', exact: true }).click(); await expect(carousel.getByRole('button', { name: 'Play slideshow', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await carousel.locator('figure').dispatchEvent('touchstart', { touches: [{ identifier: 0, clientX: 300, clientY: 200 }] }); await carousel.locator('figure').dispatchEvent('touchend', { changedTouches: [{ identifier: 0, clientX: 120, clientY: 205 }] }); await expect(image).toHaveAttribute('alt', /Thai Nguyen/);
});
test('factory autoplay, pause persistence and reduced motion', async ({ page }) => {
  await page.goto('/'); const carousel = page.locator('.onos-factory-carousel'); await carousel.scrollIntoViewIfNeeded(); await page.mouse.move(1, 1);
  await expect(carousel.locator('img')).toHaveAttribute('alt', /Me Linh/, { timeout: 7500 });
  await carousel.getByRole('button', { name: 'Pause slideshow', exact: true }).click(); const pausedAlt = await carousel.locator('img').getAttribute('alt'); await page.locator('h2').first().focus(); await page.mouse.move(1, 1); await page.waitForTimeout(5500); await expect(carousel.locator('img')).toHaveAttribute('alt', pausedAlt!);
  await carousel.getByRole('button', { name: 'Play slideshow', exact: true }).click(); await page.mouse.move(1, 1); await expect.poll(() => carousel.locator('img').getAttribute('alt'), { timeout: 7500 }).not.toBe(pausedAlt);
  await page.getByRole('button', { name: 'Pause animations', exact: true }).click(); await page.reload(); await expect(page.getByRole('button', { name: 'Play animations', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(carousel.getByRole('button', { name: 'Play slideshow', exact: true })).toBeDisabled();
  await page.emulateMedia({ reducedMotion: 'reduce' }); await expect(page.getByRole('button', { name: 'Motion reduced by system setting' })).toBeDisabled();
});
test('gallery rail and modal: next/previous, arrows, Tab/Shift+Tab, Escape and restored focus', async ({ page }) => {
  await page.goto('/'); const gallery = page.locator('#gallery'); await gallery.scrollIntoViewIfNeeded();
  await gallery.getByRole('button', { name: 'Next photos', exact: true }).click(); await expect.poll(() => page.locator('.onos-gallery-rail').evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  const opener = gallery.locator('.onos-gallery-open').first(); await opener.click(); const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('alt', 'The Onos team at a working meeting');
  await dialog.getByRole('button', { name: 'Next photo', exact: true }).click(); await expect(dialog.locator('img')).toHaveAttribute('alt', /finishing table/);
  await page.keyboard.press('ArrowLeft'); await expect(dialog.locator('img')).toHaveAttribute('alt', /working meeting/);
  await page.keyboard.press('ArrowLeft'); await expect(dialog.locator('img')).toHaveAttribute('alt', /warehouse/);
  const close = dialog.getByRole('button', { name: 'Close photograph' }); const next = dialog.getByRole('button', { name: 'Next photo', exact: true });
  await close.focus(); await page.keyboard.press('Shift+Tab'); await expect(next).toBeFocused(); await page.keyboard.press('Tab'); await expect(close).toBeFocused();
  await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(opener).toBeFocused();
  await opener.click(); await dialog.getByRole('button', { name: 'Close photograph' }).click(); await expect(opener).toBeFocused();
});
test('mobile menu keyboard dismissal, outside click and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); await page.goto('/'); const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.click(); await expect(page.locator('#main-navigation')).toBeVisible(); await page.keyboard.press('Escape'); await expect(menu).toBeFocused(); await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click(); await page.locator('.hero-description').click(); await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click(); await page.locator('#main-navigation').getByRole('link', { name: 'Our network', exact: true }).click(); await expect(page).toHaveURL(/#network$/); await expect(menu).toHaveAttribute('aria-expanded', 'false');
});
test('FAQ keyboard operation and original answers; English inquiry outline', async ({ page }) => {
  await page.goto('/'); const summary = page.locator('#faq summary').first(); await summary.focus(); await page.keyboard.press('Enter'); await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
  expect(original.faq[0]).toContain('DTG and sublimation orders can start from a single unit.'); await expect(page.locator('#faq details').first()).toContainText('DTG and sublimation orders can start from a single unit.');
  await page.keyboard.press('Space'); await expect(page.locator('#faq details').first()).not.toHaveAttribute('open');
  const draft = new URL((await page.locator('#email-brief').getAttribute('href'))!); expect(draft.searchParams.get('body')).toBe('Hello Onos team,\n\nProduct:\nExpected quantity:\nDestination:\nTarget date:\nArtwork link:\n');
});
test('single content route, meaningful legacy redirects and obsolete demo 404s', async ({ request }) => {
  for (const [route, destination] of [['/about','/#about'],['/services','/#capabilities'],['/products','/#production-fit'],['/contact.html','/#contact'],['/faqs','/#faq'],['/vi','/?lang=vi']]) { const response = await request.get(route, { maxRedirects: 0 }); expect(response.status()).toBe(308); expect(response.headers().location).toBe(destination); }
  for (const route of ['/blog','/case-studies','/utility-pages/style-guide','/service/cnc-machining-services']) expect((await request.get(route)).status()).toBe(404);
});
test('mobile lightbox swipe, close, restored focus and Vietnamese deep link', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await context.newPage(); await page.goto('http://127.0.0.1:3000/?lang=vi');
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  const opener = page.locator('.onos-gallery-open').first(); await opener.tap();
  const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
  await dialog.locator('figure').dispatchEvent('touchstart', { touches: [{ identifier: 1, clientX: 300, clientY: 250 }] });
  await dialog.locator('figure').dispatchEvent('touchend', { changedTouches: [{ identifier: 1, clientX: 100, clientY: 255 }] });
  await expect(dialog.locator('img')).toHaveAttribute('alt', /bàn hoàn thiện/);
  await dialog.getByRole('button', { name: 'Ảnh trước', exact: true }).tap(); await expect(dialog.locator('img')).toHaveAttribute('alt', /trao đổi công việc/);
  await page.screenshot({ path: 'audit/final/screenshots/gallery-lightbox-375-vi.png' });
  await dialog.getByRole('button', { name: 'Đóng ảnh', exact: true }).tap(); await expect(dialog).not.toBeVisible(); await expect(opener).toBeFocused();
  await context.close();
});
test('homepage smoke: responsive layout, original choices, carousel, gallery, FAQ, language and contact', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 1024, height: 900 }); await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Innovating without limits. Elevating value.');
  await expect(page.locator('#capabilities .service-info-link')).toHaveCount(4);
  await expect(page.locator('.onos-factory-card')).toHaveCount(3);
  await expect(page.locator('.onos-process-step')).toHaveCount(4);
  await expect(page.locator('#ecosystem a')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  for (const item of methodCases) {
    await page.locator('#production-method').selectOption(item.id);
    await expect(page.getByRole('tabpanel')).toContainText(item.material);
    await expect(page.getByRole('tabpanel')).toContainText(item.prep);
    expect(new URL((await page.locator('#method-email').getAttribute('href'))!).searchParams.get('body')).toContain(`Production method: ${item.name}`);
  }
  await page.locator('#capabilities a').nth(1).click(); await expect(page.locator('#production-method')).toHaveValue('embroidery');
  await page.keyboard.press('ArrowDown'); await expect(page.locator('#production-method')).toHaveValue('sublimation');
  const carousel = page.locator('.onos-factory-carousel'); await carousel.scrollIntoViewIfNeeded();
  await carousel.getByRole('button', { name: 'Show photo 1', exact: true }).click();
  await carousel.getByRole('button', { name: 'Next photo', exact: true }).click(); await expect(carousel.locator('img')).toHaveAttribute('alt', /Me Linh/);
  await carousel.getByRole('button', { name: 'Previous photo', exact: true }).click(); await expect(carousel.locator('img')).toHaveAttribute('alt', /Thai Nguyen/);
  await carousel.locator('figure').dispatchEvent('touchstart', { touches: [{ identifier: 0, clientX: 300, clientY: 200 }] });
  await carousel.locator('figure').dispatchEvent('touchend', { changedTouches: [{ identifier: 0, clientX: 120, clientY: 205 }] });
  await expect(carousel.locator('img')).toHaveAttribute('alt', /Me Linh/);
  await carousel.getByRole('button', { name: 'Pause slideshow', exact: true }).click(); await expect(carousel.getByRole('button', { name: 'Play slideshow', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await carousel.getByRole('button', { name: 'Play slideshow', exact: true }).click(); await page.mouse.move(1, 1);
  await expect.poll(() => carousel.locator('img').getAttribute('alt'), { timeout: 7500 }).not.toMatch(/Me Linh/);
  await page.locator('#faq summary').first().focus(); await page.keyboard.press('Enter'); await expect(page.locator('#faq details').first()).toContainText('DTG and sublimation orders can start from a single unit.');
  const opener = page.locator('.onos-gallery-open').first(); await opener.click(); const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight'); await expect(dialog.locator('img')).toHaveAttribute('alt', /finishing table/);
  await dialog.getByRole('button', { name: 'Close photograph' }).focus(); await page.keyboard.press('Shift+Tab'); await expect(dialog.getByRole('button', { name: 'Next photo', exact: true })).toBeFocused();
  await page.keyboard.press('Tab'); await expect(dialog.getByRole('button', { name: 'Close photograph' })).toBeFocused();
  await page.keyboard.press('Escape'); await expect(opener).toBeFocused();
  await page.evaluate(() => scrollTo(0, 0)); await page.setViewportSize({ width: 375, height: 812 });
  const menu = page.getByRole('button', { name: 'Open navigation' }); await menu.click(); await expect(page.locator('#main-navigation')).toBeVisible();
  await page.locator('.hero-description').click(); await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click(); await page.keyboard.press('Escape'); await expect(menu).toBeFocused();
  await page.getByRole('button', { name: 'Tiếng Việt', exact: true }).click(); await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.locator('#production-fit')).toContainText('Chọn công nghệ để xem chất liệu phù hợp');
  await expect(page.locator('#contact')).toContainText('Tầng 3, số 705 Lạc Long Quân');
  expect(new URL((await page.locator('#email-brief').getAttribute('href'))!).searchParams.get('body')).toContain('Số lượng dự kiến:');
  await opener.click(); await dialog.locator('figure').dispatchEvent('touchstart', { touches: [{ identifier: 1, clientX: 300, clientY: 250 }] });
  await dialog.locator('figure').dispatchEvent('touchend', { changedTouches: [{ identifier: 1, clientX: 100, clientY: 255 }] }); await expect(dialog.locator('img')).toHaveAttribute('alt', /bàn hoàn thiện/);
  await dialog.getByRole('button', { name: 'Đóng ảnh', exact: true }).click(); await expect(opener).toBeFocused();
  await page.getByRole('button', { name: 'Tạm dừng hiệu ứng động', exact: true }).click(); await expect(page.locator('html')).toHaveClass(/motion-paused/);
  for (const width of [375,768,1024,1440]) { await page.setViewportSize({ width, height: 900 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true); }
  await page.screenshot({ path: 'audit/final/screenshots/home-final-1440-vi.png', fullPage: true });
  await page.evaluate(() => scrollTo(0, 0)); await page.getByRole('button', { name: 'English', exact: true }).click(); await page.screenshot({ path: 'audit/final/screenshots/home-final-1440-en.png', fullPage: true });
  await expect(page.locator('form')).toHaveCount(0);
  expect(await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))))).toEqual([]);
  expect(errors).toEqual([]);
});
