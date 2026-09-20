export type NoteEntryType = 'api' | 'token' | 'link' | 'note';

export interface NoteEntry {
  id: string;
  title: string;
  value: string;
  type: NoteEntryType;
  environment?: string; // e.g. Production, Staging, Local, Sandbox
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalNotepadData {
  scratchpad: string;
  entries: NoteEntry[];
}

const NOTEPAD_STORAGE_KEY = 'algorudix_dev_personal_notepad_v1';

const DEFAULT_NOTEPAD: PersonalNotepadData = {
  scratchpad: `# Personal Developer Scratchpad & Quick Notes
- Staging Deployment: scheduled every Tuesday 18:00 UTC
- Test Webhook Endpoint: https://api.algorudixai.com/v1/webhooks/test
- Current Sprints: Agent workflows benchmarking, latency optimizations < 250ms
`,
  entries: [
    {
      id: 'entry-1',
      title: 'OpenAI / Anthropic Primary API Key',
      value: 'sk-ant-api03-sample-key-token-replace-with-yours',
      type: 'api',
      environment: 'Production',
      description: 'Used for autonomous fallback agents and model evaluation harness.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'entry-2',
      title: 'GitHub CI/CD Deployment Token',
      value: 'ghp_sampleTokenSecuredDev992384729124',
      type: 'token',
      environment: 'Staging',
      description: 'Repository access token for automated release tagging and build workflows.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'entry-3',
      title: 'Internal Architecture Figma Spec',
      value: 'https://figma.com/file/algorudix-internal-specs',
      type: 'link',
      environment: 'Design',
      description: 'Component design tokens, color scales, and card mockups.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export function getPersonalNotepad(): PersonalNotepadData {
  try {
    const raw = localStorage.getItem(NOTEPAD_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTEPAD_STORAGE_KEY, JSON.stringify(DEFAULT_NOTEPAD));
      return DEFAULT_NOTEPAD;
    }
    const parsed = JSON.parse(raw);
    return {
      scratchpad: typeof parsed.scratchpad === 'string' ? parsed.scratchpad : DEFAULT_NOTEPAD.scratchpad,
      entries: Array.isArray(parsed.entries) ? parsed.entries : DEFAULT_NOTEPAD.entries,
    };
  } catch (err) {
    console.error('Failed to load Personal Notepad:', err);
    return DEFAULT_NOTEPAD;
  }
}

export function savePersonalNotepad(data: PersonalNotepadData): void {
  try {
    localStorage.setItem(NOTEPAD_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save Personal Notepad:', err);
  }
}

export function saveScratchpadText(text: string): void {
  const current = getPersonalNotepad();
  current.scratchpad = text;
  savePersonalNotepad(current);
}

export function addVaultEntry(entry: Omit<NoteEntry, 'id' | 'createdAt' | 'updatedAt'>): NoteEntry[] {
  const current = getPersonalNotepad();
  const newEntry: NoteEntry = {
    ...entry,
    id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  current.entries.unshift(newEntry);
  savePersonalNotepad(current);
  return current.entries;
}

export function updateVaultEntry(entry: NoteEntry): NoteEntry[] {
  const current = getPersonalNotepad();
  current.entries = current.entries.map((item) =>
    item.id === entry.id ? { ...entry, updatedAt: new Date().toISOString() } : item
  );
  savePersonalNotepad(current);
  return current.entries;
}

export function deleteVaultEntry(id: string): NoteEntry[] {
  const current = getPersonalNotepad();
  current.entries = current.entries.filter((item) => item.id !== id);
  savePersonalNotepad(current);
  return current.entries;
}
