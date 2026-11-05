import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { section, site, type Section } from '../content';
import { useTheme } from '../context/ThemeContext';
import { Arrow, Icon, Mark } from './icons';

export type Page = 'home' | 'devhub';

interface NavProps {
  page: Page;
  onNavigate: (page: Page, targetId?: string) => void;
  onBook: () => void;
}

const navSections = (): Section[] =>
  Object.values(site.sections).filter((s) => s.visible && s.nav_label).sort((a, b) => a.sort - b.sort);

function ThemeButton({ id }: { id: string }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button id={id} type="button" className="icon-btn" aria-pressed={dark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'} onClick={(e) => toggleTheme(e)}>
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  );
}

export function Nav({ page, onNavigate, onBook }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  const links = navSections();
  const action = section('hero').cta_label || 'Book a free consultation';

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const d = sheet.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const go = (e: MouseEvent, s: Section) => {
    e.preventDefault();
    setOpen(false);
    if (s.id === 'devhub') onNavigate('devhub');
    else onNavigate('home', s.id);
  };
  const href = (s: Section) => (s.id === 'devhub' ? '#development-hub' : `#${s.id}`);
  const current = (s: Section): 'page' | undefined => (page === 'devhub' && s.id === 'devhub' ? 'page' : undefined);
  const home = (e: MouseEvent) => { e.preventDefault(); setOpen(false); onNavigate('home'); };

  return (
    <header id="main-navbar" className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap nav__in">
        <a id="nav-logo-link" className="brand" href="#home" onClick={home}>
          <Mark /><span>{site.settings.name}</span>
        </a>
        <nav className="nav__links" aria-label="Main">
          {links.map((s) => (
            <a key={s.id} href={href(s)} aria-current={current(s)} onClick={(e) => go(e, s)}>{s.nav_label}</a>
          ))}
        </nav>
        <div className="nav__end">
          <ThemeButton id="theme-toggle-btn" />
          <button type="button" className="btn btn--primary btn--sm nav__cta" onClick={onBook}>{action}</button>
          <button id="nav-mobile-toggle" type="button" className="icon-btn nav__menu" aria-label="Open the menu"
            aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-drawer" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <dialog id="mobile-drawer" ref={sheet} className="sheet" aria-label="Menu" onClose={() => setOpen(false)}>
        {open && (
          <div className="sheet__in">
            <div className="sheet__top">
              <a className="brand" href="#home" onClick={home}><Mark /><span>{site.settings.name}</span></a>
              <button type="button" className="icon-btn" aria-label="Close the menu" onClick={() => setOpen(false)}>
                <span aria-hidden="true" style={{ fontSize: 28, lineHeight: 1 }}>×</span>
              </button>
            </div>
            <nav className="sheet__links" aria-label="Main">
              <a href="#home" style={{ ['--i' as string]: 0 } as CSSProperties} onClick={home}>Home</a>
              {links.map((s, i) => (
                <a key={s.id} href={href(s)} aria-current={current(s)} style={{ ['--i' as string]: i + 1 } as CSSProperties} onClick={(e) => go(e, s)}>{s.nav_label}</a>
              ))}
            </nav>
            <div className="sheet__end">
              <button type="button" className="btn btn--primary btn--block" onClick={() => { setOpen(false); onBook(); }}>{action}<Arrow /></button>
              <a className="link" href={`mailto:${site.settings.email}`}>{site.settings.email}</a>
              <ThemeButton id="mobile-theme-toggle-btn" />
            </div>
          </div>
        )}
      </dialog>
    </header>
  );
}
