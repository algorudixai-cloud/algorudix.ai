import { section, site, telHref, type Policy } from '../content';
import { useFitText } from './hooks';
import type { Page } from './Nav';

interface FooterProps {
  onNavigate: (page: Page, targetId?: string) => void;
  onPolicy: (id: Policy['id']) => void;
  onBook: () => void;
}

const SOCIALS: [keyof typeof site.settings, string][] = [
  ['linkedin', 'LinkedIn'], ['x', 'X'], ['github', 'GitHub'], ['instagram', 'Instagram'], ['facebook', 'Facebook'],
];

/** "Name first, places under it": the wordmark opens the footer at full width. */
export function Footer({ onNavigate, onPolicy, onBook }: FooterProps) {
  const { settings } = site;
  const f = section('footer');
  const mark = useFitText<HTMLParagraphElement>(settings.name);
  const links = Object.values(site.sections).filter((s) => s.visible && s.nav_label).sort((a, b) => a.sort - b.sort);
  const socials = SOCIALS.map(([k, label]) => [String(settings[k] || ''), label] as const).filter(([url]) => url);

  return (
    <footer id="main-footer" className="footer frame on-block">
      <div><p ref={mark} className="footer__mark" aria-hidden="true">{settings.name}</p></div>
      <div className="footer__row">
        <div className="footer__places">
          <h2 className="sr-only">{f.heading || 'Contact'}</h2>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          {settings.phones.map((p) => <a key={p} href={telHref(p)}>{p}</a>)}
          <p>{settings.location}</p>
        </div>
        <div className="footer__cols">
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
            <ul>
              {site.policies.map((p) => <li key={p.id}><button type="button" onClick={() => onPolicy(p.id)}>{p.title}</button></li>)}
            </ul>
          </div>
          <div>
            <h2>{socials.length ? 'Follow' : 'Talk to us'}</h2>
            <ul>
              {socials.length
                ? socials.map(([url, label]) => <li key={label}><a href={url} rel="noopener noreferrer" target="_blank">{label}</a></li>)
                : (
                  <>
                    <li><button type="button" onClick={onBook}>Book a free consultation</button></li>
                    <li><a href={`mailto:${settings.email}`}>Email us</a></li>
                  </>
                )}
            </ul>
          </div>
        </div>
      </div>
      {site.credits.length > 0 && (
        <p className="t-small muted footer__credits">
          Pictures:{' '}
          {site.credits.map((c, i) => (
            <span key={c.id}>
              {c.source ? <a href={c.source} rel="noopener noreferrer" target="_blank">{c.title}</a> : c.title}
              {c.creator ? `, ${c.creator}` : ''}{c.licence ? ` (${c.licence})` : ''}{i < site.credits.length - 1 ? '; ' : '.'}
            </span>
          ))}
        </p>
      )}
      <div className="footer__legal t-small">
        <p>© {new Date().getFullYear()} {settings.name}. {f.body}</p>
        <div className="footer__legal-links">
          <a href="#admin">Site admin</a>
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Back to top</a>
        </div>
      </div>
    </footer>
  );
}
