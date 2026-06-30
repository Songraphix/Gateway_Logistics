export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'mining'
  | 'manpower'
  | 'careers'
  | 'news'
  | 'contact'
  | 'admin';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDesc: string;
  detailedDesc: string;
  bullets: string[];
  imageUrl: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  bullets?: string[];
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  desc: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
  summary: string;
  requirements: string[];
  benefits: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Company News' | 'Industry Insights' | 'Safety & Operations' | 'Project Spotlights';
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface QuoteRequest {
  service: string;
  emailOrPhone: string;
  details?: string;
  fullName?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatarUrl?: string;
}

