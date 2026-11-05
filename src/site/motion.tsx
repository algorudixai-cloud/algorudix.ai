import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { useMediaQuery } from './hooks';

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** True once the element has been on screen (or while it is, with once: false). */
export function useInView<T extends Element>(ref: RefObject<T | null>, { once = true, margin = '0px 0px -10% 0px' } = {}) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); } else if (!once) setSeen(false);
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return seen;
}

/** Words that take turns on one line: each rises in as the last one leaves. */
export function Rotator({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => setT((x) => x + 1), interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);
  const n = words.length;
  const cur = t % n, prev = t > 0 ? (t - 1) % n : -1;
  return (
    <span className="rotator" aria-hidden="true">
      {words.map((w, k) => (
        <span key={`${w}-${k}`} className={`grad-text${k === cur ? ' is-on' : k === prev ? ' is-out' : ''}`}>{w}</span>
      ))}
    </span>
  );
}

/** A figure that counts up from zero the first time it comes into view ("150+", "3.8x", "99.4%"). */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref);
  const reduced = useReducedMotion();
  const m = /\//.test(value) ? null : value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [shown, setShown] = useState(m && !reduced ? `${m[1]}0${m[3]}` : value);
  useEffect(() => {
    if (!m || reduced) { setShown(value); return; }
    if (!seen) return;
    const target = parseFloat(m[2]);
    const dec = (m[2].split('.')[1] || '').length;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1700);
      const e = 1 - Math.pow(1 - p, 3);
      setShown(`${m[1]}${(target * e).toFixed(dec)}${m[3]}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduced, value]);
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

const DOTS: [string, string, number, string, number, number][] = [
  // left, top, size, colour, parallax depth, float period
  ['5%', '16%', 10, '#6c3bff', 18, 7],
  ['44%', '9%', 7, '#ff7a59', 26, 6],
  ['92%', '14%', 12, '#2f6bff', 14, 8],
  ['58%', '78%', 9, '#ff4f8b', 22, 6.5],
  ['3%', '72%', 6, '#19c3e6', 30, 7.5],
  ['84%', '86%', 8, '#6c3bff', 20, 9],
  ['36%', '54%', 5, '#2f6bff', 34, 5.5],
];

/** Small coloured dots that float and lean away from the pointer. */
export function Dots() {
  return (
    <>
      {DOTS.map(([left, top, s, c, depth, t], i) => (
        <span key={i} className="dot" style={{ left, top, ['--s' as string]: `${s}px`, ['--c' as string]: c, ['--depth' as string]: `${depth}px`, ['--t' as string]: `${t}s`, ['--dl' as string]: `${-i * 0.9}s` } as CSSProperties} />
      ))}
    </>
  );
}
