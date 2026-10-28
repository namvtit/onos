import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
const missing=[]; const refs=new Set(); const external=[];
for(const file of [...walk('src'),...walk('public/assets').filter(file=>file.endsWith('.css'))]){
 if(!/\.(tsx?|css|json)$/.test(file)) continue;
 const content=fs.readFileSync(file,'utf8');
 for(const ref of content.matchAll(/\/assets\/[a-zA-Z0-9._-]+/g)){
  refs.add(ref[0]);if(!fs.existsSync('public'+ref[0]))missing.push({file,path:ref[0]});
 }
 if(/\.(tsx|css)$/.test(file)) for(const ref of content.matchAll(/(?:src|srcSet|poster)=\{?"(https?:[^"}]+)/g)){
  if(!ref[1].startsWith('https://www.youtube.com/embed/'))external.push({file,url:ref[1]});
 }
}
const inventory=JSON.parse(fs.readFileSync('audit/source-inventory.json','utf8'));
const changedSource=inventory.pages.filter(page=>crypto.createHash('sha256').update(fs.readFileSync(page.file)).digest('hex')!==page.sha256).map(page=>page.file);
const failures=JSON.parse(fs.readFileSync('audit/download-failures.json','utf8'));
const routes=JSON.parse(fs.readFileSync('audit/route-manifest.json','utf8'));
const routeSet=new Set(routes.map(route=>route.route.split('?')[0]));
const brokenLinks=[];
for(const file of walk('src').filter(file=>file.endsWith('.tsx'))){
 for(const link of fs.readFileSync(file,'utf8').matchAll(/href=\{"(\/[^"}]+)"\}/g)){
  const route=link[1].split(/[?#]/)[0];
  if(!route.startsWith('/assets/')&&!routeSet.has(route))brokenLinks.push({file,href:link[1]});
 }
}
const result={assetReferences:refs.size,missingAssets:missing,unexpectedExternalMedia:external,sourceFilesChanged:changedSource,downloadFailures:failures,brokenInternalLinks:brokenLinks};
fs.writeFileSync('audit/asset-verification.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(missing.length||external.length||changedSource.length||Object.keys(failures).length||brokenLinks.length)process.exitCode=1;
