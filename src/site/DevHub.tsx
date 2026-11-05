import { useState, type CSSProperties } from 'react';
import { section, site, type DevHubItem } from '../content';
import { useReveal } from './hooks';
import { Arrow } from './icons';
import { Dots } from './motion';

const CATEGORIES: ('All' | DevHubItem['category'])[] = ['All', 'Websites', 'Projects', 'Tools', 'Resources'];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** The Development Hub: the team's projects, tools and resources. */
export function DevHub({ onHome }: { onHome: () => void }) {
  const s = section('devhub');
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All');
  const present = new Set(site.dev_hub_items.map((i) => i.category));
  const cats = CATEGORIES.filter((c) => c === 'All' || present.has(c as DevHubItem['category']));
  const items = site.dev_hub_items.filter((i) => cat === 'All' || i.category === cat);
  useReveal([cat]);
  const d = (x: number) => ({ ['--d' as string]: `${x}s` }) as CSSProperties;

  return (
    <>
      <section className="page-hero" aria-labelledby="devhub-title">
        <div className="hero__bg" aria-hidden="true"><span className="blob blob--a" /><span className="blob blob--b" /><span className="blob blob--c" /><Dots /></div>
        <div className="wrap">
          <span className="chip" data-load style={d(0)}>{site.dev_hub_items.length} projects, tools and resources</span>
          <h1 id="devhub-title" data-load style={{ ...d(0.08), marginTop: 20 }}>{s.heading}</h1>
          {s.intro && <p className="lead" data-load style={d(0.18)}>{s.intro}</p>}
          <div data-load style={d(0.28)}>
            <a className="link" href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>
              <span aria-hidden="true" style={{ display: 'inline-block', transform: 'rotate(180deg)' }}><Arrow /></span> Back to the home page
            </a>
          </div>
        </div>
      </section>
      <section className="section" aria-label="Projects, tools and resources" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="hub-filters" role="group" aria-label="Filter by category">
            {cats.map((c) => (
              <button key={c} type="button" className="pill-tab" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <ul className="hub-grid">
            {items.map((i, k) => (
              <li key={i.id} className="card hub-card" data-reveal style={{ ['--i' as string]: k % 3 } as CSSProperties}>
                <div className="hub-card__top">
                  <span className="chip">{i.category}</span>
                  {i.badge && <span className="small muted">{i.badge}</span>}
                </div>
                <h3 className="h3">{i.url ? <a href={i.url} target="_blank" rel="noopener noreferrer">{i.title}</a> : i.title}</h3>
                <p>{i.description}</p>
                {i.updated && <p className="meta">Updated {formatDate(i.updated)}</p>}
                {i.url && <a className="link" href={i.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${i.title}`}>Open <Arrow /></a>}
              </li>
            ))}
          </ul>
          {items.length === 0 && <p className="center lead">Nothing in this category yet.</p>}
        </div>
      </section>
    </>
  );
}
