export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  category: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
  sampleUseCases: string[];
}

export interface TechnologyItem {
  name: string;
  category: 'ai' | 'analytics' | 'engineering' | 'dev' | 'cloud';
  description: string;
  iconName: string;
  badge: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  useCases: string[];
  impactMetric: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  tagline: string;
  industry: string;
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  imagePlaceholderGradient: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  summary: string;
  description: string;
  keyActivities: string[];
  deliverables: string[];
  duration: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
  metrics: string;
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  budgetRange?: string;
  timeline?: string;
  projectDescription: string;
}
