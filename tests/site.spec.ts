import { test, expect } from "@playwright/test";
import fs from "node:fs";

const routes: { route: string }[] = JSON.parse(fs.readFileSync("audit/route-manifest.json", "utf8"));

test("every migrated route renders without broken local media or runtime errors", async ({ page }) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  const failures: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.url().includes("127.0.0.1:3000") && response.status() >= 400 && !response.url().endsWith("/404")) failures.push(`${response.status()} ${response.url()}`); });
  await page.route("https://**/*", route => route.abort());
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const { route } of routes) {
    const response = await page.goto(route, { waitUntil: "load" });
    expect(response?.status(), route).toBe(route === "/404" ? 404 : 200);
    await expect(page.locator("html")).toHaveClass(/site-ready/);
    await expect(page.locator("h1")).toHaveCount(route === "/products" ? 0 : route === "/utility-pages/style-guide" ? 2 : 1);
    await page.evaluate(async () => {
      document.querySelectorAll<HTMLImageElement>("img[loading='lazy']").forEach(image => image.loading = "eager");
      await Promise.all(Array.from(document.images).map(image => image.decode().catch(() => undefined)));
    });
    expect(await page.evaluate(() => Array.from(document.images).filter(image => !image.complete || !image.naturalWidth).map(image => image.src)), route).toEqual([]);
    expect(await page.locator(".more-templates,.access-paas,.w-webflow-badge").count()).toBe(0);
    expect(await page.locator("form[action],script[src*='webflow'],script[src*='jquery']").count()).toBe(0);
  }
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});

test("desktop navigation, dropdown, buttons, anchors and legacy URLs", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/site-ready/);
  const toggle = page.locator(".dropdown-toggle");
  await toggle.hover(); await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.locator(".dropdown-list").getByRole("link", { name: "Products", exact: true }).click();
  await expect(page).toHaveURL(/\/products$/);
  await page.locator(".brand").click(); await expect(page).toHaveURL(/\/$/);
  await page.locator(".hero-button a").click(); await expect(page).toHaveURL(/\/services$/);
  await page.goto("/about.html"); await expect(page).toHaveURL(/\/about$/);
  await page.goto("/index.html"); await expect(page).toHaveURL(/\/$/);
  await page.locator(".hero-bottom-link").click(); await expect(page).toHaveURL(/#Footer$/);
  await expect(page.locator("#Footer")).toBeInViewport();
  expect((await page.goto("/missing-page"))?.status()).toBe(404);
});

for (const width of [768, 375]) test(`mobile navigation and nested pages menu at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  const button = page.locator(".menu-button");
  await expect(button).toBeVisible();
  await button.click(); await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".nav-menu")).toBeVisible();
  await page.locator(".dropdown-toggle").click();
  await page.locator(".dropdown-list").getByRole("link", { name: "FAQs", exact: true }).click();
  await expect(page).toHaveURL(/\/faqs$/);
  await page.locator(".menu-button").press("Enter");
  await expect(page.locator(".menu-button")).toHaveAttribute("aria-expanded", "true");
  await page.locator(".menu-button").press("Escape");
  await expect(page.locator(".menu-button")).toHaveAttribute("aria-expanded", "false");
});

test("industry and testimonial tabs, keyboard navigation, carousel and video controls", async ({ page }) => {
  await page.goto("/");
  const industry = page.locator(".industry-tabs");
  await industry.getByRole("tab", { name: "Embroidered products", exact: true }).click();
  await expect(industry.getByRole("tabpanel").filter({ visible: true })).toContainText("Digitized embroidery");
  await industry.getByRole("tab", { name: "Embroidered products", exact: true }).press("ArrowRight");
  await expect(industry.getByRole("tab", { name: "Polyester sportswear", exact: true })).toHaveAttribute("aria-selected", "true");
  const testimonials = page.locator(".testimonial-tabs");
  await testimonials.getByRole("tab").nth(2).click();
  await expect(testimonials.getByRole("tabpanel").filter({ visible: true })).toContainText("Awaiting ONOS review");
  const slider = page.locator(".case-study-slider");
  await slider.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(slider.locator(".w-slide[aria-hidden='false']")).toContainText("DTG artwork preparation");
  await slider.getByRole("button", { name: "Previous slide", exact: true }).press("Enter");
  await expect(slider.locator(".w-slide[aria-hidden='false']")).toContainText("Printed cotton apparel");
  const video = page.locator(".hero-background-video video");
  await video.scrollIntoViewIfNeeded();
  const control = page.locator(".hero-background-video button");
  await expect(control).toHaveAttribute("aria-label", "Pause video");
  await control.click();
  await expect(control).toHaveAttribute("aria-label", "Play video");
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
});

test("FAQ preserves the initial open answer and supports keyboard toggling", async ({ page }) => {
  await page.goto("/faqs");
  const headings = page.locator(".accordion-heading");
  await expect(headings.first()).toHaveAttribute("aria-expanded", "true");
  await expect(headings.nth(1)).toHaveAttribute("aria-expanded", "false");
  await headings.nth(1).press("Enter");
  await expect(headings.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".accordion-content").nth(1)).toHaveAttribute("aria-hidden", "false");
  await headings.nth(1).press("Space");
  await expect(headings.nth(1)).toHaveAttribute("aria-expanded", "false");
});

test("forms validate and give honest local feedback without a network submission", async ({ page }) => {
  await page.goto("/contact");
  const submissions: string[] = [];
  page.on("request", request => { if (request.method() === "POST" || request.url().includes("api.webflow.com")) submissions.push(request.url()); });
  const form = page.locator("form#email-form");
  await form.locator("input[type='submit']").click();
  await expect(form.getByRole("status")).toHaveCount(0);
  await form.getByLabel("First name *", { exact: true }).fill("Test");
  await form.getByLabel("Last name *", { exact: true }).fill("User");
  await form.getByLabel("Email address *", { exact: true }).fill("test@example.com");
  await form.locator("input[type='submit']").click();
  await expect(form.getByRole("status")).toContainText("does not send submissions");
  const newsletter = page.locator(".form-subscribe");
  await newsletter.locator("input[type='email']").fill("test@example.com");
  await newsletter.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(newsletter.getByRole("status")).toContainText("does not send submissions");
  expect(submissions).toEqual([]);
});

test("case-study pagination, verified quote link and media gallery", async ({ page }) => {
  await page.goto("/case-studies");
  const first = await page.locator(".project-list-section").innerText();
  await page.locator("a.w-pagination-next").click();
  await expect(page).toHaveURL(/a472e93b_page=2/);
  expect(await page.locator(".project-list-section").innerText()).not.toBe(first);
  await page.locator("a.w-pagination-previous").click();
  await expect(page).toHaveURL(/a472e93b_page=1/);
  await page.goto("/");
  const quote = page.getByRole("link", { name: "Request a Quote", exact: true }).filter({ hasText: "Request a Quote" });
  await expect(quote.filter({ visible: true }).last()).toHaveAttribute("href", /^(mailto:onospod\.com@gmail\.com|\/contact)/);
  await page.goto("/case-study/precision-cnc-milling-for-automotive-components");
  await page.locator(".w-lightbox").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const src = await page.locator(".lightbox-media").getAttribute("src");
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  expect(await page.locator(".lightbox-media").getAttribute("src")).not.toBe(src);
  await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).toHaveCount(0);
});

for (const width of [375, 768, 1024, 1440]) test(`responsive controls and geometry at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/site-ready/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  if (width <= 991) {
    await expect(page.locator(".menu-button")).toBeVisible();
    await page.locator(".menu-button").click();
    await page.locator(".dropdown-toggle").click();
  } else {
    await expect(page.locator(".menu-button")).toBeHidden();
    await page.locator(".dropdown-toggle").hover();
  }
  await expect(page.locator(".dropdown-toggle")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".dropdown-list")).toBeVisible();
  await page.locator(".dropdown-list").getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
});

test("touch navigation, slider swipe and resize across the navigation breakpoint", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 900 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await page.locator(".menu-button").tap();
  await page.locator(".dropdown-toggle").tap();
  await expect(page.locator(".dropdown-toggle")).toHaveAttribute("aria-expanded", "true");
  await page.locator(".dropdown-list").getByRole("link", { name: "FAQs", exact: true }).tap();
  await expect(page).toHaveURL(/\/faqs$/);
  await page.goto("http://127.0.0.1:3000/");
  const mask = page.locator(".case-study-slider .w-slider-mask");
  await mask.scrollIntoViewIfNeeded();
  await mask.dispatchEvent("touchstart", { changedTouches: [{ identifier: 0, clientX: 300, clientY: 300 }] });
  await mask.dispatchEvent("touchend", { changedTouches: [{ identifier: 0, clientX: 80, clientY: 300 }] });
  await expect(page.locator(".case-study-slider .w-slide[aria-hidden='false']")).toContainText("DTG artwork preparation");
  await page.setViewportSize({ width: 768, height: 900 });
  await page.locator(".menu-button").tap();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator(".menu-button")).toBeHidden();
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(page.locator(".menu-button")).toHaveAttribute("aria-expanded", "false");
  await context.close();
});

test("Home 2 slider autoplay, pause, arrows and video lightbox", async ({ page }) => {
  await page.goto("/home-2");
  await expect(page.locator("html")).toHaveClass(/site-ready/);
  const slider = page.locator(".product-slider");
  const first = await slider.locator(".w-slide[aria-hidden='false']").innerText();
  await expect.poll(async () => slider.locator(".w-slide[aria-hidden='false']").innerText(), { timeout: 7000 }).not.toBe(first);
  await slider.hover();
  const paused = await slider.locator(".w-slide[aria-hidden='false']").innerText();
  await page.waitForTimeout(4300);
  expect(await slider.locator(".w-slide[aria-hidden='false']").innerText()).toBe(paused);
  for (let i = 0; i < 4 && await slider.locator(".w-slide[aria-hidden='false']").innerText() !== first; i++) {
    await slider.getByRole("button", { name: "Previous slide", exact: true }).click();
  }
  await expect.poll(() => slider.locator(".w-slide[aria-hidden='false']").innerText()).toBe(first);
  const video = page.locator(".video-light-box");
  await video.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".lightbox-video")).toHaveAttribute("src", /\/assets\/onos-production-reel\.mp4/);
  await page.getByRole("button", { name: "Close media viewer", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("exact font weights and rendered heading fonts", async ({ page }) => {
  await page.goto("/");
  const results = await page.evaluate(async () => {
    const requests = ['400 16px "Mona Sans"', '600 16px "Mona Sans"', '700 16px "Mona Sans"', '400 16px "Geist"', '500 16px "Geist"'];
    return Promise.all(requests.map(async request => { await document.fonts.load(request); return document.fonts.check(request); }));
  });
  expect(results).toEqual([true, true, true, true, true]);
  await expect(page.locator("h1")).toHaveCSS("font-family", '"Mona Sans", sans-serif');
  await expect(page.locator(".hero-description")).toHaveCSS("font-family", "Geist, sans-serif");
});

test("Home 2 CTA marquee animates its columns without translating every image", async ({ page }) => {
  await page.goto("/home-2");
  const marquee = page.locator(".cta-marquee");
  await marquee.scrollIntoViewIfNeeded();
  await expect(page.locator(".cta-marquee-list").first()).not.toHaveCSS("transform", "none");
  const transforms = await page.locator(".cta-marquee-image").evaluateAll(images => images.map(image => getComputedStyle(image).transform));
  expect(transforms.every(transform => transform === "none")).toBe(true);
});
