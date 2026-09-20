import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Compass,
  Code,
  Rocket,
  TrendingUp,
  CheckCircle2,
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
    <section id="process" className="relative py-20 md:py-28 bg-slate-50/60 dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Structured Delivery Model</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Our 5-Step Engineering & Delivery Process
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            From initial business requirements discovery to deployment, testing, and proactive scaling — how we reliably deliver enterprise software.
          </p>
        </div>

        {/* Step Navigation Bar / Interactive Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const IconComponent = stepIcons[idx];

            return (
              <button
                key={step.stepNumber}
                id={`process-step-btn-${step.stepNumber}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-white dark:bg-[#18181b] border-emerald-500/80 shadow-xs ring-1 ring-emerald-500/30'
                    : 'bg-white/70 dark:bg-[#121215] border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                    }`}
                  >
                    Step {step.stepNumber}
                  </span>
                  <IconComponent
                    className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-display font-bold text-sm ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    {step.duration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase */}
        <div className="rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-9 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Step Overview */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-emerald-700 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Step {activeStep.stepNumber}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Estimated Timeline: {activeStep.duration}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
                {activeStep.title} & Technical Scope
              </h3>

              <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-3">
                "{activeStep.summary}"
              </p>

              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                {activeStep.description}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={onOpenConsultation}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition cursor-pointer shadow-xs"
                >
                  Start Phase {activeStep.stepNumber} Discovery
                </button>
                {activeStepIndex < PROCESS_STEPS.length - 1 && (
                  <button
                    onClick={() => setActiveStepIndex((prev) => prev + 1)}
                    className="px-4 py-2.5 rounded-xl font-medium text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition flex items-center gap-1 cursor-pointer"
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
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                    Key Activities
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {activeStep.keyActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concrete Deliverables */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3 text-slate-700 dark:text-zinc-300">
                  <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                    Deliverables
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {activeStep.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500 shrink-0 mt-1.5" />
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
