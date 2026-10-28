import fs from 'node:fs';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const phase=process.argv[2]||'before';
const names=process.env.QA_PAGES?.split(',');
const allPages=[
 ['home','/'],['home-2','/home-2'],['about','/about'],['services','/services'],
 ['products','/products'],['case-studies','/case-studies'],['contact','/contact'],['faqs','/faqs'],
 ['service-detail','/service/cnc-machining-services'],['case-detail','/case-study/precision-cnc-milling-for-automotive-components'],
 ['blog','/blog'],['blog-detail','/blog/smart-factories-transforming-modern-manufacturing'],
];
const pages=names?allPages.filter(([name])=>names.includes(name)):allPages;
const widths=(process.env.QA_WIDTHS||'375,768,1024,1440').split(',').map(Number);
const browser=await chromium.launch({channel:'chromium'});
const result=[];
const sourceAnimations=JSON.parse(fs.readFileSync('src/generated/interactions.json','utf8'));
fs.mkdirSync(`audit/qa/${phase}`,{recursive:true});
async function prepare(page,base,route){
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('https://**/*',route=>route.abort());
 const referenceRoute = route === '/' ? '/' : route.split('?')[0] + '.html' + (route.includes('?') ? '?' + route.split('?')[1] : '');
 await page.goto(base+(base.endsWith(':3101')?referenceRoute:route),{waitUntil:'load'});
 await page.evaluate(async()=>{
  document.querySelectorAll('img').forEach(image=>image.loading='eager');
  await Promise.all(Array.from(document.images).map(image=>image.decode().catch(()=>undefined)));
  await document.fonts.ready;
 });
 await page.waitForTimeout(100);
 const height=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=700){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(140);}
 await page.waitForTimeout(3100);
 // Visit any reveal the original Webflow scroll handler skipped during fast scrolling.
 // Use its actual event configuration, excluding deliberately hidden hover overlays.
 const pending=await page.evaluate(config=>{
  const pageId=document.documentElement.dataset.wfPage;
  const breakpoint=innerWidth>=992?'main':innerWidth>=768?'medium':innerWidth>=480?'small':'tiny';
  const ids=new Set(Object.values(config.events).filter(event=>{
   const settings=event.config;
   const list=config.actionLists[event.action.config.actionListId];
   return event.eventTypeId==='SCROLL_INTO_VIEW'&&!settings.loop&&event.mediaQueries.includes(breakpoint)&&
    (!event.target.id?.includes('|')||event.target.id.split('|')[0]===pageId)&&
    list.actionItemGroups?.at(-1)?.actionItems.some(item=>item.actionTypeId==='STYLE_OPACITY'&&item.config.value===1);
  }).map(event=>event.target.id?.split('|').at(-1)));
  return [...document.querySelectorAll('[data-w-id]')].filter(element=>ids.has(element.dataset.wId)&&element.style.opacity==='0'&&element.getClientRects().length).map(element=>element.dataset.wId);
 },sourceAnimations);
 for(const id of pending){
  const element=page.locator(`[data-w-id="${id}"]`).first();
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
 }
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.waitForTimeout(1100);
 // Match moving content to stable source assets and a fixed loop frame without changing layout.
 await page.evaluate(()=>{
  const style=document.createElement('style');style.textContent=`html{scroll-behavior:auto!important}.client-marquee-list,.client-marquee-list-two,.marquee-list,.cta-marquee-list,.footer-shadow{transform:none!important}video{visibility:hidden!important}.w-background-video{background-size:cover;background-position:center}`;document.head.append(style);
  document.querySelectorAll('.w-background-video').forEach(wrap=>{
   wrap.style.backgroundImage=`url("${wrap.dataset.posterUrl}")`;
   const video=wrap.querySelector('video');if(video)video.pause();
  });
 });
 // Pause autoplay consistently, then select the first slider page in both versions.
 await page.evaluate(()=>document.querySelectorAll('.w-slider').forEach(slider=>{
  slider.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}));
  slider.dispatchEvent(new MouseEvent('mouseenter')); 
  slider.querySelector('.w-slider-dot')?.click();
 }));
 await page.waitForTimeout(650);
 return errors;
}
async function metrics(page){return page.evaluate(()=>{
 const box=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y+window.scrollY,width:r.width,height:r.height};};
 const blocks=Array.from(document.body.children).filter(el=>['DIV','SECTION'].includes(el.tagName)&&!el.classList.contains('access-paas')&&!el.classList.contains('w-nav-overlay')&&!el.classList.contains('w-lightbox-backdrop')).map(el=>({tag:el.tagName,classes:el.className,box:box(el)})).filter(el=>el.box.height>0);
 const headings=Array.from(document.querySelectorAll('h1,h2,h3')).filter(el=>el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden'&&el.closest('[aria-hidden="true"]')===null).map(el=>({text:el.textContent,box:box(el),font:getComputedStyle(el).fontFamily,weight:getComputedStyle(el).fontWeight}));
 return {scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,blocks,headings,hiddenReveals:Array.from(document.querySelectorAll('[data-w-id]')).filter(el=>el.style.opacity==='0'&&getComputedStyle(el).display!=='none').map(el=>({classes:el.className,id:el.dataset.wId,box:box(el)}))};
});}
function diff(name,width){
 const a=PNG.sync.read(fs.readFileSync(`audit/qa/reference/${name}-${width}.png`));
 const b=PNG.sync.read(fs.readFileSync(`audit/qa/${phase}/${name}-${width}.png`));
 const w=Math.max(a.width,b.width),h=Math.max(a.height,b.height);const out=new PNG({width:w,height:h});let changed=0;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const i=(y*w+x)*4,ai=(y*a.width+x)*4,bi=(y*b.width+x)*4;
  const insideA=x<a.width&&y<a.height,insideB=x<b.width&&y<b.height;
  const distance=insideA&&insideB?Math.max(...[0,1,2].map(c=>Math.abs(a.data[ai+c]-b.data[bi+c]))):255;
  if(distance>20){changed++;out.data[i]=255;out.data[i+1]=0;out.data[i+2]=100;}else{const v=insideA?Math.round((a.data[ai]+a.data[ai+1]+a.data[ai+2])/3):255;out.data[i]=v;out.data[i+1]=v;out.data[i+2]=v;}
  out.data[i+3]=255;
 }
 fs.writeFileSync(`audit/qa/diffs/${phase}-${name}-${width}.png`,PNG.sync.write(out));
 return {referenceSize:[a.width,a.height],nextSize:[b.width,b.height],changedPixelsPercent:Number((changed/(w*h)*100).toFixed(3)),threshold:20};
}
const jobs=widths.flatMap(width=>pages.map(([name,route])=>({width,name,route})));
async function capture({width,name,route}){
  const entry={name,route,width};
  for(const [label,base]of [['reference','http://127.0.0.1:3101'],[phase,'http://127.0.0.1:3000']]){
   if(label==='reference'&&process.env.QA_REFRESH_REFERENCE!=='1'&&phase==='after'&&fs.existsSync(`audit/qa/reference/${name}-${width}.json`)){entry.reference=JSON.parse(fs.readFileSync(`audit/qa/reference/${name}-${width}.json`,'utf8'));continue;}
   const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1});
   const page=await context.newPage();const errors=await prepare(page,base,route);
   const data={...await metrics(page),errors};entry[label]=data;
   await page.screenshot({path:`audit/qa/${label}/${name}-${width}.png`,fullPage:true,timeout:60000});
   fs.writeFileSync(`audit/qa/${label}/${name}-${width}.json`,JSON.stringify(data,null,2));
   await context.close();
  }
  entry.diff=diff(name,width);result.push(entry);
  fs.writeFileSync(`audit/qa/${phase}-results.json`,JSON.stringify(result,null,2));
  console.log(name,width,JSON.stringify(entry.diff),'errors',entry.reference.errors.length,entry[phase].errors.length);
}
let nextJob=0;
await Promise.all(Array.from({length:Number(process.env.QA_CONCURRENCY||2)},async()=>{while(nextJob<jobs.length){const job=jobs[nextJob++];await capture(job);}}));
await browser.close();
