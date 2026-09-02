import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  CheckCircle2 
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
    'etl-engineering': { name: 'Data Engineering & ETL', hoursPerEmployee: 5.0, multiplier: 3.2, timeline: '4 - 7 weeks' },
    'process-automation': { name: 'Process Automation (RPA/Python)', hoursPerEmployee: 7.0, multiplier: 4.1, timeline: '2 - 5 weeks' },
    'custom-software': { name: 'Custom Software & SaaS Platform', hoursPerEmployee: 5.5, multiplier: 3.5, timeline: '6 - 12 weeks' },
  };

  const currentConfig = projectConfigs[projectType] || projectConfigs['ai-automation'];

  // Average estimated calculations
  const monthlyHoursSaved = Math.round(teamSize * currentConfig.hoursPerEmployee * 4.2);
  const estimatedAnnualCostSavings = Math.round(monthlyHoursSaved * 45 * 12);
  const estimatedRoiMultiplier = currentConfig.multiplier;

  return (
    <section id="calculator" className="relative py-20 bg-[#0b0f19] border-t border-slate-800/60">
      
      {/* Ambience */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI & Scope Estimator</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            Calculate Your AI & Technology{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Impact Potential
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            See how automating repetitive workflows, modernizing ETL pipelines, and deploying AI solutions can impact your bottom line.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-slate-900 via-[#0d1424] to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Technology Focus
                </label>
                <select
                  id="estimator-service-select"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
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
                  <span className="uppercase tracking-wider text-slate-300">Impacted Team Size / Users</span>
                  <span className="text-cyan-400 font-mono text-sm font-bold">{teamSize} team members</span>
                </div>
                <input
                  id="estimator-teamsize-range"
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>5 users</span>
                  <span>100 users</span>
                  <span>250+ enterprise</span>
                </div>
              </div>

              {/* Deployment Speed */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Delivery Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition ${
                      urgency === 'standard'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Standard Agile ({currentConfig.timeline})
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('accelerated')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition ${
                      urgency === 'accelerated'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Rapid MVP (2 - 4 weeks)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Output HUD */}
            <div className="lg:col-span-6 rounded-xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between">
              
              <div className="border-b border-slate-800/80 pb-4 mb-4">
                <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                  Projected Annual Business Impact
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-emerald-400 mt-1">
                  ${estimatedAnnualCostSavings.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-1.5">/ yr cost savings</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Monthly Saved</span>
                  </div>
                  <div className="font-display font-bold text-lg text-white">
                    {monthlyHoursSaved.toLocaleString()} hrs
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Projected ROI</span>
                  </div>
                  <div className="font-display font-bold text-lg text-white">
                    {estimatedRoiMultiplier}x Return
                  </div>
                </div>
              </div>

              <button
                id="apply-roi-estimate-btn"
                onClick={() => onApplyScopeToContact({
                  service: currentConfig.name,
                  hoursSaved: monthlyHoursSaved,
                  costSavings: estimatedAnnualCostSavings
                })}
                className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
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
