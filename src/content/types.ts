// Shapes of the content the site renders. Rows come from content/site.db (see schema.ts).

export interface Row {
  id: string;
  sort: number;
  visible: boolean;
}

export interface Pair { label: string; value: string }
export interface Step { who: 'ai' | 'person'; text: string }
export interface Block { heading: string; text: string }
export interface Picture { src: string; alt: string }

export interface Settings extends Row {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phones: string[];
  location: string;
  hours: string;
  support_note: string;
  linkedin: string;
  x: string;
  github: string;
  instagram: string;
  facebook: string;
  seo_title: string;
  seo_description: string;
  sheets_webhook: string;
  consultation_slots: string[];
}

export type SectionId =
  | 'hero' | 'intro' | 'tasks' | 'services' | 'process' | 'work'
  | 'industries' | 'about' | 'faq' | 'contact' | 'footer' | 'devhub';

export interface Section extends Row {
  id: SectionId;
  nav_label: string;
  heading: string;
  intro: string;
  body: string;
  cta_label: string;
  images: Picture[];
}

export interface Task extends Row {
  name: string;
  today: string;
  steps: Step[];
  result: string;
  built_with: string;
}

export interface Service extends Row {
  title: string;
  category: string;
  summary: string;
  description: string;
  features: string[];
  deliverables: string[];
  tech: string[];
  use_cases: string[];
}

export interface ProcessStep extends Row {
  title: string;
  duration: string;
  summary: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

export type FigureKind = 'assistant' | 'dashboard' | 'pipeline' | 'app' | 'image';

export interface CaseStudy extends Row {
  title: string;
  tagline: string;
  industry: string;
  disciplines: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Pair[];
  technologies: string[];
  figure: FigureKind;
  image: string;
  image_alt: string;
}

export interface Industry extends Row {
  name: string;
  tagline: string;
  description: string;
  use_cases: Pair[];
  impact: string;
}

export interface Technology extends Row {
  name: string;
  category: string;
  description: string;
}

export interface Highlight extends Row { value: string; label: string }
export interface Faq extends Row { question: string; answer: string }
export interface Testimonial extends Row { quote: string; author: string; role: string; company: string }

export interface DevHubItem extends Row {
  title: string;
  description: string;
  url: string;
  category: 'Websites' | 'Projects' | 'Tools' | 'Resources';
  badge: string;
  updated: string;
}

export interface Policy extends Row {
  id: 'privacy' | 'terms' | 'security';
  title: string;
  summary: string;
  blocks: Block[];
  updated: string;
}

export interface Credit extends Row {
  title: string;
  creator: string;
  licence: string;
  source: string;
  file: string;
}

export interface SiteContent {
  settings: Settings;
  sections: Record<SectionId, Section>;
  tasks: Task[];
  services: Service[];
  process_steps: ProcessStep[];
  case_studies: CaseStudy[];
  industries: Industry[];
  technologies: Technology[];
  highlights: Highlight[];
  faqs: Faq[];
  testimonials: Testimonial[];
  dev_hub_items: DevHubItem[];
  policies: Policy[];
  credits: Credit[];
}
