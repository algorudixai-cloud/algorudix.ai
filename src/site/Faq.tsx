import { useId, useState } from 'react';
import { section, site, telHref } from '../content';
import { Arrow } from './icons';
import { Rise } from './Rise';

/** Questions as an accordion, with a way to ask your own beside it. */
export function Faq({ onBook }: { onBook: () => void }) {
  const s = section('faq');
  const [open, setOpen] = useState(0);
  const base = useId();
  if (!site.faqs.length) return null;
  const phone = site.settings.phones[0];
  return (
    <section id="faq" className="section section--soft" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="faq__aside">
          <Rise id="faq-title" className="h2" text={s.heading} />
          {s.intro && <p className="lead" data-reveal>{s.intro}</p>}
          <div className="card faq__help" data-reveal>
            <b>Your question is not here?</b>
            <a href={`mailto:${site.settings.email}`}>{site.settings.email}</a>
            {phone && <a href={telHref(phone)}>{phone}</a>}
            <div><button type="button" className="btn btn--primary btn--sm" onClick={onBook}>Book a free consultation<Arrow /></button></div>
          </div>
        </div>
        <div>
          {site.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.id} className={`qa${isOpen ? ' is-open' : ''}`}>
                <h3 style={{ margin: 0, fontSize: 'inherit' }}>
                  <button type="button" id={`${base}-q${i}`} className="qa__q" aria-expanded={isOpen} aria-controls={`${base}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.question}<span className="qa__sign" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${base}-a${i}`} className="qa__a" role="region" aria-labelledby={`${base}-q${i}`} inert={!isOpen}>
                  <div><p>{f.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
