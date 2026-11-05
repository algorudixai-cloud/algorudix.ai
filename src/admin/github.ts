// The admin's only connection: the GitHub REST API, called from the browser with the owner's
// fine-grained token. GitHub enforces who may change the site; this file just asks politely.

export const REPO = {
  owner: 'algorudixai-cloud',
  repo: 'algorudix.ai',
  branch: 'main',
  dbPath: 'content/site.db',
  uploadsDir: 'public/uploads',
} as const;

export const REPO_URL = `https://github.com/${REPO.owner}/${REPO.repo}`;
const API = 'https://api.github.com';

export class GitHubError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const encPath = (p: string) => p.split('/').map(encodeURIComponent).join('/');

async function gh<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init.headers || {}),
      },
    });
  } catch {
    throw new GitHubError(0, 'network');
  }
  if (!res.ok) {
    let message = res.statusText;
    try { message = ((await res.json()) as { message?: string }).message || message; } catch { /* not JSON */ }
    throw new GitHubError(res.status, message);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

/** Bytes ⇄ base64, in chunks so a large file does not overflow the call stack. */
export function toBase64(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
export function fromBase64(b64: string): Uint8Array {
  const s = atob(b64.replace(/\s/g, ''));
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

export interface Session {
  token: string;
  login: string;
  branch: string;
}

/** Checks the token: who it belongs to, and that it can see the site's repository. */
export async function signIn(token: string, branch: string): Promise<Session & { canWrite: boolean }> {
  const user = await gh<{ login: string }>(token, '/user');
  const repo = await gh<{ permissions?: { push?: boolean; admin?: boolean; maintain?: boolean } }>(token, `/repos/${REPO.owner}/${REPO.repo}`);
  const p = repo.permissions;
  return { token, login: user.login, branch, canWrite: !p || !!(p.push || p.admin || p.maintain) };
}

/** The content database as it is on the branch now, with the blob sha that identifies this version. */
export async function getDatabase(s: Session): Promise<{ sha: string; bytes: Uint8Array }> {
  const path = `/repos/${REPO.owner}/${REPO.repo}/contents/${encPath(REPO.dbPath)}?ref=${encodeURIComponent(s.branch)}`;
  const meta = await gh<{ sha: string; content?: string; encoding?: string }>(s.token, path);
  if (meta.content && meta.encoding === 'base64') return { sha: meta.sha, bytes: fromBase64(meta.content) };
  // files over 1 MB come without content; ask for the raw bytes instead
  const res = await fetch(`${API}${path}`, { headers: { Accept: 'application/vnd.github.raw', Authorization: `Bearer ${s.token}` } });
  if (!res.ok) throw new GitHubError(res.status, res.statusText);
  return { sha: meta.sha, bytes: new Uint8Array(await res.arrayBuffer()) };
}

export interface Commit {
  sha: string;
  url: string;
  fileSha: string;
}

/**
 * Commits one file. With `sha` (the version the edit started from) GitHub refuses the commit if
 * someone changed the file in the meantime (409), so nobody's work is overwritten by accident.
 */
export async function putFile(s: Session, path: string, bytes: Uint8Array, message: string, sha?: string): Promise<Commit> {
  const body: Record<string, string> = { message, content: toBase64(bytes), branch: s.branch };
  if (sha) body.sha = sha;
  const res = await gh<{ content: { sha: string }; commit: { sha: string; html_url: string } }>(
    s.token, `/repos/${REPO.owner}/${REPO.repo}/contents/${encPath(path)}`, { method: 'PUT', body: JSON.stringify(body) },
  );
  return { sha: res.commit.sha, url: res.commit.html_url, fileSha: res.content.sha };
}

/** What went wrong, in words the site owner can act on. */
export function explain(e: unknown, during: 'sign-in' | 'load' | 'publish' | 'upload'): string {
  if (!(e instanceof GitHubError)) return e instanceof Error ? e.message : String(e);
  const { status, message } = e;
  if (status === 0) return 'Could not reach GitHub. Check your internet connection and try again.';
  if (status === 401) return 'GitHub did not accept this token. Check that you copied all of it and that it has not expired.';
  if (status === 403 && /rate limit/i.test(message)) return 'GitHub is limiting requests for a few minutes. Please wait a little and try again.';
  if (status === 403) return `This token is not allowed to do that. It needs "Contents: Read and write" permission on the ${REPO.repo} repository.`;
  if (status === 404 && during === 'sign-in') return `This token cannot see the ${REPO.repo} repository. When you create it, choose "Only select repositories" and pick ${REPO.repo}.`;
  if (status === 404 && during === 'load') return `The content file (${REPO.dbPath}) is not on this branch yet. If the redesign has not been merged into main, merge it first.`;
  if (status === 404) return `GitHub could not find the repository or branch. The token may not have access to ${REPO.repo}.`;
  if (status === 409 || (status === 422 && /sha/i.test(message))) return 'conflict';
  if (status === 422) return `GitHub refused the change: ${message}`;
  return `GitHub answered "${message}" (${status}).`;
}
