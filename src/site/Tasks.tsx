import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { section, site } from '../content';
import { Arrow, Icon, type IconName } from './icons';
import { Window } from './mockups';
import { Rise } from './Rise';

const TASK_ICONS: IconName[] = ['invoice', 'report', 'chat', 'sync', 'boxes', 'bell'];

/** The live explainer: pick a repeated task and see how it runs once automated. */
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
    <section id="tasks" className="section" aria-labelledby="tasks-title">
      <div className="wrap">
        <div className="head">
          <Rise id="tasks-title" className="h2" text={s.heading} />
          {s.intro && <p className="lead" data-reveal>{s.intro}</p>}
        </div>
        <div className="tasks">
          <div className="tasks__tabs" role="tablist" aria-label="Tasks" aria-orientation="vertical" data-reveal>
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
                <span className="task-tab__icon"><Icon name={TASK_ICONS[i % TASK_ICONS.length]} /></span>
                {t.name}
              </button>
            ))}
          </div>
          <div data-reveal style={{ ['--i' as string]: 1 } as CSSProperties}>
            <Window url={`automations / ${task.name.toLowerCase()}`}>
              <div key={task.id} id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="tasks__body">
                <div className="compare">
                  <div className="compare__col">
                    <p className="compare__tag"><Icon name="clock" /> Today</p>
                    <p className="compare__today">{task.today}</p>
                  </div>
                  <div className="compare__col compare__col--after">
                    <p className="compare__tag"><Icon name="sparkles" /> Once automated</p>
                    <ol className="fsteps">
                      {task.steps.map((st, i) => (
                        <li key={i} className={`fstep fstep--${st.who}`} style={{ ['--i' as string]: i } as CSSProperties}>
                          <span className="fstep__who">{st.who === 'ai' ? 'AI' : 'Your team'}</span>
                          <span>{st.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                {task.result && <p className="result"><Icon name="check" />{task.result}</p>}
                <div className="tasks__foot">
                  {task.built_with && <p className="small muted">Built with: {task.built_with}</p>}
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => onAsk(task.name)}>{s.cta_label || 'Ask us about this task'}<Arrow /></button>
                </div>
              </div>
            </Window>
          </div>
        </div>
      </div>
    </section>
  );
}
