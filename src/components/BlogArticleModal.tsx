import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Bot, 
  User, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Edit3, Trash2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogArticleModalProps {
  post: BlogPost | null;
  isAdmin?: boolean;
  onClose: () => void;
  onOpenConsultation: (serviceName?: string) => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (postId: string) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  post,
  isAdmin,
  onClose,
  onOpenConsultation,
  onEdit,
  onDelete,
}) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {post.category}
            </span>
            {post.createdType === 'agent' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Bot className="w-3.5 h-3.5" /> AI Agent Generated
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <User className="w-3.5 h-3.5" /> Consultant Insight
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Admin Controls inside Modal Header */}
            {isAdmin && (
              <>
                <button
                  onClick={() => onEdit && onEdit(post)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition flex items-center gap-1 cursor-pointer"
                  title="Edit post (Admin Only)"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Post
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                      onDelete && onDelete(post.id);
                      onClose();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition flex items-center gap-1 cursor-pointer"
                  title="Delete post (Admin Only)"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Post
                </button>
              </>
            )}

            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
          
          {/* Article Banner Image */}
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg border border-slate-800">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Author & Date Meta Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-11 h-11 rounded-full object-cover border border-cyan-500/40"
              />
              <div>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  {post.author.name}
                  {post.createdType === 'agent' && (
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </p>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* AI Agent Telemetry Metadata Card (If generated by Agent) */}
          {post.createdType === 'agent' && post.agentDetails && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">AI Agent Telemetry:</span>
                <span>Model: {post.agentDetails.model}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>Latency: {post.agentDetails.executionTimeMs}ms</span>
                <span>Tokens: {post.agentDetails.tokensUsed}</span>
                <span className="text-emerald-400 font-semibold">Confidence: {post.agentDetails.confidenceScore}</span>
              </div>
            </div>
          )}

          {/* Formatted Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4 border-b border-slate-800 pb-2">
                    {trimmed.replace('# ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-semibold text-cyan-300 pt-3">
                    {trimmed.replace('## ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-base font-semibold text-slate-100 pt-2">
                    {trimmed.replace('### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('```')) {
                const codeLines = trimmed.split('\n');
                const lang = codeLines[0].replace('```', '');
                const codeContent = codeLines.slice(1, -1).join('\n');
                return (
                  <div key={idx} className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs sm:text-sm">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs font-semibold flex items-center justify-between">
                      <span>{lang || 'code'}</span>
                      <span>Snippet</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-cyan-300">
                      <code>{codeContent}</code>
                    </pre>
                  </div>
                );
              }

              return (
                <p key={idx} className="text-slate-300">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Tags:</span>
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2.5 py-1 text-xs rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" /> Ready to implement this solution?
              </div>
              <h4 className="text-lg font-bold text-white">
                Book an Enterprise Strategy & AI Audit
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Consult with our senior AI engineers & BI architects to build custom solutions tailored for your business.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation(post.category);
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs sm:text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Consult an Expert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
