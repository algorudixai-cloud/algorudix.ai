import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Building2,
  User
} from 'lucide-react';
import { COMPANY_CONFIG, SERVICES_DATA } from '../data/companyData';
import { ConsultationFormData } from '../types';
import { saveSubmissionToLocalExcel, sendToGoogleSheetsWebhook } from '../utils/excelStorage';

interface ContactFormProps {
  prefilledService?: string;
  prefilledDescription?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  prefilledService,
  prefilledDescription
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: prefilledService || 'Custom AI Development',
    projectDescription: prefilledDescription || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, serviceRequired: prefilledService }));
    }
    if (prefilledDescription) {
      setFormData(prev => ({ ...prev, projectDescription: prefilledDescription }));
    }
  }, [prefilledService, prefilledDescription]);

  const validate = () => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.companyName.trim()) newErrors.companyName = 'Please enter your company or organization name';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid corporate email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required for consultation confirmation';
    if (!formData.projectDescription.trim() || formData.projectDescription.length < 10) {
      newErrors.projectDescription = 'Please describe your project or challenge (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const rec = saveSubmissionToLocalExcel({
      type: 'Project Inquiry',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.companyName,
      service: formData.serviceRequired,
      details: formData.projectDescription,
    });
    sendToGoogleSheetsWebhook(rec);

    try {
      const payload = {
        "Full Name": formData.fullName,
        "Email Address": formData.email,
        "Phone Number": formData.phone,
        "Company Name": formData.companyName || "N/A",
        "Service Required": formData.serviceRequired,
        "Project Description": formData.projectDescription,
        _subject: `New Project Inquiry: ${formData.serviceRequired} - ${formData.fullName}`,
        _replyto: formData.email,
        _captcha: "false"
      };

      const response = await fetch(`https://formsubmit.co/ajax/${COMPANY_CONFIG.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network error sending email');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Email dispatch fallback triggered:', err);
      const mailtoUrl = `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(`Project Inquiry: ${formData.serviceRequired}`)}&body=${encodeURIComponent(`Full Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.companyName}\nService: ${formData.serviceRequired}\n\nProject Description:\n${formData.projectDescription}`)}`;
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      serviceRequired: 'Custom AI Development',
      projectDescription: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-slate-50/60 dark:bg-[#09090b] border-t border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Direct Architecture Consultation</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Let's Build Something High-Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Tell us about your business challenge, current systems, or project vision. Our team will prepare a structured technical roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Company Contact Info */}
          <div className="lg:col-span-5 space-y-6">

            <div className="rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">
                Consultation Hub
              </h3>

              <div className="space-y-5">

                {/* Business Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_CONFIG.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                    >
                      {COMPANY_CONFIG.email}
                    </a>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Average reply time under 2 hours</p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Telephone
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {COMPANY_CONFIG.phone.split('|').map((num, idx) => (
                        <a
                          key={idx}
                          href={`tel:${num.trim()}`}
                          className="text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          {num.trim()}
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Direct lines to enterprise consulting</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Global Headquarters
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {COMPANY_CONFIG.location}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Availability
                    </span>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {COMPANY_CONFIG.hours}
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-3">
                  Connect With Us
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={COMPANY_CONFIG.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_CONFIG.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_CONFIG.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-center transition"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-9 shadow-xs">

              {isSubmitted ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span> from <span className="font-semibold text-slate-900 dark:text-white">{formData.companyName}</span>. Our lead technology architect is reviewing your requirements for <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{formData.serviceRequired}"</span>.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800 max-w-md mx-auto text-xs text-slate-600 dark:text-zinc-400 text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span>Confirmation Sent To:</span>
                      <span className="text-slate-900 dark:text-white font-mono">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Direct Phone:</span>
                      <span className="text-slate-900 dark:text-white font-mono">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Contact Window:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Within 2 business hours</span>
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                        Full Name <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="contact-fullname-input"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full bg-slate-50 dark:bg-[#18181b] border ${
                            errors.fullName ? 'border-red-500' : 'border-slate-200 dark:border-zinc-700'
                          } rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                        Company Name <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="contact-company-input"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Acme Enterprises"
                          className={`w-full bg-slate-50 dark:bg-[#18181b] border ${
                            errors.companyName ? 'border-red-500' : 'border-slate-200 dark:border-zinc-700'
                          } rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition`}
                        />
                      </div>
                      {errors.companyName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.companyName}
                        </p>
                      )}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                        Business Email <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="contact-email-input"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className={`w-full bg-slate-50 dark:bg-[#18181b] border ${
                            errors.email ? 'border-red-500' : 'border-slate-200 dark:border-zinc-700'
                          } rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                        Phone Number <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                        <input
                          id="contact-phone-input"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full bg-slate-50 dark:bg-[#18181b] border ${
                            errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-zinc-700'
                          } rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                      Service Required <span className="text-emerald-600">*</span>
                    </label>
                    <select
                      id="contact-service-select"
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="Multi-Service Architecture & Complete Overhaul">
                        Multi-Service Architecture & Complete Overhaul
                      </option>
                      <option value="General AI & Cloud Technology Consultation">
                        General AI & Cloud Technology Consultation
                      </option>
                    </select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5">
                      Project Scope & Business Challenge <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      id="contact-description-textarea"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Describe your current business bottlenecks, data sources, goals, or desired AI capabilities..."
                      className={`w-full bg-slate-50 dark:bg-[#18181b] border ${
                        errors.projectDescription ? 'border-red-500' : 'border-slate-200 dark:border-zinc-700'
                      } rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition resize-none`}
                    />
                    {errors.projectDescription && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.projectDescription}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-xs transition duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Your Requirements...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                    🔒 All technical data protected under strict mutual Non-Disclosure Agreement (NDA).
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
