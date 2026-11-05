import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { section, site } from '../content';
import { Rise } from './Rise';

/** The live thing: pick a repeated task and see how it would run once automated. */
export function Tasks({ onAsk }: { onAsk: (taskName: string) => void }) {
  const s = section('tasks');
  const tasks = site.tasks;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  if (!tasks.length) return null;
  const task = tasks[Math.min(active, tasks.length - 1)];

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = tasks.length - 1;
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="tasks" className="section on-block" aria-labelledby="tasks-title">
      <div className="frame tasks-grid">
        <div className="tasks__head">
          <Rise id="tasks-title" className="t-head" text={s.heading} />
          {s.intro && <p className="t-body measure" style={{ marginTop: '1rem' }}>{s.intro}</p>}
        </div>
        <div className="tasks__side">
          <div className="tasks__picker" role="tablist" aria-label="Tasks" aria-orientation="vertical">
            {tasks.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabs.current[i] = el; }}
                id={`${base}-tab-${i}`}
                type="button"
                role="tab"
                className="task-tab"
                aria-selected={i === active}
                aria-controls={`${base}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="tasks__main">
          <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="tasks__panel" aria-live="polite">
            <p className="t-small" style={{ color: 'var(--accent-fg)' }}>Today</p>
            <p className="t-lead tasks__today measure">{task.today}</p>
            <ol className="steps" aria-label="Once automated">
              {task.steps.map((st, i) => (
                <li key={i} className={`step step--${st.who}`}>
                  <span className="step__who">{st.who === 'ai' ? 'AI' : 'Your team'}</span>
                  <span>{st.text}</span>
                </li>
              ))}
            </ol>
            {task.result && <p className="t-lead tasks__result" style={{ fontWeight: 500 }}>{task.result}</p>}
            <div className="tasks__foot">
              {task.built_with && <p className="t-small muted">Built with: {task.built_with}</p>}
              <button type="button" className="btn" onClick={() => onAsk(task.name)}>{s.cta_label || 'Ask us about this task'}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
