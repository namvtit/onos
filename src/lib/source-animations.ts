import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import source from "@/generated/interactions.json";

type Target = { id?: string; selector?: string; appliesTo?: string; useEventTarget?: boolean | string };
type Config = {
  target: Target; delay?: number; duration?: number; easing?: string;
  value?: number | string; xValue?: number | null; yValue?: number | null; zValue?: number | null;
  xUnit?: string; yUnit?: string; zUnit?: string;
  widthValue?: number; heightValue?: number; widthUnit?: string; heightUnit?: string;
  globalSwatchId?: string; rValue?: number; gValue?: number; bValue?: number; aValue?: number;
};
type Item = { actionTypeId: string; config: Config };
type Group = { actionItems: Item[] };
type List = { actionItemGroups?: Group[]; useFirstGroupAsInitialState?: boolean;
  continuousParameterGroups?: { continuousActionGroups: (Group & { keyframe: number })[] }[] };
type EventConfig = { loop?: boolean; delay?: number; scrollOffsetValue?: number; scrollOffsetUnit?: string };
type SourceEvent = { id: string; eventTypeId: string; mediaQueries: string[]; target: Target;
  action: { config: { actionListId: string; autoStopEventId?: string } }; config: EventConfig | unknown[] };
const data = source as unknown as { events: Record<string, SourceEvent>; actionLists: Record<string, List> };

/** Resolve Webflow event-relative selectors while retaining duplicate component IDs. */
function targets(target: Target, trigger: HTMLElement, pageId: string): HTMLElement[] {
  if (target.useEventTarget === true || target.appliesTo === "TRIGGER_ELEMENT") return [trigger];
  if (target.useEventTarget === "CHILDREN") {
    const childId = target.id?.split("|").at(-1);
    const selector = target.selector || (childId ? `[data-w-id="${CSS.escape(childId)}"]` : "*");
    return Array.from(trigger.querySelectorAll(selector));
  }
  if (target.useEventTarget === "SIBLINGS") return Array.from(trigger.parentElement?.children || []).filter((x): x is HTMLElement => x instanceof HTMLElement && x !== trigger && x.matches(target.selector || "*"));
  if (target.useEventTarget === "PARENT") {
    const parent = trigger.parentElement?.closest<HTMLElement>(target.selector || "*");
    return parent ? [parent] : [];
  }
  if (target.selector) return Array.from(document.querySelectorAll(target.selector));
  if (target.id) {
    const parts = target.id.split("|");
    if (parts.length > 1 && parts[0] !== pageId) return [];
    if (target.appliesTo === "PAGE") return target.id === pageId ? [document.documentElement] : [];
    return Array.from(document.querySelectorAll(`[data-w-id="${CSS.escape(parts.at(-1)!)}"]`));
  }
  // Empty targets in the original configuration are orphaned actions.
  return [];
}

function vars(item: Item): gsap.TweenVars {
  const c = item.config;
  const unit = (v: number | null | undefined, u?: string) => v == null ? undefined : `${v}${(u || "px").toLowerCase()}`;
  const result: gsap.TweenVars = {};
  if (item.actionTypeId === "STYLE_OPACITY") result.opacity = c.value;
  if (item.actionTypeId === "GENERAL_DISPLAY") result.display = c.value;
  if (item.actionTypeId === "STYLE_BACKGROUND_COLOR") result.backgroundColor = c.globalSwatchId ? `var(${c.globalSwatchId})` : `rgba(${c.rValue},${c.gValue},${c.bValue},${c.aValue ?? 1})`;
  if (item.actionTypeId === "STYLE_SIZE") {
    if (c.widthUnit === "AUTO") result.width = "auto";
    else if (c.widthValue != null) result.width = unit(c.widthValue, c.widthUnit);
    if (c.heightUnit === "AUTO") result.height = "auto";
    else if (c.heightValue != null) result.height = unit(c.heightValue, c.heightUnit);
  }
  if (item.actionTypeId === "TRANSFORM_MOVE") {
    if (c.xValue != null) { if (c.xUnit === "%") result.xPercent = c.xValue; else result.x = unit(c.xValue, c.xUnit); }
    if (c.yValue != null) { if (c.yUnit === "%") result.yPercent = c.yValue; else result.y = unit(c.yValue, c.yUnit); }
    if (c.zValue != null) result.z = unit(c.zValue, c.zUnit);
  }
  if (item.actionTypeId === "TRANSFORM_SCALE") {
    if (c.xValue != null) result.scaleX = c.xValue;
    if (c.yValue != null) result.scaleY = c.yValue;
  }
  if (item.actionTypeId === "TRANSFORM_ROTATE") {
    if (c.xValue != null) result.rotationX = c.xValue;
    if (c.yValue != null) result.rotationY = c.yValue;
    if (c.zValue != null) result.rotation = c.zValue;
  }
  return result;
}
function easing(name = "") {
  const names: Record<string, string> = {
    "": "power1.inOut", ease: "power1.inOut", inOutQuad: "power1.inOut", outQuart: "power3.out",
    inQuart: "power3.in", outQuad: "power1.out", inOutQuart: "power3.inOut", outCubic: "power2.out",
    inOutCubic: "power2.inOut", linear: "none",
  };
  return names[name] || "power1.inOut";
}

/** Port original IX2 timing, selectors, values and breakpoint ranges to local GSAP. */
export function mountSourceAnimations(pageId: string) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add({ main: "(min-width: 992px)", medium: "(min-width: 768px) and (max-width: 991px)", small: "(min-width: 480px) and (max-width: 767px)", tiny: "(max-width: 479px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
    const conditions = context.conditions!;
    const cleanups: (() => void)[] = [];
    const reduced = conditions.reduced;
    const running = new Map<string, gsap.core.Timeline>();
    const activeEvents = Object.values(data.events).filter(event => event.mediaQueries.some(key => conditions[key]));
    const listeners = (el: HTMLElement, type: string, callback: () => void) => {
      el.addEventListener(type, callback); cleanups.push(() => el.removeEventListener(type, callback));
    };
    function apply(group: Group, trigger: HTMLElement) {
      group.actionItems.forEach(item => {
        const els = targets(item.config.target, trigger, pageId);
        if (els.length) gsap.set(els, vars(item));
      });
    }
    function run(event: SourceEvent, trigger: HTMLElement) {
      const list = data.actionLists[event.action.config.actionListId];
      const settings = event.config as EventConfig;
      const groups = (list.actionItemGroups || []).slice(list.useFirstGroupAsInitialState ? 1 : 0);
      const key = `${event.id}:${trigger.dataset.runtimeKey}`;
      running.get(key)?.kill();
      if (event.action.config.autoStopEventId) running.get(`${event.action.config.autoStopEventId}:${trigger.dataset.runtimeKey}`)?.kill();
      if (reduced) { if (!settings.loop) groups.forEach(group => apply(group, trigger)); return; }
      if (event.eventTypeId === "SCROLL_INTO_VIEW" && list.useFirstGroupAsInitialState && list.actionItemGroups?.[0]) {
        apply(list.actionItemGroups[0], trigger);
      }
      const timeline = gsap.timeline({ repeat: settings.loop ? -1 : 0, delay: (settings.delay || 0) / 1000 });
      running.set(key, timeline);
      let cursor = 0;
      groups.forEach(group => {
        let span = 0;
        group.actionItems.forEach(item => {
          const els = targets(item.config.target, trigger, pageId);
          if (!els.length) return;
          const duration = item.actionTypeId === "GENERAL_DISPLAY" ? 0 : (item.config.duration || 0) / 1000;
          const delay = (item.config.delay || 0) / 1000;
          const options = { ...vars(item), duration, ease: settings.loop ? "none" : easing(item.config.easing), overwrite: "auto" as const };
          timeline.to(els, options, cursor + delay);
          span = Math.max(span, delay + duration);
        });
        cursor += span;
      });
      if (!cursor) timeline.kill();
    }
    // Apply initial states before any triggers. Accordions and dropdowns have their own controls.
    activeEvents.forEach(event => {
      if (!["MOUSE_OVER", "MOUSE_OUT"].includes(event.eventTypeId)) return;
      const list = data.actionLists[event.action.config.actionListId];
      if (list.useFirstGroupAsInitialState && list.actionItemGroups?.[0]) {
        targets(event.target, document.documentElement, pageId).forEach(trigger => apply(list.actionItemGroups![0], trigger));
      }
    });
    let serial = 0;
    activeEvents.forEach(event => {
      const list = data.actionLists[event.action.config.actionListId];
      targets(event.target, document.documentElement, pageId).forEach(trigger => {
        trigger.dataset.runtimeKey ||= String(++serial);
        if (event.eventTypeId === "MOUSE_OVER") listeners(trigger, "mouseenter", () => run(event, trigger));
        if (event.eventTypeId === "MOUSE_OUT") listeners(trigger, "mouseleave", () => run(event, trigger));
        if (event.eventTypeId === "SCROLL_INTO_VIEW") {
          const config = event.config as EventConfig;
          const offset = config.scrollOffsetValue || 0;
          ScrollTrigger.create({ trigger, start: `top ${100 - offset}%`, once: true, onEnter: () => run(event, trigger) });
        }
        if (event.eventTypeId === "PAGE_START") run(event, trigger);
        if (event.eventTypeId === "SCROLLING_IN_VIEW" && !reduced) {
          list.continuousParameterGroups?.forEach(parameter => {
            const timeline = gsap.timeline({ scrollTrigger: { trigger, start: "top bottom", end: "bottom bottom", scrub: 0.9 } });
            let previous = 0;
            parameter.continuousActionGroups.forEach((group, index) => {
              group.actionItems.forEach(item => {
                const els = targets(item.config.target, trigger, pageId);
                if (!els.length) return;
                if (!index) timeline.set(els, vars(item), 0);
                else timeline.to(els, { ...vars(item), duration: (group.keyframe - previous) / 100, ease: "none" }, previous / 100);
              });
              previous = group.keyframe;
            });
          });
        }
      });
    });
    document.querySelectorAll<HTMLElement>(".count").forEach((el, index) => {
      const rawTarget = el.dataset.target || el.dataset.count || el.textContent || "0";
      const target = parseInt(rawTarget.replace(/\D/g, ""), 10);
      const isYear = el.dataset.format === "year" || target === 2019;
      const isPadded = el.dataset.pad === "2" || (target < 10 && (rawTarget.trim().startsWith("0") || el.dataset.pad !== "false"));

      const format = (v: number) => {
        const intVal = Math.floor(v);
        if (isYear) return String(intVal);
        if (isPadded) return String(intVal).padStart(2, "0");
        return String(intVal);
      };

      const finalFormatted = isYear ? String(target) : (isPadded ? String(target).padStart(2, "0") : String(target));

      if (reduced) {
        el.textContent = finalFormatted;
        return;
      }

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const counter = { val: 0 };
          el.textContent = format(0);
          gsap.to(counter, {
            val: target,
            duration: Math.max(1, Math.min(2.5, (target / 200) * 2 + 0.8)),
            ease: "power2.out",
            delay: (index % 4) * 0.12,
            onUpdate: () => {
              el.textContent = format(counter.val);
            },
            onComplete: () => {
              el.textContent = finalFormatted;
            },
          });
        },
      });
    });
    ScrollTrigger.refresh();
    return () => { cleanups.forEach(cleanup => cleanup()); running.forEach(timeline => timeline.kill()); };
  });
  return () => media.revert();
}
