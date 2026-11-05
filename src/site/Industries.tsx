import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { section, site } from '../content';
import { Rise } from './Rise';

/** "Day tabs, banded agenda": industries as tabs, their example uses as bands. */
export function Industries({ onBook }: { onBook: () => void }) {
  const s = section('industries');
  const list = site.industries;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  if (!list.length) return null;
  const ind = list[Math.min(active, list.length - 1)];

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = list.length - 1;
    const next = ['ArrowDown', 'ArrowRight'].includes(e.key) ? (i === last ? 0 : i + 1)
      : ['ArrowUp', 'ArrowLeft'].includes(e.key) ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="industries" className="section on-rest" aria-labelledby="industries-title">
      <div className="frame">
        <div className="axis-grid">
          <div className="side" />
          <div className="main industries__head">
            <div>
              <Rise id="industries-title" className="t-head" text={s.heading} />
              {s.intro && <p className="t-body measure" style={{ marginTop: '1.25rem' }}>{s.intro}</p>}
            </div>
            {s.cta_label && <button type="button" className="btn" onClick={onBook}>{s.cta_label}</button>}
          </div>
        </div>
        <div className="axis-grid industries__layout">
          <div className="side ind-tabs" role="tablist" aria-label="Industries">
            {list.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => { tabs.current[i] = el; }}
                id={`${base}-tab-${i}`}
                type="button"
                role="tab"
                className="ind-tab"
                aria-selected={i === active}
                aria-controls={`${base}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {x.name}
              </button>
            ))}
          </div>
          <div className="main" id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`}>
            <h3 className="t-lead-head">{ind.name}</h3>
            <p className="t-body measure" style={{ marginTop: '0.75rem' }}>{ind.description}</p>
            <ul className="bands">
              {ind.use_cases.map((u) => (
                <li key={u.label} className="band">
                  <span className="band__name">{u.label}</span>
                  <span className="band__kind">{u.value}</span>
                </li>
              ))}
            </ul>
            {ind.impact && <p className="t-small muted ind__result">Example result: {ind.impact}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
