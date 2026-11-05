// A small set of line icons drawn for this site (24 × 24, 2px strokes), and the Algorudix mark.
import { useId } from 'react';

const PATHS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7',
  sparkles: 'M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z',
  chart: 'M4 20V11M10 20V5M16 20v-6M21 20H3',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  workflow: 'M5 3h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM16 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zM10 6.5h4a3 3 0 0 1 3 3V14',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  cloud: 'M7 18.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.6 4.5 4.5 0 0 0 7 18.5z',
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3.5 7.5l8.5 6 8.5-6',
  phone: 'M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4.5 5a2 2 0 0 1 2-2z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
  clock: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7.5V12l3 2',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  menu: 'M4 7h16M4 12h16M4 17h16',
  sun: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  invoice: 'M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 3v5h5M9 13h7M9 17h5',
  report: 'M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 16.5v-3M12 16.5v-7M15.5 16.5v-5',
  chat: 'M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
  sync: 'M4 12a8 8 0 0 1 13.7-5.6L20 9M20 4v5h-5M20 12a8 8 0 0 1-13.7 5.6L4 15M4 20v-5h5',
  sheet: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM3 10h18M3 15h18M9 4v16',
  calculator: 'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 7h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01',
  users: 'M9 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14a6 6 0 0 1 3 6',
  boxes: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  dashboard: 'M5 3h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM15 3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM15 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM5 17h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2z',
  bell: 'M6 16v-5a6 6 0 1 1 12 0v5l2 2H4zM10 20.5a2 2 0 0 0 4 0',
  app: 'M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18.5h2',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  target: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = 'icon', title }: { name: IconName; className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} aria-label={title}>
      <path d={PATHS[name]} />
    </svg>
  );
}

/** → used inside buttons and links; it nudges on hover. */
export const Arrow = () => <Icon name="arrow" className="icon arrow" />;

/** The Algorudix mark: an "A" drawn as three connected nodes, on the brand gradient. */
export function Mark({ className = 'mark' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c3bff" /><stop offset="0.55" stopColor="#2f6bff" /><stop offset="1" stopColor="#19c3e6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#g${id})`} />
      <path d="M12 28.5 20 11.5 28 28.5M15.6 22.2h8.8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="11.5" r="3.1" fill="#fff" />
      <circle cx="12" cy="28.5" r="2.6" fill="#fff" />
      <circle cx="28" cy="28.5" r="2.6" fill="#fff" />
    </svg>
  );
}

/** Picks an icon for a free-text label (service titles, tool names, flow nodes). */
export function iconFor(label: string): IconName {
  const l = label.toLowerCase();
  if (/\bai\b|assistant|model|machine learning|agent/.test(l)) return 'sparkles';
  if (/dashboard/.test(l)) return 'dashboard';
  if (/report|analy|intelligence|bi\b|insight/.test(l)) return 'chart';
  if (/data|etl|pipeline|warehouse|sql/.test(l)) return 'database';
  if (/automat|process|workflow|rpa/.test(l)) return 'workflow';
  if (/software|app|code|web|portal|development/.test(l)) return 'code';
  if (/cloud|azure|aws|google/.test(l)) return 'cloud';
  if (/email|mail/.test(l)) return 'mail';
  if (/spreadsheet|excel|sheet/.test(l)) return 'sheet';
  if (/account|invoice|finance|payment/.test(l)) return 'calculator';
  if (/crm|customer|support/.test(l)) return 'users';
  if (/erp|inventory|stock|supply/.test(l)) return 'boxes';
  if (/alert|notif/.test(l)) return 'bell';
  return 'layers';
}
