import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'audit/visual-qa');
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'tablet-1024', width: 1024, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 }
  ];

  for (const vp of viewports) {
    console.log(`\n=== Processing Viewport ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    // 1. Local Rebuild
    try {
      const pageLocal = await context.newPage();
      console.log(`Navigating to http://localhost:3000/ ...`);
      await pageLocal.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await pageLocal.waitForTimeout(2000);
      await pageLocal.screenshot({
        path: path.join(outDir, `local-${vp.name}-full.png`),
        fullPage: true
      });
      console.log(`Saved local-${vp.name}-full.png`);

      if (vp.name === 'desktop-1440' || vp.name === 'mobile-375') {
        const sections = [
          { sel: '#capabilities', name: 'capabilities' },
          { sel: '#production-fit', name: 'production-fit' },
          { sel: '#network', name: 'network' },
          { sel: '#why-choose-us', name: 'process' },
          { sel: '#gallery', name: 'gallery' },
          { sel: '#ecosystem', name: 'ecosystem' },
          { sel: '#faq', name: 'faq' },
          { sel: '#contact', name: 'contact' },
          { sel: 'header.header-section', name: 'hero' },
          { sel: 'footer', name: 'footer' }
        ];

        for (const s of sections) {
          const el = await pageLocal.$(s.sel);
          if (el) {
            await el.screenshot({ path: path.join(outDir, `local-${vp.name}-${s.name}.png`) });
            console.log(`Saved local-${vp.name}-${s.name}.png`);
          }
        }
      }
      await pageLocal.close();
    } catch (e) {
      console.error(`Error on local ${vp.name}:`, e.message);
    }

    // 2. Reference A: Manufactt live
    try {
      const pageManufactt = await context.newPage();
      console.log(`Navigating to https://manufactt-wbs.webflow.io/ ...`);
      await pageManufactt.goto('https://manufactt-wbs.webflow.io/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await pageManufactt.waitForTimeout(3000);
      await pageManufactt.screenshot({
        path: path.join(outDir, `manufactt-${vp.name}-full.png`),
        fullPage: true
      });
      console.log(`Saved manufactt-${vp.name}-full.png`);
      await pageManufactt.close();
    } catch (e) {
      console.error(`Error on manufactt ${vp.name}:`, e.message);
    }

    // 3. Reference B: ONOS live
    try {
      const pageOnos = await context.newPage();
      console.log(`Navigating to https://onosglobal.pages.dev/ ...`);
      await pageOnos.goto('https://onosglobal.pages.dev/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await pageOnos.waitForTimeout(2000);
      await pageOnos.screenshot({
        path: path.join(outDir, `onos-${vp.name}-full.png`),
        fullPage: true
      });
      console.log(`Saved onos-${vp.name}-full.png`);
      await pageOnos.close();
    } catch (e) {
      console.error(`Error on onos ${vp.name}:`, e.message);
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nAll three-way captures finished in ${outDir}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
