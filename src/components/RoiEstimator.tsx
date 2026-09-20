import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface RoiEstimatorProps {
  onApplyScopeToContact: (scopeData: { service: string; hoursSaved: number; costSavings: number }) => void;
}

export const RoiEstimator: React.FC<RoiEstimatorProps> = ({ onApplyScopeToContact }) => {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [projectType, setProjectType] = useState<string>('ai-automation');
  const [urgency, setUrgency] = useState<string>('standard');

  const projectConfigs: Record<string, { name: string; hoursPerEmployee: number; multiplier: number; timeline: string }> = {
    'ai-automation': { name: 'AI Solutions & LLM Agents', hoursPerEmployee: 6.5, multiplier: 3.8, timeline: '4 - 8 weeks' },
    'bi-analytics': { name: 'Data Analytics & Power BI', hoursPerEmployee: 4.2, multiplier: 2.9, timeline: '3 - 6 weeks' },
    'etl-engineering': { name: 'Data Engineering & Snowflake / Fabric ETL', hoursPerEmployee: 5.0, multiplier: 3.2, timeline: '4 - 7 weeks' },
    'process-automation': { name: 'Process Automation (RPA/Python)', hoursPerEmployee: 7.0, multiplier: 4.1, timeline: '2 - 5 weeks' },
    'custom-software': { name: 'Custom Software & SaaS Platform', hoursPerEmployee: 5.5, multiplier: 3.5, timeline: '6 - 12 weeks' },
  };

  const currentConfig = projectConfigs[projectType] || projectConfigs['ai-automation'];

  const monthlyHoursSaved = Math.round(teamSize * currentConfig.hoursPerEmployee * 4.2);
  const estimatedAnnualCostSavings = Math.round(monthlyHoursSaved * 45 * 12);
  const estimatedRoiMultiplier = currentConfig.multiplier;

  return (
    <section id="calculator" className="relative py-20 md:py-24 bg-slate-50/60 dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive ROI & Scope Estimator</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Calculate Your Efficiency & Cost Impact
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
            See how automating repetitive workflows, modernizing data pipelines, and deploying custom AI solutions saves operational capital.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-9 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">

              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                  Target Technology Focus
                </label>
                <select
                  id="estimator-service-select"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                >
                  <option value="ai-automation">AI Solutions & Generative AI Agents</option>
                  <option value="bi-analytics">Data Analytics & Power BI Dashboards</option>
                  <option value="etl-engineering">Data Engineering & Snowflake / Fabric ETL</option>
                  <option value="process-automation">Business Process Automation (RPA & Python)</option>
                  <option value="custom-software">Custom Web Application / Enterprise SaaS</option>
                </select>
              </div>

              {/* Team Size Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                    Impacted Team Size / Users
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold">
                    {teamSize} team members
                  </span>
                </div>
                <input
                  id="estimator-teamsize-range"
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                  <span>5 users</span>
                  <span>100 users</span>
                  <span>250+ enterprise</span>
                </div>
              </div>

              {/* Deployment Speed */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                  Target Delivery Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition cursor-pointer ${
                      urgency === 'standard'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-500/50 font-semibold'
                        : 'bg-slate-50 dark:bg-[#18181b] text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    Standard Agile ({currentConfig.timeline})
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('accelerated')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition cursor-pointer ${
                      urgency === 'accelerated'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-500/50 font-semibold'
                        : 'bg-slate-50 dark:bg-[#18181b] text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    Rapid Pilot (2 - 4 weeks)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Output HUD */}
            <div className="lg:col-span-6 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800 p-6 flex flex-col justify-between">

              <div className="border-b border-slate-200/80 dark:border-zinc-800 pb-4 mb-4">
                <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                  Projected Annual Business Impact
                </div>
                <div className="font-display font-black text-3xl text-slate-900 dark:text-white mt-1">
                  ${estimatedAnnualCostSavings.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 dark:text-zinc-400 ml-1.5">
                    / yr operational savings
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-white dark:bg-[#121215] border border-slate-200/70 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Monthly Saved</span>
                  </div>
                  <div className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {monthlyHoursSaved.toLocaleString()} hrs
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#121215] border border-slate-200/70 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Projected ROI</span>
                  </div>
                  <div className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {estimatedRoiMultiplier}x Return
                  </div>
                </div>
              </div>

              <button
                id="apply-roi-estimate-btn"
                onClick={() =>
                  onApplyScopeToContact({
                    service: currentConfig.name,
                    hoursSaved: monthlyHoursSaved,
                    costSavings: estimatedAnnualCostSavings,
                  })
                }
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Transfer Estimate to Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
