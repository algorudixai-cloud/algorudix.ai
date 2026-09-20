import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  BarChart2,
  Activity,
  PieChart,
  Terminal,
  Database,
  Flame,
  Box,
  Grid,
  GitBranch,
  Code,
  Layers,
  FileCode,
  Server,
  Share2,
  CloudRain,
  Cloud,
  Globe,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { TECHNOLOGIES_DATA } from '../data/companyData';

const iconMap: Record<string, React.ElementType> = {
  Bot,
  Brain,
  Sparkles,
  Cpu,
  BarChart2,
  Activity,
  PieChart,
  Terminal,
  Database,
  Flame,
  Box,
  Grid,
  GitBranch,
  Code,
  Layers,
  FileCode,
  Server,
  Share2,
  CloudRain,
  Cloud,
  Globe,
};

export const Technologies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'ai', label: 'AI & Foundational Models' },
    { id: 'analytics', label: 'Business Intelligence & BI' },
    { id: 'engineering', label: 'Data Engineering & ETL' },
    { id: 'dev', label: 'Full-Stack Engineering' },
    { id: 'cloud', label: 'Cloud Infrastructure' },
  ];

  const filteredTech = selectedCategory === 'all'
    ? TECHNOLOGIES_DATA
    : TECHNOLOGIES_DATA.filter((tech) => tech.category === selectedCategory);

  return (
    <section id="technologies" className="relative py-20 md:py-28 bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Modern Production Stack</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Technologies & Frameworks We Engineer
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            We partner with industry-standard foundational AI models, elastic cloud data warehouses, and battle-tested frameworks.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tech-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredTech.map((tech) => {
            const IconComponent = iconMap[tech.iconName] || Code;

            return (
              <div
                key={tech.name}
                id={`tech-card-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 hover:border-[#D97757]/40 dark:hover:border-[#D97757]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    {/* Top Right Tech Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2 py-0.5 rounded-md border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed mt-1">
                    {tech.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Compatibility Strip */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Have existing enterprise databases or legacy software stacks?
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Our engineers build low-latency pipelines and custom connectors for SQL Server, SAP, Oracle, and Salesforce.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 transition shrink-0"
          >
            Check Integration Compatibility
          </a>
        </div>

      </div>
    </section>
  );
};
