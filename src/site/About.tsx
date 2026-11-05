import type { CSSProperties } from 'react';
import { section, site } from '../content';
import { Arrow, Icon, type IconName } from './icons';
import { Rise } from './Rise';

/** Who we are: the team in a paragraph, and the facts a client asks first. */
export function About({ onBook }: { onBook: () => void }) {
  const s = section('about');
  const { settings } = site;
  const facts = ([
    ['pin', 'Based in', settings.location],
    ['clock', 'Working hours', settings.hours],
    ['shield', 'Support', settings.support_note],
  ] as [IconName, string, string][]).filter(([, , v]) => v);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about">
        <div>
          <Rise id="about-title" className="h2" text={s.heading} />
          <p className="lead" data-reveal>{s.intro}</p>
          {s.cta_label && <div className="about__actions" data-reveal><button type="button" className="btn btn--ghost" onClick={onBook}>{s.cta_label}<Arrow /></button></div>}
        </div>
        {facts.length > 0 && (
          <ul className="facts">
            {facts.map(([icon, k, v], i) => (
              <li key={k} className="card fact" data-reveal style={{ ['--i' as string]: i } as CSSProperties}>
                <i><Icon name={icon} /></i>
                <div><span>{k}</span><b>{v}</b></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
