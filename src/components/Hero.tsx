import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BarChart3,
  Zap,
  Bot,
  ShieldCheck,
  ArrowUpRight,
  Database,
  Globe,
  Check,
  Cpu,
  Workflow,
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onGetStarted }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-50/50 dark:bg-[#09090b] transition-colors duration-200">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Hero Top Content (Preserved exactly as requested) */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-14">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Development & Business Analyst Company</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6">
            Transforming Businesses with{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
              AI Development & Business Analytics
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
            At <strong className="font-semibold text-slate-900 dark:text-white">Algorudix.Ai</strong>, our elite engineers and senior business analysts build custom <strong className="font-medium text-slate-900 dark:text-white">Artificial Intelligence</strong>, deliver predictive <strong className="font-medium text-slate-900 dark:text-white">Business Intelligence</strong>, automate complex workflows, and engineer scalable enterprise software.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <button
              id="hero-get-started-btn"
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-xs transition-all duration-150 cursor-pointer group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="hero-book-consultation-btn"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 shadow-xs dark:bg-[#18181b] dark:text-zinc-100 dark:border-zinc-700/80 dark:hover:bg-[#27272a] dark:hover:border-zinc-600 dark:hover:text-white transition-all duration-150 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Book a Free Consultation</span>
            </button>
          </div>

          {/* Credibility Highlights */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                99.4%
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 font-medium">
                Model Accuracy
              </div>
            </div>
            <div className="border-x border-slate-200 dark:border-zinc-800">
              <div className="font-display font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                150+
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 font-medium">
                Solutions Deployed
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                3.8x
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 font-medium">
                Average Client ROI
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* ENTERPRISE DASHBOARD CONSOLE (Clean, Aligned, Balanced, Human-Designed)   */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto mt-6">
          <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#121215] p-4 sm:p-6 lg:p-7 shadow-xl shadow-slate-900/5 dark:shadow-none">

            {/* Dashboard Header Bar (Clean, Unified, No Unnecessary Navigation/Dropdowns) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Cpu className="w-5 h-5 text-emerald-400 dark:text-slate-950" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                      Enterprise Solutions & Capabilities Console
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      All Systems Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Live enterprise analytics, AI pipelines, and workflow automation
                  </p>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-700/80 text-slate-600 dark:text-zinc-300 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Enterprise Security & Privacy</span>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold transition-all duration-150 shadow-xs cursor-pointer group"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Row 1: 4 Key Services & Value Cards (Orange Accent Exclusively on Data Accuracy Metric) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-4">

              {/* Metric Card 1: Data Accuracy (Claude Terracotta Orange Accent on +99.9%) */}
              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-400/40 dark:border-emerald-500/25 hover:border-[#D97757]/60 dark:hover:border-[#D97757]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#18181b] text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    </div>
                    {/* Top Right Side Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      +99.9%
                    </span>
                  </div>
                  <div className="text-[10.5px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Data Accuracy
                  </div>
                  <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    Zero Drift
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    Automated schema validation pipelines and continuous data integrity checks.
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Validation</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Automated</span>
                </div>
              </div>

              {/* Metric Card 2: Business Dashboards */}
              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-400/40 dark:border-emerald-500/25 hover:border-[#D97757]/60 dark:hover:border-[#D97757]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#18181b] text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <BarChart3 className="w-4.5 h-4.5" />
                    </div>
                    {/* Top Right Side Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      Live Sync
                    </span>
                  </div>
                  <div className="text-[10.5px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Business Dashboards
                  </div>
                  <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    Instant KPIs
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    Interactive Power BI, Domo & Tableau executive cockpits with multi-source blending.
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Platforms</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Power BI · Domo · Tableau</span>
                </div>
              </div>

              {/* Metric Card 3: Process Automation */}
              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-400/40 dark:border-emerald-500/25 hover:border-[#D97757]/60 dark:hover:border-[#D97757]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#18181b] text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <Zap className="w-4.5 h-4.5" />
                    </div>
                    {/* Top Right Side Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      80% Saved
                    </span>
                  </div>
                  <div className="text-[10.5px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Automation
                  </div>
                  <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    Zero Manual Ops
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    Scheduled RPA, CRM/ERP synchronization, and hands-free workflow automation.
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Workflows</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Scheduled & Sync</span>
                </div>
              </div>

              {/* Metric Card 4: AI & Agent Solutions */}
              <div className="p-4.5 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-400/40 dark:border-emerald-500/25 hover:border-[#D97757]/60 dark:hover:border-[#D97757]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#18181b] text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    {/* Top Right Side Badge: Claude Terracotta Orange (#D97757) */}
                    <span className="text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                      Autonomous
                    </span>
                  </div>
                  <div className="text-[10.5px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    AI & Agent Solutions
                  </div>
                  <div className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">
                    Custom LLMs & Agents
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Private RAG knowledge retrieval and autonomous 24/7 digital task workers.
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Digital Workers</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Private RAG</span>
                </div>
              </div>

            </div>

            {/* Row 2: Solutions Pipelines (Left 7 Cols) + Redesigned Two Smaller Cards (Right 5 Cols) */}
            {/* Small & Consistent gap-3.5 between columns and matching heights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">

              {/* Left Column (7 cols): Active Enterprise Service Pipelines */}
              <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-slate-50/70 dark:bg-[#121215] border border-slate-200/70 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-200/60 dark:border-zinc-800/80">
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        Active Enterprise Service Pipelines
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        Live execution status across business systems
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-1 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shrink-0 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] animate-pulse" />
                      <span>Active Stream</span>
                    </div>
                  </div>

                  {/* 4 Pipeline Service Rows */}
                  <div className="space-y-2.5">
                    {/* Item 1: Agent Building & AI Engineering */}
                    <div className="p-3 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-[#D97757]/50 transition-colors duration-150 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            Agent Building & Custom AI
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Autonomous task workers • Private RAG knowledge retrieval • Guardrails
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                        {/* Top Right / End Badge: Claude Terracotta Orange (#D97757) */}
                        <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2 py-0.5 rounded border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                          Operational
                        </span>
                        <button
                          onClick={onOpenConsultation}
                          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-[#C15F3C] dark:group-hover:text-[#F0997D] inline-flex items-center transition-colors cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Item 2: Data Analytics & Business Insights */}
                    <div className="p-3 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-[#D97757]/50 transition-colors duration-150 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            Data Analytics & Business Insights
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Predictive trend modeling • Executive Domo & Power BI cockpits
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                        {/* Top Right / End Badge: Claude Terracotta Orange (#D97757) */}
                        <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2 py-0.5 rounded border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                          Live Sync
                        </span>
                        <button
                          onClick={onOpenConsultation}
                          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-[#C15F3C] dark:group-hover:text-[#F0997D] inline-flex items-center transition-colors cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Item 3: Data Engineering & Lakehouses */}
                    <div className="p-3 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-[#D97757]/50 transition-colors duration-150 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            Data Engineering & Lakehouses
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Databricks, Snowflake, BigQuery & dbt • Zero-drift pipeline architecture
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                        {/* Top Right / End Badge: Claude Terracotta Orange (#D97757) */}
                        <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2 py-0.5 rounded border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                          Connected
                        </span>
                        <button
                          onClick={onOpenConsultation}
                          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-[#C15F3C] dark:group-hover:text-[#F0997D] inline-flex items-center transition-colors cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Item 4: Website & Full-Stack Development */}
                    <div className="p-3 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/70 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-[#D97757]/50 transition-colors duration-150 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            Website & Full-Stack Development
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                            Next.js & React enterprise web applications • Speed optimized
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                        {/* Top Right / End Badge: Claude Terracotta Orange (#D97757) */}
                        <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2 py-0.5 rounded border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                          Production
                        </span>
                        <button
                          onClick={onOpenConsultation}
                          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 group-hover:text-[#C15F3C] dark:group-hover:text-[#F0997D] inline-flex items-center transition-colors cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Note */}
                <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    Direct engineer collaboration via shared Slack or Teams channels
                  </span>
                  <span className="font-semibold text-[11px] text-slate-700 dark:text-zinc-300 shrink-0">
                    Sprint Guaranteed
                  </span>
                </div>
              </div>

              {/* Right Column (5 cols): The TWO REDESIGNED SMALLER CARDS */}
              {/* Stacked vertically with small & consistent gap-3.5 to match the left card height exactly */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 justify-between">

                {/* Smaller Card 1: Delivery Flow (Structured 5-Stage Delivery Flow) */}
                <div className="p-4.5 sm:p-5 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-400/40 dark:border-emerald-500/25 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Workflow className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          Client Delivery Flow
                        </h4>
                      </div>
                      {/* Top Right Side Badge: Claude Terracotta Orange (#D97757) */}
                      <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                        End-to-End
                      </span>
                    </div>

                    {/* Horizontal flow breadcrumb */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] font-semibold text-slate-500 dark:text-zinc-400 mb-2.5">
                      <span className="text-emerald-600 dark:text-emerald-400 shrink-0">B&M</span>
                      <span className="text-slate-300 dark:text-zinc-600">→</span>
                      <span className="shrink-0">Dev</span>
                      <span className="text-slate-300 dark:text-zinc-600">→</span>
                      <span className="shrink-0">Validation</span>
                      <span className="text-slate-300 dark:text-zinc-600">→</span>
                      <span className="shrink-0">Sign-off</span>
                      <span className="text-slate-300 dark:text-zinc-600">→</span>
                      <span className="text-emerald-600 dark:text-emerald-400 shrink-0">Production</span>
                    </div>

                    {/* 5-Step Delivery Flow List */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/60 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800 dark:text-zinc-200">1. B&M (Business & Modeling)</span>
                        </div>
                        <span className="text-slate-500 dark:text-zinc-400 font-medium text-[10px]">Blueprint & Scope</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/60 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800 dark:text-zinc-200">2. Development</span>
                        </div>
                        <span className="text-slate-500 dark:text-zinc-400 font-medium text-[10px]">AI, BI & Engineering</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/60 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800 dark:text-zinc-200">3. Testing & Validation</span>
                        </div>
                        <span className="text-slate-500 dark:text-zinc-400 font-medium text-[10px]">Quality & Security</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/60 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800 dark:text-zinc-200">4. Sign-off</span>
                        </div>
                        <span className="text-slate-500 dark:text-zinc-400 font-medium text-[10px]">Client Acceptance</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#18181b] border border-slate-200/60 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800 dark:text-zinc-200">5. Production</span>
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">Live Launch</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 shadow-xs cursor-pointer group"
                  >
                    <span>Initiate Project Flow</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Smaller Card 2: Trust, Data Privacy & Security */}
                <div className="p-4.5 sm:p-5 rounded-2xl bg-white dark:bg-[#121215] border border-emerald-400/40 dark:border-emerald-500/25 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-zinc-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-800 dark:border-zinc-700 shadow-2xs">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          Trust, Privacy & Security
                        </h4>
                      </div>
                      {/* Top Right Side Badge: Claude Terracotta Orange (#D97757) */}
                      <span className="text-[10px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
                        Enterprise Standard
                      </span>
                    </div>

                    <div className="space-y-2 text-[11px] text-slate-600 dark:text-zinc-300 mt-2.5">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div>
                          <strong className="font-semibold text-slate-900 dark:text-white">100% Client Code & IP Ownership:</strong> Complete source code, models, and repositories transferred directly upon sign-off.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div>
                          <strong className="font-semibold text-slate-900 dark:text-white">Data Privacy & Isolation:</strong> Zero client data utilized for public AI training; encrypted pipelines and strict confidentiality.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div>
                          <strong className="font-semibold text-slate-900 dark:text-white">Tailored to Client Requirements:</strong> Transparent sprint deliverables, agile reviews, and zero vendor lock-in.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center justify-between text-[10px] text-slate-500 dark:text-zinc-400">
                    <span>Strict NDA & Confidentiality</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">Secure Architecture</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};



