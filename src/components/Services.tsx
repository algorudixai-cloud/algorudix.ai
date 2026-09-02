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
    <section id="services" className="relative py-24 bg-[#0b0f19] border-t border-slate-800/60">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Technology Offerings</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            End-to-End Enterprise{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Services & Solutions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            From intelligent AI models and high-throughput data engineering to executive BI dashboards and custom software, we engineer future-proof solutions.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.icon] || Layers;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                {/* Card Top */}
                <div>
                  
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-indigo-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {service.shortDescription}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>

                  <button
                    onClick={() => onBookService(service.title)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white border border-slate-700 transition cursor-pointer"
                  >
                    Request Scope
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-white text-base">Need a custom enterprise architecture or combined stack?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Our solution architects build custom cross-functional AI & Data pipelines tailored to your requirements.</p>
          </div>
          <button
            onClick={() => onBookService('Custom Multi-Service Architecture')}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md transition cursor-pointer shrink-0"
          >
            Consult Our Architects
          </button>
        </div>

      </div>
    </section>
  );
};
