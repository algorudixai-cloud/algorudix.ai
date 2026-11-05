#!/usr/bin/env node
// Content tools for content/site.db (SQLite).
//   node scripts/content/cli.mjs seed [--force]   build content/site.db from content/seed.json
//   node scripts/content/cli.mjs dump [file]      print (or write) the database as JSON
//   node scripts/content/cli.mjs check            seed.json -> database -> JSON must round-trip
// The TypeScript modules in src/content are loaded through Vite, so there is one implementation.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SEED = path.join(root, 'content/seed.json');
const DB = path.join(root, 'content/site.db');
const [cmd, arg] = process.argv.slice(2);
const require = createRequire(import.meta.url);

const server = await createServer({
  root,
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
});

let code = 0;
try {
  const { createDatabase, dumpDatabase, validateDump } = await server.ssrLoadModule('/src/content/db.ts');
  const initSqlJs = (await import('sql.js')).default;
  const SQL = await initSqlJs({ locateFile: (f) => require.resolve(`sql.js/dist/${f}`) });
  const readSeed = () => JSON.parse(readFileSync(SEED, 'utf8'));

  if (cmd === 'seed') {
    if (existsSync(DB) && arg !== '--force') {
      console.error('content/site.db already exists and may hold edits made in the admin. Re-run with --force to replace it.');
      code = 1;
    } else {
      const seed = readSeed();
      const problems = validateDump(seed);
      if (problems.length) throw new Error('content/seed.json has problems:\n  - ' + problems.join('\n  - '));
      const db = createDatabase(SQL, seed);
      writeFileSync(DB, Buffer.from(db.export()));
      const counts = Object.entries(seed.tables).map(([t, rows]) => `${t} ${rows.length}`).join(', ');
      console.log(`wrote content/site.db (${counts})`);
    }
  } else if (cmd === 'dump') {
    const db = new SQL.Database(readFileSync(DB));
    const json = JSON.stringify(dumpDatabase(db), null, 2) + '\n';
    if (arg) writeFileSync(path.resolve(arg), json); else process.stdout.write(json);
  } else if (cmd === 'check') {
    const { TABLES, JSON_TYPES } = await server.ssrLoadModule('/src/content/schema.ts');
    const seed = readSeed();
    const problems = [];
    // Normalise seed rows the way the database returns them, and flag keys the schema does not know.
    const normalise = (t, row) => {
      const known = new Set(['id', 'sort', 'visible', ...TABLES[t].fields.map((f) => f.key)]);
      for (const k of Object.keys(row)) if (!known.has(k)) problems.push(`${t}/${row.id}: unknown field "${k}"`);
      const out = { id: String(row.id), sort: Number(row.sort) || 0, visible: Boolean(row.visible) };
      for (const f of TABLES[t].fields) out[f.key] = row[f.key] ?? (JSON_TYPES.includes(f.type) ? [] : '');
      return out;
    };
    const unknownTables = Object.keys(seed.tables).filter((t) => !TABLES[t]);
    if (unknownTables.length) problems.push(`unknown tables: ${unknownTables.join(', ')}`);
    const db = createDatabase(SQL, seed);
    const back = dumpDatabase(new SQL.Database(db.export()));
    const order = (rows) => [...rows].sort((a, b) => a.sort - b.sort || String(a.id).localeCompare(String(b.id)));
    const diffs = Object.keys(TABLES).filter((t) =>
      JSON.stringify(order((seed.tables[t] ?? []).map((r) => normalise(t, r)))) !== JSON.stringify(order(back.tables[t])));
    problems.push(...validateDump(back));
    if (diffs.length || problems.length) {
      console.error(`round-trip FAILED. Tables that differ: ${diffs.join(', ') || 'none'}. Problems: ${problems.join('; ') || 'none'}`);
      code = 1;
    } else {
      const total = Object.values(back.tables).reduce((n, rows) => n + rows.length, 0);
      console.log(`round-trip OK: ${Object.keys(back.tables).length} tables, ${total} rows identical after seed -> SQLite -> JSON`);
    }
  } else {
    console.error('usage: node scripts/content/cli.mjs <seed [--force] | dump [file] | check>');
    code = 2;
  }
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  code = 1;
} finally {
  await server.close();
}
process.exit(code);
