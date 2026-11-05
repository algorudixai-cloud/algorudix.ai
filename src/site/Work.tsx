import type { CSSProperties } from 'react';
import { section, site, type CaseStudy } from '../content';
import { CaseFigure } from './figures';
import { Arrow, Icon } from './icons';
import { Window } from './mockups';
import { Rise } from './Rise';

/** Selected work: each project as a card with a screen of what was built and its main results. */
export function Work({ onOpen }: { onOpen: (c: CaseStudy) => void }) {
  const s = section('work');
  const cases = site.case_studies;
  if (!cases.length) return null;
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <div className="head">
          <Rise id="work-title" className="h2" text={s.heading} />
          {s.intro && <p className="lead" data-reveal>{s.intro}</p>}
        </div>
        <div className="cases">
          {cases.map((c, i) => (
            <article key={c.id} className="card case" data-reveal style={{ ['--i' as string]: i % 2 } as CSSProperties} aria-labelledby={`case-${c.id}`}>
              <div className="case__media">
                <Window url={`${c.industry.toLowerCase()} · ${c.disciplines.toLowerCase()}`}>
                  <div className="case__shot"><CaseFigure c={c} /></div>
                </Window>
              </div>
              <div className="case__body">
                <span className="chip" style={{ alignSelf: 'flex-start' }}>{c.industry}</span>
                <h3 id={`case-${c.id}`} className="h3">{c.title}</h3>
                <p>{c.tagline}</p>
                {c.results.length > 0 && (
                  <ul className="ticks small">
                    {c.results.slice(0, 2).map((r) => <li key={r}><Icon name="check" />{r}</li>)}
                  </ul>
                )}
                <button type="button" className="link" onClick={() => onOpen(c)}>Read the full story <Arrow /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
