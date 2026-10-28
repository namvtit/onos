import {chromium} from '@playwright/test';
import fs from 'node:fs';
fs.mkdirSync('audit/final/screenshots',{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});await p.screenshot({path:'audit/final/screenshots/home-1440-top.png'});
for(const id of ['about','capabilities','production-fit','network','process','gallery','ecosystem','faq','contact']) {await p.locator(`#${id}`).scrollIntoViewIfNeeded();await p.waitForTimeout(850);await p.locator(`#${id}`).screenshot({path:`audit/final/screenshots/${id}-1440.png`});}
await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:'audit/final/screenshots/home-1440-full.png',fullPage:true});
console.log(await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,font:getComputedStyle(document.body).fontFamily,h1:getComputedStyle(document.querySelector('h1')).fontFamily,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)})));
await p.setViewportSize({width:375,height:812});await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:'audit/final/screenshots/home-375-top.png'});
await p.getByRole('button',{name:'Tiếng Việt'}).click();await p.screenshot({path:'audit/final/screenshots/home-375-vi-top.png'});
console.log(await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflowing:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&getComputedStyle(e).position!=='absolute').slice(0,20).map(e=>({tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right}))})));
await b.close();
