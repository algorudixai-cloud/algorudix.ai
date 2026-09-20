import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Database,
  Cpu,
  Server
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/companyData';

export type PolicyType = 'privacy' | 'terms' | 'security';

interface PolicyModalProps {
  isOpen: boolean;
  initialType?: PolicyType;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialType = 'privacy',
  onClose,
  onOpenContact
}) => {
  const [activeTab, setActiveTab] = useState<PolicyType>(initialType);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialType);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialType]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 shadow-xl overflow-hidden text-slate-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Trust, Legal & Compliance
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Transparent and enterprise-grade operational policies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/30 dark:bg-[#121215] flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Security Protocols
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 space-y-5 leading-relaxed">

          {/* 1. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  Our Commitment
                </span>
                <p className="text-slate-700 dark:text-zinc-200">
                  We respect your data privacy. We strictly collect only what is essential to respond to your technical consultation requests, scope custom AI projects, and provide enterprise engineering services.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Information We Collect</h3>
                <p>
                  When you submit forms on our website or book a consultation, we collect your name, corporate email address, phone number, company name, and project descriptions.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Zero Client Training Data Leakage</h3>
                <p>
                  We never sell, rent, or share your contact or project information with third-party advertisers. All enterprise AI endpoints are configured with strict Zero Data Retention policies to guarantee that your proprietary data is never used to train public foundational models.
                </p>
              </div>
            </div>
          )}

          {/* 2. TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  Agreement Overview
                </span>
                <p className="text-slate-700 dark:text-zinc-200">
                  By accessing the Algorudix website or engaging our consulting and development services, you agree to these clear and transparent terms.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">100% Intellectual Property Ownership</h3>
                <p>
                  Upon final payment for contracted deliverables, clients retain 100% intellectual property ownership of all bespoke code, trained model weights, prompt templates, and custom database schemas created specifically for their engagement.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Project Scoping & Delivery Milestones</h3>
                <p>
                  All software development and data analysis projects operate under formal Statements of Work (SOW) with defined milestone acceptance criteria, weekly sprint demos, and transparent timelines.
                </p>
              </div>
            </div>
          )}

          {/* 3. SECURITY PROTOCOLS */}
          {activeTab === 'security' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  Enterprise Security Standards
                </span>
                <p className="text-slate-700 dark:text-zinc-200">
                  Security is embedded into every layer of our engineering methodology — from air-gapped private cloud deployments to automated CI/CD security scanning.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-1 font-semibold text-xs">
                    <Database className="w-4 h-4" /> Data Encryption
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    AES-256 encryption at rest and TLS 1.3 encryption in transit for all client data streams and API integrations.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-1 font-semibold text-xs">
                    <Cpu className="w-4 h-4" /> Isolated AI Pipelines
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Enterprise OpenAI, Azure, and AWS endpoints configured with zero retention — your proprietary data stays yours.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 dark:text-zinc-400">
            Last Updated: <span className="font-medium text-slate-700 dark:text-zinc-300">September 2026</span> • {COMPANY_CONFIG.defaultName}
          </span>
          <button
            onClick={() => {
              onClose();
              if (onOpenContact) onOpenContact();
            }}
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
          >
            Have questions? Talk to our team →
          </button>
        </div>
      </div>
    </div>
  );
};
