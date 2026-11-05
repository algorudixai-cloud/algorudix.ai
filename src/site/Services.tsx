import { Fragment } from 'react';
import { mediaSrc, section, site, type Service } from '../content';
import { Rise } from './Rise';

/** Text with [img] markers, each replaced in order by an inline picture slot. */
function PictureWords({ text, images }: { text: string; images: { src: string; alt: string }[] }) {
  const parts = text.split('[img]');
  return (
    <>
      {parts.map((part, i) => {
        const img = i < parts.length - 1 ? images[i] : undefined;
        return (
          <Fragment key={i}>
            {part}
            {img && (
              <span className="slot">
                <img className="photo" src={mediaSrc(img.src)} alt={img.alt} width={228} height={120} loading="lazy" decoding="async" />
              </span>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export function Services({ onOpen, onBook }: { onOpen: (s: Service) => void; onBook: () => void }) {
  const s = section('services');
  return (
    <section id="services" className="section on-rest" aria-labelledby="services-title">
      <div className="frame">
        <div className="axis-grid">
          <div className="side" />
          <Rise id="services-title" className="main t-head" text={s.heading} />
        </div>
        <p className="words" data-reveal style={{ ['--i' as string]: 1 }}>
          <PictureWords text={s.intro} images={s.images} />
        </p>
        <div className="axis-grid services__more">
          <div className="side" />
          <div className="main">
            {s.body && <p className="t-body measure" data-reveal>{s.body}</p>}
            <ul className="service-list">
              {site.services.map((svc, i) => (
                <li key={svc.id} className="service" data-reveal style={{ ['--i' as string]: i % 2 }}>
                  <h3 className="t-lead-head">{svc.title}</h3>
                  <p className="t-body">{svc.summary}</p>
                  <button type="button" className="link" onClick={() => onOpen(svc)} aria-label={`Details: ${svc.title}`}>Details</button>
                </li>
              ))}
            </ul>
            {s.cta_label && (
              <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                <button type="button" className="btn" onClick={onBook}>{s.cta_label}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
