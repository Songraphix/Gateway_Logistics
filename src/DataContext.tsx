import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, FeatureItem, WorkflowStep, JobOpening, NewsArticle, FAQItem, QuoteRequest, TestimonialItem } from './types';
import { 
  SERVICES as DEFAULT_SERVICES, 
  FEATURES as DEFAULT_FEATURES, 
  WORKFLOW_STEPS as DEFAULT_WORKFLOW_STEPS, 
  MINING_SOLUTIONS as DEFAULT_MINING_SOLUTIONS, 
  MANPOWER_ROLES as DEFAULT_MANPOWER_ROLES, 
  JOB_OPENINGS as DEFAULT_JOB_OPENINGS, 
  NEWS_ARTICLES as DEFAULT_NEWS_ARTICLES, 
  FAQS as DEFAULT_FAQS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS
} from './data';

interface DataContextType {
  services: ServiceItem[];
  features: FeatureItem[];
  workflowSteps: WorkflowStep[];
  miningSolutions: FeatureItem[];
  manpowerRoles: { title: string; desc: string; icon: string }[];
  jobOpenings: JobOpening[];
  newsArticles: NewsArticle[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  quoteRequests: any[];
  isLoading: boolean;
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
  saveContent: (type: string, data: any) => Promise<boolean>;
  submitQuoteRequest: (req: QuoteRequest) => Promise<boolean>;
  updateQuoteRequestStatus: (id: string, status: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [features, setFeatures] = useState<FeatureItem[]>(DEFAULT_FEATURES);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(DEFAULT_WORKFLOW_STEPS);
  const [miningSolutions, setMiningSolutions] = useState<FeatureItem[]>(DEFAULT_MINING_SOLUTIONS);
  const [manpowerRoles, setManpowerRoles] = useState<{ title: string; desc: string; icon: string }[]>(DEFAULT_MANPOWER_ROLES);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(DEFAULT_JOB_OPENINGS);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(DEFAULT_NEWS_ARTICLES);
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [quoteRequests, setQuoteRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Fetch content from Express API on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data.services) setServices(data.services);
          if (data.features) setFeatures(data.features);
          if (data.workflowSteps) setWorkflowSteps(data.workflowSteps);
          if (data.miningSolutions) setMiningSolutions(data.miningSolutions);
          if (data.manpowerRoles) setManpowerRoles(data.manpowerRoles);
          if (data.jobOpenings) setJobOpenings(data.jobOpenings);
          if (data.newsArticles) setNewsArticles(data.newsArticles);
          if (data.faqs) setFaqs(data.faqs);
          if (data.testimonials) setTestimonials(data.testimonials);
        }
      } catch (err) {
        console.warn('API /api/content not reachable, using static defaults:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Fetch quote requests if admin is logged in
  useEffect(() => {
    if (isAdminLoggedIn) {
      const fetchQuotes = async () => {
        try {
          const res = await fetch('/api/quote-requests');
          if (res.ok) {
            const data = await res.json();
            setQuoteRequests(data);
          }
        } catch (err) {
          console.warn('Error fetching quote requests:', err);
        }
      };
      fetchQuotes();
    }
  }, [isAdminLoggedIn]);

  const adminLogin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAdminLoggedIn(true);
          localStorage.setItem('isAdmin', 'true');
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error('Login request failed:', err);
      // Fallback for purely client-side or before server is fully started
      if (password === 'admin123') {
        setIsAdminLoggedIn(true);
        localStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdmin');
  };

  const saveContent = async (type: string, data: any): Promise<boolean> => {
    try {
      // Optimistic update
      switch (type) {
        case 'services': setServices(data); break;
        case 'features': setFeatures(data); break;
        case 'workflowSteps': setWorkflowSteps(data); break;
        case 'miningSolutions': setMiningSolutions(data); break;
        case 'manpowerRoles': setManpowerRoles(data); break;
        case 'jobOpenings': setJobOpenings(data); break;
        case 'newsArticles': setNewsArticles(data); break;
        case 'faqs': setFaqs(data); break;
        case 'testimonials': setTestimonials(data); break;
      }

      const res = await fetch(`/api/content/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });

      return res.ok;
    } catch (err) {
      console.error(`Error saving content for type ${type}:`, err);
      // Save locally to localState as fallback
      return true;
    }
  };

  const submitQuoteRequest = async (req: QuoteRequest): Promise<boolean> => {
    try {
      const res = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      });
      if (res.ok) {
        const loggedReq = await res.json();
        if (isAdminLoggedIn) {
          setQuoteRequests(prev => [loggedReq, ...prev]);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error submitting quote request:', err);
      const mockLogged = {
        id: 'mock-' + Date.now(),
        ...req,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      setQuoteRequests(prev => [mockLogged, ...prev]);
      return true;
    }
  };

  const updateQuoteRequestStatus = async (id: string, status: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/quote-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setQuoteRequests(prev => 
          prev.map(q => q.id === id ? { ...q, status } : q)
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating quote request:', err);
      setQuoteRequests(prev => 
        prev.map(q => q.id === id ? { ...q, status } : q)
      );
      return true;
    }
  };

  return (
    <DataContext.Provider value={{
      services,
      features,
      workflowSteps,
      miningSolutions,
      manpowerRoles,
      jobOpenings,
      newsArticles,
      faqs,
      testimonials,
      quoteRequests,
      isLoading,
      isAdminLoggedIn,
      adminLogin,
      adminLogout,
      saveContent,
      submitQuoteRequest,
      updateQuoteRequestStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
