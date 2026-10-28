/** Read-only preview of the crawl using the exact restored assets.
 *  In-memory fixes: local asset URLs/fonts, malformed poster URLs, and broken
 *  lightbox JSON. Promotional overlays are hidden for the approved comparison.
 *  Original Webflow/GSAP scripts remain active here, only for the reference.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const manifest=JSON.parse(fs.readFileSync('audit/asset-manifest.json','utf8'));
const port=3101;
const mime={'.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.ttf':'font/ttf','.mp4':'video/mp4','.webm':'video/webm','.pdf':'application/pdf'};
http.createServer((request,response)=>{
 const url=new URL(request.url,'http://localhost');
 if(url.pathname.startsWith('/assets/')){
  const file=path.resolve('public','.'+url.pathname);
  if(!file.startsWith(path.resolve('public/assets')+'/')||!fs.existsSync(file)){response.writeHead(404).end();return;}
  response.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(response);return;
 }
 let relative=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html';
 if(!relative.endsWith('.html'))relative+='.html';
 if(relative==='case-studies.html'&&url.searchParams.get('a472e93b_page'))relative=`case-studies?a472e93b_page=${url.searchParams.get('a472e93b_page')}.html`;
 const file=path.resolve('raw-webflow',relative);
 if(!file.startsWith(path.resolve('raw-webflow')+'/')||!fs.existsSync(file)){response.writeHead(404).end('Missing reference');return;}
 let html=fs.readFileSync(file,'utf8');
 for(const [url,asset]of Object.entries(manifest))html=html.replaceAll(url,asset.path);
 html=html.replace(/<script[^>]+src="[^"\s]*webfont\.js"[^>]*><\/script>/g,'').replace(/<script[^>]*>WebFont\.load\([\s\S]*?<\/script>/g,'');
 // CSS asset paths were localized, so its upstream SRI hash no longer applies.
 html=html.replace(/(<link[^>]+rel="stylesheet"[^>]*) integrity="[^"]*"/g,'$1');
 html=html.replace('</head>','<link rel="stylesheet" href="/assets/fonts.css"><style>.more-templates,.access-paas,.w-webflow-badge{display:none!important}</style></head>');
 // The crawler corrupted this inline URL. The video data-poster-url is intact.
 html=html.replace(/background-image:url\(https:\/\/manufactt-wbs\.webflow\.io\/"([^"\s]+)"\)/g,'background-image:url($1)');
 html=html.replace(/<script[^>]*class="w-json"[^>]*>([\s\S]*?)<\/script>/g,(all,body)=>{
  try{JSON.parse(body);return all;}catch{
   const id=body.match(/watch\?v=([a-zA-Z0-9_-]+)/)?.[1];
   return id?`<script type="application/json" class="w-json">${JSON.stringify({items:[{type:'video',url:`https://www.youtube.com/watch?v=${id}`,html:`<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>`}],group:''})}</script>`:all;
  }
 });
 response.writeHead(200,{'content-type':'text/html; charset=utf-8'}).end(html);
}).listen(port,'0.0.0.0',()=>console.log(`Restored crawl reference: http://localhost:${port}`));
