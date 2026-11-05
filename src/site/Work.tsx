import { useEffect, useRef, useState } from 'react';
import { section, site, type CaseStudy } from '../content';
import { CaseFigure } from './figures';
import { Rise } from './Rise';

/**
 * Selected work, as "held picture, passing captions": each project's text scrolls past while its
 * interface figure is held on the right and wipes in from the bottom when the project arrives.
 */
export function Work({ onOpen }: { onOpen: (c: CaseStudy) => void }) {
  const s = section('work');
  const cases = site.case_studies;
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const chapters = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const i = Number((e.target as HTMLElement).dataset.chapter);
        setCurrent((cur) => { if (cur !== i) setPrevious(cur); return i; });
      }
    }, { rootMargin: '-40% 0px -40% 0px' });
    chapters.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [cases.length]);

  if (!cases.length) return null;

  return (
    <section id="work" className="work on-block" aria-labelledby="work-title">
      <div className="work__grid">
        <div className="work__list">
          <div className="work__head">
            <Rise id="work-title" className="t-display" text={s.heading} />
            {s.intro && <p className="t-body work__intro">{s.intro}</p>}
          </div>
          {cases.map((c, i) => (
            <article key={c.id} className="chapter" data-chapter={i} ref={(el) => { chapters.current[i] = el; }} aria-labelledby={`case-${c.id}`}>
              <div className="chapter__figure"><CaseFigure c={c} /></div>
              <h3 id={`case-${c.id}`} className="t-lead-head chapter__title">{c.title}</h3>
              <p className="t-lead chapter__tagline">{c.tagline}</p>
              <p className="t-small muted chapter__meta">{c.industry}, {c.disciplines.toLowerCase()}</p>
              {c.results.length > 0 && (
                <ul className="chapter__results">
                  {c.results.map((r) => <li key={r} className="t-body">{r}</li>)}
                </ul>
              )}
              <button type="button" className="link" onClick={() => onOpen(c)}>Read the full story</button>
            </article>
          ))}
        </div>
        <div className="work__holder" aria-hidden="true">
          <div className="work__stage">
            {cases.map((c, i) => (
              <div key={c.id} className={`work__figure${i === current ? ' is-current' : i === previous ? ' was-current' : ''}`}>
                <CaseFigure c={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
