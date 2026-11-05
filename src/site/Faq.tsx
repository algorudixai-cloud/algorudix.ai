import { section, site, telHref } from '../content';
import { Rise } from './Rise';

/** "Answers as reading text": every question answered at a glance, no toggles. */
export function Faq() {
  const s = section('faq');
  if (!site.faqs.length) return null;
  return (
    <section id="faq" className="section on-rest" aria-labelledby="faq-title">
      <div className="frame axis-grid">
        <div className="side faq__aside">
          <p className="t-small muted">Your question is not here?</p>
          <a className="link" href={`mailto:${site.settings.email}`}>{site.settings.email}</a>
          {site.settings.phones[0] && <a className="link" href={telHref(site.settings.phones[0])}>{site.settings.phones[0]}</a>}
        </div>
        <div className="main">
          <Rise id="faq-title" className="t-head" text={s.heading} />
          {s.intro && <p className="t-body measure" style={{ marginTop: '1rem' }}>{s.intro}</p>}
          <div className="faq__text">
            {site.faqs.map((f) => (
              <p key={f.id} className="t-body"><strong>{f.question}</strong> {f.answer}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
