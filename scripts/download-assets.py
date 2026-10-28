from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urlparse,unquote,urljoin
from concurrent.futures import ThreadPoolExecutor
import json,hashlib,re,time
inventory=json.loads(Path('audit/source-inventory.json').read_text()); manifest={}; failures={}
def fetch(url):
 if url in manifest:return
 path=urlparse(url).path
 name=re.sub(r'[^a-zA-Z0-9._-]','-',unquote(path.split('/')[-1])) or 'asset'
 local='/assets/'+hashlib.sha256(url.encode()).hexdigest()[:12]+'-'+name
 for attempt in range(3):
  try:
   with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=60) as r: data=r.read(); mime=r.headers.get('Content-Type','')
   Path('public'+local).write_bytes(data); manifest[url]={'path':local,'bytes':len(data),'mime':mime,'sha256':hashlib.sha256(data).hexdigest()}; return
  except Exception as e:
   if attempt==2:failures[url]=str(e)
urls=[u for u in inventory['assetUrls'] if urlparse(u).path not in ('','/')]
with ThreadPoolExecutor(max_workers=12) as pool:list(pool.map(fetch,urls))
# CSS background images and font references are dependencies as well.
while True:
 deps=set()
 for u,v in list(manifest.items()):
  if 'css' in v['mime'] or u.endswith('.css'):
   content=Path('public'+v['path']).read_text()
   deps.update(urljoin(u,x) for x in re.findall(r'url\([\'\"]?([^\)\'\"]+)',content) if not x.startswith('data:'))
 missing=deps-set(manifest)-set(failures)
 if not missing:break
 with ThreadPoolExecutor(max_workers=12) as pool:list(pool.map(fetch,missing))
# Exact Google Font families/weights requested by the crawl, with modern browser WOFF2 response.
fonturl='https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Mona+Sans:wght@400;600;700&display=swap'
try:
 req=Request(fonturl,headers={'User-Agent':'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36'})
 css=urlopen(req,timeout=60).read().decode()
 fonturls=set(re.findall(r'url\(([^)]+)\)',css))
 with ThreadPoolExecutor(max_workers=8) as pool:list(pool.map(fetch,fonturls))
 for u in fonturls:
  if u in manifest:css=css.replace(u,manifest[u]['path'])
 Path('public/assets/fonts.css').write_text(css)
except Exception as e:failures[fonturl]=str(e)
for u,v in manifest.items():
 if 'css' in v['mime'] or u.endswith('.css'):
  p=Path('public'+v['path']); css=p.read_text()
  for src,asset in manifest.items():css=css.replace(src,asset['path'])
  p.write_text(css)
Path('audit/asset-manifest.json').write_text(json.dumps(manifest,indent=2));Path('audit/download-failures.json').write_text(json.dumps(failures,indent=2))
print('Downloaded',len(manifest),'files;',sum(x['bytes'] for x in manifest.values()),'bytes; failures:',json.dumps(failures))
