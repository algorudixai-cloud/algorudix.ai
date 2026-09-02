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
  const [filterIndustry, setFilterIndustry] = useState<string>('all');

  const industries = ['all', 'Enterprise Services & SaaS', 'Retail & E-commerce', 'FinTech & Banking', 'Logistics & Supply Chain'];

  const filteredProjects = filterIndustry === 'all'
    ? CASE_STUDIES_DATA
    : CASE_STUDIES_DATA.filter(p => p.industry === filterIndustry);

  return (
    <section id="portfolio" className="relative py-24 bg-gradient-to-b from-[#0b0f19] via-[#0d1424] to-[#0b0f19] border-t border-slate-800/60">
      
      {/* Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Enterprise Impact</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Case Studies
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Explore how we engineered custom AI assistants, real-time analytics platforms, high-throughput ETL pipelines, and bespoke business tools.
          </p>
        </div>

        {/* 4 Featured Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project) => {
            const IconComponent = iconMap[project.iconName] || Bot;

            return (
              <div
                key={project.id}
                id={`case-study-card-${project.id}`}
                className="group rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0d1322]/90 border border-slate-800 hover:border-cyan-500/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                <div>
                  
                  {/* Top Visual Card Mockup with Tech Metrics HUD */}
                  <div className={`relative h-48 rounded-xl bg-gradient-to-br ${project.imagePlaceholderGradient} border border-slate-700/60 p-5 mb-6 overflow-hidden flex flex-col justify-between`}>
                    
                    {/* Background Tech Wireframe Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
                    
                    {/* Top Bar of Graphic */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 backdrop-blur-md">
                        <IconComponent className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[11px] font-semibold text-slate-200">{project.industry}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        PRODUCTION ACTIVE
                      </span>
                    </div>

                    {/* Center Title in Visual */}
                    <div className="relative z-10">
                      <div className="font-display font-extrabold text-xl text-white drop-shadow-md">
                        {project.title}
                      </div>
                      <p className="text-xs text-slate-200/90 font-medium line-clamp-1 mt-0.5">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Bottom Metrics Pill Array */}
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-1.5 text-center backdrop-blur-md">
                          <div className="font-display font-bold text-xs text-cyan-300">{m.value}</div>
                          <div className="text-[9px] text-slate-400 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Project Title & Industry */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5 font-normal">
                    {project.description}
                  </p>

                  {/* Technologies Used Badges */}
                  <div className="mb-6">
                    <div className="text-[11px] uppercase font-semibold tracking-wider text-slate-400 mb-2">
                      Technologies Used:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-950 border border-slate-800 text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Action Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Production Outcome</span>
                  </div>

                  <button
                    id={`view-case-study-${project.id}`}
                    onClick={() => onSelectCaseStudy(project)}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition shadow-md cursor-pointer group/btn"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
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
