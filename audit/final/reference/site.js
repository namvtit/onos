(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const nav = document.querySelector('.main-nav');
  const menu = document.querySelector('.menu-toggle');
  const header = document.querySelector('.site-header');
  let language = document.documentElement.lang;
  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', language === 'en' ? 'Open navigation' : 'Mở điều hướng');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? (language === 'en' ? 'Close navigation' : 'Đóng điều hướng') : (language === 'en' ? 'Open navigation' : 'Mở điều hướng'));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeMenu(); });
  matchMedia('(min-width: 981px)').addEventListener('change', closeMenu);
  function translate(lang) {
    language = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en][data-vi]').forEach(el => { el.textContent = el.dataset[lang]; });
    document.querySelectorAll('[data-alt-en][data-alt-vi]').forEach(el => { el.alt = el.getAttribute('data-alt-' + lang); });
    document.querySelectorAll('[data-language-toggle]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    document.title = lang === 'en' ? 'Onos Global | POD Manufacturing Across Vietnam and the USA' : 'Onos Global | Sản xuất POD tại Việt Nam và Hoa Kỳ';
    document.querySelector('meta[name="description"]').content = lang === 'en' ? 'Onos Global connects international brands with print, embroidery and fulfillment across Vietnam and the United States.' : 'Onos Global kết nối thương hiệu quốc tế với mạng lưới in ấn, thêu và hoàn tất đơn hàng tại Việt Nam và Hoa Kỳ.';
    const intro = lang === 'en' ? 'Hello Onos team,\n\nProduct:\nExpected quantity:\nDestination:\nTarget date:\nArtwork link:\n' : 'Chào đội ngũ Onos,\n\nSản phẩm:\nSố lượng dự kiến:\nĐịa chỉ nhận:\nThời gian dự kiến:\nLink thiết kế:\n';
    document.querySelector('#email-brief').href = 'mailto:onospod.com@gmail.com?subject=' + encodeURIComponent(lang === 'en' ? 'Production enquiry — Onos Global' : 'Yêu cầu sản xuất — Onos Global') + '&body=' + encodeURIComponent(intro);
    nav.setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Điều hướng chính');
    document.querySelectorAll('[data-gallery-move]').forEach(b => b.setAttribute('aria-label', Number(b.dataset.galleryMove) < 0 ? (lang === 'en' ? 'Previous photos' : 'Ảnh trước') : (lang === 'en' ? 'Next photos' : 'Ảnh tiếp theo')));
    document.querySelectorAll('[data-view-image]').forEach(b => b.setAttribute('aria-label', (lang === 'en' ? 'Enlarge: ' : 'Phóng to: ') + b.querySelector('img').alt));
    document.querySelector('.dialog-close').setAttribute('aria-label', lang === 'en' ? 'Close photograph' : 'Đóng ảnh');
    closeMenu();
  }
  const equipment = {
    'art-print': {modelEn:'Machine: SL-DTG-X2S', modelVi:'Máy: SL-DTG-X2S'},
    'art-stitch': {modelEn:'Equipment: multi-head embroidery', modelVi:'Máy thêu vi tính nhiều đầu'},
    'art-sublimation': {modelEn:'Epson SC-F11030 · heat press PD-1800D-800', modelVi:'Epson SC-F11030 · máy ép PD-1800D-800'},
    'art-laser': {modelEn:'Laser FW-1822 · auto cutter LP-2219', modelVi:'Laser FW-1822 · máy cắt tự động LP-2219'}
  };
  document.querySelectorAll('.capability-card').forEach(card => {
    const art = card.querySelector('.capability-art');
    const spec = art && [...art.classList].map(name => equipment[name]).find(Boolean);
    if (!spec) return;
    art.remove();
    const model = document.createElement('small');
    model.className = 'machine-model';
    model.dataset.en = spec.modelEn;
    model.dataset.vi = spec.modelVi;
    model.textContent = spec[language === 'en' ? 'modelEn' : 'modelVi'];
    card.querySelector('.tag')?.after(model);
  });
  // OnosSEO binds real language links after the page is initialized.
  const rail = document.querySelector('.photo-rail');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-gallery-move]').forEach(b => b.addEventListener('click', () => rail.scrollBy({left: Number(b.dataset.galleryMove) * (rail.querySelector('figure').getBoundingClientRect().width + 24), behavior: reduced.matches ? 'instant' : 'smooth'})));
  rail.addEventListener('keydown', e => {
    if (e.target !== rail || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault(); rail.scrollBy({left:(e.key === 'ArrowRight' ? 1 : -1) * rail.clientWidth * .8,behavior:reduced.matches ? 'instant' : 'smooth'});
  });
  const dialog = document.querySelector('.image-dialog');
  let opener;
  document.querySelectorAll('[data-view-image]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    dialog.querySelector('img').src = button.dataset.viewImage;
    dialog.querySelector('img').alt = button.querySelector('img').alt;
    dialog.querySelector('p').textContent = button.closest('figure').querySelector('figcaption').innerText;
    dialog.showModal();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close(); } });
  dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.06});
    document.querySelectorAll('.reveal').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) {el.classList.add('will-reveal'); observer.observe(el);} });
    reduced.addEventListener('change', e => { if(e.matches){document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('is-visible'));observer.disconnect();} });
  }
  let ticking = false;
  addEventListener('scroll', () => { if(!ticking){ticking=true;requestAnimationFrame(()=>{header.classList.toggle('is-scrolled',scrollY>12);ticking=false;});} },{passive:true});
  window.OnosSEO.bind(translate);
})();
