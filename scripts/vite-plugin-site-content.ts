// Vite plugin: reads content/site.db (SQLite) at build time and serves it to the app as
// `virtual:site-content`. Visitors get plain JSON in the bundle, never the database or WASM.
// It also writes the SEO title and description from the settings into index.html.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import initSqlJs from 'sql.js';
import type { Plugin } from 'vite';
import { dumpDatabase, toSiteContent, validateDump } from '../src/content/db';
import type { SiteContent } from '../src/content/types';

const VIRTUAL_ID = 'virtual:site-content';
const RESOLVED_ID = '\0' + VIRTUAL_ID;
const require = createRequire(import.meta.url);

export async function loadSiteContent(dbFile: string): Promise<SiteContent> {
  const SQL = await initSqlJs({ locateFile: (f) => require.resolve(`sql.js/dist/${f}`) });
  const db = new SQL.Database(readFileSync(dbFile));
  try {
    const dump = dumpDatabase(db);
    const problems = validateDump(dump);
    if (problems.length) throw new Error(`content/site.db has problems:\n  - ${problems.join('\n  - ')}`);
    return toSiteContent(dump);
  } finally {
    db.close();
  }
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function siteContent(dbFile: string): Plugin {
  let content: SiteContent | null = null;
  const load = async () => (content ??= await loadSiteContent(dbFile));

  return {
    name: 'site-content',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return;
      this.addWatchFile(dbFile);
      return `export default ${JSON.stringify(await load())};`;
    },
    async transformIndexHtml(html) {
      const { settings } = await load();
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(settings.seo_title)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(settings.seo_description)}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(settings.seo_title)}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(settings.seo_description)}$2`);
    },
    configureServer(server) {
      server.watcher.add(dbFile);
      server.watcher.on('change', (file) => {
        if (file !== dbFile) return;
        content = null;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      });
    },
  };
}
