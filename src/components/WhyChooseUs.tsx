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
    <section id="why-us" className="relative py-24 bg-gradient-to-b from-[#0b0f19] via-[#0d1424] to-[#0b0f19] border-t border-slate-800/60">
      
      {/* Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Value & Competitive Advantage</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Why Businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Choose Us
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            We combine cutting-edge technical mastery with deep commercial acumen to build software and data systems that deliver measurable bottom-line returns.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US_DATA.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const isWide = index === 3 || index === 4;

            return (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className={`group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between ${
                  isWide ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 font-semibold">
                      {item.metrics}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <span className="inline-block text-xs font-semibold text-cyan-400/90 mb-3">
                    {item.highlight}
                  </span>

                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Enterprise Grade</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Verified ROI <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quick Consultation Spotlight Card */}
          <div className="rounded-2xl bg-gradient-to-br from-cyan-950/80 via-blue-950/80 to-indigo-950/80 border border-cyan-500/40 p-7 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-semibold mb-4 border border-cyan-400/20">
                <Zap className="w-3.5 h-3.5" />
                <span>Rapid Prototyping</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Need a Proof-of-Concept in 14 Days?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Test feasibility and validate AI accuracy with our rapid 2-week enterprise pilot program.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Comparison / Trust Matrix Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/90 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Full IP Ownership</h4>
              <p className="text-xs text-slate-400 mt-1">You retain 100% intellectual property ownership of all custom models, pipelines, and code.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Strict Enterprise Security</h4>
              <p className="text-xs text-slate-400 mt-1">End-to-end encryption, SOC-2 readiness, and isolated private cloud model deployments.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Predictable Sprints & Budgets</h4>
              <p className="text-xs text-slate-400 mt-1">Transparent milestones, transparent weekly burndown reports, and zero hidden licensing fees.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
