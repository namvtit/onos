import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const references = new Set(); const missing = []; const external = [];
for (const file of [...walk('src'), ...walk('public/assets').filter(file=>file.endsWith('.css'))]) {
  const content=fs.readFileSync(file,'utf8');
  for(const ref of content.matchAll(/\/assets\/[a-zA-Z0-9._-]+/g)) if (!ref[0].endsWith('onos-')) references.add(ref[0]);
  if (/\.(tsx|css)$/.test(file)) for(const ref of content.matchAll(/(?:src|poster)=\{?['"](https?:[^'"}]+)/g)) external.push({file,url:ref[1]});
}
const originalMedia=JSON.parse(fs.readFileSync('audit/content-mapping/assets.json','utf8')).filter(item=>item.source);
const mediaResults=originalMedia.map(item=>{ references.add(item.local);const exists=fs.existsSync('public'+item.local);return {file:item.local,source:item.source,exists,sha256:exists?hash('public'+item.local):null,match:exists&&hash('public'+item.local)===item.sha256}; });
for(const ref of references) if(!fs.existsSync('public'+ref)) missing.push(ref);
const inventory=JSON.parse(fs.readFileSync('audit/source-inventory.json','utf8'));
const changedSource=inventory.pages.filter(page=>hash(page.file)!==page.sha256).map(page=>page.file);
const sourceText=walk('src').filter(f=>f.endsWith('.tsx')).map(f=>fs.readFileSync(f,'utf8')).join('\n');
const anchors=new Set([...sourceText.matchAll(/id="([^"{}]+)"/g)].map(m=>m[1]));
const anchorRefs=[...sourceText.matchAll(/['"]#([a-z-]+)['"]/g)].map(m=>m[1]);
const brokenAnchors=[...new Set(anchorRefs.filter(id=>!anchors.has(id)))];
const pages=walk('src/app').filter(f=>path.basename(f)==='page.tsx');
const result={assetReferences:references.size,missingAssets:missing,unexpectedExternalMedia:external,originalMedia:mediaResults,sourceFilesChanged:changedSource,brokenAnchors,contentPages:pages};
fs.mkdirSync('audit/final',{recursive:true});fs.writeFileSync('audit/final/asset-verification.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({assetReferences:references.size,originalPhotosVerified:mediaResults.filter(i=>i.match).length,missingAssets:missing,unexpectedExternalMedia:external,sourceFilesChanged:changedSource,brokenAnchors,contentPages:pages},null,2));
if(missing.length||external.length||changedSource.length||brokenAnchors.length||mediaResults.some(i=>!i.match)||pages.length!==1||pages[0]!=='src/app/page.tsx')process.exitCode=1;
