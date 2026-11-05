// Sending enquiries. The site is static, so a form goes to FormSubmit (email to the company
// inbox) and, when configured, a copy goes to the Google Sheets webhook. If the email service
// cannot be reached, the visitor's mail app opens with the message filled in.
import { site } from '../content';

export type EnquiryKind = 'Project Inquiry' | 'Consultation Booking';

export interface Enquiry {
  kind: EnquiryKind;
  subject: string;
  fields: Record<string, string>;
  sheet: {
    fullName: string; email: string; phone: string; company: string;
    service: string; details: string; dateOrTimeSlot?: string;
  };
}

function sendToSheet(e: Enquiry) {
  const url = site.settings.sheets_webhook;
  if (!url) return;
  const params = new URLSearchParams({
    id: 'INQ-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    type: e.kind,
    ...e.sheet,
    dateOrTimeSlot: e.sheet.dateOrTimeSlot ?? '',
  });
  fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() }).catch(() => {});
}

/** Returns 'sent', or 'mail-app' when the visitor's email app was opened instead. */
export async function sendEnquiry(e: Enquiry): Promise<'sent' | 'mail-app'> {
  sendToSheet(e);
  const to = site.settings.email;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...e.fields, _subject: e.subject, _replyto: e.sheet.email, _captcha: 'false' }),
    });
    if (!res.ok) throw new Error('email service error');
    return 'sent';
  } catch {
    const body = Object.entries(e.fields).map(([k, v]) => `${k}: ${v}`).join('\n');
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(e.subject)}&body=${encodeURIComponent(body)}`;
    return 'mail-app';
  }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
