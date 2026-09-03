import React from 'react';
import { 
  BrainCircuit, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/companyData';
import { exportSubmissionsToExcel } from '../utils/excelStorage';

interface FooterProps {
  companyName: string;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ companyName, onOpenConsultation }) => {
  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Solutions', href: '#industries' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { label: 'Artificial Intelligence', href: '#services' },
    { label: 'Data Analytics', href: '#services' },
    { label: 'Automation', href: '#services' },
    { label: 'Software Development', href: '#services' },
    { label: 'Data Engineering', href: '#services' },
  ];

  const techLinks = [
    { label: 'Power BI & Domo', href: '#technologies' },
    { label: 'Snowflake & Fabric', href: '#technologies' },
    { label: 'OpenAI, Claude, Gemini', href: '#technologies' },
    { label: 'React & Next.js SaaS', href: '#technologies' },
    { label: 'Azure & AWS Cloud', href: '#technologies' },
  ];

  return (
    <footer id="main-footer" className="relative bg-[#070a12] border-t border-slate-800/80 text-slate-400 text-sm">
      
      {/* Top Banner / Ticker */}
      <div className="border-b border-slate-800/60 py-6 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">
              Accepting New Enterprise & High-Growth Client Projects for Q3/Q4 2026
            </span>
          </div>
          <button
            onClick={onOpenConsultation}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group cursor-pointer"
          >
            <span>Book 30-Min Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Company Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {companyName}
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Algorudix.Ai is an AI development and business analyst company that helps businesses scale operations through Custom AI Development, Business Intelligence, Process Automation, and Custom Software Solutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-center transition"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-400 transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-400 transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Operations */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-white transition">
                {COMPANY_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${COMPANY_CONFIG.phone}`} className="hover:text-white transition">
                  {COMPANY_CONFIG.phone}
                </a>
                {COMPANY_CONFIG.secondaryPhone && (
                  <a href={`tel:${COMPANY_CONFIG.secondaryPhone}`} className="hover:text-white transition text-slate-400 text-xs">
                    {COMPANY_CONFIG.secondaryPhone}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>{COMPANY_CONFIG.location}</span>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-300 font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                SOC-2 Type II Certified
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {companyName}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={exportSubmissionsToExcel}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-semibold text-[11px] transition cursor-pointer"
              title="Download all customer inquiries & bookings as an Excel CSV sheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Inquiries to Excel</span>
            </button>
            <a href="#contact" className="hover:text-slate-200 transition">Privacy Policy</a>
            <a href="#contact" className="hover:text-slate-200 transition">Terms of Service</a>
            <a href="#contact" className="hover:text-slate-200 transition">Security Protocols</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
