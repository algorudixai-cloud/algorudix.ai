import React, { useState, useEffect } from 'react';
import {
  X,
  KeyRound,
  Lock,
  Globe,
  FileText,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Search,
  Download,
  AlertCircle,
  Save,
  StickyNote
} from 'lucide-react';
import {
  NoteEntry,
  NoteEntryType,
  getPersonalNotepad,
  saveScratchpadText,
  addVaultEntry,
  updateVaultEntry,
  deleteVaultEntry
} from '../utils/personalNotepadStore';

interface PersonalNotepadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalNotepadModal: React.FC<PersonalNotepadModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'vault' | 'scratchpad'>('vault');
  const [entries, setEntries] = useState<NoteEntry[]>([]);
  const [scratchpadText, setScratchpadText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | NoteEntryType>('all');

  // Entry Form (Add/Edit)
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<NoteEntry | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formValue, setFormValue] = useState('');
  const [formType, setFormType] = useState<NoteEntryType>('api');
  const [formEnv, setFormEnv] = useState('Production');
  const [formDesc, setFormDesc] = useState('');
  const [formError, setFormError] = useState('');

  // Status message
  const [statusNotice, setStatusNotice] = useState('');

  useEffect(() => {
    if (isOpen) {
      const data = getPersonalNotepad();
      setEntries(data.entries);
      setScratchpadText(data.scratchpad);
      setRevealedIds({});
      setIsEntryFormOpen(false);
      setEditingEntry(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Auto-save scratchpad
  const handleScratchpadChange = (text: string) => {
    setScratchpadText(text);
    saveScratchpadText(text);
  };

  const handleCopyValue = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenAddForm = () => {
    setEditingEntry(null);
    setFormTitle('');
    setFormValue('');
    setFormType('api');
    setFormEnv('Production');
    setFormDesc('');
    setFormError('');
    setIsEntryFormOpen(true);
  };

  const handleOpenEditForm = (entry: NoteEntry) => {
    setEditingEntry(entry);
    setFormTitle(entry.title);
    setFormValue(entry.value);
    setFormType(entry.type);
    setFormEnv(entry.environment || 'Production');
    setFormDesc(entry.description || '');
    setFormError('');
    setIsEntryFormOpen(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formValue.trim()) {
      setFormError('Please enter a title and a value/link.');
      return;
    }

    if (editingEntry) {
      const updated = updateVaultEntry({
        ...editingEntry,
        title: formTitle.trim(),
        value: formValue.trim(),
        type: formType,
        environment: formEnv.trim() || undefined,
        description: formDesc.trim() || undefined,
      });
      setEntries(updated);
      showNotice('Entry updated successfully.');
    } else {
      const updated = addVaultEntry({
        title: formTitle.trim(),
        value: formValue.trim(),
        type: formType,
        environment: formEnv.trim() || undefined,
        description: formDesc.trim() || undefined,
      });
      setEntries(updated);
      showNotice('New entry saved to your personal notepad.');
    }

    setIsEntryFormOpen(false);
  };

  const handleDeleteEntry = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}" from your personal notepad?`)) {
      const updated = deleteVaultEntry(id);
      setEntries(updated);
      showNotice('Entry removed.');
    }
  };

  const showNotice = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(''), 2500);
  };

  const handleDownloadScratchpad = () => {
    const blob = new Blob([scratchpadText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `algorudix-developer-notes-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesType = typeFilter === 'all' || entry.type === typeFilter;
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.description && entry.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.value.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeBadge = (type: NoteEntryType) => {
    switch (type) {
      case 'api':
        return {
          label: 'API Key',
          icon: KeyRound,
          classes: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800',
        };
      case 'token':
        return {
          label: 'Token',
          icon: Lock,
          classes: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border-purple-300 dark:border-purple-800',
        };
      case 'link':
        return {
          label: 'Link',
          icon: Globe,
          classes: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800',
        };
      case 'note':
      default:
        return {
          label: 'Detail / Note',
          icon: FileText,
          classes: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-[#18181b]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs">
              <StickyNote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Personal Developer Notepad & Vault
                </h3>
                <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                  Private & Secure
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Store private API keys, deployment tokens, bookmarks, and developer notes locally in your browser.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Header Controls */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#121215] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs">
            <button
              onClick={() => {
                setActiveTab('vault');
                setIsEntryFormOpen(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'vault'
                  ? 'bg-white dark:bg-[#121215] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Vault (APIs, Tokens & Links)</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {entries.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('scratchpad');
                setIsEntryFormOpen(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scratchpad'
                  ? 'bg-white dark:bg-[#121215] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Quick Notes & Scratchpad</span>
            </button>
          </div>

          {/* Action on right */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {activeTab === 'vault' ? (
              <button
                onClick={handleOpenAddForm}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-xs hover:shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Details / API / Token / Link</span>
              </button>
            ) : (
              <button
                onClick={handleDownloadScratchpad}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Notes (.txt)</span>
              </button>
            )}
          </div>
        </div>

        {/* Temporary Notification Toast */}
        {statusNotice && (
          <div className="px-6 py-2 bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4 text-xs">

          {activeTab === 'vault' && (
            <>
              {/* Add / Edit Inline Form Modal Drawer */}
              {isEntryFormOpen && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700/80 mb-6 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>{editingEntry ? 'Edit Secret / Link' : 'Add New Item (API, Token, Link, or Note)'}</span>
                    </h4>
                    <button
                      onClick={() => setIsEntryFormOpen(false)}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveEntry} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                          Name / Identifier <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="e.g. OpenAI Production Key, Supabase Service Role, GitHub Personal Token"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                          Type
                        </label>
                        <select
                          value={formType}
                          onChange={(e) => setFormType(e.target.value as NoteEntryType)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-xs"
                        >
                          <option value="api">API Key</option>
                          <option value="token">Token / Secret</option>
                          <option value="link">Website / Resource Link</option>
                          <option value="note">Detail / Note</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Value / Token / Link / Secret <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formValue}
                          onChange={(e) => setFormValue(e.target.value)}
                          placeholder={formType === 'link' ? 'https://example.com' : 'sk_live_... or ghp_...'}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                          Environment / Tag
                        </label>
                        <input
                          type="text"
                          value={formEnv}
                          onChange={(e) => setFormEnv(e.target.value)}
                          placeholder="Production, Staging, Dev"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                        Optional Note / Purpose
                      </label>
                      <input
                        type="text"
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        placeholder="Where this key is configured, renewal date, or associated service..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEntryFormOpen(false)}
                        className="px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg text-white font-semibold bg-emerald-600 hover:bg-emerald-700 transition shadow-xs cursor-pointer"
                      >
                        {editingEntry ? 'Update Item' : 'Save to Vault'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(['all', 'api', 'token', 'link', 'note'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setTypeFilter(filterKey)}
                      className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                        typeFilter === filterKey
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {filterKey === 'all' && 'All Entries'}
                      {filterKey === 'api' && 'API Keys'}
                      {filterKey === 'token' && 'Tokens'}
                      {filterKey === 'link' && 'Links'}
                      {filterKey === 'note' && 'Notes'}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-60">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search personal keys, tokens..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                </div>
              </div>

              {/* Entries Cards List */}
              {filteredEntries.length === 0 ? (
                <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#121215] p-6">
                  <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    No matching items found in your vault
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Click "Add Details / API / Token / Link" above to store your credentials.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEntries.map((entry) => {
                    const badge = getTypeBadge(entry.type);
                    const BadgeIcon = badge.icon;
                    const isRevealed = revealedIds[entry.id];
                    const isLink = entry.type === 'link';
                    const isMaskable = entry.type === 'api' || entry.type === 'token';

                    return (
                      <div
                        key={entry.id}
                        className="p-4 rounded-xl bg-slate-50/80 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold ${badge.classes}`}>
                              <BadgeIcon className="w-3 h-3" />
                              <span>{badge.label}</span>
                            </span>

                            <h5 className="font-display font-bold text-sm text-slate-900 dark:text-white truncate">
                              {entry.title}
                            </h5>

                            {entry.environment && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-800 text-[10px] text-slate-600 dark:text-zinc-400 font-medium">
                                {entry.environment}
                              </span>
                            )}
                          </div>

                          {entry.description && (
                            <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                              {entry.description}
                            </p>
                          )}

                          {/* Value Snippet Bar */}
                          <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                            <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 truncate max-w-md select-all">
                              {isMaskable && !isRevealed
                                ? '••••••••••••••••••••••••••••••••'
                                : entry.value}
                            </div>

                            {/* Mask Toggle for secrets */}
                            {isMaskable && (
                              <button
                                onClick={() => toggleReveal(entry.id)}
                                title={isRevealed ? 'Hide Value' : 'Reveal Value'}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 transition cursor-pointer"
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            )}

                            {/* Direct Open Link */}
                            {isLink && (
                              <a
                                href={entry.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open Link"
                                className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-zinc-800 transition cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          {/* Copy Button */}
                          <button
                            onClick={() => handleCopyValue(entry.value, entry.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              copiedId === entry.id
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700'
                            }`}
                          >
                            {copiedId === entry.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEditForm(entry)}
                            title="Edit"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteEntry(entry.id, entry.title)}
                            title="Delete"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {activeTab === 'scratchpad' && (
            <div className="space-y-3 flex flex-col h-full">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Auto-saved continuously to local storage.</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(scratchpadText);
                    showNotice('Entire scratchpad copied to clipboard!');
                  }}
                  className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Text</span>
                </button>
              </div>

              <textarea
                rows={16}
                value={scratchpadText}
                onChange={(e) => handleScratchpadChange(e.target.value)}
                placeholder="Write your freeform developer notes, command snippets, temporary API payloads, or ideas..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-y"
              />
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]/50 flex items-center justify-between shrink-0 text-[11px] text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Encrypted in local browser storage. Never sent to external analytics.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Close Notepad
          </button>
        </div>
      </div>
    </div>
  );
};
