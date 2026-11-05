// Device mockups holding small, working examples of the software Algorudix builds. The data is
// illustrative sample data (it is marked as such for screen readers) and the screens only run while
// they are on screen; under reduced motion they show their finished state.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './icons';
import { useInView, useReducedMotion } from './motion';

const ROWS = [
  ['INV-2041', 'Sharma Traders', '₹48,200'],
  ['INV-2042', 'Kaveri Foods', '₹12,950'],
  ['INV-2043', 'Nandi Logistics', '₹2,31,400'],
  ['INV-2044', 'Lakeview Clinic', '₹9,800'],
  ['INV-2045', 'Brigade Interiors', '₹74,000'],
] as const;

/** A clock that ticks every `ms` while `run` is true. */
function useTick(ms: number, run: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => setTick((n) => n + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, run]);
  return tick;
}

/** The invoice-matching app: rows are matched one by one, then a new batch arrives. */
export function InvoiceApp() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: false, margin: '0px' });
  const reduced = useReducedMotion();
  const tick = useTick(620, visible && !reduced);
  const L = ROWS.length * 2 + 5;
  const cycle = Math.floor(tick / L), k = tick % L;
  const status = (i: number) => (reduced ? 2 : k >= i * 2 + 2 ? 2 : k >= i * 2 + 1 ? 1 : 0);
  const done = ROWS.reduce((n, _, i) => n + (status(i) === 2 ? 1 : 0), 0);
  const label = ['Waiting', 'Matching', 'Matched'];
  return (
    <div className="app" ref={ref}>
      <div className="app__side">
        <span className="app__logo" />
        {['Overview', 'Invoices', 'Payments', 'Reports', 'Settings'].map((n) => (
          <span key={n} className={`app__nav${n === 'Invoices' ? ' is-on' : ''}`}><i />{n}</span>
        ))}
      </div>
      <div className="app__main">
        <div className="app__top">
          <div><h4>Invoice matching</h4><small>Bank feed and accounts, checked every 5 minutes</small></div>
          <span className="live">Running</span>
        </div>
        <div className="app__kpis">
          <div className="app__kpi app__kpi--grad"><span>Matched today</span><b>{133 + cycle * ROWS.length + done}</b></div>
          <div className="app__kpi"><span>For your team</span><b>4</b></div>
          <div className="app__kpi"><span>Hours saved</span><b>6.5 h</b></div>
        </div>
        <table>
          <thead><tr><th>Customer</th><th className="num">Amount</th><th>Status</th></tr></thead>
          <tbody>
            {ROWS.map(([n, c, a], i) => {
              const s = status(i);
              return (
                <tr key={n}>
                  <td>{c}<small className="app__ref">{n}</small></td><td className="num">{a}</td>
                  <td><span className={`st${s === 1 ? ' is-busy' : s === 2 ? ' is-done' : ''}`}>{s === 2 ? '✓ ' : ''}{label[s]}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const QUESTION = 'Hi, my order 48213 hasn’t arrived. It was due yesterday.';
const ANSWER = 'Sorry about that! Order 48213 left our warehouse this morning and arrives tomorrow before 6 pm. I’ve sent you the tracking link.';

/** The support assistant: a question comes in, the assistant types its answer, the case closes. */
export function SupportChat() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: false, margin: '0px' });
  const reduced = useReducedMotion();
  const tick = useTick(60, visible && !reduced);
  // timeline in ticks of 60 ms: question (0), typing dots (12), answer types (30 →), closed, hold, restart
  const typeFrom = 30, typed = Math.ceil(ANSWER.length / 2.2);
  const CYCLE = typeFrom + typed + 70;
  const t = reduced ? CYCLE - 1 : tick % CYCLE;
  const chars = Math.max(0, Math.min(ANSWER.length, Math.round((t - typeFrom) * 2.2)));
  return (
    <div className="chat" ref={ref}>
      <div className="chat__top"><span className="chat__avatar">A</span><span><b>Support assistant</b><small>● online</small></span></div>
      <div className="chat__body">
        <p className="bubble bubble--in">{QUESTION}</p>
        {t >= 12 && (
          <p className="bubble bubble--out">
            {t < typeFrom ? <span className="typing"><i /><i /><i /></span> : ANSWER.slice(0, chars)}
          </p>
        )}
        <span className={`chat__done${chars >= ANSWER.length ? ' is-on' : ''}`}>✓ Resolved in 8 sec</span>
      </div>
      <div className="chat__input">Type a message…</div>
    </div>
  );
}

/** The hero composition: the laptop, the phone in front of it and two result cards. */
export function HeroStage() {
  return (
    <div className="stage" role="img" aria-label="Illustration with sample data: an invoice-matching app on a laptop and a customer-support assistant on a phone, the kind of software Algorudix builds.">
      <div className="laptop">
        <div className="laptop__lid"><div className="screen"><InvoiceApp /></div></div>
        <div className="laptop__base" />
      </div>
      <div className="phone"><div className="screen"><SupportChat /></div></div>
      <div className="float-card float-card--a">
        <span className="float-card__icon"><Icon name="report" /></span>
        <span><b>Weekly report sent</b><small>Monday 08:00 · 6 managers</small></span>
        <span className="mini-bars" aria-hidden="true">{[45, 60, 52, 78, 92].map((h, i) => <i key={i} style={{ ['--h' as string]: `${h}%` }} />)}</span>
      </div>
      <div className="float-card float-card--b">
        <span className="float-card__icon float-card__icon--warm"><Icon name="sync" /></span>
        <span><b>Accounting → CRM</b><small>3 records synced just now</small></span>
      </div>
    </div>
  );
}

/** A browser window frame. */
export function Window({ url, children, className = '' }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`window ${className}`.trim()}>
      <div className="window__bar" aria-hidden="true"><i /><i /><i />{url && <span className="window__url">{url}</span>}</div>
      {children}
    </div>
  );
}
