// The site admin at #admin: sign in with a GitHub token, edit every table of content/site.db,
// publish. Loaded only by people who open #admin (code-split from the public site).
import './admin.css';
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { validateDump, type ContentDump, type PlainRow } from '../content/db';
import { TABLES, TABLE_NAMES, type TableName } from '../content/schema';
import { Mark } from '../site/icons';
import type { Uploads } from './fields';
import { REPO, REPO_URL, explain, getDatabase, putFile, signIn, type Session } from './github';
import { changedTables, loadDraft, readDatabase, saveDraft, writeDatabase } from './store';
import { TableView } from './TableView';

const SESSION_KEY = 'algorudix-admin-session';

function readSession(): Session | null {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null') as Session | null;
    return s && s.token && s.branch ? s : null;
  } catch {
    return null;
  }
}

const TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new';

function Login({ onSignedIn, onExit }: { onSignedIn: (s: Session, warn?: string) => void; onExit: () => void }) {
  const [token, setToken] = useState('');
  const [branch, setBranch] = useState<string>(REPO.branch);
  const [state, setState] = useState<{ busy: boolean; error?: string }>({ busy: false });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const t = token.trim();
    if (!t) { setState({ busy: false, error: 'Paste your GitHub token first.' }); return; }
    setState({ busy: true });
    try {
      const s = await signIn(t, branch.trim() || REPO.branch);
      onSignedIn({ token: s.token, login: s.login, branch: s.branch },
        s.canWrite ? undefined : 'GitHub says your account may not be able to change this repository. You can edit, but publishing may be refused.');
    } catch (err) {
      setState({ busy: false, error: explain(err, 'sign-in') });
    }
  };

  return (
    <main className="alogin">
      <div className="alogin__card">
        <div className="alogin__brand"><Mark /><span>{'Algorudix.ai'}</span><span className="achip">Site admin</span></div>
        <h1>Edit your website</h1>
        <p>Sign in with a GitHub token to change any text, list or picture on the site. Your changes go live about two minutes after you publish.</p>
        <form onSubmit={submit} noValidate>
          <div className="afield">
            <label htmlFor="admin-token">GitHub token</label>
            <input id="admin-token" type="password" autoComplete="off" spellCheck={false} placeholder="github_pat_…"
              value={token} onChange={(e) => setToken(e.target.value)} aria-invalid={state.error ? true : undefined} aria-describedby="admin-token-note" />
            <p className="afield__help" id="admin-token-note">Kept only in this browser tab, and forgotten when you close it.</p>
          </div>
          <details className="alogin__adv">
            <summary>Advanced</summary>
            <div className="afield">
              <label htmlFor="admin-branch">Branch</label>
              <input id="admin-branch" value={branch} onChange={(e) => setBranch(e.target.value)} spellCheck={false} />
              <p className="afield__help">The live site is built from <b>main</b>. Change this only to try edits on a test branch.</p>
            </div>
          </details>
          {state.error && <p className="aalert aalert--error" role="alert">{state.error}</p>}
          <button type="submit" className="abtn abtn--primary abtn--block" disabled={state.busy}>{state.busy ? 'Checking the token…' : 'Sign in'}</button>
        </form>
        <details className="alogin__help">
          <summary>How to create a token (about two minutes)</summary>
          <ol>
            <li>Open <a href={TOKEN_URL} target="_blank" rel="noopener noreferrer">GitHub → New fine-grained token</a> (sign in to GitHub first).</li>
            <li>Name it <b>Algorudix site admin</b> and pick an expiry, for example 90 days.</li>
            <li>Under <b>Resource owner</b> choose <b>{REPO.owner}</b>. Under <b>Repository access</b> choose <b>Only select repositories</b> → <b>{REPO.repo}</b>.</li>
            <li>Under <b>Permissions → Repository permissions</b>, set <b>Contents</b> to <b>Read and write</b>.</li>
            <li>Click <b>Generate token</b>, copy it (it starts with <code>github_pat_</code>) and paste it above. If your organisation asks for approval, an owner approves it once.</li>
          </ol>
        </details>
        <button type="button" className="alink" onClick={onExit}>← Back to the website</button>
      </div>
    </main>
  );
}

type Status =
  | { kind: 'loading' }
  | { kind: 'ready' }
  | { kind: 'publishing' }
  | { kind: 'published'; url: string }
  | { kind: 'conflict' }
  | { kind: 'error'; message: string }
  | { kind: 'load-error'; message: string };

export default function Admin({ onExit }: { onExit: () => void }) {
  const [session, setSession] = useState<Session | null>(readSession);
  const [warn, setWarn] = useState<string | undefined>();
  const [base, setBase] = useState<{ sha: string; dump: ContentDump } | null>(null);
  const [draft, setDraft] = useState<ContentDump | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'loading' });
  const [problems, setProblems] = useState<string[]>([]);
  const [table, setTable] = useState<TableName>('sections');
  const previews = useRef(new Map<string, string>());

  const load = useCallback(async (s: Session) => {
    setStatus({ kind: 'loading' });
    setProblems([]);
    try {
      const { sha, bytes } = await getDatabase(s);
      const dump = await readDatabase(bytes);
      const saved = loadDraft(s.branch, sha);
      setBase({ sha, dump });
      setDraft(saved.dump ?? dump);
      if (saved.stale) setWarn('The site was published from somewhere else since your last visit, so your unpublished edits from then were set aside.');
      setStatus({ kind: 'ready' });
    } catch (e) {
      setStatus({ kind: 'load-error', message: explain(e, 'load') });
    }
  }, []);

  useEffect(() => { if (session) void load(session); }, [session, load]);

  const changed = useMemo(() => (base && draft ? changedTables(base.dump, draft) : []), [base, draft]);

  // keep unpublished edits through a refresh (this tab only)
  useEffect(() => {
    if (session && base) saveDraft(session.branch, base.sha, changed.length ? draft : null);
  }, [session, base, draft, changed.length]);

  // warn before leaving with unpublished edits
  useEffect(() => {
    if (!changed.length) return;
    const on = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', on);
    return () => window.removeEventListener('beforeunload', on);
  }, [changed.length]);

  const signedIn = (s: Session, w?: string) => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* the session then lasts until reload */ }
    setWarn(w);
    setSession(s);
  };
  const signOut = () => {
    if (changed.length && !window.confirm('You have unpublished changes. Sign out and lose them?')) return;
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* nothing stored */ }
    saveDraft('', '', null);
    setSession(null); setBase(null); setDraft(null); setStatus({ kind: 'loading' });
  };

  const setRows = (t: TableName, rows: PlainRow[]) => {
    setDraft((d) => (d ? { ...d, tables: { ...d.tables, [t]: rows } } : d));
    setProblems([]);
    setStatus((s) => (s.kind === 'published' || s.kind === 'error' ? { kind: 'ready' } : s));
  };

  const uploads: Uploads = {
    upload: async (file) => {
      if (!session) throw new Error('Sign in first.');
      const types: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };
      const ext = types[file.type];
      if (!ext) throw new Error('Please choose a PNG, JPEG, WebP or GIF picture.');
      if (file.size > 3 * 1024 * 1024) throw new Error('This picture is over 3 MB. Please make it smaller first (about 1600 pixels wide is plenty).');
      const stem = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'picture';
      const name = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${stem}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      try {
        await putFile(session, `${REPO.uploadsDir}/${name}`, new Uint8Array(await file.arrayBuffer()), `content: upload picture ${name} (via admin)`);
      } catch (e) {
        throw new Error(explain(e, 'upload'));
      }
      const path = `uploads/${name}`;
      previews.current.set(path, URL.createObjectURL(file));
      return path;
    },
    preview: (path) => previews.current.get(path) ?? (/^(https?:|data:|blob:)/.test(path) ? path : `./${path.replace(/^\.?\//, '')}`),
  };

  const publish = async () => {
    if (!session || !base || !draft || !changed.length) return;
    const found = validateDump(draft).map((p) => p.replace(/^([a-z_]+)\//, (_, t: string) => `${TABLES[t as TableName]?.label ?? t} → `));
    if (found.length) { setProblems(found); return; }
    setStatus({ kind: 'publishing' });
    try {
      const bytes = await writeDatabase(draft);
      const what = changed.map((t) => TABLES[t].label.toLowerCase()).join(', ');
      const c = await putFile(session, REPO.dbPath, bytes, `content: update ${what} (via admin)`, base.sha);
      setBase({ sha: c.fileSha, dump: draft });
      setStatus({ kind: 'published', url: c.url });
    } catch (e) {
      const m = explain(e, 'publish');
      setStatus(m === 'conflict' ? { kind: 'conflict' } : { kind: 'error', message: m });
    }
  };

  if (!session) return <Login onSignedIn={signedIn} onExit={onExit} />;

  const counts = (t: TableName) => draft?.tables[t]?.length ?? 0;

  return (
    <div className="admin">
      <header className="atop">
        <div className="atop__brand"><Mark /><span>Site admin</span></div>
        <div className="atop__meta">
          <span className="achip" title="The branch your edits are published to">Branch: {session.branch}</span>
          <span className="atop__user">Signed in as <b>{session.login}</b></span>
          <button type="button" className="abtn abtn--quiet" onClick={onExit}>View the site</button>
          <button type="button" className="abtn abtn--quiet" onClick={signOut}>Sign out</button>
        </div>
      </header>

      {status.kind === 'loading' && <main className="amain amain--center"><p className="aempty">Loading the content from GitHub…</p></main>}
      {status.kind === 'load-error' && (
        <main className="amain amain--center">
          <div className="aalert aalert--error" role="alert"><b>The content could not be loaded.</b> {status.message}</div>
          <div className="arow__tools" style={{ marginTop: 16 }}>
            <button type="button" className="abtn abtn--primary" onClick={() => void load(session)}>Try again</button>
            <button type="button" className="abtn abtn--quiet" onClick={signOut}>Sign in with another token</button>
          </div>
        </main>
      )}

      {draft && base && status.kind !== 'loading' && status.kind !== 'load-error' && (
        <div className="alayout">
          <nav className="aside" aria-label="Content">
            <label className="aside__pick">
              <span className="sr-only">Choose what to edit</span>
              <select value={table} onChange={(e) => setTable(e.target.value as TableName)}>
                {TABLE_NAMES.map((t) => <option key={t} value={t}>{TABLES[t].label}{changed.includes(t) ? ' •' : ''}</option>)}
              </select>
            </label>
            <ul>
              {TABLE_NAMES.map((t) => (
                <li key={t}>
                  <button type="button" className="aside__item" aria-current={t === table ? 'page' : undefined} onClick={() => setTable(t)}>
                    <span>{TABLES[t].label}</span>
                    {changed.includes(t) ? <i className="adot" title="Unpublished changes" aria-label="unpublished changes" /> : TABLES[t].name !== 'settings' && <small>{counts(t)}</small>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main className="amain" id="admin-main">
            {warn && <p className="aalert" role="status">{warn} <button type="button" className="alink" onClick={() => setWarn(undefined)}>Dismiss</button></p>}
            <TableView key={table} name={table} rows={draft.tables[table]} onChange={(rows) => setRows(table, rows)} uploads={uploads} />
          </main>
        </div>
      )}

      {draft && base && (changed.length > 0 || ['published', 'conflict', 'error', 'publishing'].includes(status.kind)) && (
        <div className={`abar abar--${status.kind}`} role="region" aria-label="Publishing">
          <div className="abar__text" aria-live="polite">
            {status.kind === 'published' && changed.length === 0 && (
              <><b>Published.</b> The live site updates in about two minutes. <a href={status.url} target="_blank" rel="noopener noreferrer">See the change</a> · <a href={`${REPO_URL}/actions`} target="_blank" rel="noopener noreferrer">Watch the update</a></>
            )}
            {status.kind === 'conflict' && (
              <><b>Someone else published changes</b> after you opened the editor, so yours were not sent (nothing was overwritten). Load their version, then make your edits again.</>
            )}
            {status.kind === 'error' && <><b>Not published.</b> {status.message}</>}
            {status.kind === 'publishing' && <><b>Publishing…</b></>}
            {(status.kind === 'ready' || (status.kind === 'published' && changed.length > 0)) && (
              <><b>Unpublished changes</b> in {changed.map((t) => TABLES[t].label).join(', ')}.</>
            )}
            {problems.length > 0 && (
              <div className="abar__problems" role="alert">
                <b>Please fix these first:</b>
                <ul>{problems.slice(0, 6).map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}
          </div>
          <div className="abar__actions">
            {status.kind === 'conflict' ? (
              <button type="button" className="abtn abtn--primary" onClick={() => { saveDraft(session.branch, '', null); void load(session); }}>Load the latest version</button>
            ) : (
              <>
                {changed.length > 0 && (
                  <button type="button" className="abtn abtn--quiet" disabled={status.kind === 'publishing'}
                    onClick={() => { if (window.confirm('Discard all unpublished changes?')) { setDraft(base.dump); setProblems([]); setStatus({ kind: 'ready' }); } }}>
                    Discard
                  </button>
                )}
                {changed.length > 0 && (
                  <button type="button" className="abtn abtn--primary" disabled={status.kind === 'publishing'} onClick={() => void publish()}>
                    {status.kind === 'publishing' ? 'Publishing…' : `Publish ${changed.length === 1 ? 'the change' : `${changed.length} changes`}`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
