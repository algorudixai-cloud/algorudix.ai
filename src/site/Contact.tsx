import { useEffect, useId, useState, type FormEvent } from 'react';
import { section, site, telHref } from '../content';
import { EMAIL_RE, sendEnquiry } from './enquiry';
import { Arrow, Icon } from './icons';
import { Rise } from './Rise';

interface ContactProps {
  prefillService?: string;
  prefillMessage?: string;
}

type Field = 'name' | 'company' | 'email' | 'phone' | 'service' | 'message';
const EMPTY: Record<Field, string> = { name: '', company: '', email: '', phone: '', service: '', message: '' };

/** The enquiry form on a gradient field, with every other way to reach us beside it. */
export function Contact({ prefillService, prefillMessage }: ContactProps) {
  const s = section('contact');
  const { settings } = site;
  const services = site.services.map((x) => x.title);
  const id = useId();
  const [form, setForm] = useState<Record<Field, string>>({ ...EMPTY, service: services[0] ?? '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');

  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: prefillService && services.includes(prefillService) ? prefillService : f.service,
      message: prefillMessage || f.message,
    }));
    if (prefillService || prefillMessage) setState('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillService, prefillMessage]);

  const set = (k: Field) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) e.name = 'Enter your name.';
    if (!form.company.trim()) e.company = 'Enter your company or organisation.';
    if (!form.email.trim()) e.email = 'Enter your email address.';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Enter an email address like name@company.com.';
    if (!form.phone.trim()) e.phone = 'Enter a phone number so we can confirm a call.';
    if (form.message.trim().length < 10) e.message = 'Describe the work in a sentence or two (at least 10 characters).';
    setErrors(e);
    return e;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    const first = (Object.keys(e) as Field[])[0];
    if (first) { document.getElementById(`${id}-${first}`)?.focus(); return; }
    setState('sending');
    await sendEnquiry({
      kind: 'Project Inquiry',
      subject: `New Project Inquiry: ${form.service} - ${form.name}`,
      fields: {
        'Full Name': form.name, 'Email Address': form.email, 'Phone Number': form.phone,
        'Company Name': form.company || 'N/A', 'Service Required': form.service, 'Project Description': form.message,
      },
      sheet: { fullName: form.name, email: form.email, phone: form.phone, company: form.company, service: form.service, details: form.message },
    });
    setState('done');
  };

  const fieldProps = (k: Field) => ({
    id: `${id}-${k}`,
    name: k,
    value: form[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined,
  });
  const err = (k: Field) => errors[k] && <span id={`${id}-${k}-err`} className="field__error" role="alert">{errors[k]}</span>;

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div>
          <Rise id="contact-title" className="h2" text={s.heading} />
          {s.intro && <p className="contact__intro" data-reveal>{s.intro}</p>}
          <ul className="contact__list" data-reveal>
            <li><i><Icon name="mail" /></i><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
            {settings.phones.map((p) => <li key={p}><i><Icon name="phone" /></i><a href={telHref(p)}>{p}</a></li>)}
            {settings.location && <li><i><Icon name="pin" /></i><span>{settings.location}</span></li>}
            {settings.hours && <li><i><Icon name="clock" /></i><span>{settings.hours}</span></li>}
          </ul>
        </div>
        <div className="form-card" data-reveal="zoom">
          {state === 'done' ? (
            <div className="done" role="status">
              <span className="done__icon"><Icon name="check" /></span>
              <h3 className="h3">{s.body || 'Thank you. We have your enquiry.'}</h3>
              <button type="button" className="link" onClick={() => { setForm({ ...EMPTY, service: services[0] ?? '' }); setErrors({}); setState('idle'); }}>Send another enquiry <Arrow /></button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <h3 className="h3">Tell us about the work</h3>
              <div className="fields">
                <div className="field">
                  <label htmlFor={`${id}-name`}>Full name</label>
                  <input {...fieldProps('name')} autoComplete="name" placeholder="e.g. Priya Sharma" />
                  {err('name')}
                </div>
                <div className="field">
                  <label htmlFor={`${id}-company`}>Company</label>
                  <input {...fieldProps('company')} autoComplete="organization" placeholder="e.g. Acme Retail" />
                  {err('company')}
                </div>
                <div className="field">
                  <label htmlFor={`${id}-email`}>Work email</label>
                  <input {...fieldProps('email')} type="email" inputMode="email" autoComplete="email" spellCheck={false} placeholder="name@company.com" />
                  {err('email')}
                </div>
                <div className="field">
                  <label htmlFor={`${id}-phone`}>Phone</label>
                  <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
                  {err('phone')}
                </div>
                <div className="field field--wide">
                  <label htmlFor={`${id}-service`}>What do you need?</label>
                  <select {...fieldProps('service')}>
                    {services.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
                <div className="field field--wide">
                  <label htmlFor={`${id}-message`}>The work you want to automate or build</label>
                  <textarea {...fieldProps('message')} rows={4} placeholder="e.g. We match 600 invoices a month by hand against our bank statements…" />
                  {err('message')}
                </div>
              </div>
              <button type="submit" className="btn btn--primary btn--block" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : s.cta_label || 'Send enquiry'}{state !== 'sending' && <Arrow />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
