import { gsap } from "gsap";

export function mountSiteControls() {
  const abort = new AbortController();
  const { signal } = abort;
  const disposals: (() => void)[] = [];
  const on = (target: EventTarget, event: string, fn: EventListener) => target.addEventListener(event, fn, { signal });
  const select = (selector: string, root: ParentNode = document) => Array.from(root.querySelectorAll<HTMLElement>(selector));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const duration = (milliseconds: number) => reduced.matches ? 0 : milliseconds / 1000;
  const activate = (element: HTMLElement, label?: string) => {
    element.setAttribute("role", "button"); element.tabIndex = 0;
    if (label) element.setAttribute("aria-label", label);
    on(element, "keydown", event => {
      const key = event as KeyboardEvent;
      if (key.key === "Enter" || key.key === " ") { key.preventDefault(); element.click(); }
    });
  };

  select(".w-nav").forEach((nav, index) => {
    const button = nav.querySelector<HTMLElement>(".w-nav-button");
    const menu = nav.querySelector<HTMLElement>(".w-nav-menu");
    if (!button || !menu) return;
    const originalId = menu.id;
    menu.id ||= `navigation-${index}`;
    activate(button, "Menu");
    button.setAttribute("aria-controls", menu.id);
    let open = false;
    function setOpen(value: boolean, focus = false) {
      open = value; button!.setAttribute("aria-expanded", String(open));
      button!.classList.toggle("w--open", open);
      menu!.toggleAttribute("data-nav-menu-open", open);
      select(".w-nav-link, .w-dropdown, .w-dropdown-toggle, .w-dropdown-list", menu!).forEach(el => {
        if (el.classList.contains("w-dropdown")) el.classList.toggle("w--nav-dropdown-open", open);
        if (el.classList.contains("w-dropdown-toggle")) el.classList.toggle("w--nav-dropdown-toggle-open", open);
        if (el.classList.contains("w-dropdown-list")) el.classList.toggle("w--nav-dropdown-list-open", open);
      });
      if (open) gsap.fromTo(menu, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: duration(Number(nav.dataset.duration || 400)), clearProps: "transform,opacity" });
      if (focus) button!.focus();
    }
    setOpen(false);
    on(button, "click", () => setOpen(!open));
    on(document, "click", event => { if (open && !nav.contains(event.target as Node)) setOpen(false); });
    on(nav, "keydown", event => { if ((event as KeyboardEvent).key === "Escape") setOpen(false, true); });
    on(menu, "click", event => { if ((event.target as Element).closest("a[href]")) setOpen(false); });
    on(window, "resize", () => { if (window.innerWidth > 991 && open) setOpen(false); });
    disposals.push(() => { setOpen(false); gsap.killTweensOf(menu); if (!originalId) menu.removeAttribute("id"); });
  });

  select(".w-dropdown").forEach((dropdown, index) => {
    const toggle = dropdown.querySelector<HTMLElement>(".w-dropdown-toggle");
    const list = dropdown.querySelector<HTMLElement>(".w-dropdown-list");
    const icon = dropdown.querySelector<HTMLElement>(".dropdown-icon");
    if (!toggle || !list) return;
    activate(toggle); list.id ||= `dropdown-${index}`;
    toggle.setAttribute("aria-controls", list.id); toggle.setAttribute("aria-haspopup", "true");
    let open = false;
    function setOpen(value: boolean) {
      if (open === value) return;
      open = value; toggle!.setAttribute("aria-expanded", String(value));
      toggle!.classList.toggle("w--open", value); list!.classList.toggle("w--open", value);
      gsap.killTweensOf([list, icon]);
      gsap.to(list, { display: value ? "block" : "none", y: value ? 0 : 20, duration: duration(400) });
      if (icon) gsap.to(icon, { rotationY: value ? 180 : 0, duration: duration(400) });
    }
    toggle.setAttribute("aria-expanded", "false");
    on(toggle, "click", () => setOpen(!open));
    on(dropdown, "mouseenter", () => { if (window.innerWidth > 991 && window.matchMedia("(hover: hover)").matches && dropdown.dataset.hover === "true") setOpen(true); });
    on(dropdown, "mouseleave", () => { if (!dropdown.contains(document.activeElement)) setOpen(false); });
    on(dropdown, "focusout", event => { if (!dropdown.contains((event as FocusEvent).relatedTarget as Node)) setOpen(false); });
    on(document, "click", event => { if (!dropdown.contains(event.target as Node)) setOpen(false); });
    on(dropdown, "keydown", event => { if ((event as KeyboardEvent).key === "Escape") { setOpen(false); toggle.focus(); } });
    disposals.push(() => { gsap.killTweensOf([list, icon]); list.style.removeProperty("display"); list.style.removeProperty("transform"); });
  });

  select(".w-tabs").forEach((tabs, tabIndex) => {
    const menu = tabs.querySelector<HTMLElement>(":scope > .w-tab-menu");
    const links = select(":scope > .w-tab-link", menu || tabs);
    const panes = select(":scope > .w-tab-content > .w-tab-pane", tabs);
    menu?.setAttribute("role", "tablist");
    function setTab(index: number, focus = false) {
      links.forEach((link, i) => {
        const current = i === index;
        link.classList.toggle("w--current", current); link.setAttribute("aria-selected", String(current)); link.tabIndex = current ? 0 : -1;
      });
      panes.forEach(pane => {
        const current = pane.dataset.wTab === links[index]?.dataset.wTab;
        const wasActive = pane.classList.contains("w--tab-active");
        pane.classList.toggle("w--tab-active", current); pane.hidden = !current;
        if (current && !wasActive) gsap.fromTo(pane, { opacity: 0 }, { opacity: 1, duration: duration(Number(tabs.dataset.durationIn || 0)), clearProps: "opacity" });
      });
      if (focus) links[index]?.focus();
    }
    links.forEach((link, index) => {
      link.id ||= `tab-${tabIndex}-${index}`;
      link.setAttribute("role", "tab"); link.setAttribute("href", `#pane-${tabIndex}-${index}`);
      link.setAttribute("aria-controls", `pane-${tabIndex}-${index}`);
      const pane = panes.find(pane => pane.dataset.wTab === link.dataset.wTab);
      if (pane) { pane.id = `pane-${tabIndex}-${index}`; pane.setAttribute("role", "tabpanel"); pane.setAttribute("aria-labelledby", link.id); }
      on(link, "click", event => { event.preventDefault(); setTab(index); });
      on(link, "keydown", event => {
        const key = (event as KeyboardEvent).key;
        let next = index;
        if (key === "ArrowRight" || key === "ArrowDown") next = (index + 1) % links.length;
        else if (key === "ArrowLeft" || key === "ArrowUp") next = (index + links.length - 1) % links.length;
        else if (key === "Home") next = 0;
        else if (key === "End") next = links.length - 1;
        else return;
        event.preventDefault(); setTab(next, true);
      });
    });
    setTab(Math.max(0, links.findIndex(link => link.classList.contains("w--current"))));
    disposals.push(() => panes.forEach(pane => gsap.killTweensOf(pane)));
  });

  select(".accordion-heading").forEach((heading, index) => {
    const content = heading.parentElement?.querySelector<HTMLElement>(":scope > .accordion-content");
    if (!content) return;
    const icon = heading.querySelector<HTMLElement>(".plus-icon");
    let open = !!icon?.style.transform.includes("45deg");
    activate(heading); content.id ||= `accordion-content-${index}`;
    heading.setAttribute("aria-controls", content.id);
    function setOpen(value: boolean, animate = true) {
      open = value; heading.setAttribute("aria-expanded", String(open));
      content!.setAttribute("aria-hidden", String(!open)); content!.inert = !open;
      gsap.to(content!, { height: open ? "auto" : 0, duration: animate ? duration(400) : 0, ease: "power1.inOut", overwrite: true });
      if (icon) gsap.to(icon, { rotation: open ? 45 : 0, duration: animate ? duration(400) : 0, overwrite: true });
    }
    setOpen(open, false); on(heading, "click", () => setOpen(!open));
    disposals.push(() => gsap.killTweensOf([content, icon]));
  });

  select(".w-slider").forEach((slider, sliderIndex) => {
    const mask = slider.querySelector<HTMLElement>(".w-slider-mask");
    const slides = mask ? select(":scope > .w-slide", mask) : [];
    const left = slider.querySelector<HTMLElement>(".w-slider-arrow-left");
    const right = slider.querySelector<HTMLElement>(".w-slider-arrow-right");
    const nav = slider.querySelector<HTMLElement>(".w-slider-nav");
    if (!mask || !slides.length) return;
    slider.setAttribute("role", "region"); slider.setAttribute("aria-roledescription", "carousel");
    slider.setAttribute("aria-label", slider.classList.contains("case-study-slider") ? "Case studies" : "Testimonials");
    mask.id ||= `slider-mask-${sliderIndex}`;
    let index = 0;
    let pages: number[][] = [];
    let startX = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const speed = duration(Number(slider.dataset.duration || 500));
    const fade = slider.dataset.animation === "fade" || slider.dataset.animation === "cross";
    const dots: HTMLElement[] = [];
    function show(next: number, animate = true) {
      const previous = index;
      index = (next + pages.length) % pages.length;
      const offset = slides[pages[index][0]].offsetLeft - slides[0].offsetLeft;
      slides.forEach((slide, i) => {
        const active = pages[index].includes(i);
        slide.setAttribute("aria-hidden", String(!active)); slide.inert = !active;
        gsap.killTweensOf(slide);
        if (fade) {
          // Webflow fades stack the next page at the first slide's origin.
          const ownOffset = slide.offsetLeft - slides[0].offsetLeft;
          gsap.set(slide, { x: -ownOffset, zIndex: active ? 2 : 1 });
          gsap.to(slide, { opacity: active ? 1 : 0, visibility: active ? "visible" : "hidden", duration: animate ? speed : 0, ease: "power1.inOut" });
        } else {
          // Keep the previous slide visible during the translation, then hide it.
          if (active || pages[previous]?.includes(i)) slide.style.visibility = "visible";
          gsap.to(slide, { x: -offset, duration: animate ? speed : 0, ease: "power1.inOut",
            onComplete: () => { slide.style.visibility = active ? "visible" : "hidden"; },
          });
        }
      });
      dots.forEach((dot, i) => { dot.classList.toggle("w-active", i === index); dot.setAttribute("aria-pressed", String(i === index)); dot.tabIndex = i === index ? 0 : -1; });
      if (slider.dataset.infinite !== "true") {
        if (left) left.style.display = index === 0 ? "none" : "";
        if (right) right.style.display = index === pages.length - 1 ? "none" : "";
      }
    }
    function measure() {
      const width = mask!.clientWidth; pages = []; let used = 0;
      slides.forEach((slide, i) => {
        const size = slide.getBoundingClientRect().width;
        if (!pages.length || used + size > width + 1) { pages.push([]); used = 0; }
        pages.at(-1)!.push(i); used += size;
      });
      index = Math.min(index, pages.length - 1);
      if (nav) {
        nav.replaceChildren(); dots.length = 0;
        pages.forEach((_, i) => {
          const dot = document.createElement("div"); dot.className = "w-slider-dot";
          activate(dot, `Show slide ${i + 1} of ${pages.length}`);
          on(dot, "click", () => show(i));
          nav.append(dot); dots.push(dot);
        });
      }
      show(index, false);
    }
    slides.forEach((slide, i) => { slide.setAttribute("role", "group"); slide.setAttribute("aria-label", `${i + 1} of ${slides.length}`); });
    if (left) { activate(left, "Previous slide"); left.setAttribute("aria-controls", mask.id); on(left, "click", () => show(index - 1)); }
    if (right) { activate(right, "Next slide"); right.setAttribute("aria-controls", mask.id); on(right, "click", () => show(index + 1)); }
    on(mask, "touchstart", event => { startX = (event as TouchEvent).changedTouches[0].clientX; });
    on(mask, "touchend", event => {
      if (slider.dataset.disableSwipe === "true") return;
      const delta = (event as TouchEvent).changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) show(index + (delta < 0 ? 1 : -1));
    });
    function pause() { if (timer) clearInterval(timer); timer = undefined; }
    function play() {
      pause();
      if (slider.dataset.autoplay === "true" && !reduced.matches) timer = setInterval(() => show(index + 1), Number(slider.dataset.delay || 4000));
    }
    on(slider, "mouseenter", pause); on(slider, "mouseleave", play);
    on(slider, "focusin", pause); on(slider, "focusout", play);
    const observer = new ResizeObserver(measure); observer.observe(mask); measure(); play();
    disposals.push(() => { pause(); observer.disconnect(); slides.forEach(slide => gsap.killTweensOf(slide)); });
  });

  select(".w-background-video").forEach(wrap => {
    const video = wrap.querySelector<HTMLVideoElement>("video");
    const control = wrap.querySelector<HTMLButtonElement>(".w-background-video--control");
    if (!video) return;
    video.muted = true;
    const update = () => {
      if (!control) return;
      control.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
      const spans = control.querySelectorAll<HTMLElement>(":scope > span");
      spans.forEach((span, i) => { span.hidden = video.paused ? i === 0 : i === 1; });
    };
    const syncMotion = () => { if (reduced.matches) video.pause(); else if (video.autoplay) void video.play().catch(update); update(); };
    if (control) on(control, "click", () => { if (video.paused) void video.play().catch(update); else video.pause(); update(); });
    on(video, "play", update); on(video, "pause", update); on(reduced, "change", syncMotion);
    syncMotion();
    disposals.push(() => video.pause());
  });
  return () => { abort.abort(); disposals.forEach(dispose => dispose()); };
}
