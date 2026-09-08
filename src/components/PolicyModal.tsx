import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  FileText,
  Lock,
  CheckCircle2,
  Mail,
  ExternalLink,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-[#0d1424] border border-slate-700/80 shadow-2xl shadow-cyan-950/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/90 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                Trust, Legal & Compliance
              </h2>
              <p className="text-xs text-slate-400">
                Clear, transparent, and enterprise-grade operational policies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-800/60 bg-slate-950/40 flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Security Protocols
          </button>
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-slate-300 space-y-6">

          {/* 1. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-cyan-950/25 border border-cyan-500/20">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
                  Our Friendly Commitment
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  We respect your personal privacy. We strictly collect only what is essential to respond to your technical consultation requests, scope custom AI projects, and provide enterprise engineering services.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  1. Information We Collect
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
                  When you submit an inquiry or book a consultation via our website, we collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-400 pl-2">
                  <li>Your name, work email address, and contact phone number.</li>
                  <li>Company name, selected service category, and project specifications.</li>
                  <li>Basic technical telemetry (IP, browser type) used strictly for fraud prevention and OTP email verification.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  2. How We Use Your Data
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We use your details exclusively to respond to your business inquiries, prepare customized AI architecture proposals, execute agreed project milestones, and deliver ongoing support.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  3. We Never Sell or Rent Your Data
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We do <span className="text-white font-semibold">not</span> sell, rent, or trade your contact details or project data to third-party advertisers or data brokers. All customer data remains private and strictly confidential.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  4. Your Rights & Data Deletion
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  You have full rights to request a copy of the data we hold or request its immediate and permanent deletion from our systems at any time by emailing us at{' '}
                  <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-cyan-400 hover:underline">
                    {COMPANY_CONFIG.email}
                  </a>.
                </p>
              </div>
            </div>
          )}

          {/* 2. TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-blue-950/25 border border-blue-500/20">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 block mb-1">
                  Fair, Transparent Partnership
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Our terms define clear expectations, mutual respect, and enterprise-grade deliverables for all AI development, business analysis, and consulting engagements.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  1. Scope of Engagement
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  All custom software engineering, LLM fine-tuning, analytics pipelines, and automations are performed under formalized Statements of Work (SOW) specifying deliverables, sprint timelines, milestones, and acceptance criteria.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  2. 100% Client Intellectual Property
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Upon completion of milestones and fulfillment of project contracts, all custom code, trained models, database schemas, and proprietary assets created specifically for your company belong 100% to you.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  3. Strict Confidentiality & Mutual NDA
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We safeguard your business logic, proprietary datasets, strategy documents, and source repositories under strict non-disclosure obligations. Your proprietary competitive edge remains entirely private.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  4. Ethical & Responsible AI Usage
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We engineer AI solutions with rigorous safety guardrails, unbiased evaluation benchmarks, and privacy controls, adhering to global standards for trustworthy AI deployment.
                </p>
              </div>
            </div>
          )}

          {/* 3. SECURITY PROTOCOLS */}
          {activeTab === 'security' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/20">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block mb-1">
                  Enterprise-Grade Security Architecture
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Security is engineered into our core workflows from day one. We adhere to rigorous standards to protect enterprise data pipelines, API integrations, and model inferences.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1.5 font-semibold text-xs">
                    <Lock className="w-4 h-4" /> End-to-End Encryption
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    TLS 1.3 encryption for all data in transit. AES-256 military-grade encryption for all client storage and database volumes at rest.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1.5 font-semibold text-xs">
                    <Shield className="w-4 h-4" /> Compliance Readiness
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Architected for SOC-2 Type II standards, HIPAA-ready clinical pipelines, and GDPR / DPDP international privacy benchmarks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-blue-400 mb-1.5 font-semibold text-xs">
                    <Database className="w-4 h-4" /> Zero Data Retention for LLMs
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Enterprise OpenAI/Azure/AWS endpoints configured with zero data retention (ZDR)—your data is never used to train public models.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-indigo-400 mb-1.5 font-semibold text-xs">
                    <Server className="w-4 h-4" /> Role-Based Access (RBAC)
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Strict principle of least privilege, hardware MFA, and audit-logged deployment pipelines across AWS, Azure, and Google Cloud.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Incident Response & Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our dedicated engineering and DevOps team provides 24/7 priority monitoring, automated vulnerability scanning, and guaranteed rapid response SLAs for enterprise partners.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-3.5 border-t border-slate-800/90 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Last Updated: <span className="text-slate-200 font-medium">September 2026</span> • {COMPANY_CONFIG.defaultName}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenContact) onOpenContact();
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer"
            >
              Have questions? Talk to our team →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
