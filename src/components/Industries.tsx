import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  HeartPulse,
  Landmark,
  Factory,
  Rocket,
  GraduationCap,
  Truck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/companyData';
import { IndustryItem } from '../types';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  HeartPulse,
  Landmark,
  Factory,
  Rocket,
  GraduationCap,
  Truck,
};

interface IndustriesProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onOpenConsultation }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(INDUSTRIES_DATA[0]);

  return (
    <section id="industries" className="relative py-20 md:py-28 bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Domain-Specific Solutions</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Industries We Serve
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            We deliver sector-tailored AI models, regulatory compliance workflows, and customized analytics architectures.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {INDUSTRIES_DATA.map((ind) => {
            const IconComponent = iconMap[ind.icon] || Rocket;
            const isSelected = selectedIndustry?.id === ind.id;

            return (
              <div
                key={ind.id}
                id={`industry-card-${ind.id}`}
                onClick={() => setSelectedIndustry(ind)}
                className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white dark:bg-[#18181b] border-2 border-[#D97757] shadow-md ring-1 ring-[#D97757]/30'
                    : 'bg-slate-50/70 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Top Right Industry Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      {ind.impactMetric}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">
                    {ind.name}
                  </h3>

                  <p className="text-slate-500 dark:text-zinc-400 text-xs leading-relaxed mb-4">
                    {ind.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Domain Stack</span>
                  <span
                    className={`flex items-center font-semibold text-xs transition-colors ${
                      isSelected
                        ? 'text-[#C15F3C] dark:text-[#F0997D]'
                        : 'text-emerald-600 dark:text-emerald-400 group-hover:text-[#C15F3C] dark:group-hover:text-[#F0997D]'
                    }`}
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Industry Spotlight Drawer */}
        {selectedIndustry && (
          <div className="rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Sector Deep-Dive: {selectedIndustry.name}</span>
                </div>
                <p className="text-slate-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                  {selectedIndustry.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedIndustry.useCases.map((useCase, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800 text-center">
                  <div className="text-xs text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                    Typical Sector Impact
                  </div>
                  <div className="font-display font-bold text-2xl text-[#C15F3C] dark:text-[#F0997D] mt-0.5">
                    {selectedIndustry.impactMetric}
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation(`${selectedIndustry.name} Solutions`)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Request {selectedIndustry.name} Strategy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

