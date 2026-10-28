from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import unquote,urlparse
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
import json,re,hashlib
m=json.loads(Path('audit/asset-manifest.json').read_text()); extra=set()
for p in Path('raw-webflow').rglob('*.html'):
 s=BeautifulSoup(p.read_text(),'html.parser')
 for x in s.select('a[href],meta[content]'):
  u=x.get('href',x.get('content',''))
  if u.startswith('https://cdn.prod.website-files.com/') and re.search(r'\.(pdf|jpg|png|webp|svg)$',u):extra.add(u)
# The original CSS escapes parentheses in one unquoted URL. CSS-unescape before downloading.
p=next(Path('public/assets').glob('*shared*css'));css=p.read_text()
for raw in re.findall(r'url\(((?:\\.|[^)])*)\)',css):
 u=re.sub(r'\\(.)',r'\1',raw.strip('\'"'))
 if u.startswith('http'):extra.add(u)
def fetch(u):
 if u in m:return
 name=re.sub(r'[^a-zA-Z0-9._-]','-',unquote(urlparse(u).path.split('/')[-1]));local='/assets/'+hashlib.sha256(u.encode()).hexdigest()[:12]+'-'+name
 with urlopen(Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=90) as r:data=r.read();mime=r.headers.get('Content-Type','')
 Path('public'+local).write_bytes(data);m[u]={'path':local,'bytes':len(data),'mime':mime,'sha256':hashlib.sha256(data).hexdigest()}
with ThreadPoolExecutor(max_workers=8) as pool:list(pool.map(fetch,extra))
for raw in re.findall(r'url\(((?:\\.|[^)])*)\)',css):
 u=re.sub(r'\\(.)',r'\1',raw.strip('\'"'))
 if u in m:css=css.replace('url('+raw+')','url("'+m[u]['path']+'")')
p.write_text(css)
Path('audit/asset-manifest.json').write_text(json.dumps(m,indent=2))
Path('audit/download-failures.json').write_text('{}\n')
print('Assets:',len(m),'extra',len(extra))
