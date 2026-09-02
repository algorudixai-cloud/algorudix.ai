import React from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Layers, 
  ArrowRight, 
  Code2, 
  Brain, 
  Cpu, 
  Database, 
  BarChart3, 
  Cloud 
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
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

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  const IconComponent = iconMap[service.icon] || Layers;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="service-detail-modal-card"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-slate-900 via-[#0d1424] to-slate-950 border border-slate-700 p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
            <IconComponent className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
              {service.category}
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="space-y-6 text-sm text-slate-300">
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Architecture & Solution Overview
            </h4>
            <p className="leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              {service.longDescription}
            </p>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Core Capabilities & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Concrete Deliverables */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Enterprise Deliverables
            </h4>
            <div className="space-y-2">
              {service.deliverables.map((deliv, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Supported Tech Ecosystem
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Request {service.title} Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
