(() => {
  'use strict';
  const lang = () => document.documentElement.lang === 'vi' ? 'vi' : 'en';
  const choice = document.querySelector('#production-method');
  if (!choice) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const methods = [
    ['dtg','DTG printing','In DTG'],
    ['embroidery','Embroidery','Thêu vi tính'],
    ['sublimation','Sublimation','In chuyển nhiệt'],
    ['laser','Laser cutting','Cắt khắc laser']
  ];
  const tabs = document.createElement('div');
  tabs.className = 'fit-tabs';
  tabs.setAttribute('role','group');
  tabs.setAttribute('aria-label',lang()==='en'?'Choose a production method':'Chọn công nghệ sản xuất');
  for (const [value,en,vi] of methods) {
    const button=document.createElement('button');
    button.type='button';
    button.dataset.methodChoice=value;
    button.dataset.en=en;
    button.dataset.vi=vi;
    button.textContent=lang()==='en'?en:vi;
    button.setAttribute('aria-pressed',String(choice.value===value));
    button.addEventListener('click',()=>{
      choice.value=value;
      choice.dispatchEvent(new Event('change',{bubbles:true}));
    });
    tabs.append(button);
  }
  const head=document.querySelector('.fit-head');
  head.after(tabs);
  head.querySelector('label').hidden=true;
  const intro=document.createElement('p');
  intro.className='section-intro';
  intro.dataset.en='Explore each technique, the materials it works with, and what to prepare before production.';
  intro.dataset.vi='Chọn công nghệ để xem chất liệu phù hợp và những gì cần chuẩn bị trước khi sản xuất.';
  intro.textContent=intro.dataset[lang()];
  head.append(intro);
  let activeAnimation=null;
  function sync(animate=false) {
    tabs.querySelectorAll('button').forEach(button=>{
      button.setAttribute('aria-pressed',String(button.dataset.methodChoice===choice.value));
      button.textContent=button.dataset[lang()];
    });
    tabs.setAttribute('aria-label',lang()==='en'?'Choose a production method':'Chọn công nghệ sản xuất');
    intro.textContent=intro.dataset[lang()];
    if(animate&&!reduced.matches&&!document.documentElement.classList.contains('motion-paused')) {
      activeAnimation?.cancel();
      const panel=document.querySelector('[data-method="'+choice.value+'"]');
      activeAnimation=panel.animate([{opacity:.65},{opacity:1}],{duration:240,easing:'ease-out'});
    }
  }
  choice.addEventListener('change',()=>sync(true));
  document.querySelectorAll('[data-method-target]').forEach(a=>a.addEventListener('click',()=>{
    sync(true);
    tabs.querySelector('[data-method-choice="'+choice.value+'"]').focus({preventScroll:true});
  }));
  new MutationObserver(()=>sync()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  sync();
})();
