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

    // Save to local excel database & send to Google Sheets
    const rec = saveSubmissionToLocalExcel({
      type: 'Consultation Booking',
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: selectedService,
      details: formData.notes,
      dateOrTimeSlot: `${preferredDate} @ ${preferredTime}`
    });
    sendToGoogleSheetsWebhook(rec);

    try {
      const payload = {
        "Full Name": formData.name,
        "Email Address": formData.email,
        "Phone Number": formData.phone,
        "Company Name": formData.company || "N/A",
        "Service Requested": selectedService,
        "Preferred Date": preferredDate,
        "Preferred Time Slot": preferredTime,
        "Additional Notes": formData.notes || "None",
        _subject: `New Consultation Booking: ${selectedService} - ${formData.name}`,
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
    } catch (err) {
      console.warn('Consultation email dispatch fallback:', err);
    } finally {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="consultation-modal-card"
        className="relative w-full max-w-xl rounded-2xl bg-gradient-to-b from-slate-900 via-[#0d1424] to-slate-950 border border-slate-700 p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white">
              Consultation Confirmed!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We've booked your Free 30-Minute AI & Tech Architecture Consultation with our Lead Solutions Architect.
            </p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 text-left space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Focus:</span>
                <span className="font-semibold text-cyan-400">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-semibold text-white">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Attendee:</span>
                <span className="font-semibold text-white">{formData.name || 'Valued Client'}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>30-Min Architecture Discovery Session</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Book a Free Consultation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Discuss your business bottlenecks with our senior engineers and receive a tailored technical roadmap.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">

              {/* Step 1: Select Topic & Date */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Consultation Focus
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
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
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Time Slot
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="09:00 AM (IST)">09:00 AM (IST)</option>
                        <option value="10:00 AM (IST)">10:00 AM (IST)</option>
                        <option value="01:30 PM (IST)">01:30 PM (IST)</option>
                        <option value="03:00 PM (IST)">03:00 PM (IST)</option>
                        <option value="05:00 PM (IST)">05:00 PM (IST)</option>
                        <option value="07:00 PM (IST)">07:00 PM (IST)</option>
                        <option value="09:00 PM (IST)">09:00 PM (IST)</option>

                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>No obligation. 100% confidential under mutual NDA standard.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next: Your Contact Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jhon Doe"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Company *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Algorudix.ai"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="[EMAIL_ADDRESS]"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Key Goals / Current Stack (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Migrating from on-prem SQL to Snowflake + building a customer support AI assistant..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Confirm Consultation</span>
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
