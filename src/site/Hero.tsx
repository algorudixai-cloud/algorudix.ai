import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { isShown, section, site } from '../content';
import { useMediaQuery } from './hooks';
import { Arrow } from './icons';
import { HeroStage } from './mockups';
import { Counter, Dots, Rotator } from './motion';

/** The rotating words live in the hero's "More text": one per line (or separated by |). */
export const heroWords = (body: string) => body.split(/\n|\|/).map((w) => w.trim()).filter(Boolean);

/** The figures under the hero: the highlights, plus the support promise when it starts with a figure. */
function stats() {
  const list = site.highlights.map((h) => ({ value: h.value, label: h.label }));
  const m = site.settings.support_note.match(/^(\S*\d\S*)\s+(.+)$/);
  if (m) list.push({ value: m[1], label: m[2].charAt(0).toUpperCase() + m[2].slice(1) });
  return list.slice(0, 4);
}

export function Hero({ onBook, onShowTasks }: { onBook: () => void; onShowTasks: () => void }) {
  const hero = section('hero');
  const words = heroWords(hero.body);
  const ref = useRef<HTMLElement>(null);
  const fine = useMediaQuery('(pointer: fine)');
  const figures = stats();
  const d = (s: number) => ({ ['--d' as string]: `${s}s` }) as CSSProperties;

  // the floating dots lean away from the pointer
  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!fine || !el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title" onPointerMove={onMove}>
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--a" /><span className="blob blob--b" /><span className="blob blob--c" />
        <Dots />
      </div>
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title" data-load style={d(0.05)}>
              <span className="line">{hero.heading}</span>
              {words.length > 0 && <Rotator words={words} />}
              {words.length > 0 && <span className="sr-only"> {words.join(', ')}</span>}
            </h1>
            <p className="hero__lead" data-load style={d(0.22)}>{hero.intro}</p>
            <div className="hero__actions" data-load style={d(0.36)}>
              <button type="button" className="btn btn--primary" onClick={onBook}>{hero.cta_label || 'Book a free consultation'}<Arrow /></button>
              {isShown('tasks') && (
                <a className="btn btn--ghost" href="#tasks" onClick={(e) => { e.preventDefault(); onShowTasks(); }}>See what we automate</a>
              )}
            </div>
          </div>
          <div className="hero__visual" data-load style={d(0.28)}>
            <HeroStage />
          </div>
        </div>
        {figures.length > 0 && (
          <ul className="stats" data-load style={d(0.55)} aria-label="Algorudix in figures">
            {figures.map((s) => (
              <li key={s.label} className="stat"><b><Counter value={s.value} /></b><span>{s.label}</span></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
