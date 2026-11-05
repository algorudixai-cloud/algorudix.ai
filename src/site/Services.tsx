import { section, site, type Service } from '../content';
import { Arrow, Icon, iconFor } from './icons';
import { Rise } from './Rise';

export function Services({ onOpen, onBook }: { onOpen: (s: Service) => void; onBook: () => void }) {
  const s = section('services');
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="head">
          <Rise id="services-title" className="h2" text={s.heading} />
          {s.intro && <p className="lead" data-reveal>{s.intro}</p>}
        </div>
        <ul className="cards">
          {site.services.map((svc, i) => (
            <li key={svc.id} className="card svc" data-reveal style={{ ['--i' as string]: i % 3 }}>
              <span className="svc__icon"><Icon name={iconFor(`${svc.title} ${svc.category}`)} /></span>
              <span className="cat">{svc.category}</span>
              <h3 className="h3">{svc.title}</h3>
              <p>{svc.summary}</p>
              <button type="button" className="link" onClick={() => onOpen(svc)} aria-label={`Explore: ${svc.title}`}>Explore <Arrow /></button>
            </li>
          ))}
        </ul>
        <div className="services__more" data-reveal>
          {s.body && <p className="muted">{s.body}</p>}
          {s.cta_label && <button type="button" className="btn btn--primary" onClick={onBook}>{s.cta_label}<Arrow /></button>}
        </div>
      </div>
    </section>
  );
}
