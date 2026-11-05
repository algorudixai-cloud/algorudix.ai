import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { section, site } from '../content';
import { Arrow, Icon, iconFor } from './icons';
import { Rise } from './Rise';

/** Industries as pill tabs; the chosen one shows where automation helps there. */
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
    <section id="industries" className="section section--soft" aria-labelledby="industries-title">
      <div className="wrap">
        <div className="head">
          <Rise id="industries-title" className="h2" text={s.heading} />
          {s.intro && <p className="lead" data-reveal>{s.intro}</p>}
        </div>
        <div className="pills" role="tablist" aria-label="Industries" data-reveal>
          {list.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => { tabs.current[i] = el; }}
              id={`${base}-tab-${i}`}
              type="button"
              role="tab"
              className="pill-tab"
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
        <div key={ind.id} className="card ind" id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`}>
          <div>
            <h3 className="h3" style={{ fontSize: 'clamp(24px, 2.4vw, 32px)' }}>{ind.name}</h3>
            <p className="lead">{ind.description}</p>
            {ind.impact && <span className="chip ind__impact"><Icon name="bolt" className="icon" />Example result: {ind.impact}</span>}
            {s.cta_label && (
              <div className="ind__cta"><button type="button" className="btn btn--primary" onClick={onBook}>{s.cta_label}<Arrow /></button></div>
            )}
          </div>
          <ul className="ind__uses" aria-label={`Where we help in ${ind.name.toLowerCase()}`}>
            {ind.use_cases.map((u, i) => (
              <li key={u.label} className="ind__use" style={{ ['--i' as string]: i } as CSSProperties}>
                <i><Icon name={iconFor(`${u.value} ${u.label}`)} /></i>
                <div><b>{u.label}</b><span>{u.value}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
