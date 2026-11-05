import { useMemo } from 'react';
import { section, site } from '../content';
import { Rise } from './Rise';

type Sq = { x: number; y: number; k: 'p1' | 'p2' | 'mid' | 'acc' };

/** Small deterministic random numbers, so the diagram is the same on every visit. */
function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/**
 * "Many into one": loose squares (work as it is) pulled into a tight ribbon, then released as
 * ordered rows (the automated result). `vertical` lays the same story out top to bottom.
 */
function squares(vertical: boolean): { w: number; h: number; s: number; list: Sq[] } {
  const r = rng(20261104);
  const L = vertical ? 400 : 900, T = vertical ? 300 : 200; // length along the flow, thickness across it
  const s = 9, list: Sq[] = [];
  const third = L / 3, mid = T / 2;
  // 1. scatter, narrowing as it nears the ribbon
  for (let i = 0; i < 52; i++) {
    const u = Math.pow(r(), 0.85);
    const along = 6 + u * (third - 20);
    const spread = (T / 2 - 10) * (1 - u * 0.55);
    const across = mid + (r() * 2 - 1) * spread;
    list.push({ x: along, y: across - s / 2, k: r() < 0.5 ? 'p1' : 'p2' });
  }
  // 2. the ribbon: three squares deep
  const gap = 11;
  for (let c = 0; third + c * gap < 2 * third - 6; c++) for (let row = -1; row <= 1; row++) list.push({ x: third + c * gap, y: mid + row * gap - s / 2, k: 'mid' });
  // 3. ordered rows in the accent colour
  const rows = 5, cols = vertical ? 7 : 8;
  for (let row = 0; row < rows; row++) for (let c = 0; c < cols; c++) {
    list.push({ x: 2 * third + 18 + c * ((third - 30) / (cols - 1)), y: 14 + row * ((T - 28 - s) / (rows - 1)), k: 'acc' });
  }
  // squares are laid out along the x axis; for the vertical diagram swap the axes
  const out = vertical ? list.map((q) => ({ ...q, x: q.y, y: q.x })) : list;
  return { w: vertical ? T : L, h: vertical ? L : T, s, list: out };
}

function Diagram({ vertical, label }: { vertical: boolean; label: string }) {
  const d = useMemo(() => squares(vertical), [vertical]);
  return (
    <svg viewBox={`0 0 ${d.w} ${d.h}`} role="img" aria-label={label} className="flow">
      {d.list.map((q, i) => <rect key={i} x={q.x.toFixed(1)} y={q.y.toFixed(1)} width={d.s} height={d.s} className={`sq sq--${q.k}`} />)}
    </svg>
  );
}

export function Process() {
  const s = section('process');
  const stages = site.process_steps;
  const label = 'Scattered squares, standing for work as it is done today, are pulled into a tight band and come out as neat rows: the automated result.';
  return (
    <section id="process" className="section on-page" aria-labelledby="process-title">
      <div className="frame">
        <div className="axis-grid">
          <div className="side" />
          <div className="main">
            <Rise id="process-title" className="t-head" text={s.heading} />
            {s.intro && <p className="t-body measure" style={{ marginTop: '1.25rem' }} data-reveal>{s.intro}</p>}
          </div>
        </div>
        <div className="diagram" data-reveal>
          <div className="diagram__wide"><Diagram vertical={false} label={label} /></div>
          <div className="diagram__tall">
            <Diagram vertical label={label} />
            <ol className="stages stages--tall" aria-label="Stages">
              {stages.map((st) => (
                <li key={st.id} className="stage">
                  <h3 className="t-lead-head">{st.title}</h3>
                  <p className="t-small when muted">{st.duration}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <ol className="stages stages--wide" aria-label="Stages">
          {stages.map((st, i) => (
            <li key={st.id} className="stage" data-reveal style={{ ['--i' as string]: i }}>
              <h3 className="t-lead-head">{st.title}</h3>
              <p className="t-small when muted">{st.duration}</p>
              <p className="t-body">{st.summary}</p>
              {st.deliverables.length > 0 && <p className="t-small muted">You get: {st.deliverables.join(', ')}.</p>}
            </li>
          ))}
        </ol>
        <ol className="stages stages--phone" aria-label="What happens in each stage">
          {stages.map((st) => (
            <li key={st.id} className="stage">
              <h3 className="t-lead-head">{st.title}</h3>
              <p className="t-body">{st.summary}</p>
              {st.deliverables.length > 0 && <p className="t-small muted">You get: {st.deliverables.join(', ')}.</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
