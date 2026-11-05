import { useState } from 'react';
import type { PlainRow } from '../content/db';
import { TABLES, type FieldDef, type TableName } from '../content/schema';
import { FieldEditor, type Uploads } from './fields';
import { blankRow, renumber, sorted } from './store';

/** What each generic section field does in each section of the current design. */
const SECTION_HELP: Record<string, Record<string, string>> = {
  hero: {
    heading: 'Shown before the rotating words, e.g. “AI automation for”.',
    intro: 'The sentence under the headline.',
    body: 'The rotating words after the heading, one per line.',
    cta_label: 'The main button (also used in the menu bar).',
  },
  intro: { body: 'The flow map: your systems, comma separated, then a | and what comes out. Example: Email, Spreadsheets, CRM | Dashboards, Reports, Alerts' },
  services: { body: 'A short line under the service cards.', cta_label: 'The button under the cards.' },
  tools: { intro: 'Shown on the gradient band beside the moving tiles. The tiles themselves are under “Tools we use”.', cta_label: 'The button on the band.' },
  tasks: { cta_label: 'The button under the explainer.' },
  industries: { cta_label: 'The button in the industry panel.' },
  about: { cta_label: 'The button under the paragraph.' },
  contact: { body: 'The thank-you message after someone sends the form.', cta_label: 'The send button.' },
  footer: { heading: 'Title of the contact column.', body: 'Text after “© year Algorudix.ai.”' },
  devhub: { intro: 'The sentence under the Development Hub title.' },
};
/** Sections the page always shows, so they have no show/hide switch. */
const ALWAYS_SHOWN = new Set(['hero', 'footer']);

const helpFor = (table: TableName, rowId: string, f: FieldDef) => (table === 'sections' ? SECTION_HELP[rowId]?.[f.key] : undefined) ?? f.help;
const hiddenField = (table: TableName, f: FieldDef) => table === 'sections' && f.key === 'images';

function subtitle(table: TableName, r: PlainRow): string {
  if (table === 'sections') return `Section: ${r.id}`;
  const def = TABLES[table];
  const f = def.fields.find((x) => x.key !== def.titleKey && (x.type === 'text' || x.type === 'textarea' || x.type === 'select') && String(r[x.key] || '').trim());
  const v = f ? String(r[f.key]) : '';
  return v.length > 80 ? `${v.slice(0, 78)}…` : v;
}

function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} title={checked ? 'Shown on the site' : 'Hidden'}
      className="aswitch" disabled={disabled} onClick={() => onChange(!checked)}>
      <span />
    </button>
  );
}

export function RowForm({ table, row, onChange, uploads, onDone }: { table: TableName; row: PlainRow; onChange: (r: PlainRow) => void; uploads: Uploads; onDone?: () => void }) {
  const def = TABLES[table];
  return (
    <div className="aform">
      {def.fields.filter((f) => !hiddenField(table, f)).map((f) => (
        <FieldEditor key={f.key} field={f} value={row[f.key]} help={helpFor(table, row.id, f)} uploads={uploads}
          onChange={(v) => onChange({ ...row, [f.key]: v })} />
      ))}
      {onDone && (
        <div className="aform__foot">
          <button type="button" className="abtn" onClick={onDone}>Done</button>
          <span>Your changes are kept as you type. Publish when you are ready.</span>
        </div>
      )}
    </div>
  );
}

export function TableView({ name, rows, onChange, uploads }: { name: TableName; rows: PlainRow[]; onChange: (rows: PlainRow[]) => void; uploads: Uploads }) {
  const def = TABLES[name];
  const list = sorted(rows);
  const [open, setOpen] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const update = (row: PlainRow) => onChange(rows.map((r) => (r.id === row.id ? row : r)));
  const title = (r: PlainRow) => String(r[def.titleKey] ?? '').trim() || `Untitled ${def.item}`;
  const canMove = name !== 'sections';

  if (name === 'settings') {
    const row = list[0];
    return (
      <>
        <div className="ahead"><div><h1>{def.label}</h1>{def.help && <p>{def.help}</p>}</div></div>
        {row ? <div className="arow is-open"><RowForm table={name} row={row} onChange={update} uploads={uploads} /></div> : <p className="aempty">The settings row is missing.</p>}
      </>
    );
  }

  const move = (i: number, j: number) => {
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(renumber(next));
  };
  const add = () => {
    const r = blankRow(name, rows);
    onChange([...rows, r]);
    setOpen(r.id);
  };
  const remove = (id: string) => {
    onChange(rows.filter((r) => r.id !== id));
    setConfirm(null);
    if (open === id) setOpen(null);
  };

  return (
    <>
      <div className="ahead">
        <div><h1>{def.label}</h1>{def.help && <p>{def.help}</p>}</div>
        {!def.fixed && <button type="button" className="abtn abtn--primary" onClick={add}>+ Add {def.item}</button>}
      </div>
      {list.length === 0 && <p className="aempty">Nothing here yet. Use “Add {def.item}” to create the first one.</p>}
      <ol className="arows">
        {list.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className={`arow${isOpen ? ' is-open' : ''}${r.visible ? '' : ' is-hidden'}`}>
              <div className="arow__bar">
                <button type="button" className="arow__title" aria-expanded={isOpen} onClick={() => { setOpen(isOpen ? null : r.id); setConfirm(null); }}>
                  <b>{title(r)}</b>
                  <small>{r.visible ? '' : 'Hidden · '}{subtitle(name, r)}</small>
                </button>
                <div className="arow__tools">
                  <Switch checked={r.visible} disabled={name === 'sections' && ALWAYS_SHOWN.has(r.id)}
                    label={`Show “${title(r)}” on the site`} onChange={(v) => update({ ...r, visible: v })} />
                  {canMove && <button type="button" className="aicon" aria-label={`Move “${title(r)}” up`} disabled={i === 0} onClick={() => move(i, i - 1)}>↑</button>}
                  {canMove && <button type="button" className="aicon" aria-label={`Move “${title(r)}” down`} disabled={i === list.length - 1} onClick={() => move(i, i + 1)}>↓</button>}
                  {!def.fixed && (confirm === r.id
                    ? <button type="button" className="abtn abtn--danger" onClick={() => remove(r.id)}>Delete for good?</button>
                    : <button type="button" className="aicon aicon--danger" aria-label={`Delete “${title(r)}”`} onClick={() => setConfirm(r.id)}>✕</button>)}
                </div>
              </div>
              {isOpen && <RowForm table={name} row={r} onChange={update} uploads={uploads} onDone={() => setOpen(null)} />}
            </li>
          );
        })}
      </ol>
    </>
  );
}
