// Interface figures for the case studies: small, realistic pieces of the kind of software each
// project delivered, built in HTML. Marked data-ui so interface conventions (borders, small
// labels, a soft shadow) are allowed inside. The numbers come from each case study.
import { mediaSrc, type CaseStudy } from '../content';

const metric = (c: CaseStudy, i: number) => c.metrics[i] ?? { label: '', value: '' };

function Assistant({ c }: { c: CaseStudy }) {
  return (
    <div className="ui" data-ui role="img" aria-label={`Illustration: a support assistant answering a customer. ${c.results[0] ?? ''}`}>
      <div className="ui__bar"><span>Support assistant</span><span className="ui__pill">Live</span></div>
      <div className="ui__body">
        <p className="ui__msg">Hi, my order 48213 hasn't arrived. It was due yesterday.</p>
        <p className="ui__msg ui__msg--ai">Sorry about that. Order 48213 left the warehouse this morning and arrives tomorrow before 6 pm. I've emailed you the tracking link.</p>
        <p className="ui__muted" style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}>Answered in {metric(c, 1).value || '8 sec'} · resolved without a person</p>
        <div className="ui__kpis" style={{ marginTop: '1.1rem' }}>
          {c.metrics.slice(0, 3).map((m) => <div key={m.label} className="ui__kpi"><span className="ui__muted">{m.label}</span><b>{m.value}</b></div>)}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ c }: { c: CaseStudy }) {
  // Weekly stock-outs: four weeks before go-live, eight after (a 41% drop, as in the results).
  const weeks = [42, 40, 44, 41, 34, 31, 29, 27, 26, 25, 24, 24];
  const max = Math.max(...weeks);
  return (
    <div className="ui" data-ui role="img" aria-label={`Illustration: a retail dashboard. ${c.results[1] ?? ''}`}>
      <div className="ui__bar"><span>Store performance</span><span className="ui__muted">120 stores · this quarter</span></div>
      <div className="ui__body">
        <div className="ui__kpis">
          {c.metrics.slice(0, 3).map((m) => <div key={m.label} className="ui__kpi"><span className="ui__muted">{m.label}</span><b>{m.value}</b></div>)}
        </div>
        <p style={{ marginTop: '1.1rem', fontWeight: 600 }}>Weekly stock-outs fell 41% after go-live</p>
        <div className="ui__bars" aria-hidden="true">
          {weeks.map((v, i) => <span key={i} className={i < 4 ? 'is-old' : ''} style={{ height: `${(v / max) * 100}%` }} />)}
        </div>
        <p className="ui__muted" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginTop: '0.4rem' }}><span>Before</span><span>After go-live</span></p>
      </div>
    </div>
  );
}

function Pipeline({ c }: { c: CaseStudy }) {
  const runs = [['06:00', '2.61M', '4 min 02 s'], ['05:00', '2.48M', '3 min 51 s'], ['04:00', '2.37M', '3 min 47 s'], ['03:00', '2.52M', '4 min 05 s']];
  return (
    <div className="ui" data-ui role="img" aria-label={`Illustration: a data pipeline's run log. ${c.results[0] ?? ''}`}>
      <div className="ui__bar"><span>Pipeline runs</span><span className="ui__pill">All checks passed</span></div>
      <div className="ui__body">
        <table className="ui__table">
          <thead><tr><th>Run</th><th>Events</th><th>Duration</th><th>Status</th></tr></thead>
          <tbody>{runs.map(([t, e, d]) => <tr key={t}><td>{t}</td><td>{e}</td><td>{d}</td><td><span className="ui__pill">Loaded</span></td></tr>)}</tbody>
        </table>
        <div className="ui__kpis" style={{ marginTop: '1.1rem' }}>
          {c.metrics.slice(0, 3).map((m) => <div key={m.label} className="ui__kpi"><span className="ui__muted">{m.label}</span><b>{m.value}</b></div>)}
        </div>
      </div>
    </div>
  );
}

function App({ c }: { c: CaseStudy }) {
  const jobs = [['J-2041', 'Ravi', 'Delivered', true], ['J-2042', 'Asha', 'On the way', false], ['J-2043', 'Imran', 'Delivered', true], ['J-2044', 'Meena', 'Loading', false]] as const;
  return (
    <div className="ui" data-ui role="img" aria-label={`Illustration: a dispatch and invoicing screen. ${c.results[1] ?? ''}`}>
      <div className="ui__bar"><span>Dispatch · today</span><span className="ui__muted">4 of 18 jobs</span></div>
      <div className="ui__body">
        <table className="ui__table">
          <thead><tr><th>Job</th><th>Driver</th><th>Status</th><th>Invoice</th></tr></thead>
          <tbody>{jobs.map(([j, d, s, sent]) => (
            <tr key={j}><td>{j}</td><td>{d}</td><td>{s}</td><td>{sent ? <span className="ui__pill">Sent</span> : <span className="ui__pill ui__pill--warn">On delivery</span>}</td></tr>
          ))}</tbody>
        </table>
        <p className="ui__muted" style={{ marginTop: '0.9rem', fontSize: '0.875rem' }}>Invoices go out the moment a delivery is signed for.</p>
        <div className="ui__kpis" style={{ marginTop: '1rem' }}>
          {c.metrics.slice(0, 3).map((m) => <div key={m.label} className="ui__kpi"><span className="ui__muted">{m.label}</span><b>{m.value}</b></div>)}
        </div>
      </div>
    </div>
  );
}

export function CaseFigure({ c }: { c: CaseStudy }) {
  if (c.figure === 'image' && c.image) {
    return <img className="photo" src={mediaSrc(c.image)} alt={c.image_alt} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }
  if (c.figure === 'dashboard') return <Dashboard c={c} />;
  if (c.figure === 'pipeline') return <Pipeline c={c} />;
  if (c.figure === 'app') return <App c={c} />;
  return <Assistant c={c} />;
}
