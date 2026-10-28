"""Generate real TSX from the immutable crawl. Requires beautifulsoup4.

Run after restoring assets. Handwritten behavior and CSS bridges live separately.
"""
from bs4 import BeautifulSoup, NavigableString, Comment
from pathlib import Path
from urllib.parse import urljoin,urlparse,unquote
import json,re,hashlib
ROOT=Path('raw-webflow'); manifest=json.loads(Path('audit/asset-manifest.json').read_text())
OUT=Path('src/generated'); OUT.mkdir(parents=True,exist_ok=True)
attrs={'class':'className','for':'htmlFor','tabindex':'tabIndex','readonly':'readOnly','maxlength':'maxLength','minlength':'minLength','srcset':'srcSet','autoplay':'autoPlay','playsinline':'playsInline','autofocus':'autoFocus','allowfullscreen':'allowFullScreen','frameborder':'frameBorder','viewbox':'viewBox','preserveaspectratio':'preserveAspectRatio','datetime':'dateTime','crossorigin':'crossOrigin','fetchpriority':'fetchPriority','accept-charset':'acceptCharset'}
bools={'required','disabled','checked','selected','multiple','muted','loop','autoplay','playsinline','autofocus','allowfullscreen','readonly','controls','hidden','download'}
void={'img','input','source','br','hr','meta','link','area','base','col','embed','param','track','wbr'}
shared={};sections={};routes=[]; current='index.html';in_nav=False

def j(x):return json.dumps(x,ensure_ascii=False)
def camel(s):
 if s.startswith('--'):return s
 if s.startswith('-webkit-'):s='Webkit-'+s[8:]
 elif s.startswith('-moz-'):s='Moz-'+s[5:]
 elif s.startswith('-ms-'):s='ms-'+s[4:]
 return re.sub(r'-([a-z])',lambda m:m[1].upper(),s)
def asset(s):
 for u,v in manifest.items():s=s.replace(u,v['path'])
 return s

def href(u):
 if u in manifest:return manifest[u]['path']
 if u.startswith(('http:','https:','mailto:','tel:','#')):return u
 u=unquote(u)
 resolved=urlparse(urljoin('https://manufactt-wbs.webflow.io/'+current,u))
 path=resolved.path.removesuffix('.html')
 if path=='/index':path='/'
 query=resolved.query.removesuffix('.html')
 return path+('?' + query if query else '')+('#'+resolved.fragment if resolved.fragment else '')

def jsx(el,depth=0,extract=True):
 global in_nav
 if isinstance(el,Comment):return ''
 if isinstance(el,NavigableString):return '{'+j(str(el))+'}' if str(el) else ''
 if el.name in ('script','noscript'):return ''
 cls=el.get('class',[])
 if any(c in cls for c in ('more-templates','access-paas','w-webflow-badge')):return ''
 if extract and ('w-nav' in cls or 'footer' in cls):
  nav='w-nav' in cls; prev=in_nav;in_nav=nav
  content=jsx(el,0,False); in_nav=prev
  key=hashlib.sha256(content.encode()).hexdigest()[:10]; name=('Navbar' if nav else 'Footer')+key
  shared[name]=(content,nav)
  return '<'+name+(' activePath={activePath}' if nav else '')+' />'
 if extract and current=='index.html':
  names={'hero-section':'Hero','hero-video-wrap':'HeroVideo','about-section':'About','service-section':'Services','case-study-section':'Projects','testimonial-section':'Testimonials'}
  for c,name in names.items():
   if c in cls:
    sections[name]=jsx(el,0,False)
    return '<'+name+' />'
 tag='ContactForm' if el.name=='form' else el.name
 parts=[]
 if 'w-lightbox' in cls:
  config=el.select_one('script.w-json')
  if config:
   try:lightbox=json.loads(config.get_text())
   except json.JSONDecodeError:
    # The crawler damaged quoting inside embedded iframe HTML. Preserve its video ID.
    url=re.search(r'"url":\s*"([^"]+)',config.get_text()).group(1)
    lightbox={'items':[{'url':url,'type':'video'}],'group':''}
   parts.append('data-lightbox={'+j(asset(json.dumps(lightbox)))+'}')
 for raw,val in el.attrs.items():
  if raw in ('integrity','crossorigin','action','method','data-turnstile-sitekey','data-wf-element-id','data-wf-page-id'):continue
  if raw.startswith('on'):continue
  if raw=='fetchpriority' and el.name not in ('img','link','script'):continue
  if raw=='for' and el.name!='label':continue
  if in_nav and raw=='aria-current':continue
  if isinstance(val,list):val=' '.join(val)
  name=attrs.get(raw,camel(raw) if el.name in ('svg','path') and not raw.startswith(('data-','aria-')) else raw)
  if raw=='style':
   if el.name=='video':
    val='background-image:url("'+asset(el.parent.get('data-poster-url',''))+'")'
   styles={camel(k.strip()):asset(v.strip()) for pair in val.split(';') if ':' in pair for k,v in [pair.split(':',1)]}
   parts.append('style={'+j(styles)+'}');continue
  if raw=='href':val=href(val)
  elif raw in ('src','srcset','poster','data-poster-url','data-video-urls'):val=asset(val)
  if raw=='class' and in_nav and el.name=='a':
   val=' '.join(c for c in val.split() if c!='w--current')
   parts.append('className={'+j(val)+' + (activePath === '+j(href(el.get('href','')))+' ? " w--current" : "")}')
   parts.append('aria-current={activePath === '+j(href(el.get('href','')))+' ? "page" : undefined}')
   continue
  if raw in ('tabindex','maxlength','minlength','rows','cols','size','colspan','rowspan','start'):
   if str(val).lstrip('-').isdigit():parts.append(name+'={'+str(int(val))+'}')
   continue
  if raw in bools and (val in ('','true',raw)):
   parts.append(name+'={true}');continue
  if raw=='value' and el.name in ('select','textarea'):name='defaultValue'
  if raw=='checked':name='defaultChecked'
  parts.append(name+'={'+j(val)+'}')
 # Give previously icon-only submit inputs meaningful names without changing their layout.
 if el.name=='input' and el.get('type')=='submit' and not el.get('value'):
  parts=[x for x in parts if not x.startswith('aria-label=')];parts.append('aria-label="Subscribe"')
 if el.get('role')=='heading' and not el.has_attr('aria-level'):parts.append('aria-level={2}')
 head='<'+tag+(' '+' '.join(parts) if parts else '')
 if el.name in void:return head+' />'
 if el.name=='style':children='{'+j(el.get_text())+'}'
 else:children='\n'.join(filter(None,(jsx(x,depth+1) for x in el.children)))
 return head+'>\n'+children+'\n</'+tag+'>'

for p in sorted(ROOT.rglob('*.html')):
 current=str(p.relative_to(ROOT));s=BeautifulSoup(p.read_text(),'html.parser')
 route='/' if current=='index.html' else '/'+current.removesuffix('.html')
 # Crawl pagination snapshots map to the same public route, with original query keys.
 name='Page'+hashlib.sha256(current.encode()).hexdigest()[:10]
 markup='\n'.join(filter(None,(jsx(x) for x in s.body.children)))
 refs=sorted(set(re.findall(r'<((?:Navbar|Footer)[0-9a-f]+)',markup)))
 sec=sorted(set(re.findall(r'<(HeroVideo|Hero|About|Services|Projects|Testimonials)\s',markup)))
 description=s.select_one('meta[name="description"]')
 og=s.select_one('meta[property="og:image"]')
 metadata={'title':s.title.get_text(),'description':description['content'] if description else '', 'openGraph':{'title':s.title.get_text(),'description':description['content'] if description else '', 'images':[asset(og['content'])] if og else []}}
 imports='import { ContactForm } from "@/components/ContactForm";\nimport { SiteRuntime } from "@/components/SiteRuntime";\n'
 if refs:imports+='import { '+', '.join(refs)+' } from "@/components/SiteChrome";\n'
 if sec:imports+='import { '+', '.join(sec)+' } from "@/components/sections/HomeSections";\n'
 # Remove unused imports after rendering.
 if '<ContactForm' not in markup:imports=imports.replace('import { ContactForm } from "@/components/ContactForm";\n','')
 styles='\n'.join('<style>{'+j(x.get_text())+'}</style>' for x in s.head.select('style'))
 OUT.joinpath(name+'.tsx').write_text('// Generated by scripts/migrate.py from '+current+'. Preserve source DOM and classes.\n'+imports+'\nexport const metadata = '+j(metadata)+';\nexport default function '+name+'() {\nconst activePath = '+j(route.split('?')[0])+';\nreturn <>\n'+styles+'\n'+markup+'\n<SiteRuntime pageId='+j(s.html['data-wf-page'])+' />\n</>;\n}\n')
 # Keep only if used (normal page active path may only be passed into Navbar).
 dest=OUT/(name+'.tsx');data=dest.read_text()
 if 'activePath={activePath}' not in data:data=re.sub(r'const activePath = .*?;\n','',data)
 dest.write_text(data)
 routes.append({'source':current,'route':route,'component':name,'wfPage':s.html['data-wf-page']})

chrome='// Generated shared chrome, with original DOM and variant classes.\nimport { ContactForm } from "./ContactForm";\n'
for name,(content,nav) in shared.items():
 chrome+='\nexport function '+name+('({ activePath }: { activePath: string })' if nav else '()')+' { return (\n'+content+'\n); }\n'
Path('src/components/SiteChrome.tsx').write_text(chrome)
secdir=Path('src/components/sections');secdir.mkdir(exist_ok=True)
sectionfile='// Generated home sections. Component boundaries add no DOM wrappers.\n'
for name,content in sections.items():sectionfile+='\nexport function '+name+'() { return (\n'+content+'\n); }\n'
secdir.joinpath('HomeSections.tsx').write_text(sectionfile)
for r in routes:
 if '?' in r['route']:continue
 route_dir=Path('src/app')/r['route'].lstrip('/');route_dir.mkdir(parents=True,exist_ok=True)
 n=r['component']
 if r['route']=='/case-studies':
  page2=next(x['component'] for x in routes if x['route'].endswith('?a472e93b_page=2'))
  content='import PageOne, { metadata } from "@/generated/'+n+'";\nimport PageTwo from "@/generated/'+page2+'";\nexport { metadata };\nexport default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {\nconst params = await searchParams;\nreturn params.a472e93b_page === "2" ? <PageTwo /> : <PageOne />;\n}\n'
 else:content='export { default, metadata } from "@/generated/'+n+'";\n'
 route_dir.joinpath('page.tsx').write_text(content)
notfound=next(x['component'] for x in routes if x['route']=='/404')
Path('src/app/not-found.tsx').write_text('export { default } from "@/generated/'+notfound+'";\n')
Path('audit/route-manifest.json').write_text(json.dumps(routes,indent=2))
print('Generated',len(routes),'snapshots;',len(shared),'shared chrome variants;',len(sections),'named home sections')
