from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urlparse, urljoin, unquote
from collections import Counter
import json, hashlib
root=Path('raw-webflow'); pages=[]; assets=set(); scripts=set(); links=set()
for p in sorted(root.rglob('*.html')):
 s=BeautifulSoup(p.read_text(),'html.parser'); route='/' if p.name=='index.html' else '/'+str(p.relative_to(root)).replace('.html','')
 for el in s.select('[src],link[href], [poster], [data-poster-url], [data-video-urls]'):
  for attr in ('src','href','poster','data-poster-url','data-video-urls'):
   for url in el.get(attr,'').split(','):
    if url.startswith(('https://','http://')): assets.add(url)
 for el in s.select('[srcset]'):
  assets.update(x.strip().split(' ')[0] for x in el['srcset'].split(',') if x.strip())
 for x in s.select('script[src]'): scripts.add(x['src'])
 for x in s.select('a[href]'): links.add(x['href'])
 pages.append({'file':str(p),'route':route,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'title':s.title.text,'wfPage':s.html.get('data-wf-page'),'sections':[{'tag':x.name,'classes':x.get('class',[])} for x in s.body.find_all(recursive=False) if x.name!='script'],'forms':[{'id':x.get('id'),'action':x.get('action'),'fields':[dict(y.attrs) for y in x.select('input,textarea,select')]} for x in s.select('form')],'widgets':{c:len(s.select('.'+c)) for c in ['w-nav','w-dropdown','w-tabs','w-slider','w-background-video','faq-item','count']}})
Path('audit/source-inventory.json').write_text(json.dumps({'pages':pages,'assetUrls':sorted(assets),'scriptUrls':sorted(scripts),'links':sorted(links)},indent=2))
print('pages',len(pages),'asset URLs',len(assets),'scripts',len(scripts)); print('\n'.join(sorted(scripts)))
