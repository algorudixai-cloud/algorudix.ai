import { useState } from 'react';
import { section, site, type DevHubItem } from '../content';

const CATEGORIES: ('All' | DevHubItem['category'])[] = ['All', 'Websites', 'Projects', 'Tools', 'Resources'];

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** The Development Hub: an index of the team's projects, tools and resources. */
export function DevHub({ onHome }: { onHome: () => void }) {
  const s = section('devhub');
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All');
  const present = new Set(site.dev_hub_items.map((i) => i.category));
  const cats = CATEGORIES.filter((c) => c === 'All' || present.has(c as DevHubItem['category']));
  const items = site.dev_hub_items.filter((i) => cat === 'All' || i.category === cat);

  return (
    <>
      <section className="on-page" aria-labelledby="devhub-title">
        <div className="frame axis-grid" style={{ paddingTop: 'clamp(3rem, 8vw, 7rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div className="side hero__side">
            <a className="link" href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>Back to the home page</a>
          </div>
          <div className="main">
            <h1 id="devhub-title" className="t-display lines">
              <span className="line"><span data-line>{s.heading}</span></span>
            </h1>
            {s.intro && <p className="t-lead hero__standfirst" data-load>{s.intro}</p>}
          </div>
        </div>
      </section>
      <section className="section on-rest" aria-label="Projects, tools and resources" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="frame axis-grid">
          <div className="side"><h2 className="t-lead-head">Everything we share</h2></div>
          <div className="main">
            <div className="hub-filters" role="group" aria-label="Filter by category" style={{ marginTop: 0 }}>
              {cats.map((c) => (
                <button key={c} type="button" className="hub-filter" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <ul className="hub-list">
              {items.map((i) => (
                <li key={i.id} className="hub-item">
                  <div>
                    <h3 className="t-lead-head">{i.url ? <a href={i.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{i.title}</a> : i.title}</h3>
                    <p className="t-body">{i.description}</p>
                    {i.url && <a className="link" href={i.url} target="_blank" rel="noopener noreferrer">Open {i.title}</a>}
                  </div>
                  <div className="hub-item__meta t-small muted">
                    <p className="t-small">{i.category}{i.badge ? `, ${i.badge}` : ''}</p>
                    {i.updated && <p className="t-small">Updated {formatDate(i.updated)}</p>}
                  </div>
                </li>
              ))}
            </ul>
            {items.length === 0 && <p className="t-body" style={{ marginTop: '2rem' }}>Nothing in this category yet.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
