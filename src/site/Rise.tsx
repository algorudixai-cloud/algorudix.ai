import { Fragment, useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type Phase = 'plain' | 'measure' | 'split' | 'in';

interface RiseProps {
  text: string;
  as?: 'h2' | 'h3' | 'p';
  id?: string;
  className?: string;
}

/**
 * "Lines that rise on scroll" for a heading whose line breaks we do not control. Once the font has
 * loaded, a heading still below the fold is split into the lines it really sets in. Each line rises
 * out of a clipped mask when the heading enters the view, and then the plain text is given back so it
 * rewraps normally. The text never goes transparent. Nothing happens under reduced motion, or for a
 * heading that is already on screen when the page loads.
 */
export function Rise({ text, as = 'h2', id, className = '' }: RiseProps) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>('plain');
  const [lines, setLines] = useState<string[]>([]);
  const finished = useRef(false);

  // 1. Once the font is in, split the heading if it is still below the fold.
  useEffect(() => {
    if (finished.current) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let live = true;
    document.fonts.ready.then(() => {
      const el = ref.current;
      if (!live || !el || finished.current) return;
      if (el.getBoundingClientRect().top < innerHeight * 0.88) { finished.current = true; return; }
      setPhase('measure');
    });
    return () => { live = false; };
  }, [text]);

  // 2. Group the words by the line they landed on (before paint, so the measuring pass is never seen).
  useLayoutEffect(() => {
    if (phase !== 'measure' || !ref.current) return;
    const groups: { top: number; words: string[] }[] = [];
    ref.current.querySelectorAll<HTMLElement>('[data-w]').forEach((w) => {
      const last = groups[groups.length - 1];
      if (last && Math.abs(last.top - w.offsetTop) < 4) last.words.push(w.textContent || '');
      else groups.push({ top: w.offsetTop, words: [w.textContent || ''] });
    });
    setLines(groups.map((g) => g.words.join(' ')));
    setPhase('split');
  }, [phase]);

  // 3. Rise when the heading enters the view. A width change first gives the plain text back.
  useEffect(() => {
    if (phase !== 'split' || !ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setPhase('in'); }
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(ref.current);
    const width = innerWidth;
    const onResize = () => { if (innerWidth !== width) { finished.current = true; setPhase('plain'); } };
    addEventListener('resize', onResize);
    return () => { io.disconnect(); removeEventListener('resize', onResize); };
  }, [phase]);

  // 4. Once every line has landed, back to plain text.
  useEffect(() => {
    if (phase !== 'in') return;
    const t = window.setTimeout(() => { finished.current = true; setPhase('plain'); }, 900 + lines.length * 90 + 150);
    return () => window.clearTimeout(t);
  }, [phase, lines.length]);

  const state = phase === 'split' ? ' is-split' : phase === 'in' ? ' is-split is-in' : '';
  let content: ReactNode = text;
  if (phase === 'measure') {
    const words = text.trim().split(/\s+/);
    content = words.map((w, i) => (
      <Fragment key={i}><span data-w style={{ display: 'inline-block' }}>{w}</span>{i < words.length - 1 ? ' ' : null}</Fragment>
    ));
  } else if (phase === 'split' || phase === 'in') {
    content = lines.map((l, i) => (
      <Fragment key={i}>{i > 0 ? ' ' : null}<span className="line"><span style={{ ['--i' as string]: i }}>{l}</span></span></Fragment>
    ));
  }

  return <Tag ref={ref} id={id} className={`${className} rise${state}`.trim()}>{content}</Tag>;
}
