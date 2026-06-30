import React, { useState, useEffect } from 'react';
import { useData } from '../DataContext';
import { Page, ServiceItem, FeatureItem, WorkflowStep, JobOpening, NewsArticle, FAQItem, TestimonialItem } from '../types';
import { 
  Lock, LogOut, CheckCircle, Clock, AlertCircle, Edit, Trash, Plus, 
  Save, X, Eye, FileText, Briefcase, MessageSquare, Shield, HelpCircle, 
  FileCheck, Map, Users, ChevronRight, Settings, Server, RefreshCw,
  Upload, Image as ImageIcon, Trash2, Link, Star, Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploaderProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  placeholder?: string;
}

function ImageUploader({ value, onChange, label, placeholder }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [mode, setMode] = useState<'url' | 'upload'>(value && !value.startsWith('data:') ? 'url' : 'upload');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    // Limit file size to 3MB for sensible base64 DB storage
    if (file.size > 3 * 1024 * 1024) {
      alert('Image is too large. Please select an image under 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</label>
        <div className="flex bg-slate-100 dark:bg-white/10 rounded-lg p-0.5 text-[10px] font-bold uppercase">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              mode === 'upload' ? 'bg-[#0084C2] text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Local Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              mode === 'url' ? 'bg-[#0084C2] text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Web URL
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <div className="relative">
          <input
            type="url"
            value={value && !value.startsWith('data:') ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs pr-10"
            placeholder={placeholder || "https://images.unsplash.com/photo-..."}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <Link className="h-4 w-4" />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {value ? (
            <div className="relative bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 flex items-center space-x-3">
              <img
                src={value}
                alt="Upload preview"
                className="h-14 w-14 rounded-lg object-cover border border-slate-200 dark:border-white/10 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono text-slate-400 truncate">
                  {value.startsWith('data:') ? 'Local Base64 Image Asset' : value}
                </p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase mt-0.5">✓ Image Loaded Successfully</p>
              </div>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors cursor-pointer border border-rose-500/20"
                title="Remove Image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                isDragActive
                  ? 'border-[#0084C2] bg-[#0084C2]/5 scale-[0.99]'
                  : 'border-slate-200 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/25 bg-slate-50/50 dark:bg-slate-950/20'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <Upload className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Drag & drop your image, or <span className="text-[#0084C2] hover:underline">browse</span>
                </p>
                <p className="text-[10px] text-slate-400">Supports JPEG, PNG, WEBP up to 3MB</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const {
    services, features, workflowSteps, miningSolutions, manpowerRoles,
    jobOpenings, newsArticles, faqs, testimonials, quoteRequests, isAdminLoggedIn,
    adminLogin, adminLogout, saveContent, updateQuoteRequestStatus
  } = useData();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'quotes' | 'services' | 'features' | 'careers' | 'news' | 'faqs'>('quotes');

  const [dbStatus, setDbStatus] = useState<{
    isConfigured: boolean;
    websiteContentExists: boolean;
    quoteRequestsExists: boolean;
    hasMissingTables: boolean;
    details: string;
  } | null>(null);
  const [isCheckingDb, setIsCheckingDb] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const fetchDbStatus = async () => {
    setIsCheckingDb(true);
    try {
      const res = await fetch('/api/db-status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      }
    } catch (e) {
      console.error('Error fetching database status:', e);
    } finally {
      setIsCheckingDb(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchDbStatus();
    }
  }, [isAdminLoggedIn]);

  // Editing state
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Forms state
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({});
  const [featureForm, setFeatureForm] = useState<Partial<FeatureItem>>({});
  const [workflowForm, setWorkflowForm] = useState<Partial<WorkflowStep>>({});
  const [jobForm, setJobForm] = useState<Partial<JobOpening>>({});
  const [newsForm, setNewsForm] = useState<Partial<NewsArticle>>({});
  const [faqForm, setFaqForm] = useState<Partial<FAQItem>>({});
  const [testimonialForm, setTestimonialForm] = useState<Partial<TestimonialItem>>({});

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const success = await adminLogin(password);
    setIsLoggingIn(false);
    if (!success) {
      setLoginError('Invalid Administrator Passcode. Please try again.');
    } else {
      setPassword('');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4 bg-gradient-to-br from-[#00091d] via-[#001438] to-[#001e4e] text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900/60 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-white/10 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/20">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-display font-black text-2xl tracking-tight uppercase">Admin Gateway</h1>
            <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Gateway Logistics & Services Control Portal</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Administrator Passkey</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0084C2] font-mono"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center space-x-2 text-xs text-rose-400 font-semibold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-[#0084C2] to-[#005B94] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#0084C2]/15 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer border border-sky-400/20"
            >
              {isLoggingIn ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>AUTHENTICATE PORTAL</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-6 mt-6 border-t border-white/10">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-400 hover:text-white transition-colors uppercase font-bold tracking-wider"
            >
              Return to Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Handle Saves for various sections
  const handleSaveServices = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedServices = [...services];
    if (isAddingNew) {
      const newService = {
        ...serviceForm,
        id: serviceForm.id || 'service-' + Date.now(),
        bullets: typeof serviceForm.bullets === 'string' 
          ? (serviceForm.bullets as string).split('\n').filter(Boolean)
          : serviceForm.bullets || []
      } as ServiceItem;
      updatedServices.push(newService);
    } else {
      updatedServices = services.map(s => s.id === editingItem.id ? {
        ...s,
        ...serviceForm,
        bullets: typeof serviceForm.bullets === 'string'
          ? (serviceForm.bullets as string).split('\n').filter(Boolean)
          : serviceForm.bullets || []
      } : s);
    }

    const success = await saveContent('services', updatedServices);
    if (success) {
      closeEditor();
    }
  };

  const handleSaveFeatures = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFeatures = features.map(f => f.id === editingItem.id ? {
      ...f,
      ...featureForm,
      bullets: typeof featureForm.bullets === 'string'
        ? (featureForm.bullets as string).split('\n').filter(Boolean)
        : featureForm.bullets || []
    } : f);

    const success = await saveContent('features', updatedFeatures);
    if (success) {
      closeEditor();
    }
  };

  const handleSaveCareers = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedCareers = [...jobOpenings];
    const formattedJob = {
      ...jobForm,
      id: jobForm.id || 'job-' + Date.now(),
      requirements: typeof jobForm.requirements === 'string'
        ? (jobForm.requirements as string).split('\n').filter(Boolean)
        : jobForm.requirements || [],
      benefits: typeof jobForm.benefits === 'string'
        ? (jobForm.benefits as string).split('\n').filter(Boolean)
        : jobForm.benefits || []
    } as JobOpening;

    if (isAddingNew) {
      updatedCareers.push(formattedJob);
    } else {
      updatedCareers = jobOpenings.map(j => j.id === editingItem.id ? formattedJob : j);
    }

    const success = await saveContent('jobOpenings', updatedCareers);
    if (success) {
      closeEditor();
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedNews = [...newsArticles];
    const formattedArticle = {
      ...newsForm,
      id: newsForm.id || 'news-' + Date.now(),
      date: newsForm.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } as NewsArticle;

    if (isAddingNew) {
      updatedNews.unshift(formattedArticle);
    } else {
      updatedNews = newsArticles.map(n => n.id === editingItem.id ? formattedArticle : n);
    }

    const success = await saveContent('newsArticles', updatedNews);
    if (success) {
      closeEditor();
    }
  };

  const handleSaveFaqs = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedFaqs = [...faqs];
    const formattedFaq = {
      question: faqForm.question || '',
      answer: faqForm.answer || ''
    } as FAQItem;

    if (isAddingNew) {
      updatedFaqs.push(formattedFaq);
    } else {
      updatedFaqs = faqs.map((f, idx) => idx === editingItem.idx ? formattedFaq : f);
    }

    const success = await saveContent('faqs', updatedFaqs);
    if (success) {
      closeEditor();
    }
  };

  const handleSaveTestimonials = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedTestimonials = [...testimonials];
    const formattedTestimonial = {
      id: testimonialForm.id || `t-${Date.now()}`,
      author: testimonialForm.author || '',
      role: testimonialForm.role || '',
      company: testimonialForm.company || '',
      text: testimonialForm.text || '',
      rating: Number(testimonialForm.rating) || 5,
      avatarUrl: testimonialForm.avatarUrl || ''
    };

    if (isAddingNew) {
      updatedTestimonials.push(formattedTestimonial);
    } else {
      updatedTestimonials = testimonials.map((t, idx) => idx === editingItem.idx ? formattedTestimonial : t);
    }

    const success = await saveContent('testimonials', updatedTestimonials);
    if (success) {
      closeEditor();
    }
  };

  const handleDeleteItem = async (type: string, id: string | number) => {
    if (!window.confirm('Are you absolutely sure you want to delete this item?')) return;

    let success = false;
    if (type === 'services') {
      const filtered = services.filter(s => s.id !== id);
      success = await saveContent('services', filtered);
    } else if (type === 'careers') {
      const filtered = jobOpenings.filter(j => j.id !== id);
      success = await saveContent('jobOpenings', filtered);
    } else if (type === 'news') {
      const filtered = newsArticles.filter(n => n.id !== id);
      success = await saveContent('newsArticles', filtered);
    } else if (type === 'faqs') {
      const filtered = faqs.filter((_, idx) => idx !== id);
      success = await saveContent('faqs', filtered);
    } else if (type === 'testimonials') {
      const filtered = testimonials.filter((_, idx) => idx !== id);
      success = await saveContent('testimonials', filtered);
    }
  };

  const startEdit = (item: any, tab: string, idx?: number) => {
    setEditingItem(idx !== undefined ? { ...item, idx } : item);
    setIsAddingNew(false);

    if (tab === 'services') {
      setServiceForm({
        ...item,
        bullets: item.bullets ? item.bullets.join('\n') : ''
      });
    } else if (tab === 'features') {
      setFeatureForm({
        ...item,
        bullets: item.bullets ? item.bullets.join('\n') : ''
      });
    } else if (tab === 'careers') {
      setJobForm({
        ...item,
        requirements: item.requirements ? item.requirements.join('\n') : '',
        benefits: item.benefits ? item.benefits.join('\n') : ''
      });
    } else if (tab === 'news') {
      setNewsForm(item);
    } else if (tab === 'faqs') {
      setFaqForm(item);
    } else if (tab === 'testimonials') {
      setTestimonialForm(item);
    }
  };

  const startAddNew = (tab: string) => {
    setIsAddingNew(true);
    setEditingItem(null);

    if (tab === 'services') {
      setServiceForm({ title: '', category: 'Ground', iconName: 'Truck', shortDesc: '', detailedDesc: '', bullets: '', imageUrl: '' });
    } else if (tab === 'careers') {
      setJobForm({ title: '', department: '', location: '', type: 'Full-time', summary: '', requirements: '', benefits: '' });
    } else if (tab === 'news') {
      setNewsForm({ title: '', category: 'Company News', excerpt: '', content: '', readTime: '3 min read', imageUrl: '' });
    } else if (tab === 'faqs') {
      setFaqForm({ question: '', answer: '' });
    } else if (tab === 'testimonials') {
      setTestimonialForm({ author: '', role: '', company: '', text: '', rating: 5, avatarUrl: '' });
    }
  };

  const closeEditor = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    setServiceForm({});
    setFeatureForm({});
    setJobForm({});
    setNewsForm({});
    setFaqForm({});
    setTestimonialForm({});
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00091d] pt-[120px] pb-24 text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header Panel */}
        <div className="bg-[#001030] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-brand-gold blur-3xl" />
          </div>
          
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center space-x-2.5">
              <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider font-bold bg-white/10 text-brand-gold px-2.5 py-1 rounded-full border border-white/10">FNA SYSTEM OPERATIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight uppercase">Gateway Operations Dashboard</h1>
            <p className="text-sm text-slate-300">Central portal for content modifications, career listings, news, and live client quotes.</p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 relative z-10 w-full md:w-auto">
            <button 
              onClick={() => onNavigate('home')}
              className="flex-1 md:flex-none bg-white/10 hover:bg-white/15 text-white border border-white/15 px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all uppercase cursor-pointer"
            >
              Public Site
            </button>
            <button 
              onClick={adminLogout}
              className="flex-1 md:flex-none bg-rose-600/25 hover:bg-rose-600/35 text-rose-200 border border-rose-500/30 px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all uppercase flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Exit Console</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column Sidebar - Tabs Selector */}
          <div className="lg:col-span-1 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3">System Sections</p>
            <nav className="space-y-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2.5 rounded-2xl shadow-sm">
              <button
                onClick={() => { setActiveTab('quotes'); closeEditor(); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'quotes'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>Quote Requests</span>
                </div>
                {quoteRequests.filter(q => q.status === 'Pending').length > 0 && (
                  <span className="h-5 min-w-5 px-1.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-black flex items-center justify-center">
                    {quoteRequests.filter(q => q.status === 'Pending').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('services'); closeEditor(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Server className="h-4.5 w-4.5" />
                <span>Logistics Services</span>
              </button>

              <button
                onClick={() => { setActiveTab('features'); closeEditor(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Shield className="h-4.5 w-4.5" />
                <span>Capabilities & Core</span>
              </button>

              <button
                onClick={() => { setActiveTab('careers'); closeEditor(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'careers'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Briefcase className="h-4.5 w-4.5" />
                <span>Careers & Openings</span>
              </button>

              <button
                onClick={() => { setActiveTab('news'); closeEditor(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'news'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <FileText className="h-4.5 w-4.5" />
                <span>Bulletins & News</span>
              </button>

              <button
                onClick={() => { setActiveTab('faqs'); closeEditor(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'faqs'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <HelpCircle className="h-4.5 w-4.5" />
                <span>FAQs Directory</span>
              </button>

              <button
                onClick={() => { setActiveTab('testimonials'); closeEditor(); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'testimonials'
                    ? 'bg-[#0084C2] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Quote className="h-4.5 w-4.5" />
                <span>Customer Testimonials</span>
              </button>
            </nav>

            {/* Database status card */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 space-y-3.5 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 block uppercase font-bold">Persistence Status</span>
                {dbStatus && (
                  <button 
                    onClick={fetchDbStatus} 
                    disabled={isCheckingDb}
                    title="Refresh database check"
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`h-3 w-3 ${isCheckingDb ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>
              
              {dbStatus ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <div className={`h-2 w-2 rounded-full ${
                      !dbStatus.isConfigured 
                        ? 'bg-amber-500' 
                        : dbStatus.hasMissingTables 
                          ? 'bg-orange-500 animate-pulse' 
                          : 'bg-emerald-500'
                    }`} />
                    <span className="text-xs font-bold uppercase tracking-tight">
                      {!dbStatus.isConfigured 
                        ? 'File-Store Mode' 
                        : dbStatus.hasMissingTables 
                          ? 'Supabase: Table Missing' 
                          : 'Supabase Connected'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {!dbStatus.isConfigured 
                      ? 'No active database configuration detected. Edits persist locally in container file storage.' 
                      : dbStatus.hasMissingTables 
                        ? 'Supabase is configured, but the required tables ("website_content" or "quote_requests") do not exist yet.' 
                        : 'Your modifications are synchronizing directly to your Cloud Supabase instance.'}
                  </p>

                  {dbStatus.isConfigured && dbStatus.hasMissingTables && (
                    <button
                      onClick={() => setShowSqlGuide(true)}
                      className="w-full mt-1.5 py-2 px-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm text-center"
                    >
                      🛠️ View SQL Setup Guide
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Checking Connection...</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    Verifying database schema cache state...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column Content - Selected Editor Tab */}
          <div className="lg:col-span-3 space-y-6">

            {/* IF NOT EDITING: RENDER TAB LISTS */}
            {!editingItem && !isAddingNew && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Header inside view */}
                <div className="flex justify-between items-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-2xl shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight font-display">
                      {activeTab === 'quotes' && 'Incoming Quote Requests'}
                      {activeTab === 'services' && 'Logistics Port & Freight Services'}
                      {activeTab === 'features' && 'Capabilities (Why Choose Us)'}
                      {activeTab === 'careers' && 'Career Vacancies Directory'}
                      {activeTab === 'news' && 'Operational Bulletins & Company News'}
                      {activeTab === 'faqs' && 'Frequently Asked Questions'}
                      {activeTab === 'testimonials' && 'Client Endorsements & Testimonials'}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {activeTab === 'quotes' && 'Real-time client leads logged through standard web forms.'}
                      {activeTab === 'services' && 'Manage ocean, air, ground, warehousing and special lifts services.'}
                      {activeTab === 'features' && 'Configure core features displayed on the main home screen.'}
                      {activeTab === 'careers' && 'Define open recruitment roles, location packages, requirements and perks.'}
                      {activeTab === 'news' && 'Publish project contract achievements, safety records, and fleet news.'}
                      {activeTab === 'faqs' && 'Edit operational FAQs shown on the client support panel.'}
                      {activeTab === 'testimonials' && 'Configure sliding client testimonial feedback displayed on the home page.'}
                    </p>
                  </div>

                  {activeTab !== 'features' && activeTab !== 'quotes' && (
                    <button
                      onClick={() => startAddNew(activeTab)}
                      className="bg-[#0084C2] hover:bg-[#0070A4] text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New</span>
                    </button>
                  )}
                </div>

                {/* TAB 1: QUOTE REQUESTS */}
                {activeTab === 'quotes' && (
                  <div className="space-y-4">
                    {quoteRequests.length === 0 ? (
                      <div className="text-center py-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl space-y-2">
                        <MessageSquare className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">No requests submitted yet</h3>
                        <p className="text-xs text-slate-500">New leads from the quote submission forms will appear here.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {quoteRequests.map((req) => (
                          <div 
                            key={req.id}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/15">
                              <div>
                                <h3 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">{req.fullName || 'Anonymous Prospect'}</h3>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">{req.emailOrPhone}</span>
                              </div>
                              <div className="flex items-center space-x-2.5 shrink-0">
                                <span className="text-[10px] font-mono font-bold text-slate-400">
                                  {req.createdAt ? new Date(req.createdAt).toLocaleString('en-US') : ''}
                                </span>
                                <select
                                  value={req.status || 'Pending'}
                                  onChange={(e) => updateQuoteRequestStatus(req.id, e.target.value)}
                                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                                    req.status === 'Resolved' || req.status === 'Completed'
                                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                                      : req.status === 'In Discussion'
                                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/25'
                                      : 'bg-rose-500/10 text-rose-400 border-rose-500/25 animate-pulse'
                                  }`}
                                >
                                  <option value="Pending" className="bg-slate-900 text-white">Pending</option>
                                  <option value="In Discussion" className="bg-slate-900 text-white">In Discussion</option>
                                  <option value="Completed" className="bg-slate-900 text-white">Resolved</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-1 space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Requested Category</span>
                                <span className="text-xs block font-bold text-slate-700 dark:text-slate-200 uppercase font-mono">{req.service}</span>
                              </div>
                              <div className="md:col-span-2 space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Details & Logistics Scope</span>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-pre-wrap">{req.details || 'No details provided.'}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: SERVICES */}
                {activeTab === 'services' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((s) => (
                      <div 
                        key={s.id}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-mono tracking-wider font-bold bg-slate-100 dark:bg-white/10 text-brand-gold px-2.5 py-1 rounded-full uppercase">
                              {s.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => startEdit(s, 'services')}
                                className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors cursor-pointer"
                                title="Edit Service"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('services', s.id)}
                                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                title="Delete Service"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold tracking-tight uppercase">{s.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{s.shortDesc}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-white/10 mt-4 flex items-center justify-between text-[11px] font-bold text-slate-400 font-mono uppercase">
                          <span>Icon: {s.iconName}</span>
                          <span>{s.bullets?.length || 0} bullets</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: FEATURES */}
                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 gap-4">
                    {features.map((f) => (
                      <div 
                        key={f.id}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      >
                        <div className="space-y-1">
                          <h3 className="text-base font-extrabold uppercase tracking-tight">{f.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">{f.desc}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {f.bullets?.map((b, bIdx) => (
                              <span key={bIdx} className="text-[9px] font-mono tracking-wide font-bold bg-[#0084C2]/10 text-[#0084C2] dark:text-sky-300 border border-[#0084C2]/20 rounded-full px-2 py-0.5 uppercase">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => startEdit(f, 'features')}
                          className="bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer self-stretch md:self-auto shrink-0 justify-center"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>Configure</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: CAREERS */}
                {activeTab === 'careers' && (
                  <div className="space-y-4">
                    {jobOpenings.map((j) => (
                      <div 
                        key={j.id}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono tracking-wider font-extrabold bg-[#0084C2]/15 text-[#0084C2] dark:text-sky-300 border border-[#0084C2]/20 rounded-full px-2.5 py-0.5 uppercase">
                              {j.type}
                            </span>
                            <h3 className="text-base font-extrabold tracking-tight uppercase mt-1.5">{j.title}</h3>
                            <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400 font-bold uppercase mt-1">
                              <span>Dept: {j.department}</span>
                              <span>•</span>
                              <span>Loc: {j.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => startEdit(j, 'careers')}
                              className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('careers', j.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{j.summary}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 5: NEWS */}
                {activeTab === 'news' && (
                  <div className="space-y-4">
                    {newsArticles.map((n) => (
                      <div 
                        key={n.id}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm flex gap-4 items-start"
                      >
                        {n.imageUrl && (
                          <img 
                            src={n.imageUrl} 
                            alt={n.title} 
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover border border-slate-200 dark:border-white/10 shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[9px] font-mono tracking-wider font-extrabold bg-slate-100 dark:bg-white/10 text-brand-gold px-2.5 py-0.5 rounded-full uppercase">
                                {n.category}
                              </span>
                              <h3 className="text-sm sm:text-base font-extrabold tracking-tight uppercase mt-1">{n.title}</h3>
                              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{n.date} • {n.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => startEdit(n, 'news')}
                                className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors cursor-pointer"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('news', n.id)}
                                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{n.excerpt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 6: FAQS */}
                {activeTab === 'faqs' && (
                  <div className="space-y-4">
                    {faqs.map((f, idx) => (
                      <div 
                        key={idx}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-slate-900 dark:text-white">
                            {f.question}
                          </h3>
                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              onClick={() => startEdit(f, 'faqs', idx)}
                              className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('faqs', idx)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-pre-wrap leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 7: TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-4">
                    {testimonials && testimonials.map((t, idx) => (
                      <div 
                        key={t.id || idx}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-4"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center space-x-3">
                            {t.avatarUrl ? (
                              <img 
                                src={t.avatarUrl} 
                                alt={t.author} 
                                referrerPolicy="no-referrer"
                                className="h-12 w-12 rounded-full object-cover border border-[#0084C2]/20"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-display font-extrabold text-sm border border-brand-gold/20">
                                {t.author ? t.author.charAt(0) : 'T'}
                              </div>
                            )}
                            <div>
                              <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-slate-900 dark:text-white">
                                {t.author}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {t.role}, <span className="text-[#0084C2] font-semibold">{t.company}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              onClick={() => startEdit(t, 'testimonials', idx)}
                              className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors cursor-pointer"
                              title="Edit Testimonial"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('testimonials', idx)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              title="Delete Testimonial"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {/* Rating display */}
                          <div className="flex space-x-1">
                            {Array.from({ length: t.rating || 5 }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-pre-wrap leading-relaxed italic">
                            "{t.text}"
                          </p>
                        </div>
                      </div>
                    ))}
                    {(!testimonials || testimonials.length === 0) && (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-slate-400">
                        No testimonials found. Click "Add New" to create one.
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* EDITING / ADDING SECTION FORMS */}
            {(editingItem || isAddingNew) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Header of Form */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/10">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#0084C2] font-black uppercase">Editor Portal</span>
                    <h2 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight mt-1">
                      {isAddingNew ? 'Create New Entry' : `Modify Entry`}
                    </h2>
                  </div>
                  <button 
                    onClick={closeEditor}
                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 rounded-full transition-colors cursor-pointer border border-slate-200 dark:border-white/5"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* FORM FOR SERVICES */}
                {activeTab === 'services' && (
                  <form onSubmit={handleSaveServices} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">ID (Slug / Unique Key)</label>
                        <input
                          type="text"
                          value={serviceForm.id || ''}
                          onChange={(e) => setServiceForm({ ...serviceForm, id: e.target.value })}
                          disabled={!isAddingNew}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono"
                          placeholder="e.g. air-express"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Service Category</label>
                        <input
                          type="text"
                          value={serviceForm.category || ''}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                          placeholder="e.g. Sea, Air, Ground, Regulatory"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Service Title</label>
                        <input
                          type="text"
                          value={serviceForm.title || ''}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold uppercase"
                          placeholder="e.g. Express Air Freight"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Lucide Icon Name</label>
                        <input
                          type="text"
                          value={serviceForm.iconName || ''}
                          onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono"
                          placeholder="e.g. Ship, Plane, Truck, Database"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Short Overview Description</label>
                      <input
                        type="text"
                        value={serviceForm.shortDesc || ''}
                        onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                        placeholder="Brief 1-sentence sales teaser summary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Detailed Scope / Technical Description</label>
                      <textarea
                        value={serviceForm.detailedDesc || ''}
                        onChange={(e) => setServiceForm({ ...serviceForm, detailedDesc: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs min-h-[100px] leading-relaxed"
                        placeholder="Explain the entire, extensive logistics operation parameters..."
                        required
                      />
                    </div>

                    <div>
                      <ImageUploader
                        value={serviceForm.imageUrl || ''}
                        onChange={(val) => setServiceForm({ ...serviceForm, imageUrl: val })}
                        label="Hero Image (Web URL or Upload)"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Bullets List (Place each detail on a separate line)</label>
                      <textarea
                        value={serviceForm.bullets || ''}
                        onChange={(e) => setServiceForm({ ...serviceForm, bullets: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono min-h-[100px] leading-relaxed"
                        placeholder="e.g.&#10;FCL and LCL shipping&#10;Port Clearance&#10;Container De-stuffing"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={closeEditor}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4.5 py-2.5 bg-[#0084C2] hover:bg-[#0070A4] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Service</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM FOR FEATURES */}
                {activeTab === 'features' && (
                  <form onSubmit={handleSaveFeatures} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Capability Card Title</label>
                      <input
                        type="text"
                        value={featureForm.title || ''}
                        onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold uppercase"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Capability Statement (Description)</label>
                      <textarea
                        value={featureForm.desc || ''}
                        onChange={(e) => setFeatureForm({ ...featureForm, desc: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs min-h-[80px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Micro-Stats Bullets (One detail per line)</label>
                      <textarea
                        value={featureForm.bullets || ''}
                        onChange={(e) => setFeatureForm({ ...featureForm, bullets: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono min-h-[100px]"
                        placeholder="e.g.&#10;99.4% On-Time Record&#10;Real-Time Telematics&#10;Strict Route Control"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={closeEditor}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4.5 py-2.5 bg-[#0084C2] hover:bg-[#0070A4] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Capability</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM FOR CAREERS */}
                {activeTab === 'careers' && (
                  <form onSubmit={handleSaveCareers} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Job Title</label>
                        <input
                          type="text"
                          value={jobForm.title || ''}
                          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold uppercase"
                          placeholder="e.g. Dispatch Logistics Supervisor"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Employment Type</label>
                        <select
                          value={jobForm.type || 'Full-time'}
                          onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Part-time">Part-time</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Department</label>
                        <input
                          type="text"
                          value={jobForm.department || ''}
                          onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                          placeholder="e.g. Dispatch & Operations"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Location</label>
                        <input
                          type="text"
                          value={jobForm.location || ''}
                          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                          placeholder="e.g. Freetown HQ (Wilkinson Road)"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Job Summary Teaser</label>
                      <textarea
                        value={jobForm.summary || ''}
                        onChange={(e) => setJobForm({ ...jobForm, summary: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs min-h-[70px]"
                        placeholder="Overview of day-to-day responsibilities and scope..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Core Requirements (One per line)</label>
                        <textarea
                          value={jobForm.requirements || ''}
                          onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono min-h-[120px]"
                          placeholder="e.g.&#10;3+ years fleet experience&#10;Valid Class-E License&#10;Strong Krio & English"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Perks & Compensation (One per line)</label>
                        <textarea
                          value={jobForm.benefits || ''}
                          onChange={(e) => setJobForm({ ...jobForm, benefits: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-mono min-h-[120px]"
                          placeholder="e.g.&#10;Highly competitive salary&#10;Full premium health coverage&#10;Professional transport allowances"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={closeEditor}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4.5 py-2.5 bg-[#0084C2] hover:bg-[#0070A4] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Publish Role</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM FOR NEWS */}
                {activeTab === 'news' && (
                  <form onSubmit={handleSaveNews} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Bulletin Headline / Title</label>
                        <input
                          type="text"
                          value={newsForm.title || ''}
                          onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold uppercase"
                          placeholder="News Headline"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category</label>
                        <select
                          value={newsForm.category || 'Company News'}
                          onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                        >
                          <option value="Company News">Company News</option>
                          <option value="Industry Insights">Industry Insights</option>
                          <option value="Safety & Operations">Safety & Operations</option>
                          <option value="Project Spotlights">Project Spotlights</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Estimated Read Time</label>
                        <input
                          type="text"
                          value={newsForm.readTime || ''}
                          onChange={(e) => setNewsForm({ ...newsForm, readTime: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                          placeholder="e.g. 4 min read"
                          required
                        />
                      </div>
                      <div>
                        <ImageUploader
                          value={newsForm.imageUrl || ''}
                          onChange={(val) => setNewsForm({ ...newsForm, imageUrl: val })}
                          label="Cover Image (Web URL or Upload)"
                          placeholder="https://images.unsplash.com/photo-..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Short Excerpt (Teaser on card)</label>
                      <input
                        type="text"
                        value={newsForm.excerpt || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                        placeholder="Brief 1-2 sentence teaser for feed lists..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Article Body Content</label>
                      <textarea
                        value={newsForm.content || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs min-h-[220px] leading-relaxed"
                        placeholder="Write out the entire bulletin content here. Paragraphs are fully preserved..."
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={closeEditor}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4.5 py-2.5 bg-[#0084C2] hover:bg-[#0070A4] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Publish Bulletin</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM FOR FAQS */}
                {activeTab === 'faqs' && (
                  <form onSubmit={handleSaveFaqs} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Question Prompt</label>
                      <input
                        type="text"
                        value={faqForm.question || ''}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold"
                        placeholder="e.g. Do you handle international freight clearances?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Detailed Answer Description</label>
                      <textarea
                        value={faqForm.answer || ''}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs min-h-[140px] leading-relaxed"
                        placeholder="Provide clear, transparent explanations of operations parameters..."
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={closeEditor}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4.5 py-2.5 bg-[#0084C2] hover:bg-[#0070A4] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save FAQ</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM FOR TESTIMONIALS */}
                {activeTab === 'testimonials' && (
                  <form onSubmit={handleSaveTestimonials} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Client Author Name</label>
                        <input
                          type="text"
                          value={testimonialForm.author || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold uppercase"
                          placeholder="e.g. Amara Kamara"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Company / Organization</label>
                        <input
                          type="text"
                          value={testimonialForm.company || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs font-extrabold uppercase"
                          placeholder="e.g. Marampa Mines"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Job Title / Role</label>
                        <input
                          type="text"
                          value={testimonialForm.role || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                          placeholder="e.g. Logistics Manager"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Star Rating</label>
                        <select
                          value={testimonialForm.rating || 5}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <ImageUploader
                        value={testimonialForm.avatarUrl || ''}
                        onChange={(val) => setTestimonialForm({ ...testimonialForm, avatarUrl: val })}
                        label="Author Avatar Portrait (Web URL or Upload)"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Testimonial Quote / Review Text</label>
                      <textarea
                        value={testimonialForm.text || ''}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950/40 dark:border-white/10 rounded-xl py-2.5 px-4 text-xs min-h-[140px] leading-relaxed"
                        placeholder="Write out the client endorsement here..."
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        type="button"
                        onClick={closeEditor}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4.5 py-2.5 bg-[#0084C2] hover:bg-[#0070A4] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Testimonial</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

          </div>
        </div>

      </div>

      {/* Supabase SQL Setup Guide Modal */}
      <AnimatePresence>
        {showSqlGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowSqlGuide(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-[10px] font-mono uppercase tracking-wider font-bold">
                  <span>🛠️ Supabase Schema Configuration</span>
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Database Table Setup
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  To synchronize content changes and receive live quotes, copy and execute this SQL query inside your Supabase project's SQL Editor.
                </p>
              </div>

              {/* Instructions steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="font-bold text-brand-gold">Step 1: Open Supabase</span>
                  <p className="text-[11px] text-slate-400">Go to your project dashboard and click on "SQL Editor" in the left sidebar menu.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="font-bold text-brand-gold">Step 2: Paste SQL Query</span>
                  <p className="text-[11px] text-slate-400">Create a new query tab, paste the complete SQL script block shown below, and click Run.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 space-y-1">
                  <span className="font-bold text-brand-gold">Step 3: Refresh Check</span>
                  <p className="text-[11px] text-slate-400">Once executed, click the refresh button next to Persistence Status to verify synchronization.</p>
                </div>
              </div>

              {/* Copy SQL panel */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">SQL Setup Script</span>
                  <button 
                    onClick={() => {
                      const sql = `
-- 1. Create table website_content
CREATE TABLE IF NOT EXISTS website_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create table quote_requests
CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email_or_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'Pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and insert permissions or simply grant public access for quick demo context
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no login required for website operations)
CREATE POLICY "Allow public read website_content" ON website_content FOR SELECT USING (true);
CREATE POLICY "Allow all website_content" ON website_content FOR ALL USING (true);

CREATE POLICY "Allow public insert quote_requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all quote_requests" ON quote_requests FOR ALL USING (true);
                      `.trim();
                      navigator.clipboard.writeText(sql);
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 2000);
                    }}
                    className={`text-[10px] font-mono py-1 px-2.5 rounded-lg font-bold cursor-pointer transition-all ${
                      copiedSql 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#0084C2] dark:text-brand-gold'
                    }`}
                  >
                    {copiedSql ? '✓ Copied!' : 'Copy SQL Script'}
                  </button>
                </div>
                
                <div className="relative">
                  <pre className="p-4 bg-slate-950 rounded-2xl overflow-x-auto text-[11px] font-mono text-emerald-400 leading-relaxed border border-white/5 max-h-[180px] overflow-y-auto select-all">
{`-- 1. Create table website_content
CREATE TABLE IF NOT EXISTS website_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create table quote_requests
CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email_or_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'Pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and insert permissions or simply grant public access for quick demo context
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no login required for website operations)
CREATE POLICY "Allow public read website_content" ON website_content FOR SELECT USING (true);
CREATE POLICY "Allow all website_content" ON website_content FOR ALL USING (true);

CREATE POLICY "Allow public insert quote_requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all quote_requests" ON quote_requests FOR ALL USING (true);`}
                  </pre>
                </div>
              </div>

              {/* Confirm footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/10">
                <span className="text-[10px] font-mono text-slate-400">💡 Tables reside under the "public" schema cache.</span>
                <button
                  onClick={() => {
                    setShowSqlGuide(false);
                    fetchDbStatus();
                  }}
                  className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-brand-gold/15"
                >
                  I've Executed the SQL!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
