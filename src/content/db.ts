// Read and write content/site.db with sql.js. Used at build time (the Vite plugin), by the
// content CLI (seed / dump / check) and in the browser by the admin.
import type { Database, SqlJsStatic, SqlValue } from 'sql.js';
import { JSON_TYPES, SCHEMA_VERSION, TABLES, TABLE_NAMES, schemaSql, type TableName } from './schema';
import type { SiteContent } from './types';

/** A row as plain values: lists and pairs already decoded, visible as a boolean. */
export type PlainRow = Record<string, unknown> & { id: string; sort: number; visible: boolean };

/** The JSON form of the whole database (content/seed.json and `dump` use it). */
export interface ContentDump {
  meta: Record<string, string>;
  tables: Record<TableName, PlainRow[]>;
}

const jsonFields = (table: TableName) =>
  new Set(TABLES[table].fields.filter((f) => JSON_TYPES.includes(f.type)).map((f) => f.key));

function decodeRow(table: TableName, raw: Record<string, SqlValue>): PlainRow {
  const json = jsonFields(table);
  const row: PlainRow = { id: String(raw.id), sort: Number(raw.sort) || 0, visible: Number(raw.visible) === 1 };
  for (const f of TABLES[table].fields) {
    const v = raw[f.key];
    if (json.has(f.key)) {
      try { row[f.key] = v ? JSON.parse(String(v)) : []; } catch { row[f.key] = []; }
    } else {
      row[f.key] = v == null ? '' : String(v);
    }
  }
  return row;
}

function encodeValue(table: TableName, key: string, value: unknown): SqlValue {
  if (jsonFields(table).has(key)) return JSON.stringify(Array.isArray(value) ? value : []);
  return value == null ? '' : String(value);
}

export function readRows(db: Database, table: TableName): PlainRow[] {
  const stmt = db.prepare(`SELECT * FROM ${table} ORDER BY sort, id`);
  const rows: PlainRow[] = [];
  try {
    while (stmt.step()) rows.push(decodeRow(table, stmt.getAsObject()));
  } finally {
    stmt.free();
  }
  return rows;
}

export function readMeta(db: Database): Record<string, string> {
  const out: Record<string, string> = {};
  const res = db.exec('SELECT key, value FROM meta ORDER BY key');
  for (const [k, v] of res[0]?.values ?? []) out[String(k)] = String(v);
  return out;
}

export function dumpDatabase(db: Database): ContentDump {
  const tables = {} as Record<TableName, PlainRow[]>;
  for (const t of TABLE_NAMES) tables[t] = readRows(db, t);
  return { meta: readMeta(db), tables };
}

/** Insert or replace one row (admin edits). */
export function upsertRow(db: Database, table: TableName, row: PlainRow): void {
  const keys = TABLES[table].fields.map((f) => f.key);
  const cols = ['id', 'sort', 'visible', ...keys];
  const values: SqlValue[] = [String(row.id), Number(row.sort) || 0, row.visible ? 1 : 0, ...keys.map((k) => encodeValue(table, k, row[k]))];
  db.run(`INSERT OR REPLACE INTO ${table} (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`, values);
}

export function deleteRow(db: Database, table: TableName, id: string): void {
  db.run(`DELETE FROM ${table} WHERE id = ?`, [id]);
}

export function setMeta(db: Database, key: string, value: string): void {
  db.run('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)', [key, value]);
}

/** Build a new database from a dump (content/seed.json). */
export function createDatabase(SQL: SqlJsStatic, dump: ContentDump): Database {
  const db = new SQL.Database();
  db.run(schemaSql());
  db.run('BEGIN');
  try {
    for (const t of TABLE_NAMES) for (const row of dump.tables[t] ?? []) upsertRow(db, t, row);
    for (const [k, v] of Object.entries({ ...dump.meta, schema_version: String(SCHEMA_VERSION) })) setMeta(db, k, v);
    db.run('COMMIT');
  } catch (e) {
    db.run('ROLLBACK');
    throw e;
  }
  return db;
}

/**
 * The content the public site renders. Hidden rows are left out, so they never reach the
 * bundle. Sections keep their `visible` flag (a hidden section is not rendered).
 */
export function toSiteContent(dump: ContentDump): SiteContent {
  const shown = (t: TableName) => dump.tables[t].filter((r) => r.visible);
  const settings = dump.tables.settings[0];
  if (!settings) throw new Error('content: the settings table has no row');
  const sections = Object.fromEntries(dump.tables.sections.map((s) => [s.id, s]));
  return {
    settings,
    sections,
    tasks: shown('tasks'),
    services: shown('services'),
    process_steps: shown('process_steps'),
    case_studies: shown('case_studies'),
    industries: shown('industries'),
    technologies: shown('technologies'),
    highlights: shown('highlights'),
    faqs: shown('faqs'),
    testimonials: shown('testimonials'),
    dev_hub_items: shown('dev_hub_items'),
    policies: dump.tables.policies,
    credits: shown('credits'),
  } as unknown as SiteContent;
}

/** Problems that would break the page: missing required fields, unknown section ids. */
export function validateDump(dump: ContentDump): string[] {
  const problems: string[] = [];
  for (const t of TABLE_NAMES) {
    const ids = new Set<string>();
    for (const row of dump.tables[t] ?? []) {
      if (!row.id) problems.push(`${t}: a row has no id`);
      if (ids.has(row.id)) problems.push(`${t}: duplicate id "${row.id}"`);
      ids.add(row.id);
      for (const f of TABLES[t].fields) {
        if (f.required && row.visible && !String(row[f.key] ?? '').trim()) problems.push(`${t}/${row.id}: "${f.label}" is empty`);
      }
    }
  }
  if ((dump.tables.settings ?? []).length !== 1) problems.push('settings: there must be exactly one row');
  const need = ['hero', 'intro', 'tasks', 'services', 'process', 'work', 'industries', 'about', 'faq', 'contact', 'footer', 'devhub', 'tools'];
  const have = new Set((dump.tables.sections ?? []).map((s) => s.id));
  for (const id of need) if (!have.has(id)) problems.push(`sections: missing "${id}"`);
  return problems;
}
