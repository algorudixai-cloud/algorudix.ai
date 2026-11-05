import { section, site } from '../content';
import { Rise } from './Rise';

/** "Side facts, wide paragraph": facts in the side zone, the paragraph on the axis, then the tools. */
export function About() {
  const s = section('about');
  const { settings } = site;
  const facts = ([
    ['Based in', settings.location],
    ['Hours', settings.hours],
    ['Support', settings.support_note],
    ...site.highlights.map((h): [string, string] => [h.label, h.value]),
  ] as [string, string][]).filter(([, v]) => v);
  const tools = site.technologies;
  const half = Math.ceil(tools.length / 2);

  return (
    <section id="about" className="section on-page" aria-labelledby="about-title">
      <div className="frame axis-grid">
        <div className="side about__facts">
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="main">
          <Rise id="about-title" className="t-head" text={s.heading} />
          <p className="t-lead about__text">{s.intro}</p>
        </div>
      </div>
      {tools.length > 0 && (
        <div className="frame axis-grid about__tools">
          <div className="side"><h3 className="t-lead-head">{s.body || 'Tools we work with'}</h3></div>
          <div className="main">
            <ul className="tool-lists">
              {[tools.slice(0, half), tools.slice(half)].map((col, ci) => (
                <li key={ci} style={{ display: 'block', padding: 0 }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {col.map((t) => (
                      <li key={t.id}><span>{t.name}</span><span>{t.category}</span></li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
