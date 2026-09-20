import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  ExternalLink,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  Lock,
  LogOut,
  ShieldCheck,
  Globe,
  Layers,
  ArrowLeft,
  CheckCircle2,
  FolderGit2,
  Cpu,
  Terminal,
  BookOpen,
  StickyNote
} from 'lucide-react';
import { DevHubItem, DevHubCategory } from '../types/devHub';
import {
  getDevHubItems,
  addDevHubItem,
  updateDevHubItem,
  deleteDevHubItem,
  moveDevHubItem
} from '../utils/devHubStore';
import { DevHubModal } from './DevHubModal';
import { AdminOtpModal } from './AdminOtpModal';
import { PersonalNotepadModal } from './PersonalNotepadModal';
import { getAdminSession, logoutAdmin, AdminSession } from '../utils/adminAuth';

interface DevelopmentHubProps {
  onNavigateHome: () => void;
}

export const DevelopmentHub: React.FC<DevelopmentHubProps> = ({ onNavigateHome }) => {
  const [items, setItems] = useState<DevHubItem[]>(() => getDevHubItems());
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getAdminSession());
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // Modal State
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DevHubItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<DevHubItem | null>(null);
  const [isNotepadModalOpen, setIsNotepadModalOpen] = useState(false);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<DevHubCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Check session validity periodically
  useEffect(() => {
    const session = getAdminSession();
    setAdminSession(session);
  }, []);

  const categories: DevHubCategory[] = ['All', 'Websites', 'Projects', 'Tools', 'Resources'];

  const handleAdminLogout = () => {
    logoutAdmin();
    setAdminSession(null);
  };

  const handleSaveCard = (itemData: Omit<DevHubItem, 'id' | 'orderIndex' | 'createdAt' | 'updatedAt'> | DevHubItem) => {
    if ('id' in itemData) {
      const updated = updateDevHubItem(itemData as DevHubItem);
      setItems(updated);
    } else {
      const updated = addDevHubItem(itemData);
      setItems(updated);
    }
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const updated = deleteDevHubItem(itemToDelete.id);
    setItems(updated);
    setItemToDelete(null);
  };

  const handleMoveCard = (id: string, direction: 'up' | 'down') => {
    const updated = moveDevHubItem(id, direction);
    setItems(updated);
  };

  const filteredItems = items
    .filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-slate-900 dark:text-white pt-24 pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-zinc-800/80">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </button>

          {/* Admin Status / Personal Notepad / Login Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Personal Notepad Button */}
            <button
              type="button"
              id="open-personal-notepad-btn"
              onClick={() => {
                if (adminSession) {
                  setIsNotepadModalOpen(true);
                } else {
                  setIsOtpModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs font-semibold transition cursor-pointer shadow-2xs"
            >
              <StickyNote className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Personal Notepad</span>
            </button>

            {adminSession ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Admin: {adminSession.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-medium transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsOtpModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Developer Ecosystem & Repositories</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Development Hub
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            A centralized showcase of production websites, AI developer tools, microservice architectures, and engineering resources created by Algorudix.
          </p>
        </div>

        {/* Admin Action Bar (Visible only when logged in as Admin) */}
        {adminSession && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Administrator Management Console
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  You have full privileges to add, update, reorder, and remove development resource cards.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setIsNotepadModalOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 transition inline-flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
              >
                <StickyNote className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Personal Notepad & Vault</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCardModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs hover:shadow-md transition inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Resource</span>
              </button>
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, projects, URLs..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Development Hub Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/30 p-8">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              No development resources found
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              {searchQuery ? 'Try adjusting your search query or category filter.' : 'Add your first development project or website to showcase here.'}
            </p>
            {adminSession && (
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCardModalOpen(true);
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Resource Card</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                id={`devhub-card-${item.id}`}
                className="p-6 rounded-2xl bg-slate-50/70 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Logo/Image & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    {item.imageUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to icon if image fails
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Terminal className="w-5 h-5" />
                      </div>
                    )}

                    {/* Top Right Badge: Claude Terracotta Orange */}
                    <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      {item.badge || item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>

                  {/* Category Pill / Subheader */}
                  <span className="inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-3">
                    {item.category}
                  </span>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* URL Snippet */}
                  <div className="pt-3 pb-4 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 truncate">
                    <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{item.url.replace(/^https?:\/\//, '')}</span>
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center gap-2">
                    {/* Open / View Primary Button */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-xs hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Open Website / Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Admin Actions (Visible only to Admin) */}
                    {adminSession && (
                      <div className="flex items-center gap-1 shrink-0 bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 rounded-xl p-1">
                        <button
                          onClick={() => handleMoveCard(item.id, 'up')}
                          disabled={index === 0}
                          title="Move Card Left / Up"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveCard(item.id, 'down')}
                          disabled={index === filteredItems.length - 1}
                          title="Move Card Right / Down"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setIsCardModalOpen(true);
                          }}
                          title="Edit Card"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setItemToDelete(item);
                          }}
                          title="Delete Card"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Admin OTP Modal (Reusing existing admin authentication) */}
      <AdminOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onLoginSuccess={() => {
          const session = getAdminSession();
          setAdminSession(session);
        }}
      />

      {/* Add / Edit DevHub Card Modal */}
      <DevHubModal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveCard}
        initialItem={editingItem}
      />

      {/* Custom Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Delete Development Resource?
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-slate-800 dark:text-zinc-200 font-semibold">"{itemToDelete.title}"</strong>? This will remove it from the Development Hub.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-delete-btn"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-xs hover:shadow-md transition cursor-pointer"
              >
                Delete Resource
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Personal Notepad & Vault Modal */}
      <PersonalNotepadModal
        isOpen={isNotepadModalOpen}
        onClose={() => setIsNotepadModalOpen(false)}
      />
    </div>
  );
};
