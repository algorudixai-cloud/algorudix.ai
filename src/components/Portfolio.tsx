import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  BarChart3,
  Database,
  AppWindow,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { CASE_STUDIES_DATA } from '../data/companyData';
import { CaseStudyItem } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Bot,
  BarChart3,
  Database,
  AppWindow,
};

interface PortfolioProps {
  onSelectCaseStudy: (study: CaseStudyItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectCaseStudy }) => {
  return (
    <section id="portfolio" className="relative py-20 md:py-28 bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Proven Enterprise Impact</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Featured Case Studies
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            Explore how our AI engineering and business analytics delivered measurable ROI, automated workflows, and high-performance software.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {CASE_STUDIES_DATA.map((project) => {
            const IconComponent = iconMap[project.iconName] || Bot;

            return (
              <div
                key={project.id}
                id={`case-study-card-${project.id}`}
                className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Preview Card */}
                  <div className="rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800 p-5 mb-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200/70 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-200">
                        <IconComponent className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{project.industry}</span>
                      </div>
                      {/* Top Right Badge: Claude Terracotta Orange (#D97757) */}
                      <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                        Production Live
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Metric Pills */}
                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-[#121215] border border-slate-200/70 dark:border-zinc-800 rounded-lg p-2 text-center"
                        >
                          <div className="font-display font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                            {m.value}
                          </div>
                          <div className="text-[9px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies Badges */}
                  <div className="mb-5">
                    <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-zinc-500 mb-1.5">
                      Technologies Used:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px]">Verified ROI</span>
                  </div>

                  <button
                    id={`view-case-study-${project.id}`}
                    onClick={() => onSelectCaseStudy(project)}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition cursor-pointer shadow-xs group/btn"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
