import { useEffect, useId, useState, type FormEvent } from 'react';
import { site, type CaseStudy, type Policy, type Service } from '../content';
import { Dialog } from './Dialog';
import { EMAIL_RE, sendEnquiry } from './enquiry';

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/* ------------------------------------------------------------------ Consultation booking */
export function ConsultationDialog({ open, service, onClose }: { open: boolean; service?: string; onClose: () => void }) {
  const services = site.services.map((s) => s.title);
  const slots = site.settings.consultation_slots;
  const id = useId();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [choice, setChoice] = useState({ service: services[0] ?? '', date: todayIso(), time: slots[0] ?? '' });
  const [who, setWho] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setErrors({});
    setChoice((c) => ({ ...c, service: service && services.includes(service) ? service : c.service || services[0] || '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, service]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!who.name.trim()) errs.name = 'Enter your name.';
    if (!EMAIL_RE.test(who.email.trim())) errs.email = 'Enter an email address like name@company.com.';
    if (!who.phone.trim()) errs.phone = 'Enter a phone number so we can confirm the call.';
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { document.getElementById(`${id}-${first}`)?.focus(); return; }
    setSending(true);
    await sendEnquiry({
      kind: 'Consultation Booking',
      subject: `New Consultation Booked: ${who.name} (${choice.service})`,
      fields: {
        'Full Name': who.name, 'Email Address': who.email, 'Phone Number': who.phone, 'Company Name': who.company,
        'Consultation Service': choice.service, 'Scheduled Date': choice.date, 'Preferred Time': choice.time, 'Client Notes': who.notes || 'None',
      },
      sheet: { fullName: who.name, email: who.email, phone: who.phone, company: who.company, service: choice.service,
        details: `Scheduled for ${choice.date} at ${choice.time}. Notes: ${who.notes}`, dateOrTimeSlot: `${choice.date} ${choice.time}` },
    });
    setSending(false);
    setStep(3);
  };

  const input = (k: keyof typeof who, label: string, props: Record<string, unknown> = {}) => (
    <div className={`field${k === 'notes' ? ' field--wide' : ''}`}>
      <label htmlFor={`${id}-${k}`}>{label}</label>
      {k === 'notes'
        ? <textarea id={`${id}-${k}`} value={who[k]} rows={3} onChange={(e) => setWho({ ...who, [k]: e.target.value })} placeholder="What would you like to talk about?" />
        : <input id={`${id}-${k}`} value={who[k]} onChange={(e) => setWho({ ...who, [k]: e.target.value })}
            aria-invalid={errors[k] ? true : undefined} aria-describedby={errors[k] ? `${id}-${k}-err` : undefined} {...props} />}
      {errors[k] && <span id={`${id}-${k}-err`} className="field__error" role="alert">{errors[k]}</span>}
    </div>
  );

  return (
    <Dialog open={open} onClose={onClose} title="Book a free consultation"
      subtitle={step === 3 ? undefined : 'A 30-minute call with an analyst and an engineer about the work you want to automate.'}>
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} style={{ marginTop: '1.75rem' }}>
          <div className="fields">
            <div className="field field--wide">
              <label htmlFor={`${id}-service`}>Topic</label>
              <select id={`${id}-service`} value={choice.service} onChange={(e) => setChoice({ ...choice, service: e.target.value })}>
                {services.map((s) => <option key={s}>{s}</option>)}
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${id}-date`}>Date</label>
              <input id={`${id}-date`} type="date" min={todayIso()} value={choice.date} onChange={(e) => setChoice({ ...choice, date: e.target.value })} required />
            </div>
            <div className="field">
              <label htmlFor={`${id}-time`}>Time</label>
              <select id={`${id}-time`} value={choice.time} onChange={(e) => setChoice({ ...choice, time: e.target.value })}>
                {slots.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="dialog__actions"><button type="submit" className="btn">Next: your details</button></div>
        </form>
      )}
      {step === 2 && (
        <form noValidate onSubmit={submit} style={{ marginTop: '1.75rem' }}>
          <p className="t-small muted">{choice.service}, {choice.date} at {choice.time}</p>
          <div className="fields" style={{ marginTop: '1rem' }}>
            {input('name', 'Full name', { autoComplete: 'name' })}
            {input('company', 'Company', { autoComplete: 'organization' })}
            {input('email', 'Work email', { type: 'email', autoComplete: 'email', inputMode: 'email', spellCheck: false })}
            {input('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
            {input('notes', 'Notes (optional)')}
          </div>
          <div className="dialog__actions">
            <button type="submit" className="btn" disabled={sending}>{sending ? 'Booking…' : 'Book the call'}</button>
            <button type="button" className="link" onClick={() => setStep(1)}>Back</button>
          </div>
        </form>
      )}
      {step === 3 && (
        <div role="status" style={{ marginTop: '1.5rem' }}>
          <p className="t-lead">Thank you. We have your request for {choice.date} at {choice.time} and will confirm the call by email.</p>
          <div className="dialog__actions"><button type="button" className="btn" onClick={onClose}>Done</button></div>
        </div>
      )}
    </Dialog>
  );
}

/* ------------------------------------------------------------------ Service details */
export function ServiceDialog({ service, onClose, onAsk }: { service: Service | null; onClose: () => void; onAsk: (title: string) => void }) {
  const s = service;
  return (
    <Dialog open={Boolean(s)} onClose={onClose} title={s?.title ?? ''} subtitle={s?.summary}>
      {s && (
        <>
          <p className="t-body" style={{ marginTop: '1.5rem' }}>{s.description}</p>
          {s.features.length > 0 && (<><h3>What it covers</h3><ul>{s.features.map((x) => <li key={x}>{x}</li>)}</ul></>)}
          {s.deliverables.length > 0 && (<><h3>What you get</h3><ul>{s.deliverables.map((x) => <li key={x}>{x}</li>)}</ul></>)}
          {s.use_cases.length > 0 && (<><h3>Example uses</h3><ul>{s.use_cases.map((x) => <li key={x}>{x}</li>)}</ul></>)}
          {s.tech.length > 0 && (<><h3>Tools</h3><p className="t-body">{s.tech.join(', ')}</p></>)}
          <div className="dialog__actions">
            <button type="button" className="btn" onClick={() => onAsk(s.title)}>Ask about this service</button>
            <button type="button" className="link" onClick={onClose}>Close</button>
          </div>
        </>
      )}
    </Dialog>
  );
}

/* ------------------------------------------------------------------ Case study */
export function CaseStudyDialog({ study, onClose, onSimilar }: { study: CaseStudy | null; onClose: () => void; onSimilar: (title: string) => void }) {
  const c = study;
  return (
    <Dialog open={Boolean(c)} onClose={onClose} title={c?.title ?? ''} subtitle={c?.tagline}>
      {c && (
        <>
          <p className="t-small muted" style={{ marginTop: '1rem' }}>{c.industry}</p>
          {c.metrics.length > 0 && (
            <div className="metrics">{c.metrics.map((m) => <div key={m.label} className="metric"><b>{m.value}</b><span className="t-small">{m.label}</span></div>)}</div>
          )}
          <h3>The challenge</h3><p className="t-body">{c.challenge}</p>
          <h3>What we built</h3><p className="t-body">{c.solution}</p>
          {c.results.length > 0 && (<><h3>Results</h3><ul>{c.results.map((r) => <li key={r}>{r}</li>)}</ul></>)}
          {c.technologies.length > 0 && (<><h3>Technology</h3><p className="t-body">{c.technologies.join(', ')}</p></>)}
          <div className="dialog__actions">
            <button type="button" className="btn" onClick={() => onSimilar(c.title)}>Start a similar project</button>
            <button type="button" className="link" onClick={onClose}>Close</button>
          </div>
        </>
      )}
    </Dialog>
  );
}

/* ------------------------------------------------------------------ Privacy, terms, security */
export function PolicyDialog({ open, initial, onClose, onContact }: { open: boolean; initial: Policy['id']; onClose: () => void; onContact: () => void }) {
  const [tab, setTab] = useState<Policy['id']>(initial);
  useEffect(() => { if (open) setTab(initial); }, [open, initial]);
  const p = site.policies.find((x) => x.id === tab) ?? site.policies[0];
  const base = useId();
  if (!p) return null;
  return (
    <Dialog open={open} onClose={onClose} title="Privacy, terms and security">
      <div className="dialog__tabs" role="tablist" aria-label="Policies">
        {site.policies.map((x) => (
          <button key={x.id} id={`${base}-${x.id}`} type="button" role="tab" className="dialog__tab"
            aria-selected={x.id === tab} aria-controls={`${base}-panel`} onClick={() => setTab(x.id)}>{x.title}</button>
        ))}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${p.id}`} style={{ marginTop: '1.5rem' }}>
        <p className="t-body">{p.summary}</p>
        {p.blocks.map((b) => (<div key={b.heading}><h3>{b.heading}</h3><p className="t-body">{b.text}</p></div>))}
        {p.updated && <p className="t-small muted" style={{ marginTop: '1.5rem' }}>Last updated: {p.updated}</p>}
      </div>
      <div className="dialog__actions">
        <button type="button" className="link" onClick={() => { onClose(); onContact(); }}>Questions? Talk to us</button>
      </div>
    </Dialog>
  );
}
