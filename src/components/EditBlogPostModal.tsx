import React, { useState, useEffect } from 'react';
import { X, Edit3, Image, User, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../types';

interface EditBlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSaveEdit: (updatedPost: BlogPost) => void;
}

export const EditBlogPostModal: React.FC<EditBlogPostModalProps> = ({
  post,
  onClose,
  onSaveEdit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'AI & LLMs' | 'Business Intelligence' | 'Process Automation' | 'Data Engineering'>('AI & LLMs');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [image, setImage] = useState('');
  const [readTime, setReadTime] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setAuthorName(post.author.name);
      setAuthorRole(post.author.role);
      setImage(post.image);
      setReadTime(post.readTime);
      setTagsStr(post.tags.join(', '));
      setExcerpt(post.excerpt);
      setContent(post.content);
    }
  }, [post]);

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      alert('Please fill out Title, Author Name, and Article Content.');
      return;
    }

    const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

    const updatedPost: BlogPost = {
      ...post,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      author: {
        ...post.author,
        name: authorName.trim(),
        role: authorRole.trim() || 'Enterprise Consultant',
      },
      readTime: readTime.trim() || '4 min read',
      category,
      tags: tags.length ? tags : post.tags,
      image: image.trim() || post.image,
    };

    onSaveEdit(updatedPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Edit Blog Article (Admin Only)</h3>
              <p className="text-xs text-slate-400">Modify published post details & content</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="AI & LLMs">AI & LLMs</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Process Automation">Process Automation</option>
                <option value="Data Engineering">Data Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Author Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Header Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Comma-Separated Tags
            </label>
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Excerpt / Summary
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Article Content * (Markdown #, ##, ``` code)
            </label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
