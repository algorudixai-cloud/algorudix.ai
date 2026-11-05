// One definition of the site's content. It drives the SQLite tables (content/site.db),
// the typed reader used at build time, and the admin forms (#admin).

export type FieldType =
  | 'text' // one line
  | 'textarea' // a paragraph
  | 'list' // string[]
  | 'pairs' // { label, value }[]
  | 'steps' // { who: 'ai' | 'person', text }[]
  | 'blocks' // { heading, text }[]
  | 'images' // { src, alt }[]
  | 'url'
  | 'image' // a path such as media/x.jpg, or a full https:// URL
  | 'select';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
}

export interface TableDef {
  name: TableName;
  label: string;
  /** What one row is called in the admin ("service", "question"). */
  item: string;
  /** Field shown as the row's title in admin lists. */
  titleKey: string;
  /** Rows are fixed (no add/delete), e.g. the page sections or the one settings row. */
  fixed?: boolean;
  /** Seed value for `visible` on new rows. */
  visibleByDefault?: boolean;
  help?: string;
  fields: FieldDef[];
}

export const TABLE_NAMES = [
  'settings',
  'sections',
  'tasks',
  'services',
  'process_steps',
  'case_studies',
  'industries',
  'technologies',
  'highlights',
  'faqs',
  'testimonials',
  'dev_hub_items',
  'policies',
  'credits',
] as const;
export type TableName = (typeof TABLE_NAMES)[number];

export const TABLES: Record<TableName, TableDef> = {
  settings: {
    name: 'settings', label: 'Company details', item: 'settings', titleKey: 'name', fixed: true,
    help: 'Name, contact details, links and the text search engines show.',
    fields: [
      { key: 'name', label: 'Company name', type: 'text', required: true },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'One-sentence description', type: 'textarea' },
      { key: 'email', label: 'Email (receives the form enquiries)', type: 'text', required: true },
      { key: 'phones', label: 'Phone numbers', type: 'list' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'hours', label: 'Working hours', type: 'text' },
      { key: 'support_note', label: 'Support note', type: 'text' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'url', help: 'Leave empty to hide the link.' },
      { key: 'x', label: 'X (Twitter) URL', type: 'url' },
      { key: 'github', label: 'GitHub URL', type: 'url' },
      { key: 'instagram', label: 'Instagram URL', type: 'url' },
      { key: 'facebook', label: 'Facebook URL', type: 'url' },
      { key: 'seo_title', label: 'Browser tab and search title', type: 'text' },
      { key: 'seo_description', label: 'Search description', type: 'textarea' },
      { key: 'sheets_webhook', label: 'Google Sheets webhook (form copies)', type: 'url' },
      { key: 'consultation_slots', label: 'Consultation time slots', type: 'list' },
    ],
  },
  sections: {
    name: 'sections', label: 'Page sections', item: 'section', titleKey: 'heading', fixed: true,
    help: 'Headings and text of each part of the page. Hide a section to take it off the page.',
    fields: [
      { key: 'nav_label', label: 'Menu label (empty = not in the menu)', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text', required: true, help: 'Keep it short: it must fit on two lines.' },
      { key: 'intro', label: 'Intro text', type: 'textarea' },
      { key: 'body', label: 'More text', type: 'textarea' },
      { key: 'cta_label', label: 'Button label', type: 'text' },
      { key: 'images', label: 'Pictures', type: 'images' },
    ],
  },
  tasks: {
    name: 'tasks', label: 'Tasks we automate', item: 'task', titleKey: 'name',
    help: 'The "Pick a task your team repeats" explainer.',
    fields: [
      { key: 'name', label: 'Task', type: 'text', required: true },
      { key: 'today', label: 'How it is done today', type: 'textarea' },
      { key: 'steps', label: 'Steps once automated', type: 'steps' },
      { key: 'result', label: 'Result', type: 'text' },
      { key: 'built_with', label: 'Built with', type: 'text' },
    ],
  },
  services: {
    name: 'services', label: 'Services', item: 'service', titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'features', label: 'What it covers', type: 'list' },
      { key: 'deliverables', label: 'What you get', type: 'list' },
      { key: 'tech', label: 'Tools', type: 'list' },
      { key: 'use_cases', label: 'Example uses', type: 'list' },
    ],
  },
  process_steps: {
    name: 'process_steps', label: 'How we work', item: 'stage', titleKey: 'title',
    fields: [
      { key: 'title', label: 'Stage', type: 'text', required: true },
      { key: 'duration', label: 'When', type: 'text' },
      { key: 'summary', label: 'Summary', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'activities', label: 'What happens', type: 'list' },
      { key: 'deliverables', label: 'What you get', type: 'list' },
    ],
  },
  case_studies: {
    name: 'case_studies', label: 'Work (case studies)', item: 'case study', titleKey: 'title',
    help: 'Only publish results you can back up.',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'disciplines', label: 'Disciplines (shown in the index)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'challenge', label: 'Challenge', type: 'textarea' },
      { key: 'solution', label: 'Solution', type: 'textarea' },
      { key: 'results', label: 'Results', type: 'list' },
      { key: 'metrics', label: 'Key numbers', type: 'pairs' },
      { key: 'technologies', label: 'Technologies', type: 'list' },
      { key: 'figure', label: 'Figure', type: 'select', options: ['assistant', 'dashboard', 'pipeline', 'app', 'image'], help: 'Which interface picture to show, or "image" to use the picture below.' },
      { key: 'image', label: 'Picture', type: 'image' },
      { key: 'image_alt', label: 'Picture description', type: 'text' },
    ],
  },
  industries: {
    name: 'industries', label: 'Industries', item: 'industry', titleKey: 'name',
    fields: [
      { key: 'name', label: 'Industry', type: 'text', required: true },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'use_cases', label: 'Example uses (use, kind of solution)', type: 'pairs' },
      { key: 'impact', label: 'Example result', type: 'text', help: 'Only publish a result you can back up.' },
    ],
  },
  technologies: {
    name: 'technologies', label: 'Tools we use', item: 'tool', titleKey: 'name',
    fields: [
      { key: 'name', label: 'Tool', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['AI', 'Analytics', 'Data engineering', 'Development', 'Cloud'] },
      { key: 'description', label: 'Description', type: 'text' },
    ],
  },
  highlights: {
    name: 'highlights', label: 'Key figures', item: 'figure', titleKey: 'label',
    help: 'The big figures under the headline. Only publish numbers you can back up.',
    fields: [
      { key: 'value', label: 'Value', type: 'text', required: true, help: 'A number with its unit, e.g. 150+ or 99.4%. It counts up when shown.' },
      { key: 'label', label: 'Label', type: 'text', required: true },
    ],
  },
  faqs: {
    name: 'faqs', label: 'Questions', item: 'question', titleKey: 'question',
    fields: [
      { key: 'question', label: 'Question', type: 'text', required: true },
      { key: 'answer', label: 'Answer', type: 'textarea', required: true },
    ],
  },
  testimonials: {
    name: 'testimonials', label: 'Testimonials', item: 'testimonial', titleKey: 'author', visibleByDefault: false,
    help: 'Hidden until you switch them on. Publish only real quotes from real clients, with their permission.',
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea', required: true },
      { key: 'author', label: 'Name', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
    ],
  },
  dev_hub_items: {
    name: 'dev_hub_items', label: 'Development Hub', item: 'item', titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'url', label: 'Link', type: 'url' },
      { key: 'category', label: 'Category', type: 'select', options: ['Websites', 'Projects', 'Tools', 'Resources'] },
      { key: 'badge', label: 'Status', type: 'text' },
      { key: 'updated', label: 'Last updated (YYYY-MM-DD)', type: 'text' },
    ],
  },
  policies: {
    name: 'policies', label: 'Privacy, terms and security', item: 'policy', titleKey: 'title', fixed: true,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      { key: 'blocks', label: 'Sections', type: 'blocks' },
      { key: 'updated', label: 'Last updated', type: 'text' },
    ],
  },
  credits: {
    name: 'credits', label: 'Picture credits', item: 'credit', titleKey: 'title',
    help: 'Credits for pictures from open collections, listed in the footer.',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'creator', label: 'Creator', type: 'text' },
      { key: 'licence', label: 'Licence', type: 'text' },
      { key: 'source', label: 'Source page', type: 'url' },
      { key: 'file', label: 'File', type: 'image' },
    ],
  },
};

/** Fields stored as JSON text in SQLite. */
export const JSON_TYPES: FieldType[] = ['list', 'pairs', 'steps', 'blocks', 'images'];

/** SQL that creates every table. Every table has id, sort and visible; fields are TEXT. */
export function schemaSql(): string {
  const parts = [
    'CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);',
    ...TABLE_NAMES.map((name) => {
      const cols = TABLES[name].fields.map((f) => `  "${f.key}" TEXT`).join(',\n');
      return `CREATE TABLE IF NOT EXISTS ${name} (\n  id TEXT PRIMARY KEY,\n  sort INTEGER NOT NULL DEFAULT 0,\n  visible INTEGER NOT NULL DEFAULT 1,\n${cols}\n);`;
    }),
  ];
  return parts.join('\n\n');
}

export const SCHEMA_VERSION = 1;
