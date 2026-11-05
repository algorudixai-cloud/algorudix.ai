import { useRef, type CSSProperties } from 'react';
import { section, site } from '../content';
import { Icon } from './icons';
import { useInView } from './motion';
import { Rise } from './Rise';

/** How a project runs: five stages on a line that fills, stage by stage, as it comes into view. */
export function Process() {
  const s = section('process');
  const stages = site.process_steps;
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: '0px 0px -30% 0px' });
  if (!stages.length) return null;
  return (
    <section id="process" className="section section--soft" aria-labelledby="process-title">
      <div className="wrap">
        <div className="head">
          <Rise id="process-title" className="h2" text={s.heading} />
          {s.intro && <p className="lead" data-reveal>{s.intro}</p>}
        </div>
        <div ref={ref} className={`timeline${on ? ' is-on' : ''}`} style={{ ['--p' as string]: on ? 1 : 0 } as CSSProperties}>
          <span className="timeline__line" aria-hidden="true"><span /></span>
          <ol className="timeline__list">
            {stages.map((st, i) => (
              <li key={st.id} className="tstage" data-reveal style={{ ['--i' as string]: i } as CSSProperties}>
                <span className="tstage__dot" aria-hidden="true">{i + 1}</span>
                <div className="card tstage__card">
                  {st.duration && <span className="chip" style={{ justifySelf: 'start' }}>{st.duration}</span>}
                  <h3 className="h3">{st.title}</h3>
                  <p>{st.summary}</p>
                  {st.deliverables.length > 0 && (
                    <ul className="ticks" aria-label="You get">
                      {st.deliverables.map((d) => <li key={d}><Icon name="check" />{d}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
