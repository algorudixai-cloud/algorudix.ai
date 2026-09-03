import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Bot, 
  PenTool, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  User, 
  CheckCircle2,
  TrendingUp,
  Cpu,
  Plus,
  ArrowLeft,
  ShieldCheck,
  Lock,
  LogOut,
  Edit3,
  Trash2,
  LayoutDashboard,
  Globe
} from 'lucide-react';
import { BlogPost, BlogStatus } from '../types';
import { BlogArticleModal } from './BlogArticleModal';
import { CreateBlogPostModal } from './CreateBlogPostModal';
import { AiAgentBlogModal } from './AiAgentBlogModal';
import { EditBlogPostModal } from './EditBlogPostModal';
import { AdminOtpModal } from './AdminOtpModal';
import { AdminDashboard } from './AdminDashboard';
import { AiArticleReviewModal } from './AiArticleReviewModal';
import { getAdminSession, logoutAdmin, AdminSession, AUTHORIZED_ADMIN_EMAIL } from '../utils/adminAuth';
import { 
  getAllPosts, 
  addPostToStore, 
  updatePostInStore, 
  deletePostFromStore, 
  duplicatePostInStore, 
  togglePublishStatusInStore 
} from '../utils/blogStore';

interface BlogProps {
  onOpenConsultation: (serviceName?: string) => void;
  onBackToHome?: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onOpenConsultation, onBackToHome }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => getAllPosts());

  // Admin Auth & Tab State
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getAdminSession());
  const [adminViewMode, setAdminViewMode] = useState<'dashboard' | 'public'>('dashboard');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // Modals state
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [reviewDraftPost, setReviewDraftPost] = useState<BlogPost | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  // Public View Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'agent' | 'manual'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sync state to local storage repository
  const refreshPosts = (updatedList: BlogPost[]) => {
    setPosts(updatedList);
  };

  // Admin Actions
  const handleAddManualPost = (newPost: BlogPost) => {
    if (!adminSession) return;
    const updated = addPostToStore({ ...newPost, status: 'published' });
    refreshPosts(updated);
    setSelectedPost(newPost);
  };

  const handleSaveDraftReview = (draftPost: BlogPost) => {
    if (!adminSession) return;
    const updated = addPostToStore(draftPost);
    refreshPosts(updated);
    // Open review modal to allow admin edit/publish
    setReviewDraftPost(draftPost);
  };

  const handleSaveReviewFinal = (finalPost: BlogPost, status: BlogStatus) => {
    const updated = updatePostInStore({ ...finalPost, status });
    refreshPosts(updated);
  };

  const handleSaveEditPost = (updatedPost: BlogPost) => {
    if (!adminSession) return;
    const updated = updatePostInStore(updatedPost);
    refreshPosts(updated);
    if (selectedPost?.id === updatedPost.id) {
      setSelectedPost(updatedPost);
    }
  };

  const handleDeletePost = (postId: string) => {
    if (!adminSession) return;
    const updated = deletePostFromStore(postId);
    refreshPosts(updated);
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
    }
  };

  const handleDuplicatePost = (postId: string) => {
    if (!adminSession) return;
    const updated = duplicatePostInStore(postId);
    refreshPosts(updated);
  };

  const handleTogglePublish = (postId: string) => {
    if (!adminSession) return;
    const updated = togglePublishStatusInStore(postId);
    refreshPosts(updated);
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    setAdminSession(null);
  };

  const handleLoginSuccess = () => {
    setAdminSession(getAdminSession());
    setAdminViewMode('dashboard');
  };

  // Public visitor view filtering (ONLY published posts for non-admins)
  const visiblePosts = adminSession && adminViewMode === 'dashboard'
    ? posts
    : posts.filter((p) => p.status === 'published');

  const filteredPosts = visiblePosts.filter((post) => {
    if (activeTab === 'agent' && (post.creationMethod !== 'ai' && post.createdType !== 'agent')) return false;
    if (activeTab === 'manual' && (post.creationMethod !== 'manual' && post.createdType !== 'manual')) return false;
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(q);
      const excerptMatch = post.excerpt.toLowerCase().includes(q);
      const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(q));
      const authorMatch = post.author.name.toLowerCase().includes(q);
      return titleMatch || excerptMatch || tagMatch || authorMatch;
    }

    return true;
  });

  const categories = ['All', 'AI & LLMs', 'Business Intelligence', 'Process Automation', 'Data Engineering'];

  return (
    <section id="blog" className="pt-32 pb-24 bg-[#0b0f19] relative min-h-screen">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Navigation & Admin Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {onBackToHome ? (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Algorudix Homepage</span>
            </button>
          ) : <div />}

          {/* Admin Status & Mode Toggle */}
          {adminSession ? (
            <div className="flex items-center gap-3">
              {/* View Switcher: Admin Dashboard vs Public Preview */}
              <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setAdminViewMode('dashboard')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    adminViewMode === 'dashboard'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
                <button
                  onClick={() => setAdminViewMode('public')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    adminViewMode === 'public'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Public View Preview</span>
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-mono text-cyan-300 font-semibold hidden sm:inline">{AUTHORIZED_ADMIN_EMAIL}</span>
                <button
                  onClick={handleAdminLogout}
                  className="ml-1 px-2 py-0.5 rounded bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition"
                  title="Log out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsOtpModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Login ({AUTHORIZED_ADMIN_EMAIL})</span>
            </button>
          )}
        </div>

        {/* ADMIN DASHBOARD VIEW */}
        {adminSession && adminViewMode === 'dashboard' ? (
          <AdminDashboard
            posts={posts}
            onOpenManualModal={() => setIsManualModalOpen(true)}
            onOpenAgentModal={() => setIsAgentModalOpen(true)}
            onViewPost={(post) => setSelectedPost(post)}
            onEditPost={(post) => setEditingPost(post)}
            onDeletePost={handleDeletePost}
            onDuplicatePost={handleDuplicatePost}
            onTogglePublish={handleTogglePublish}
          />
        ) : (
          /* PUBLIC BLOG WEBSITE VIEW */
          <div className="space-y-12 animate-in fade-in duration-200">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide mb-4 shadow-sm shadow-cyan-950">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Engineering Insights & AI Intelligence</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Algorudix <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Blog & Technical Journal</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
                  Explore in-depth articles on AI Agents, Power BI DirectQuery optimization, Python RPA, and custom vector search architectures — published by enterprise consultants & our autonomous AI agent.
                </p>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-4">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Post Type Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80 shrink-0 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'all'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Published ({visiblePosts.length})
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('agent')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      activeTab === 'agent'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-emerald-400'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    AI Agent ({visiblePosts.filter((p) => p.creationMethod === 'ai' || p.createdType === 'agent').length})
                  </button>

                  <button
                    onClick={() => setActiveTab('manual')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      activeTab === 'manual'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-blue-400'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    Manual Posts ({visiblePosts.filter((p) => p.creationMethod === 'manual' || p.createdType === 'manual').length})
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search articles or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/60 scrollbar-none">
                <span className="text-[11px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-slate-400" /> Filter Category:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 font-semibold'
                        : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Blog Post Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const isAi = post.creationMethod === 'ai' || post.createdType === 'agent';
                  return (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-cyan-500/50 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                    >
                      {/* Featured Badge */}
                      {post.featured && (
                        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-cyan-500/90 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
                          Featured Article
                        </div>
                      )}

                      {/* Image */}
                      <div>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                              {post.category}
                            </span>
                            
                            {isAi ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-500/40">
                                <Bot className="w-3 h-3 text-emerald-400" /> AI Agent
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950/90 backdrop-blur-md text-blue-300 border border-blue-500/40">
                                <User className="w-3 h-3 text-blue-400" /> Manual
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Text */}
                        <div className="p-6 space-y-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6 pt-0 border-t border-slate-800/40 mt-4">
                        <div className="flex items-center justify-between text-xs text-slate-400 pt-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full object-cover border border-slate-700"
                            />
                            <span className="font-medium text-slate-300 truncate max-w-[110px]">
                              {post.author.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                          <span className="flex items-center gap-1">Read Full Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 max-w-md mx-auto my-12">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">No published articles found</h4>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or category filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setActiveTab('all');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Article Full View Modal */}
      <BlogArticleModal
        post={selectedPost}
        isAdmin={Boolean(adminSession)}
        onClose={() => setSelectedPost(null)}
        onOpenConsultation={onOpenConsultation}
        onEdit={(postToEdit) => setEditingPost(postToEdit)}
        onDelete={handleDeletePost}
      />

      {/* Admin Draft Review Modal */}
      <AiArticleReviewModal
        post={reviewDraftPost}
        onClose={() => setReviewDraftPost(null)}
        onSave={handleSaveReviewFinal}
      />

      {/* Admin Edit Modal */}
      {adminSession && (
        <EditBlogPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSaveEdit={handleSaveEditPost}
        />
      )}

      {/* Admin Manual Post Creator Modal */}
      {adminSession && (
        <CreateBlogPostModal
          isOpen={isManualModalOpen}
          onClose={() => setIsManualModalOpen(false)}
          onSavePost={handleAddManualPost}
        />
      )}

      {/* Admin AI Agent Blog Writer Modal */}
      {adminSession && (
        <AiAgentBlogModal
          isOpen={isAgentModalOpen}
          onClose={() => setIsAgentModalOpen(false)}
          onSaveDraftReview={handleSaveDraftReview}
        />
      )}

      {/* Admin OTP Login Modal */}
      <AdminOtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </section>
  );
};
