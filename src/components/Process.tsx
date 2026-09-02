import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Compass, 
  Code, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';

interface ProcessProps {
  onOpenConsultation: () => void;
}

const stepIcons = [Search, Compass, Code, Rocket, TrendingUp];

export const Process: React.FC<ProcessProps> = ({ onOpenConsultation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative py-24 bg-[#0b0f19] border-t border-slate-800/60">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Agile Methodology</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Our Proven{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              5-Step Process
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            From initial discovery and architectural blueprinting to development, deployment, and ongoing optimization—here is how we ensure seamless project delivery.
          </p>
        </div>

        {/* Step Navigation Bar / Interactive Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const IconComponent = stepIcons[idx];

            return (
              <button
                key={step.stepNumber}
                id={`process-step-btn-${step.stepNumber}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-cyan-950/80 to-blue-950/80 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Step {step.stepNumber}
                  </span>
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <h3 className={`font-display font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {step.duration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0d1424]/95 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Step Overview */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-cyan-400 text-sm font-semibold bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                  Step {activeStep.stepNumber}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Estimated Timeline: {activeStep.duration}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3">
                {activeStep.title} & Solution Framing
              </h3>

              <p className="text-cyan-300 text-sm sm:text-base font-medium mb-4">
                "{activeStep.summary}"
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                {activeStep.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition cursor-pointer shadow-md"
                >
                  Start Phase {activeStep.stepNumber} Discovery
                </button>
                {activeStepIndex < PROCESS_STEPS.length - 1 && (
                  <button
                    onClick={() => setActiveStepIndex((prev) => prev + 1)}
                    className="px-4 py-2.5 rounded-xl font-medium text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next: Step {PROCESS_STEPS[activeStepIndex + 1].stepNumber}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Key Activities & Concrete Deliverables */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Key Activities */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                    Key Activities
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {activeStep.keyActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concrete Deliverables */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-2 mb-3 text-blue-400">
                  <FileCheck className="w-4 h-4" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                    Concrete Deliverables
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {activeStep.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
