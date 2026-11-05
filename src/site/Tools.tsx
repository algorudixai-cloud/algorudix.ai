import type { CSSProperties } from 'react';
import { section, site } from '../content';
import { Arrow } from './icons';
import { Rise } from './Rise';

/** Two letters for a tool's tile: the initials of its first two words, or its first two letters. */
const glyph = (name: string) => {
  const words = name.split(/[\s,/&-]+/).filter((w) => w && w.toLowerCase() !== 'and');
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  const w = words[0] || name;
  return w.length > 1 && w === w.toUpperCase() ? w.slice(0, 2) : w[0].toUpperCase() + (w[1] || '').toLowerCase();
};

/** A gradient band: the tools we build with, as columns of tiles that drift up and down. */
export function Tools({ onBook }: { onBook: () => void }) {
  const s = section('tools');
  const tools = site.technologies;
  if (!tools.length) return null;
  const COLS = 4;
  const columns = Array.from({ length: COLS }, (_, c) => tools.filter((_, i) => i % COLS === c));
  return (
    <section id="tools" className="band" aria-labelledby="tools-title">
      <div className="wrap band__grid">
        <div className="band__copy">
          <Rise id="tools-title" className="h2" text={s.heading} />
          {s.intro && <p data-reveal>{s.intro}</p>}
          {s.cta_label && <button type="button" className="btn btn--white" data-reveal onClick={onBook}>{s.cta_label}<Arrow /></button>}
          <ul className="sr-only">{tools.map((t) => <li key={t.id}>{t.name} ({t.category})</li>)}</ul>
        </div>
        <div className="marquee" aria-hidden="true">
          {columns.map((col, c) => (
            <div key={c} className="marquee__col">
              <div className="marquee__track" style={{ ['--dur' as string]: `${28 + c * 7}s` } as CSSProperties}>
                {[...col, ...col].map((t, k) => (
                  <div key={k} className="tile">
                    <span className="tile__glyph">{glyph(t.name)}</span>
                    <b>{t.name}</b>
                    <span className="tile__cat">{t.category}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
