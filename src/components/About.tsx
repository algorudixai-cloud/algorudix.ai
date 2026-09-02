import React from 'react';
import { 
  Brain, 
  BarChart3, 
  Code2, 
  Headphones, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Layers,
  Building2,
  Store,
  Briefcase,
  Users
} from 'lucide-react';

interface AboutProps {
  onOpenConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenConsultation }) => {
  const highlights = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Solutions',
      description: 'Proprietary Generative AI models, custom LLM fine-tuning, and automated cognitive workflows engineered for enterprise accuracy.',
      icon: Brain,
      metric: '99.4%',
      metricLabel: 'Inference Precision',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'data-driven',
      title: 'Data-Driven Insights',
      description: 'Interactive Power BI and Domo executive dashboards that transform messy multi-source data into instant competitive advantage.',
      icon: BarChart3,
      metric: '10x',
      metricLabel: 'Faster Decision Velocity',
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    },
    {
      id: 'custom-tech',
      title: 'Custom Technology Solutions',
      description: 'Bespoke web applications, high-throughput ETL data pipelines, and scalable cloud microservices crafted to your exact business specifications.',
      icon: Code2,
      metric: '150+',
      metricLabel: 'Engineered Systems',
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    },
    {
      id: 'end-to-end',
      title: 'End-to-End Support',
      description: 'Dedicated solution architects and engineers guiding your organization through discovery, agile sprints, deployment, and ongoing SLA maintenance.',
      icon: Headphones,
      metric: '24/7',
      metricLabel: 'Active Engineering Support',
      color: 'from-teal-500/20 to-cyan-500/10 border-teal-500/30 text-teal-400',
    },
  ];

  const targetAudiences = [
    { label: 'Startups', desc: 'Rapid AI MVP creation, scalable tech stacks & investor-ready cloud architectures.' },
    { label: 'SMBs & Growing Companies', desc: 'Automating repetitive manual tasks and eliminating departmental software silos.' },
    { label: 'Retail & E-commerce', desc: 'Predictive inventory, omnichannel POS analytics & AI customer recommendation engines.' },
    { label: 'Enterprise Organizations', desc: 'High-throughput data engineering, enterprise LLM RAG pipelines & SOC-2 compliance.' },
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-[#0b0f19] via-[#0d1322] to-[#0b0f19] border-t border-slate-800/60">
      
      {/* Background glow & subtle patterns */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Algorudix.Ai</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            AI Development & Business Analysis That Drives{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Measurable Growth
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <strong className="text-white font-semibold">Algorudix.Ai</strong> is a premier AI development and business analyst company specializing in <strong className="text-white font-medium">Artificial Intelligence</strong>, <strong className="text-white font-medium">Business Analysis & BI</strong>, <strong className="text-white font-medium">Process Automation</strong>, and <strong className="text-white font-medium">Custom Enterprise Software</strong>.
          </p>
        </div>

        {/* Mission Statement Banner */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Our Core Mission</span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1 mb-3">
                Uniting Deep Business Analysis with Cutting-Edge AI Engineering.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                At Algorudix.Ai, our mission is to empower organizations with clarity and automation. Our business analysts first identify high-impact operational opportunities and data bottlenecks, while our AI engineers build bespoke models, intelligent agents, and software architectures that deliver tangible ROI.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-cyan-950 cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero-risk discovery roadmap</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Statistics / Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`about-highlight-${item.id}`}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 p-6 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-2xl text-white tracking-tight">{item.metric}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-medium">{item.metricLabel}</div>
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Target Audience Grid */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-cyan-400" />
            <h4 className="font-display font-bold text-lg text-white">Who We Empower</h4>
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">Tailored solutions engineered across organizational stages</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetAudiences.map((audience, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <h5 className="font-bold text-sm text-cyan-300 mb-1.5">{audience.label}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
