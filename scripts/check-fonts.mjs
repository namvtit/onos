import { chromium } from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chromium'});
const page=await browser.newPage();const requests=[];
page.on('response',r=>{if(/\.ttf(?:$|\?)/.test(r.url()))requests.push({url:r.url(),status:r.status()});});
await page.goto('http://127.0.0.1:3000/');
const faces=await page.evaluate(async()=>{
 const fonts=[['Mona Sans',400],['Mona Sans',600],['Mona Sans',700],['Geist',400],['Geist',500]];
 const results=[];
 for(const [family,weight]of fonts){const definition=`${weight} 16px "${family}"`;await document.fonts.load(definition);results.push({family,weight,check:document.fonts.check(definition)});}
 await document.fonts.ready;
 return {checks:results,faces:[...document.fonts].map(font=>({family:font.family,weight:font.weight,status:font.status}))};
});
const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');
const {root}=await cdp.send('DOM.getDocument');
const rendered=[];
for(const selector of ['h1.hero-title','.hero-description','.pre-section-title']){
 const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector});
 const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});rendered.push({selector,fonts});
}
const manifest=JSON.parse(fs.readFileSync('audit/asset-manifest.json','utf8'));
const sources=Object.entries(manifest).filter(([,value])=>value.mime.startsWith('font/')).map(([url,value])=>({originalUrl:url,...value}));
const result={...faces,rendered,requests,sources};
fs.writeFileSync('audit/qa/font-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify({checks:faces.checks,rendered},null,2));
if(faces.checks.some(face=>!face.check)||rendered.some(element=>element.fonts.some(font=>!font.isCustomFont)))process.exitCode=1;
await browser.close();
