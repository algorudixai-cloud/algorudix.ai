import React from 'react';
import {
  Sparkles,
  Layers,
  TrendingUp,
  ShieldCheck,
  Scale,
  CheckCircle2,
  Check,
  ArrowRight,
  Zap,
  Lock,
  Clock
} from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../data/companyData';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Layers,
  TrendingUp,
  ShieldCheck,
  Scale,
};

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  return (
    <section id="why-us" className="relative py-20 md:py-28 bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Value & Competitive Edge</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Why Businesses Choose Algorudix
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            We merge software engineering rigor with business analyst domain expertise to deliver production solutions that generate real commercial impact.
          </p>
        </div>

        {/* 5 Core Pillars Grid + Action Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {WHY_CHOOSE_US_DATA.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className="p-6 rounded-2xl bg-slate-50/70 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Top Right Metric Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-1 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      {item.metrics}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h3>

                  <span className="inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-3">
                    {item.highlight}
                  </span>

                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                  <span>Enterprise Grade</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium inline-flex items-center">
                    Verified Impact <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quick Consultation Spotlight Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white dark:bg-[#18181b] border border-slate-900 dark:border-zinc-800 flex flex-col justify-between shadow-xs hover:border-[#D97757]/40 transition-all duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF3EC] text-[#C15F3C] border border-[#E8B29E] dark:bg-[#D97757]/15 dark:text-[#F0997D] dark:border-[#D97757]/35 text-xs font-bold mb-4 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-[#C15F3C] dark:text-[#F0997D]" />
                <span>Rapid Prototyping</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Need a Feasibility Proof-of-Concept in 14 Days?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Validate data readiness, pipeline throughput, and AI model precision with our 2-week technical pilot program.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison / Trust Matrix Strip */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Full IP Ownership</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                You retain 100% intellectual property ownership of all custom models, ETL workflows, and repository code.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Strict Enterprise Security</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                Air-gapped VPC deployments, granular RBAC access controls, and zero third-party training data leakage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Predictable Agile Sprints</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                Transparent weekly burndown milestones, clear deliverables, and zero surprise infrastructure lock-in.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
