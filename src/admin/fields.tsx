// Form controls for every field type in the content schema (src/content/schema.ts).
import { useEffect, useId, useRef, useState, type ReactNode, type TextareaHTMLAttributes } from 'react';
import type { FieldDef } from '../content/schema';

export interface Uploads {
  /** Uploads a picture and returns its path on the site (e.g. "uploads/20261105-team.jpg"). */
  upload: (file: File) => Promise<string>;
  /** A src for showing a stored path in the admin (new uploads are not on the live site yet). */
  preview: (path: string) => string;
}

interface Props<T> {
  field: FieldDef;
  value: T;
  onChange: (v: T) => void;
  help?: string;
  uploads: Uploads;
}

type Pair = { label: string; value: string };
type Step = { who: 'ai' | 'person'; text: string };
type Block = { heading: string; text: string };
type Pic = { src: string; alt: string; poster?: string };

function Frame({ id, label, help, children, required }: { id: string; label: string; help?: string; children: ReactNode; required?: boolean }) {
  return (
    <div className="afield">
      <label htmlFor={id}>{label}{required && <span className="afield__req" aria-hidden="true"> *</span>}</label>
      {help && <p className="afield__help" id={`${id}-help`}>{help}</p>}
      {children}
    </div>
  );
}

/** A textarea that grows with its text. */
function Grow(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight + 2, 520)}px`;
  }, [props.value]);
  return <textarea ref={ref} rows={3} {...props} />;
}

/** Up, down and remove for one item of a repeating field. */
function ItemTools({ i, n, move, remove, what }: { i: number; n: number; move: (from: number, to: number) => void; remove: (i: number) => void; what: string }) {
  return (
    <div className="aitem__tools">
      <button type="button" className="aicon" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Move ${what} ${i + 1} up`}>↑</button>
      <button type="button" className="aicon" onClick={() => move(i, i + 1)} disabled={i === n - 1} aria-label={`Move ${what} ${i + 1} down`}>↓</button>
      <button type="button" className="aicon aicon--danger" onClick={() => remove(i)} aria-label={`Remove ${what} ${i + 1}`}>✕</button>
    </div>
  );
}

function useItems<T>(value: T[], onChange: (v: T[]) => void) {
  const items = Array.isArray(value) ? value : [];
  return {
    items,
    set: (i: number, v: T) => onChange(items.map((x, k) => (k === i ? v : x))),
    move: (from: number, to: number) => {
      if (to < 0 || to >= items.length) return;
      const next = [...items];
      const [x] = next.splice(from, 1);
      next.splice(to, 0, x);
      onChange(next);
    },
    remove: (i: number) => onChange(items.filter((_, k) => k !== i)),
    add: (v: T) => onChange([...items, v]),
  };
}

function TextField({ field, value, onChange, help }: Props<string>) {
  const id = useId();
  return (
    <Frame id={id} label={field.label} help={help} required={field.required}>
      <input id={id} type={field.type === 'url' ? 'url' : 'text'} value={value ?? ''} onChange={(e) => onChange(e.target.value)}
        aria-describedby={help ? `${id}-help` : undefined} placeholder={field.type === 'url' ? 'https://' : undefined} spellCheck={field.type !== 'url'} />
    </Frame>
  );
}

function AreaField({ field, value, onChange, help }: Props<string>) {
  const id = useId();
  return (
    <Frame id={id} label={field.label} help={help} required={field.required}>
      <Grow id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)} aria-describedby={help ? `${id}-help` : undefined} />
    </Frame>
  );
}

function SelectField({ field, value, onChange, help }: Props<string>) {
  const id = useId();
  const opts = field.options ?? [];
  return (
    <Frame id={id} label={field.label} help={help}>
      <select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {!opts.includes(value) && <option value={value}>{value || '(none)'}</option>}
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Frame>
  );
}

/** A list of short texts, typed one per line. */
function ListField({ field, value, onChange, help }: Props<string[]>) {
  const id = useId();
  const list = Array.isArray(value) ? value : [];
  const [text, setText] = useState(list.join('\n'));
  // follow outside changes (discard, reload) without fighting the person typing
  useEffect(() => {
    const parsed = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (JSON.stringify(parsed) !== JSON.stringify(list)) setText(list.join('\n'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(list)]);
  return (
    <Frame id={id} label={field.label} help={help ?? 'One per line.'}>
      <Grow id={id} value={text} onChange={(e) => { setText(e.target.value); onChange(e.target.value.split('\n').map((l) => l.trim()).filter(Boolean)); }}
        aria-describedby={`${id}-help`} />
    </Frame>
  );
}

function PairsField({ field, value, onChange, help }: Props<Pair[]>) {
  const id = useId();
  const { items, set, move, remove, add } = useItems<Pair>(value, onChange);
  const [a, b] = /use, kind/i.test(field.label) ? ['Use', 'Kind of solution'] : ['Label', 'Value'];
  return (
    <fieldset className="afield aset">
      <legend>{field.label}</legend>
      {help && <p className="afield__help">{help}</p>}
      {items.map((p, i) => (
        <div key={i} className="aitem aitem--row">
          <input aria-label={`${a} ${i + 1}`} placeholder={a} value={p.label ?? ''} onChange={(e) => set(i, { ...p, label: e.target.value })} />
          <input aria-label={`${b} ${i + 1}`} placeholder={b} value={p.value ?? ''} onChange={(e) => set(i, { ...p, value: e.target.value })} />
          <ItemTools i={i} n={items.length} move={move} remove={remove} what="row" />
        </div>
      ))}
      <button type="button" className="aadd" id={id} onClick={() => add({ label: '', value: '' })}>+ Add a row</button>
    </fieldset>
  );
}

function StepsField({ field, value, onChange, help }: Props<Step[]>) {
  const { items, set, move, remove, add } = useItems<Step>(value, onChange);
  return (
    <fieldset className="afield aset">
      <legend>{field.label}</legend>
      <p className="afield__help">{help ?? 'Who does each step: the AI, or a person in the client’s team.'}</p>
      {items.map((s, i) => (
        <div key={i} className="aitem aitem--row">
          <select aria-label={`Who does step ${i + 1}`} value={s.who} onChange={(e) => set(i, { ...s, who: e.target.value as Step['who'] })} style={{ flex: '0 0 auto', width: 'auto' }}>
            <option value="ai">AI</option>
            <option value="person">Your team</option>
          </select>
          <input aria-label={`Step ${i + 1}`} value={s.text ?? ''} onChange={(e) => set(i, { ...s, text: e.target.value })} />
          <ItemTools i={i} n={items.length} move={move} remove={remove} what="step" />
        </div>
      ))}
      <button type="button" className="aadd" onClick={() => add({ who: 'ai', text: '' })}>+ Add a step</button>
    </fieldset>
  );
}

function BlocksField({ field, value, onChange, help }: Props<Block[]>) {
  const { items, set, move, remove, add } = useItems<Block>(value, onChange);
  return (
    <fieldset className="afield aset">
      <legend>{field.label}</legend>
      {help && <p className="afield__help">{help}</p>}
      {items.map((bl, i) => (
        <div key={i} className="aitem">
          <div className="aitem--row">
            <input aria-label={`Heading ${i + 1}`} placeholder="Heading" value={bl.heading ?? ''} onChange={(e) => set(i, { ...bl, heading: e.target.value })} />
            <ItemTools i={i} n={items.length} move={move} remove={remove} what="section" />
          </div>
          <Grow aria-label={`Text ${i + 1}`} placeholder="Text" value={bl.text ?? ''} onChange={(e) => set(i, { ...bl, text: e.target.value })} />
        </div>
      ))}
      <button type="button" className="aadd" onClick={() => add({ heading: '', text: '' })}>+ Add a section</button>
    </fieldset>
  );
}

/** Choose a file, upload it, and report the stored path. */
function UploadButton({ uploads, onDone, label = 'Upload a picture' }: { uploads: Uploads; onDone: (path: string) => void; label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<{ busy: boolean; error?: string }>({ busy: false });
  return (
    <span className="aupload">
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (!file) return;
          setState({ busy: true });
          try { onDone(await uploads.upload(file)); setState({ busy: false }); } catch (err) { setState({ busy: false, error: err instanceof Error ? err.message : String(err) }); }
        }} />
      <button type="button" className="abtn abtn--quiet" disabled={state.busy} onClick={() => input.current?.click()}>{state.busy ? 'Uploading…' : label}</button>
      {state.error && <span className="afield__error" role="alert">{state.error}</span>}
    </span>
  );
}

function ImageField({ field, value, onChange, help, uploads }: Props<string>) {
  const id = useId();
  return (
    <Frame id={id} label={field.label} help={help ?? 'Upload a picture, or type a path such as uploads/photo.jpg or a full https:// address.'}>
      <div className="aimage">
        {value ? <img src={uploads.preview(value)} alt="" /> : <span className="aimage__empty">No picture</span>}
        <div className="aimage__side">
          <input id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="uploads/…" />
          <div className="aimage__actions">
            <UploadButton uploads={uploads} onDone={onChange} />
            {value && <button type="button" className="abtn abtn--quiet" onClick={() => onChange('')}>Remove</button>}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function ImagesField({ field, value, onChange, help, uploads }: Props<Pic[]>) {
  const { items, set, move, remove, add } = useItems<Pic>(value, onChange);
  return (
    <fieldset className="afield aset">
      <legend>{field.label}</legend>
      {help && <p className="afield__help">{help}</p>}
      {items.map((p, i) => (
        <div key={i} className="aitem aimage">
          {p.src ? <img src={uploads.preview(p.src)} alt="" /> : <span className="aimage__empty">No picture</span>}
          <div className="aimage__side">
            <input aria-label={`Picture ${i + 1} path`} value={p.src ?? ''} onChange={(e) => set(i, { ...p, src: e.target.value })} placeholder="uploads/…" />
            <input aria-label={`Picture ${i + 1} description`} value={p.alt ?? ''} onChange={(e) => set(i, { ...p, alt: e.target.value })} placeholder="What the picture shows (for screen readers)" />
            <div className="aimage__actions">
              <UploadButton uploads={uploads} label="Replace" onDone={(src) => set(i, { ...p, src })} />
              <ItemTools i={i} n={items.length} move={move} remove={remove} what="picture" />
            </div>
          </div>
        </div>
      ))}
      <UploadButton uploads={uploads} label="+ Add a picture" onDone={(src) => add({ src, alt: '' })} />
    </fieldset>
  );
}

/** The right control for a field of any type. */
export function FieldEditor(props: Props<unknown>) {
  const p = props as Props<never>;
  switch (props.field.type) {
    case 'textarea': return <AreaField {...p} />;
    case 'list': return <ListField {...p} />;
    case 'pairs': return <PairsField {...p} />;
    case 'steps': return <StepsField {...p} />;
    case 'blocks': return <BlocksField {...p} />;
    case 'images': return <ImagesField {...p} />;
    case 'image': return <ImageField {...p} />;
    case 'select': return <SelectField {...p} />;
    default: return <TextField {...p} />;
  }
}
