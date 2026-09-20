import React from 'react';
import {
  Brain,
  BarChart3,
  Code2,
  Headphones,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AboutProps {
  onOpenConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenConsultation }) => {
  const highlights = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Solutions',
      description: 'Proprietary generative AI models, custom LLM fine-tuning, and autonomous cognitive workflows engineered for enterprise reliability.',
      icon: Brain,
      metric: '99.4%',
      metricLabel: 'Model Precision',
    },
    {
      id: 'data-driven',
      title: 'Data-Driven Insights',
      description: 'Interactive Power BI and executive BI dashboards that transform fragmented operational data into instant competitive advantage.',
      icon: BarChart3,
      metric: '10x',
      metricLabel: 'Decision Velocity',
    },
    {
      id: 'custom-tech',
      title: 'Custom Technology',
      description: 'Bespoke web applications, high-throughput ETL data pipelines, and scalable cloud microservices crafted to your exact specifications.',
      icon: Code2,
      metric: '150+',
      metricLabel: 'Systems Deployed',
    },
    {
      id: 'end-to-end',
      title: 'End-to-End Partnership',
      description: 'Dedicated solution architects guiding your team through discovery, agile development sprints, cloud deployment, and SLA support.',
      icon: Headphones,
      metric: '24/7',
      metricLabel: 'Engineering SLA',
    },
  ];

  const targetAudiences = [
    { label: 'Startups & Scaleups', desc: 'Rapid AI MVP creation, lean cloud architectures, and investor-ready data prototypes.' },
    { label: 'Growing SMBs', desc: 'Automating repetitive manual processes, invoice matching, and eliminating data silos.' },
    { label: 'Retail & E-commerce', desc: 'Predictive inventory velocity, dynamic pricing models, and personalized recommendations.' },
    { label: 'Enterprise Groups', desc: 'Resilient multi-lakehouse ETL pipelines, enterprise RAG search, and ISO/SOC-2 compliance.' },
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>About Algorudix</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            AI Engineering & Business Analysis That Drives Measurable Growth
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            Algorudix bridges executive business intelligence with modern software and machine learning engineering. We don’t just build algorithms — we build reliable business assets.
          </p>
        </div>

        {/* Mission Statement Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Our Core Philosophy
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1 mb-2">
                Uniting Deep Business Analysis with Production-Grade AI Engineering
              </h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
                Our business analysts first identify high-impact operational opportunities, cost sinks, and data bottlenecks. Then, our engineers deliver purpose-built models, automated ETL workflows, and custom applications that produce measurable ROI from day one.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition shadow-xs cursor-pointer group"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero-risk discovery roadmap</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`about-highlight-${item.id}`}
                className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700 transition duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                        {item.metric}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-medium">
                        {item.metricLabel}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Target Audience Grid */}
        <div className="rounded-2xl bg-slate-50/70 dark:bg-[#121215]/70 border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">Who We Empower</h4>
            <span className="text-xs text-slate-500 dark:text-zinc-400 ml-2 hidden sm:inline">
              Tailored technology solutions across organizational scales
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {targetAudiences.map((audience, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800"
              >
                <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                  {audience.label}
                </h5>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {audience.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
