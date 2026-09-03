import { BlogPost, BlogSeoData } from '../../types';

export interface GenerateArticleInput {
  topic: string;
  basicIdea?: string;
  targetAudience?: string;
  tone?: 'Professional' | 'Technical' | 'Conversational' | 'Executive';
  category: 'AI & LLMs' | 'Business Intelligence' | 'Process Automation' | 'Data Engineering';
  keywords?: string[];
  desiredLength?: 'Short (~400 words)' | 'Standard (~800 words)' | 'Comprehensive (~1500+ words)';
}

export interface GeneratedArticleResult {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: 'AI & LLMs' | 'Business Intelligence' | 'Process Automation' | 'Data Engineering';
  tags: string[];
  imagePrompt: string;
  image: string;
  seo: BlogSeoData;
  providerName: string;
  modelName: string;
}

export interface IAIProvider {
  name: string;
  model: string;
  generateBlog(input: GenerateArticleInput, apiKey?: string): Promise<GeneratedArticleResult>;
  regenerateSection?(sectionContent: string, instruction: string, apiKey?: string): Promise<string>;
  generateImagePrompt?(topic: string, category: string, audience?: string): Promise<string>;
}

export interface IImageProvider {
  name: string;
  generateFeaturedImage(prompt: string, category: string): Promise<string>;
}
