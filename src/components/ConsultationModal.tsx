import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Building2,
  ArrowRight
} from 'lucide-react';
import { SERVICES_DATA, COMPANY_CONFIG } from '../data/companyData';
import { saveSubmissionToLocalExcel, sendToGoogleSheetsWebhook } from '../utils/excelStorage';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const today = new Date();
  const localDate = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  const [preferredDate, setPreferredDate] = useState(localDate);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState(preselectedService || 'Custom AI Development');
  const [preferredTime, setPreferredTime] = useState('10:00 AM (IST)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const rec = saveSubmissionToLocalExcel({
      type: 'Consultation Booking',
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: selectedService,
      details: `Scheduled for ${preferredDate} at ${preferredTime}. Notes: ${formData.notes}`,
    });
    sendToGoogleSheetsWebhook(rec);

    try {
      const payload = {
        "Full Name": formData.name,
        "Email Address": formData.email,
        "Phone Number": formData.phone,
        "Company Name": formData.company,
        "Consultation Service": selectedService,
        "Scheduled Date": preferredDate,
        "Preferred Time": preferredTime,
        "Client Notes": formData.notes || "None",
        _subject: `New Consultation Booked: ${formData.name} (${selectedService})`,
        _replyto: formData.email,
        _captcha: "false"
      };

      await fetch(`https://formsubmit.co/ajax/${COMPANY_CONFIG.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      const mailtoUrl = `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(`Consultation Booking: ${selectedService}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDate: ${preferredDate} at ${preferredTime}\nNotes: ${formData.notes}`)}`;
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="consultation-modal-card"
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-xl text-slate-900 dark:text-zinc-100"
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Consultation Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
              We've booked your Free 30-Minute AI & Architecture Strategy Session with our Principal Architect.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 text-left space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-zinc-500">Selected Focus:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-zinc-500">Date & Time:</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-zinc-500">Attendee:</span>
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{formData.name || 'Valued Client'}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20 mb-2">
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>30-Min Architecture Discovery</span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Book a Free Consultation
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Discuss your business bottlenecks with our senior engineers and receive a tailored technical roadmap.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">

              {/* Step 1: Select Topic & Date */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                      Consultation Focus
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                      <option value="Enterprise AI & Automation Roadmap">Enterprise AI & Automation Roadmap</option>
                      <option value="Data Pipeline & Lakehouse Migration">Data Pipeline & Lakehouse Migration</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="date"
                          min={localDate}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl pl-9 pr-2 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                        Time Slot
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl pl-9 pr-2 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        >
                          <option value="10:00 AM (IST)">10:00 AM (IST)</option>
                          <option value="12:00 PM (IST)">12:00 PM (IST)</option>
                          <option value="02:30 PM (IST)">02:30 PM (IST)</option>
                          <option value="04:30 PM (IST)">04:30 PM (IST)</option>
                          <option value="06:30 PM (IST)">06:30 PM (IST)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: Enter Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                        Corporate Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="s.jenkins@corp.com"
                          className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                      Company / Organization Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Vanguard Logistics"
                        className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
                      Brief Notes / Specific Challenge
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Looking to automate invoice matching and build custom Power BI dashboards."
                      className="w-full bg-slate-50 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white"
                    >
                      ← Back to Scheduling
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Confirming...</span>
                      ) : (
                        <>
                          <span>Confirm Booking</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
