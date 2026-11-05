import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/**
 * Reveal-once on scroll: adds `is-in` to every [data-reveal] element as it enters the view.
 * Content is visible without scripts and with reduced motion (the CSS only hides it under html.js).
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Sets the font size of `ref` so its single line of text fills its parent's width exactly. */
export function useFitText<T extends HTMLElement>(text: string): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      const target = box.clientWidth;
      if (w > 0 && target > 0) el.style.fontSize = `${Math.floor((100 * target) / w * 100) / 100}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [text]);
  return ref;
}

/** True below the given width (matches the CSS breakpoints). */
export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
