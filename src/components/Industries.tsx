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
  TrendingUp
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
    <section id="industries" className="relative py-24 bg-[#0b0f19] border-t border-slate-800/60">
      
      {/* Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Domain Expertise</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Industries{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              We Serve
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            We deliver industry-specific AI models, automated compliance workflows, and customized analytics dashboards engineered for your sector.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {INDUSTRIES_DATA.map((ind) => {
            const IconComponent = iconMap[ind.icon] || Rocket;
            const isSelected = selectedIndustry?.id === ind.id;

            return (
              <div
                key={ind.id}
                id={`industry-card-${ind.id}`}
                onClick={() => setSelectedIndustry(ind)}
                className={`group rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-900 border-cyan-500/60 shadow-xl shadow-cyan-950/50 -translate-y-1'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 scale-105' 
                        : 'bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800/80'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {ind.impactMetric}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold text-base mb-1.5 transition-colors ${
                    isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {ind.name}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {ind.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Domain Solutions</span>
                  <span className={`flex items-center text-xs font-semibold ${
                    isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}>
                    View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Industry Spotlight Drawer */}
        {selectedIndustry && (
          <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-blue-950/50 to-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Sector Deep-Dive: {selectedIndustry.name}</span>
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                  {selectedIndustry.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedIndustry.useCases.map((useCase, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Typical Sector ROI</div>
                  <div className="font-display font-extrabold text-2xl text-emerald-400 mt-0.5">
                    {selectedIndustry.impactMetric}
                  </div>
                </div>
                <button
                  onClick={() => onOpenConsultation(`${selectedIndustry.name} Solutions`)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
