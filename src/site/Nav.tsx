import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { section, site, type Section } from '../content';
import { useTheme } from '../context/ThemeContext';

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
    <button id={id} type="button" className="theme-button" aria-pressed={dark} onClick={(e) => toggleTheme(e)}>
      {dark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

export function Nav({ page, onNavigate, onBook }: NavProps) {
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  const links = navSections();
  const action = section('hero').cta_label || 'Book a free consultation';

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

  return (
    <header id="main-navbar" className="nav frame on-page">
      <a id="nav-logo-link" className="nav__mark" href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
        {site.settings.name}
      </a>
      <nav className="nav__links" aria-label="Main">
        {links.map((s) => (
          <a key={s.id} href={href(s)} aria-current={current(s)} onClick={(e) => go(e, s)}>{s.nav_label}</a>
        ))}
      </nav>
      <div className="nav__end">
        <ThemeButton id="theme-toggle-btn" />
        <button type="button" className="btn btn--small" onClick={onBook}>{action}</button>
        <button
          id="nav-mobile-toggle"
          type="button"
          className="nav__menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      <dialog id="mobile-drawer" ref={sheet} className="sheet on-page" aria-label="Menu" onClose={() => setOpen(false)}>
        {open && (
          <>
            <div className="sheet__top">
              <span className="nav__mark">{site.settings.name}</span>
              <button type="button" className="nav__menu" style={{ display: 'inline-flex' }} onClick={() => setOpen(false)}>Close</button>
            </div>
            <nav className="sheet__links" aria-label="Main">
              <a href="#home" onClick={(e) => { e.preventDefault(); setOpen(false); onNavigate('home'); }}>Home</a>
              {links.map((s) => (
                <a key={s.id} href={href(s)} aria-current={current(s)} onClick={(e) => go(e, s)}>{s.nav_label}</a>
              ))}
            </nav>
            <div className="sheet__end">
              <button type="button" className="btn" onClick={() => { setOpen(false); onBook(); }}>{action}</button>
              <a className="link" href={`mailto:${site.settings.email}`}>{site.settings.email}</a>
              <ThemeButton id="mobile-theme-toggle-btn" />
            </div>
          </>
        )}
      </dialog>
    </header>
  );
}
