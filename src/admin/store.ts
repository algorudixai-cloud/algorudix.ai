// The admin's working copy: the content database opened in the browser with sql.js, edited as
// plain rows, and written back to SQLite bytes only when the owner publishes.
import initSqlJs, { type SqlJsStatic } from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm-browser.wasm?url';
import { createDatabase, dumpDatabase, type ContentDump, type PlainRow } from '../content/db';
import { TABLES, TABLE_NAMES, type TableName } from '../content/schema';

let sqlReady: Promise<SqlJsStatic> | null = null;
const sql = () => (sqlReady ??= initSqlJs({ locateFile: () => wasmUrl }));

export async function readDatabase(bytes: Uint8Array): Promise<ContentDump> {
  const SQL = await sql();
  const db = new SQL.Database(bytes);
  try { return dumpDatabase(db); } finally { db.close(); }
}

export async function writeDatabase(dump: ContentDump): Promise<Uint8Array> {
  const SQL = await sql();
  const db = createDatabase(SQL, dump);
  try { return db.export(); } finally { db.close(); }
}

/** The tables whose rows differ between two versions. */
export function changedTables(a: ContentDump, b: ContentDump): TableName[] {
  return TABLE_NAMES.filter((t) => JSON.stringify(a.tables[t]) !== JSON.stringify(b.tables[t]));
}

/** Rows in display order. */
export const sorted = (rows: PlainRow[]) => [...rows].sort((x, y) => x.sort - y.sort || x.id.localeCompare(y.id));

/** Renumbers sort as 10, 20, 30… in the given order. */
export const renumber = (rows: PlainRow[]) => rows.map((r, i) => ({ ...r, sort: (i + 1) * 10 }));

const slug = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);

/** A new, empty row with an id that does not clash with the others. */
export function blankRow(table: TableName, rows: PlainRow[], title = ''): PlainRow {
  const def = TABLES[table];
  const base = slug(title) || slug(def.item) || 'item';
  const ids = new Set(rows.map((r) => r.id));
  let id = base, n = 2;
  while (ids.has(id)) id = `${base}-${n++}`;
  const row: PlainRow = { id, sort: (Math.max(0, ...rows.map((r) => r.sort)) || 0) + 10, visible: def.visibleByDefault ?? true };
  for (const f of def.fields) row[f.key] = ['list', 'pairs', 'steps', 'blocks', 'images'].includes(f.type) ? [] : f.type === 'select' ? (f.options?.[0] ?? '') : '';
  if (title) row[def.titleKey] = title;
  return row;
}

// Unpublished edits survive a page refresh (in this tab only) and are tied to the version they started from.
const DRAFT_KEY = 'algorudix-admin-draft';

export function loadDraft(branch: string, sha: string): { dump: ContentDump | null; stale: boolean } {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return { dump: null, stale: false };
    const d = JSON.parse(raw) as { branch: string; sha: string; dump: ContentDump };
    if (d.branch !== branch) return { dump: null, stale: false };
    if (d.sha !== sha) { sessionStorage.removeItem(DRAFT_KEY); return { dump: null, stale: true }; }
    return { dump: d.dump, stale: false };
  } catch {
    return { dump: null, stale: false };
  }
}

export function saveDraft(branch: string, sha: string, dump: ContentDump | null) {
  try {
    if (dump) sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ branch, sha, dump }));
    else sessionStorage.removeItem(DRAFT_KEY);
  } catch { /* storage full or blocked: edits stay in memory */ }
}
