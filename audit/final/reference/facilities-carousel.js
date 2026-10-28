(() => {
  'use strict';

  const carousel = document.querySelector('.facility-carousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.facility-slide')];
  const dots = [...carousel.querySelectorAll('[data-facility-slide]')];
  const previous = carousel.querySelector('[data-facility-prev]');
  const next = carousel.querySelector('[data-facility-next]');
  const toggle = carousel.querySelector('[data-facility-toggle]');
  const status = carousel.querySelector('[data-facility-status]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouseHover = matchMedia('(hover: hover) and (pointer: fine)');
  const interval = Number(carousel.dataset.interval) || 5200;

  let active = 0;
  let timer;
  let inView = false;
  let hovered = false;
  let keyboardFocus = false;
  let pointerFocus = false;
  let userPaused = false;
  let sitePaused = document.documentElement.classList.contains('motion-paused');
  let lastInputWasPointer = false;
  let touchStart = null;

  const language = () => document.documentElement.lang === 'vi' ? 'vi' : 'en';
  const text = {
    en: {
      name: 'Onos production facilities', controls: 'Slideshow controls', choose: 'Choose a photo',
      previous: 'Previous photo', next: 'Next photo', pause: 'Pause slideshow', play: 'Play slideshow',
      slide: (number, title) => `Slide ${number} of ${slides.length}: ${title}`,
      dot: number => `Show photo ${number}`
    },
    vi: {
      name: 'Các nhà máy Onos', controls: 'Điều khiển trình chiếu', choose: 'Chọn ảnh',
      previous: 'Ảnh trước', next: 'Ảnh tiếp theo', pause: 'Tạm dừng trình chiếu', play: 'Phát trình chiếu',
      slide: (number, title) => `Ảnh ${number} / ${slides.length}: ${title}`,
      dot: number => `Xem ảnh ${number}`
    }
  };

  function clearTimer() {
    window.clearTimeout(timer);
    timer = undefined;
    carousel.classList.remove('is-counting');
  }

  function canAutoAdvance() {
    return inView && !hovered && !keyboardFocus && !userPaused && !sitePaused
      && !document.hidden && !reducedMotion.matches;
  }

  function updateLabels() {
    const copy = text[language()];
    carousel.setAttribute('aria-label', copy.name);
    carousel.querySelector('.facility-controls').setAttribute('aria-label', copy.controls);
    carousel.querySelector('.facility-dots').setAttribute('aria-label', copy.choose);
    previous.setAttribute('aria-label', copy.previous);
    next.setAttribute('aria-label', copy.next);
    toggle.setAttribute('aria-label', userPaused ? copy.play : copy.pause);
    slides.forEach((slide, index) => {
      const title = slide.querySelector('figcaption [data-en][data-vi]');
      slide.setAttribute('aria-label', copy.slide(index + 1, title.dataset[language()]));
    });
    dots.forEach((dot, index) => dot.setAttribute('aria-label', copy.dot(index + 1)));
    toggle.setAttribute('aria-pressed', String(userPaused || sitePaused || reducedMotion.matches));
    toggle.disabled = sitePaused || reducedMotion.matches;
  }

  function showSlide(index, announce = false) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === active;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', dotIndex === active ? 'step' : 'false');
    });
    updateLabels();
    if (announce) {
      const title = slides[active].querySelector('figcaption [data-en][data-vi]');
      status.textContent = text[language()].slide(active + 1, title.dataset[language()]);
    }
  }

  function scheduleAuto(force = false) {
    clearTimer();
    if (userPaused || sitePaused || reducedMotion.matches || (!force && (!inView || hovered || keyboardFocus || document.hidden))) return;
    requestAnimationFrame(() => carousel.classList.add('is-counting'));
    timer = window.setTimeout(() => {
      timer = undefined;
      if (!canAutoAdvance()) {
        scheduleAuto();
        return;
      }
      showSlide(active + 1);
      scheduleAuto();
    }, interval);
  }

  function userSelect(index) {
    showSlide(index, true);
    scheduleAuto();
  }

  previous.addEventListener('click', () => userSelect(active - 1));
  next.addEventListener('click', () => userSelect(active + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => userSelect(index)));
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    updateLabels();
    if (userPaused) clearTimer();
    else scheduleAuto(true);
  });

  carousel.addEventListener('pointerenter', event => {
    if (mouseHover.matches && event.pointerType === 'mouse') {
      hovered = true;
      carousel.classList.add('is-hovered');
      clearTimer();
    }
  });
  carousel.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') {
      hovered = false;
      carousel.classList.remove('is-hovered');
      scheduleAuto();
    }
  });
  carousel.addEventListener('pointerdown', event => {
    lastInputWasPointer = true;
    pointerFocus = true;
    if (event.target.closest('.facility-slides') && event.pointerType === 'touch') {
      touchStart = {x:event.clientX, y:event.clientY};
    }
  });
  carousel.addEventListener('pointerup', event => {
    if (touchStart && event.pointerType === 'touch') {
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) userSelect(active + (dx < 0 ? 1 : -1));
    }
    touchStart = null;
  });
  carousel.addEventListener('pointercancel', () => { touchStart = null; });
  carousel.addEventListener('focusin', () => {
    if (!lastInputWasPointer) {
      keyboardFocus = true;
      clearTimer();
    }
  });
  carousel.addEventListener('focusout', () => {
    window.setTimeout(() => {
      keyboardFocus = !pointerFocus && carousel.contains(document.activeElement);
      if (!keyboardFocus) scheduleAuto();
    }, 0);
  });
  carousel.addEventListener('click', event => {
    if (!event.target.closest('button')) {
      carousel.focus({preventScroll:true});
      keyboardFocus = false;
      pointerFocus = false;
      lastInputWasPointer = false;
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab' || event.key.startsWith('Arrow') || event.key === 'Enter' || event.key === ' ') {
      lastInputWasPointer = false;
      pointerFocus = false;
    }
    if (event.target === carousel && event.key === 'ArrowLeft') { event.preventDefault(); userSelect(active - 1); }
    if (event.target === carousel && event.key === 'ArrowRight') { event.preventDefault(); userSelect(active + 1); }
  });
  document.addEventListener('pointerdown', () => {
    lastInputWasPointer = true;
    window.setTimeout(() => { lastInputWasPointer = false; pointerFocus = false; }, 800);
  }, true);
  document.addEventListener('visibilitychange', () => scheduleAuto());
  reducedMotion.addEventListener('change', () => scheduleAuto());
  new MutationObserver(() => {
    sitePaused = document.documentElement.classList.contains('motion-paused');
    updateLabels();
    scheduleAuto();
  }).observe(document.documentElement, {attributes:true,attributeFilter:['lang','class']});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      scheduleAuto();
    }, {threshold:.25}).observe(carousel);
  } else {
    inView = true;
    scheduleAuto();
  }
  updateLabels();
  showSlide(0);
})();
