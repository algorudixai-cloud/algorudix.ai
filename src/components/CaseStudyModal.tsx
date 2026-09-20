import React from 'react';
import {
  X,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Bot,
  BarChart3,
  Database,
  AppWindow,
  Target,
  Cpu
} from 'lucide-react';
import { CaseStudyItem } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudyItem | null;
  onClose: () => void;
  onStartSimilarProject: (projectTitle: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Bot,
  BarChart3,
  Database,
  AppWindow,
};

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onStartSimilarProject,
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="case-study-modal-card"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-xl text-slate-900 dark:text-zinc-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20">
              {caseStudy.industry}
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400">Enterprise Case Study</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {caseStudy.title}
          </h3>
          <p className="text-slate-600 dark:text-zinc-300 text-sm mt-1">
            {caseStudy.tagline}
          </p>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {caseStudy.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800 text-center"
            >
              <div className="font-display font-bold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">
                {metric.value}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Deep Dive Breakdown */}
        <div className="space-y-5 text-sm text-slate-600 dark:text-zinc-300">
          {/* Challenge Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs uppercase font-semibold tracking-wider mb-1.5">
              <Target className="w-4 h-4" />
              <span>The Client Challenge</span>
            </div>
            <p className="leading-relaxed text-slate-700 dark:text-zinc-300 text-xs sm:text-sm">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs uppercase font-semibold tracking-wider mb-1.5">
              <Cpu className="w-4 h-4" />
              <span>Technical Solution & Architecture</span>
            </div>
            <p className="leading-relaxed text-slate-700 dark:text-zinc-300 text-xs sm:text-sm">
              {caseStudy.solution}
            </p>
          </div>

          {/* Quantified Results Section */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Measurable Business Outcomes</span>
            </h4>
            <div className="space-y-2">
              {caseStudy.results.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-800 dark:text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Employed */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Technologies Deployed
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-7 pt-5 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-medium transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartSimilarProject(caseStudy.title);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Engineer a Similar System</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
