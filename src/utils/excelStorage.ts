import { COMPANY_CONFIG } from '../data/companyData';

export interface InquiryRecord {
  id: string;
  timestamp: string;
  type: 'Project Inquiry' | 'Consultation Booking';
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  details: string;
  dateOrTimeSlot?: string;
}

const STORAGE_KEY = 'algorudix_form_submissions';

/**
 * Saves submission to Local Storage (Excel-ready database)
 */
export function saveSubmissionToLocalExcel(record: Omit<InquiryRecord, 'id' | 'timestamp'>): InquiryRecord {
  const existing: InquiryRecord[] = getStoredSubmissions();
  const newRecord: InquiryRecord = {
    ...record,
    id: 'INQ-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
  return newRecord;
}

/**
 * Returns all stored form submissions
 */
export function getStoredSubmissions(): InquiryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Sends submission row to Google Sheets Webhook if configured
 */
export async function sendToGoogleSheetsWebhook(record: InquiryRecord): Promise<boolean> {
  const webhookUrl =
    (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
    COMPANY_CONFIG.googleSheetsWebhookUrl;

  if (!webhookUrl) {
    console.log('Google Sheets Webhook URL not set yet. Saved to local storage.');
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append('id', record.id);
    params.append('timestamp', record.timestamp);
    params.append('type', record.type);
    params.append('fullName', record.fullName || '');
    params.append('email', record.email || '');
    params.append('phone', record.phone || '');
    params.append('company', record.company || '');
    params.append('service', record.service || '');
    params.append('details', record.details || '');
    params.append('dateOrTimeSlot', record.dateOrTimeSlot || '');

    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    return true;
  } catch (err) {
    console.warn('Google Sheets Webhook fetch failed:', err);
    return false;
  }
}

/**
 * Exports all captured inquiries into a downloadable Excel-compatible (.csv) file
 */
export function exportSubmissionsToExcel() {
  const submissions = getStoredSubmissions();
  if (submissions.length === 0) {
    alert('No form submissions recorded yet to export.');
    return;
  }

  const headers = [
    'Inquiry ID',
    'Date & Time (IST)',
    'Form Type',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Company Name',
    'Service / Topic',
    'Details / Notes',
    'Slot / Date',
  ];

  const rows = submissions.map((sub) => [
    `"${sub.id}"`,
    `"${sub.timestamp}"`,
    `"${sub.type}"`,
    `"${(sub.fullName || '').replace(/"/g, '""')}"`,
    `"${(sub.email || '').replace(/"/g, '""')}"`,
    `"${(sub.phone || '').replace(/"/g, '""')}"`,
    `"${(sub.company || '').replace(/"/g, '""')}"`,
    `"${(sub.service || '').replace(/"/g, '""')}"`,
    `"${(sub.details || '').replace(/"/g, '""')}"`,
    `"${(sub.dateOrTimeSlot || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `Algorudix_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
