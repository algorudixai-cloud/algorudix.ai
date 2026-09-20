import React from 'react';
import {
  Layers,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/companyData';

interface FooterProps {
  companyName: string;
  onOpenConsultation: () => void;
  onNavigate?: (page: 'home' | 'devhub', targetId?: string) => void;
  onOpenPolicy?: (type: 'privacy' | 'terms' | 'security') => void;
}

export const Footer: React.FC<FooterProps> = ({ companyName, onOpenConsultation, onNavigate, onOpenPolicy }) => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Our Process', href: '#process' },
    { label: 'Technologies', href: '#technologies' },
    { label: 'Industries', href: '#industries' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Development Hub', href: '#development-hub' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { label: 'Artificial Intelligence', href: '#services' },
    { label: 'Data Analytics & BI', href: '#services' },
    { label: 'Process Automation', href: '#services' },
    { label: 'Custom Software Engineering', href: '#services' },
    { label: 'Data Engineering & ETL', href: '#services' },
  ];

  return (
    <footer id="main-footer" className="relative bg-white dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 text-slate-500 dark:text-zinc-400 text-sm transition-colors duration-200">

      {/* Top Banner */}
      <div className="border-b border-slate-100 dark:border-zinc-800/60 py-4 bg-slate-50/50 dark:bg-[#09090b]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
              Accepting New Enterprise Projects & Technical Roadmaps for 2026
            </span>
          </div>
          <button
            onClick={onOpenConsultation}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 group cursor-pointer"
          >
            <span>Book 30-Min Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* Company Brand & Description */}
          <div className="lg:col-span-4 space-y-3.5">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home', 'home');
                }
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-emerald-500 text-white flex items-center justify-center">
                <Layers className="w-4 h-4 text-emerald-400 dark:text-slate-950" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Algorudix<span className="text-emerald-600 dark:text-emerald-400">.ai</span>
              </span>
            </a>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Algorudix is an AI development and business analyst consultancy engineering custom AI models, high-throughput ETL data pipelines, and executive dashboards for high-growth enterprises.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={COMPANY_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3.5">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        const targetId = link.href.replace('#', '');
                        if (targetId === 'development-hub') {
                          onNavigate('devhub');
                        } else {
                          onNavigate('home', targetId);
                        }
                      }
                    }}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3.5">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-2.5 text-xs">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3.5">
              Operations Hub
            </h4>
            <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-slate-900 dark:hover:text-white transition">
                {COMPANY_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-300">
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex flex-col gap-0.5">
                {COMPANY_CONFIG.phone.split('|').map((num, idx) => (
                  <a
                    key={idx}
                    href={`tel:${num.trim()}`}
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    {num.trim()}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 text-slate-600 dark:text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{COMPANY_CONFIG.location}</span>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-[10px] text-slate-700 dark:text-zinc-300 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Enterprise Data Privacy & Security Assured
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400">
          <div>
            © 2026 {companyName}. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenPolicy?.('privacy')}
              className="hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy?.('terms')}
              className="hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenPolicy?.('security')}
              className="hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            >
              Security Protocols
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
