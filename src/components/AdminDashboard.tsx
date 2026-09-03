import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Bot, 
  PenTool, 
  Archive, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  Send, 
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { BlogPost, BlogStatus, CreationMethod, DashboardStats } from '../types';
import { getDashboardStats } from '../utils/blogStore';

interface AdminDashboardProps {
  posts: BlogPost[];
  onOpenManualModal: () => void;
  onOpenAgentModal: () => void;
  onViewPost: (post: BlogPost) => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (postId: string) => void;
  onDuplicatePost: (postId: string) => void;
  onTogglePublish: (postId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  posts,
  onOpenManualModal,
  onOpenAgentModal,
  onViewPost,
  onEditPost,
  onDeletePost,
  onDuplicatePost,
  onTogglePublish,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const stats: DashboardStats = getDashboardStats(posts);

  // Filtering
  const filteredPosts = posts.filter((post) => {
    // Status filter
    if (statusFilter !== 'All' && post.status !== statusFilter) return false;

    // Creation method filter
    if (methodFilter !== 'All') {
      const isAi = post.creationMethod === 'ai' || post.createdType === 'agent';
      if (methodFilter === 'ai' && !isAi) return false;
      if (methodFilter === 'manual' && isAi) return false;
    }

    // Category filter
    if (categoryFilter !== 'All' && post.category !== categoryFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(q);
      const categoryMatch = post.category.toLowerCase().includes(q);
      const authorMatch = post.author.name.toLowerCase().includes(q);
      return titleMatch || categoryMatch || authorMatch;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: BlogStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Draft
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" /> Scheduled
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <Archive className="w-3 h-3" /> Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Primary Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Blog Management Dashboard
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              Admin Access
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage blogs, draft previews, AI agent publications, and content lifecycle.
          </p>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenManualModal}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-semibold transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span>✍️ Create Manually</span>
          </button>

          <button
            onClick={onOpenAgentModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-emerald-200 animate-pulse" />
            <span>🤖 Create with AI Agent</span>
          </button>
        </div>
      </div>

      {/* 6 Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Blogs</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">{stats.totalBlogs}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 font-mono">{stats.publishedBlogs}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-400 text-xs font-medium">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400 font-mono">{stats.draftBlogs}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-1">
          <div className="flex items-center justify-between text-teal-400 text-xs font-medium">
            <span>AI-Generated</span>
            <Bot className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-bold text-teal-300 font-mono">{stats.aiGeneratedBlogs}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-500/20 space-y-1">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium">
            <span>Manual Posts</span>
            <PenTool className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-blue-300 font-mono">{stats.manualBlogs}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/20 space-y-1">
          <div className="flex items-center justify-between text-purple-400 text-xs font-medium">
            <span>Scheduled</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-300 font-mono">{stats.scheduledBlogs}</p>
        </div>

      </div>

      {/* Management Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search blogs by title, category, or author..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Method Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Method:</span>
              <select
                value={methodFilter}
                onChange={(e) => {
                  setMethodFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Methods</option>
                <option value="ai">AI Agent 🤖</option>
                <option value="manual">Manual ✍️</option>
              </select>
            </div>

          </div>

        </div>

      </div>

      {/* Blogs Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Featured Image</th>
                <th className="py-3.5 px-4">Blog Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => {
                  const isAi = post.creationMethod === 'ai' || post.createdType === 'agent';
                  return (
                    <tr key={post.id} className="hover:bg-slate-800/40 transition">
                      
                      {/* Image Preview */}
                      <td className="py-3 px-4">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-12 h-9 rounded-lg object-cover border border-slate-700"
                        />
                      </td>

                      {/* Title & Slug */}
                      <td className="py-3 px-4 max-w-xs">
                        <p 
                          onClick={() => onViewPost(post)}
                          className="font-bold text-white hover:text-cyan-400 transition cursor-pointer line-clamp-1 text-sm"
                        >
                          {post.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate font-mono">/{post.slug}</p>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950 text-cyan-300 border border-slate-800 text-[11px] font-medium">
                          {post.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-slate-300 font-medium truncate max-w-[100px]">
                            {post.author.name}
                          </span>
                        </div>
                      </td>

                      {/* Method */}
                      <td className="py-3 px-4">
                        {isAi ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <Bot className="w-3 h-3" /> AI Agent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            <PenTool className="w-3 h-3" /> Manual
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {getStatusBadge(post.status)}
                      </td>

                      {/* Published Date */}
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {post.date}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* View Action */}
                          <button
                            onClick={() => onViewPost(post)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            title="View Article"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Action */}
                          <button
                            onClick={() => onEditPost(post)}
                            className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-amber-500/20 transition"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Toggle Publish / Unpublish Action */}
                          <button
                            onClick={() => onTogglePublish(post.id)}
                            className={`p-1.5 rounded-lg transition ${
                              post.status === 'published'
                                ? 'text-slate-400 hover:text-amber-400 hover:bg-amber-500/20'
                                : 'text-emerald-400 hover:text-white hover:bg-emerald-500/20'
                            }`}
                            title={post.status === 'published' ? 'Unpublish to Draft' : 'Publish Article'}
                          >
                            <Send className="w-4 h-4" />
                          </button>

                          {/* Duplicate Action */}
                          <button
                            onClick={() => onDuplicatePost(post.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            title="Duplicate Article"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                                onDeletePost(post.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 transition"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No blogs found matching the search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{paginatedPosts.length}</strong> of{' '}
            <strong className="text-white">{filteredPosts.length}</strong> blogs
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
