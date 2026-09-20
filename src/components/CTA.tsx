import React from 'react';
import {
  Sparkles,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface CTAProps {
  onStartProject: () => void;
  onTalkToExpert: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onStartProject, onTalkToExpert }) => {
  return (
    <section id="cta" className="relative py-20 md:py-24 bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 p-8 sm:p-14 text-center shadow-xs">

          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Schedule Your Free Strategy Session</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Ready to Transform Your Enterprise Operations?
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Let's discuss how custom AI models, unified data pipelines, and intelligent process automation can unlock measurable productivity for your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <button
              id="cta-start-project-btn"
              onClick={onStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-xs transition cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="cta-talk-expert-btn"
              onClick={onTalkToExpert}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>Talk to an Architect</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Free 30-Min Architecture Discovery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Strict NDA & IP Confidentiality</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Rapid 48-Hour Scope Proposal</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
