import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Mail,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { AUTHORIZED_ADMIN_EMAIL, requestAdminOtp, verifyAdminOtp } from '../utils/adminAuth';

interface AdminOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminOtpModal: React.FC<AdminOtpModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await requestAdminOtp(email);
      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message);
        setStep(2);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Failed to dispatch OTP code. Please check your network connection.');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = verifyAdminOtp(email, otpCode);
      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg('Authentication verified! Loading Admin Console...');
        setTimeout(() => {
          onLoginSuccess();
          onClose();
          setStep(1);
          setOtpCode('');
          setEmail('');
        }, 500);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-[#18181b]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Admin Authentication
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Secure Email OTP Verification
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

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs">

          {/* Security Status Tag */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#C15F3C] dark:text-[#F0997D] bg-[#FAF3EC] dark:bg-[#D97757]/15 px-2.5 py-0.5 rounded-full border border-[#E8B29E] dark:border-[#D97757]/35 shadow-2xs">
              <Lock className="w-3 h-3" />
              Restricted Console
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Step {step} of 2
            </span>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <span className="leading-relaxed">{successMsg}</span>
            </div>
          )}

          {step === 1 ? (
            /* Step 1: Admin Email Form */
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300">
                    Administrator Email
                  </label>
                  <button
                    type="button"
                    onClick={() => setEmail(AUTHORIZED_ADMIN_EMAIL)}
                    className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Use Authorized Email
                  </button>
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@algorudixai.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-xs"
                    autoFocus
                  />
                </div>

                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1.5 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>A single-use 6-digit OTP will be dispatched to the verified address.</span>
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send 6-Digit OTP Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: OTP Entry Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Enter 6-Digit Verification Code
                </label>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="••••••"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#18181b] border border-slate-200/80 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-mono text-center text-lg font-bold tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Check inbox: <strong className="text-slate-700 dark:text-slate-300 font-medium">{email}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorMsg('');
                      setSuccessMsg('');
                      setOtpCode('');
                    }}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Change Email
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || otpCode.length < 6}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Open Admin Console</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
