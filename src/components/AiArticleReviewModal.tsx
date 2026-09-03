import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  RefreshCw, 
  Image as ImageIcon, 
  Send, 
  FileText, 
  Search,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { BlogPost, BlogStatus } from '../types';
import { aiManager } from '../services/ai/aiManager';

interface AiArticleReviewModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSave: (updatedPost: BlogPost, finalStatus: BlogStatus) => void;
}

export const AiArticleReviewModal: React.FC<AiArticleReviewModalProps> = ({
  post,
  onClose,
  onSave,
}) => {
  if (!post) return null;

  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [image, setImage] = useState(post.image);
  const [seoTitle, setSeoTitle] = useState(post.seo?.seoTitle || post.title);
  const [metaDesc, setMetaDesc] = useState(post.seo?.metaDescription || post.excerpt);
  const [keywordsStr, setKeywordsStr] = useState(post.seo?.keywords?.join(', ') || post.tags.join(', '));
  
  const [sectionInstruction, setSectionInstruction] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // SEO Health Checks
  const titleLen = seoTitle.length;
  const descLen = metaDesc.length;
  const titleOk = titleLen >= 40 && titleLen <= 65;
  const descOk = descLen >= 120 && descLen <= 165;
  const seoScore = (titleOk ? 50 : 25) + (descOk ? 50 : 25);

  const handleRegenerateSection = async () => {
    if (!sectionInstruction.trim()) {
      alert('Please enter an instruction (e.g. "Make the architecture section more technical with a Python code example")');
      return;
    }

    setIsRegenerating(true);
    try {
      const provider = aiManager.getActiveProvider();
      if (provider.regenerateSection) {
        const rewritten = await provider.regenerateSection(content, sectionInstruction);
        setContent(rewritten);
      } else {
        setContent((prev) => `${prev}\n\n### Updated Section\n*Modified: ${sectionInstruction}*\n\nAdded technical enhancements to content.`);
      }
      setSectionInstruction('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleRegenerateImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    ];
    const nextImg = images[Math.floor(Math.random() * images.length)];
    setImage(nextImg);
  };

  const handleSaveAction = (targetStatus: BlogStatus) => {
    const tags = keywordsStr.split(',').map((k) => k.trim()).filter(Boolean);
    const updated: BlogPost = {
      ...post,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category,
      image,
      tags: tags.length ? tags : post.tags,
      status: targetStatus,
      seo: {
        seoTitle: seoTitle.trim(),
        metaDescription: metaDesc.trim(),
        keywords: tags,
        score: seoScore,
      },
    };

    onSave(updated, targetStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Review & Refine AI Article Draft
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Draft Mode
                </span>
              </h3>
              <p className="text-xs text-slate-400">Review content, tune SEO, or regenerate sections before publishing</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* SEO Health Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg font-mono font-bold text-sm ${seoScore > 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {seoScore}/100
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">SEO Health Score</p>
                <p className="text-[11px] text-slate-400">
                  Title: {titleLen} chars ({titleOk ? 'Optimal' : 'Needs tuning'}) | Meta Desc: {descLen} chars ({descOk ? 'Optimal' : 'Needs tuning'})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRegenerateImage}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Swap Image</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Article Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="AI & LLMs">AI & LLMs</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Process Automation">Process Automation</option>
                <option value="Data Engineering">Data Engineering</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Short Excerpt
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* AI Section Regeneration Tool */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Section Refiner & Regenerator
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. Expand section on DAX aggregation performance with code example"
                value={sectionInstruction}
                onChange={(e) => setSectionInstruction(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleRegenerateSection}
                disabled={isRegenerating}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isRegenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Regenerate Section</span>
              </button>
            </div>
          </div>

          {/* Article Markdown Editor */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Article Content (Markdown)
            </label>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* SEO Override Settings */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">SEO Meta & OpenGraph Settings</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">SEO Meta Title ({seoTitle.length} chars)</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={keywordsStr}
                  onChange={(e) => setKeywordsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Meta Description ({metaDesc.length} chars)</label>
              <textarea
                rows={2}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>

        </div>

        {/* Footer Action Buttons */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSaveAction('draft')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveAction('published')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Article Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
