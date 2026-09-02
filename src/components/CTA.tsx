import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Bot
} from 'lucide-react';

interface CTAProps {
  onStartProject: () => void;
  onTalkToExpert: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onStartProject, onTalkToExpert }) => {
  return (
    <section id="cta" className="relative py-24 bg-gradient-to-b from-[#0b0f19] via-[#0e1629] to-[#0b0f19] border-t border-slate-800/60 overflow-hidden">
      
      {/* Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900/95 via-[#0d1527]/98 to-slate-950/95 border border-cyan-500/40 p-8 sm:p-14 text-center shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Schedule Your Free Strategy Session</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            Ready to Transform Your Business with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Technology?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Let's discuss how Artificial Intelligence, Data, and Automation can help your business grow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              id="cta-start-project-btn"
              onClick={onStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="cta-talk-expert-btn"
              onClick={onTalkToExpert}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-black/40"
            >
              <PhoneCall className="w-4 h-4 mr-2 text-cyan-400" />
              <span>Talk to an Expert</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free 30-Min Architecture Discovery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Strict NDA & IP Confidentiality</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Rapid 48-Hour Scope Proposal</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
