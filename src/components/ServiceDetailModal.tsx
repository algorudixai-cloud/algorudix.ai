import React from 'react';
import {
  X,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="service-detail-modal-card"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-xl text-slate-900 dark:text-zinc-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              {service.category}
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="space-y-5 text-sm text-slate-600 dark:text-zinc-300">
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Architecture & Solution Scope
            </h4>
            <p className="leading-relaxed bg-slate-50 dark:bg-[#18181b] p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800">
              {service.longDescription}
            </p>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Core Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800 text-xs"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-slate-800 dark:text-zinc-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Concrete Deliverables */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Enterprise Deliverables
            </h4>
            <div className="space-y-1.5">
              {service.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Supported Tech Ecosystem
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-slate-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-7 pt-5 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-medium transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Request {service.title} Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
