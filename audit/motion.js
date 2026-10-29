(() => {
  'use strict';
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const pointer=matchMedia('(hover: hover) and (pointer: fine)');
  let userPaused=false;
  try{userPaused=localStorage.getItem('onos-motion-paused')==='true';}catch{}
  const button=document.createElement('button');
  button.className='motion-toggle';button.type='button';
  button.innerHTML='<svg class="motion-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg><svg class="motion-play" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z"/></svg>';
  document.body.append(button);
  const counters=[];
  const paused=()=>userPaused||reduced.matches;
  function finishCounters(){counters.forEach(c=>{cancelAnimationFrame(c.frame);c.element.textContent=c.original;c.done=true;});}
  function sync(){
    root.classList.toggle('motion-paused',paused());
    button.setAttribute('aria-pressed',String(paused()));button.disabled=reduced.matches;
    const en=root.lang==='en';
    const label=reduced.matches?(en?'Motion reduced by system setting':'Đã giảm chuyển động theo cài đặt hệ thống'):paused()?(en?'Play animations':'Bật hiệu ứng động'):(en?'Pause animations':'Tạm dừng hiệu ứng động');
    button.setAttribute('aria-label',label);button.title=label;
    if(paused())finishCounters();
  }
  button.addEventListener('click',()=>{userPaused=!userPaused;try{localStorage.setItem('onos-motion-paused',String(userPaused));}catch{}sync();});
  reduced.addEventListener('change',sync);
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('visibilitychange',()=>{root.classList.toggle('motion-page-hidden',document.hidden);if(document.hidden)finishCounters();});
  document.querySelectorAll('.reveal').forEach((el,i)=>el.style.setProperty('--motion-delay',`${(i%4)*65}ms`));
  const cards=document.querySelectorAll('.product-card,.ecosystem-card,.capability-card,.eco-link');
  cards.forEach(card=>{
    card.dataset.motionCard='';
    const ring=document.createElementNS('http://www.w3.org/2000/svg','svg');ring.setAttribute('class','motion-ring');ring.setAttribute('aria-hidden','true');
    const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');rect.setAttribute('pathLength','100');ring.append(rect);card.append(ring);
    let frame=0;
    const reset=()=>{cancelAnimationFrame(frame);card.style.removeProperty('--motion-x');card.style.removeProperty('--motion-y');};
    card.addEventListener('pointermove',e=>{
      if(paused()||!pointer.matches||e.pointerType==='touch')return;
      cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const box=card.getBoundingClientRect();card.style.setProperty('--motion-x',`${((e.clientY-box.top)/box.height-.5)*-3}deg`);card.style.setProperty('--motion-y',`${((e.clientX-box.left)/box.width-.5)*3}deg`);});
    });card.addEventListener('pointerleave',reset);card.addEventListener('blur',reset,true);
  });
  const animateCount=counter=>{
    if(counter.done)return;counter.done=true;
    if(paused()){counter.element.textContent=counter.original;return;}
    const start=performance.now();
    const tick=now=>{const progress=Math.min(1,(now-start)/950);counter.element.textContent=String(Math.round(counter.value*(1-(1-progress)**3))).padStart(counter.padding,'0')+counter.suffix;if(progress<1)counter.frame=requestAnimationFrame(tick);else counter.element.textContent=counter.original;};
    counter.frame=requestAnimationFrame(tick);
  };
  document.querySelectorAll('.facts strong,.fact strong').forEach(element=>{
    const original=element.textContent.trim(),match=original.match(/^(\d{1,3})(\+?)$/);if(!match)return;
    counters.push({element,original,value:Number(match[1]),padding:match[1].startsWith('0')?match[1].length:1,suffix:match[2],frame:0,done:false});
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('is-moving',entry.isIntersecting);const counter=counters.find(c=>c.element===entry.target);if(counter&&entry.isIntersecting)animateCount(counter);}),{threshold:.18});
    document.querySelectorAll('.motion-illustration').forEach(el=>observer.observe(el));counters.forEach(c=>observer.observe(c.element));
  }else{document.querySelectorAll('.motion-illustration').forEach(el=>el.classList.add('is-moving'));finishCounters();}
  sync();root.classList.add('motion-ready');
})();
