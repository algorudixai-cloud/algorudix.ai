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

export type BlogStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type CreationMethod = 'ai' | 'manual';

export interface BlogSeoData {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  score: number; // 0-100 SEO health score
}

export interface AiGenerationHistory {
  provider: string;
  model: string;
  prompt: string;
  targetAudience?: string;
  tone?: string;
  generatedAt: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  date: string;
  readTime: string;
  category: 'AI & LLMs' | 'Business Intelligence' | 'Process Automation' | 'Data Engineering';
  tags: string[];
  image: string;
  createdType: 'manual' | 'agent';
  creationMethod?: CreationMethod;
  status: BlogStatus;
  targetAudience?: string;
  tone?: string;
  seo?: BlogSeoData;
  aiHistory?: AiGenerationHistory;
  agentDetails?: {
    model: string;
    executionTimeMs: number;
    tokensUsed: number;
    confidenceScore: string;
  };
  featured?: boolean;
}

export interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  aiGeneratedBlogs: number;
  manualBlogs: number;
  scheduledBlogs: number;
}


