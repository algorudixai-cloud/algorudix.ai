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
import { TechnologyItem } from '../types';

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
    { id: 'all', label: 'All Tech' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'analytics', label: 'Data & Analytics' },
    { id: 'engineering', label: 'Data Engineering' },
    { id: 'dev', label: 'Development' },
    { id: 'cloud', label: 'Cloud Platforms' },
  ];

  const filteredTech = selectedCategory === 'all'
    ? TECHNOLOGIES_DATA
    : TECHNOLOGIES_DATA.filter((tech) => tech.category === selectedCategory);

  return (
    <section id="technologies" className="relative py-24 bg-gradient-to-b from-[#0b0f19] via-[#0d1322] to-[#0b0f19] border-t border-slate-800/60">
      
      {/* Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Tech Stack</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Technologies{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              We Use
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            We partner with and build upon industry-leading foundational models, modern data lakehouses, and high-performance cloud frameworks.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tech-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-950'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredTech.map((tech) => {
            const IconComponent = iconMap[tech.iconName] || Code;

            return (
              <div
                key={tech.name}
                id={`tech-card-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-950/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    {tech.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Compatibility Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Have existing enterprise databases or custom legacy stacks?</h4>
              <p className="text-xs text-slate-400">Our engineers build zero-friction connectors for on-prem SQL, SAP, Oracle, and Salesforce ecosystems.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-800 hover:bg-slate-700 transition border border-slate-700 shrink-0"
          >
            Check Integration Compatibility
          </a>
        </div>

      </div>
    </section>
  );
};
