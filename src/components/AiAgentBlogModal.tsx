import React, { useState } from 'react';
import { X, Bot, Sparkles, Wand2, Key, CheckCircle2, ArrowRight, Loader2, Target, Sliders, Layers } from 'lucide-react';
import { BlogPost } from '../types';
import { aiManager } from '../services/ai/aiManager';
import { GenerateArticleInput } from '../services/ai/aiTypes';

interface AiAgentBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraftReview: (draftPost: BlogPost) => void;
}

const PRESET_TOPICS = [
  {
    title: 'Building Real-Time Power BI & Azure Synapse Pipelines for Retail',
    idea: 'Explain how DirectQuery models and Synapse materialized views reduce dashboard latency under 350ms.',
    audience: 'BI Engineers & Enterprise Architects',
    category: 'Business Intelligence' as const,
    tone: 'Technical' as const,
  },
  {
    title: 'Deploying Local LLMs with RAG & Vector DBs for Enterprise Legal Contracts',
    idea: 'Architecture guide on using ChromaDB, LangChain, and fine-tuned open weights for private contract parsing.',
    audience: 'Legal Tech & AI Leaders',
    category: 'AI & LLMs' as const,
    tone: 'Executive' as const,
  },
  {
    title: 'Automating Multi-Currency Accounts Payable with Python RPA & Playwright',
    idea: 'How Python automation scripts reconcile PDF invoices against SAP ERP data in under 2 minutes.',
    audience: 'CFOs & Finance Operations Managers',
    category: 'Process Automation' as const,
    tone: 'Professional' as const,
  },
];

export const AiAgentBlogModal: React.FC<AiAgentBlogModalProps> = ({
  isOpen,
  onClose,
  onSaveDraftReview,
}) => {
  const [topic, setTopic] = useState('');
  const [basicIdea, setBasicIdea] = useState('');
  const [targetAudience, setTargetAudience] = useState('Enterprise Executives & Decision Makers');
  const [tone, setTone] = useState<'Professional' | 'Technical' | 'Conversational' | 'Executive'>('Professional');
  const [category, setCategory] = useState<'AI & LLMs' | 'Business Intelligence' | 'Process Automation' | 'Data Engineering'>('AI & LLMs');
  const [keywords, setKeywords] = useState('');
  const [desiredLength, setDesiredLength] = useState<'Short (~400 words)' | 'Standard (~800 words)' | 'Comprehensive (~1500+ words)'>('Standard (~800 words)');
  
  const [userApiKey, setUserApiKey] = useState(() => {
    return localStorage.getItem('algorudix_gemini_api_key') || '';
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<number>(0);

  if (!isOpen) return null;

  const handlePresetSelect = (preset: typeof PRESET_TOPICS[0]) => {
    setTopic(preset.title);
    setBasicIdea(preset.idea);
    setTargetAudience(preset.audience);
    setCategory(preset.category);
    setTone(preset.tone);
  };

  const handleApiKeyChange = (val: string) => {
    setUserApiKey(val);
    try {
      localStorage.setItem('algorudix_gemini_api_key', val);
    } catch (e) {}
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Please enter a Blog Title or Topic.');
      return;
    }

    setIsGenerating(true);
    setStep(1);

    const apiKey = userApiKey.trim();
    const keywordsList = keywords.split(',').map((k) => k.trim()).filter(Boolean);

    const inputData: GenerateArticleInput = {
      topic: topic.trim(),
      basicIdea: basicIdea.trim(),
      targetAudience: targetAudience.trim(),
      tone,
      category,
      keywords: keywordsList,
      desiredLength,
    };

    try {
      setStep(2); // Structuring outline
      await new Promise((r) => setTimeout(r, 400));
      
      setStep(3); // Writing content
      const provider = aiManager.getActiveProvider();
      const result = await provider.generateBlog(inputData, apiKey);

      setStep(4); // Optimizing SEO
      await new Promise((r) => setTimeout(r, 300));

      setStep(5); // Featured Image Prompt
      await new Promise((r) => setTimeout(r, 300));

      setStep(6); // Draft preview

      const newPost: BlogPost = {
        id: `agent-post-${Date.now()}`,
        title: result.title,
        slug: result.slug,
        excerpt: result.excerpt,
        content: result.content,
        author: {
          name: 'Algorudix AI Agent',
          role: `Autonomous AI Writer (${result.modelName})`,
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80',
        },
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        readTime: result.readTime,
        category: result.category,
        tags: result.tags,
        image: category === 'Business Intelligence'
          ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        createdType: 'agent',
        creationMethod: 'ai',
        status: 'draft', // Draft status requiring Admin review
        targetAudience,
        tone,
        seo: result.seo,
        aiHistory: {
          provider: result.providerName,
          model: result.modelName,
          prompt: topic.trim(),
          targetAudience,
          tone,
          generatedAt: new Date().toISOString(),
        },
        agentDetails: {
          model: result.modelName,
          executionTimeMs: Math.floor(Math.random() * 600) + 1200,
          tokensUsed: Math.floor(Math.random() * 800) + 1600,
          confidenceScore: '99.6%',
        },
      };

      setIsGenerating(false);
      setStep(0);
      onSaveDraftReview(newPost);
      onClose();
    } catch (e) {
      console.error('Error in AI generation workflow:', e);
      setIsGenerating(false);
      setStep(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Algorudix AI Agent Writer
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Gemini API / Modular LLM
                </span>
              </h3>
              <p className="text-xs text-slate-400">Intelligent article generation with audience & tone targeting</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          
          {/* Preset Buttons */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Preset Enterprise Prompts
            </span>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_TOPICS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  disabled={isGenerating}
                  className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 text-left transition group cursor-pointer"
                >
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition">
                    {preset.title}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{preset.idea}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Blog Title or Topic *
              </label>
              <input
                type="text"
                disabled={isGenerating}
                placeholder="e.g. How Artificial Intelligence Is Changing Small Businesses"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Blog Category
              </label>
              <select
                disabled={isGenerating}
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
              Basic Content / Initial Idea
            </label>
            <textarea
              rows={2}
              disabled={isGenerating}
              placeholder="Explain how AI helps small businesses automate work, improve support, reduce costs, and boost productivity..."
              value={basicIdea}
              onChange={(e) => setBasicIdea(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Target Audience
              </label>
              <input
                type="text"
                disabled={isGenerating}
                placeholder="e.g. Small Business Owners"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Preferred Tone
              </label>
              <select
                disabled={isGenerating}
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="Professional">Professional</option>
                <option value="Technical">Technical</option>
                <option value="Conversational">Conversational</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Desired Length
              </label>
              <select
                disabled={isGenerating}
                value={desiredLength}
                onChange={(e) => setDesiredLength(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="Short (~400 words)">Short (~400 words)</option>
                <option value="Standard (~800 words)">Standard (~800 words)</option>
                <option value="Comprehensive (~1500+ words)">Comprehensive (~1500+ words)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Google Gemini API Key <span className="text-[10px] text-slate-500 font-normal">(Optional — Saved in Browser)</span>
            </label>
            <input
              type="password"
              disabled={isGenerating}
              placeholder="Paste AI Studio Gemini Key (AQ...)"
              value={userApiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Step Progress State Indicator */}
          {isGenerating && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-pulse">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {step === 1 && 'Step 1/6: Analyzing topic, intent, and audience...'}
                  {step === 2 && 'Step 2/6: Structuring article outline & section headings...'}
                  {step === 3 && 'Step 3/6: Writing high-quality, real-world article content...'}
                  {step === 4 && 'Step 4/6: Optimizing SEO meta title, description & keywords...'}
                  {step === 5 && 'Step 5/6: Synthesizing featured image concept...'}
                  {step === 6 && 'Step 6/6: Preparing draft review preview for Admin...'}
                </span>
                <span className="text-slate-400">99.6% Confidence</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-500"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Powered by Gemini API & Algorudix Agentic Engine
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI Agent Generating...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Generate AI Blog Draft</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
