import React from 'react';
import {
  Brain,
  BarChart3,
  Database,
  Cpu,
  Code2,
  Cloud,
  ArrowRight,
  Sparkles,
  Check,
  Layers
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onBookService: (serviceName: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Brain,
  BarChart3,
  Database,
  Cpu,
  Code2,
  Cloud,
};

export const Services: React.FC<ServicesProps> = ({ onSelectService, onBookService }) => {
  return (
    <section id="services" className="relative py-20 md:py-28 bg-slate-50/60 dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Comprehensive Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            End-to-End Enterprise Services & Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            From proprietary generative AI models to executive Power BI dashboards and custom software, our engineers build robust, scalable business infrastructure.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.icon] || Layers;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Top Right Category Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-1 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6 border-t border-slate-100 dark:border-zinc-800/80 pt-4">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center text-xs font-semibold text-slate-900 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>

                  {/* Request Scope Button: Executive Obsidian Charcoal Accent */}
                  <button
                    onClick={() => onBookService(service.title)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-black dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer"
                  >
                    Request Scope
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              Need a bespoke multi-service architecture or hybrid cloud stack?
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Our principal architects craft cross-functional AI pipelines and ETL systems tailored to your specific infrastructure.
            </p>
          </div>
          <button
            onClick={() => onBookService('Custom Multi-Service Architecture')}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition shadow-xs cursor-pointer shrink-0"
          >
            Consult Our Architects
          </button>
        </div>

      </div>
    </section>
  );
};
