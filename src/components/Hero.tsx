import React, { useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Bot,
  BarChart3,
  Cpu,
  ShieldCheck,
  Zap,
  Database,
  CheckCircle2,
  TrendingUp,
  Activity
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onGetStarted }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for neural network effect
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 45);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#38bdf8'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const currentRadius = node.radius + Math.sin(node.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      {/* Subtle Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Core Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide mb-6 shadow-sm shadow-cyan-950">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>AI Development & Business Analyst Company</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12] mb-6">
              Transforming Businesses with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                AI Development & Business Analytics
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 font-normal">
              At <strong className="text-white font-semibold">Algorudix.Ai</strong>, our elite engineers and senior business analysts build custom <span className="text-cyan-300 font-medium">Artificial Intelligence</span>, deliver predictive <span className="text-blue-300 font-medium">Business Intelligence</span>, automate complex workflows, and engineer scalable enterprise software.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                id="hero-cta-get-started"
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-book-consultation"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg shadow-black/40"
              >
                <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Book a Free Consultation</span>
              </button>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 border-t border-slate-800/70 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
              <div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white">99.4%</div>
                <div className="text-xs text-slate-400 mt-0.5">Model Accuracy</div>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <div className="font-display font-bold text-xl sm:text-2xl text-cyan-400">150+</div>
                <div className="text-xs text-slate-400 mt-0.5">Solutions Deployed</div>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <div className="font-display font-bold text-xl sm:text-2xl text-indigo-400">10x</div>
                <div className="text-xs text-slate-400 mt-0.5">Faster Decision Cycles</div>
              </div>
            </div>

          </div>

          {/* Right Column: AI Technology Visual & Interactive HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Futuristic Card HUD */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0d1527]/95 to-slate-950/90 border border-slate-700/60 p-6 shadow-2xl backdrop-blur-xl">

                {/* Header Strip of HUD */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">ai-pipeline.engine.v4</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>SYSTEM ACTIVE</span>
                  </div>
                </div>

                {/* Simulated AI Agent & Data Flow Stream */}
                <div className="space-y-3.5 mb-5">
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Autonomous AI Agent</p>
                        <p className="text-[11px] text-slate-400">Context Retrieval & Task Automation</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                      99.2% Sync
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white"> BI & ETL Pipelines</p>
                        <p className="text-[11px] text-slate-400">10M+ Daily Streaming Events</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      4ms Latency
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Python RPA Automation</p>
                        <p className="text-[11px] text-slate-400">Automated Financial Invoicing</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                      100% Valid
                    </span>
                  </div>
                </div>

                {/* Live Model Telemetry Bar */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-indigo-950/40 border border-cyan-500/20">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Enterprise Compute Efficiency
                    </span>
                    <span className="text-cyan-400 font-mono font-bold">+84.6%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full w-[85%]" />
                  </div>
                </div>

              </div>

              {/* Floating Floating Badges */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900/95 border border-cyan-500/40 p-3 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Cost Reduction</div>
                  <div className="text-xs font-bold text-white">$4.2M+ Saved</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-right-6 bg-slate-900/95 border border-indigo-500/40 p-3 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Security Standard</div>
                  <div className="text-xs font-bold text-white">SOC-2 & HIPAA</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
