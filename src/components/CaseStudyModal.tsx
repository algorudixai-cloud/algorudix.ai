import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Bot, 
  BarChart3, 
  Database, 
  AppWindow,
  Target,
  ShieldCheck,
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

  const IconComponent = iconMap[caseStudy.iconName] || Bot;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="case-study-modal-card"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-slate-900 via-[#0d1424] to-slate-950 border border-slate-700 p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
              {caseStudy.industry}
            </span>
            <span className="text-xs text-slate-400">Production Case Study</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {caseStudy.title}
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            {caseStudy.tagline}
          </p>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {caseStudy.metrics.map((metric, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="font-display font-black text-xl sm:text-2xl text-cyan-300">
                {metric.value}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Deep Dive Breakdown */}
        <div className="space-y-6 text-sm text-slate-300">
          
          {/* Challenge Section */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-rose-400 text-xs uppercase font-semibold tracking-wider mb-2">
              <Target className="w-4 h-4" />
              <span>The Client Challenge</span>
            </div>
            <p className="leading-relaxed text-slate-300 text-xs sm:text-sm">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase font-semibold tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>Our Technical Solution & Architecture</span>
            </div>
            <p className="leading-relaxed text-slate-300 text-xs sm:text-sm">
              {caseStudy.solution}
            </p>
          </div>

          {/* Quantified Results Section */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Measurable Business Results</span>
            </h4>
            <div className="space-y-2">
              {caseStudy.results.map((result, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Employed */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Technologies Deployed
            </h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartSimilarProject(caseStudy.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Build a Similar System for Your Company</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
