import { section, site, telHref, type Policy } from '../content';
import { Mark } from './icons';
import type { Page } from './Nav';

interface FooterProps {
  onNavigate: (page: Page, targetId?: string) => void;
  onPolicy: (id: Policy['id']) => void;
  onBook: () => void;
}

const SOCIALS: [keyof typeof site.settings, string][] = [
  ['linkedin', 'LinkedIn'], ['x', 'X'], ['github', 'GitHub'], ['instagram', 'Instagram'], ['facebook', 'Facebook'],
];

export function Footer({ onNavigate, onPolicy, onBook }: FooterProps) {
  const { settings } = site;
  const f = section('footer');
  const links = Object.values(site.sections).filter((s) => s.visible && s.nav_label).sort((a, b) => a.sort - b.sort);
  const socials = SOCIALS.map(([k, label]) => [String(settings[k] || ''), label] as const).filter(([url]) => url);

  return (
    <footer id="main-footer" className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__about">
            <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}><Mark /><span>{settings.name}</span></a>
            <p>{settings.tagline || settings.description}</p>
            {socials.length > 0 && (
              <div className="socials">{socials.map(([url, label]) => <a key={label} href={url} rel="noopener noreferrer" target="_blank">{label}</a>)}</div>
            )}
          </div>
          <nav aria-label="Site">
            <h2>Site</h2>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
              {links.map((s) => (
                <li key={s.id}>
                  <a href={s.id === 'devhub' ? '#development-hub' : `#${s.id}`}
                    onClick={(e) => { e.preventDefault(); if (s.id === 'devhub') onNavigate('devhub'); else onNavigate('home', s.id); }}>
                    {s.nav_label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>Legal</h2>
            <ul>{site.policies.map((p) => <li key={p.id}><button type="button" onClick={() => onPolicy(p.id)}>{p.title}</button></li>)}</ul>
          </div>
          <div>
            <h2>{f.heading || 'Talk to us'}</h2>
            <ul>
              <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
              {settings.phones.map((p) => <li key={p}><a href={telHref(p)}>{p}</a></li>)}
              <li><button type="button" onClick={onBook}>Book a free consultation</button></li>
            </ul>
          </div>
        </div>
        {site.credits.length > 0 && (
          <p className="small muted" style={{ marginTop: 40 }}>
            Pictures:{' '}
            {site.credits.map((c, i) => (
              <span key={c.id}>
                {c.source ? <a href={c.source} rel="noopener noreferrer" target="_blank">{c.title}</a> : c.title}
                {c.creator ? `, ${c.creator}` : ''}{c.licence ? ` (${c.licence})` : ''}{i < site.credits.length - 1 ? '; ' : '.'}
              </span>
            ))}
          </p>
        )}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {settings.name}. {f.body}</p>
          <nav aria-label="Footer">
            <a href="#admin">Site admin</a>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
