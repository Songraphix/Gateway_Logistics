import React, { useState, useEffect } from 'react';
import { Page, QuoteRequest } from './types';

// Page Views
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import MiningView from './components/MiningView';
import ManpowerView from './components/ManpowerView';
import CareersView from './components/CareersView';
import NewsView from './components/NewsView';
import ContactView from './components/ContactView';
import AdminDashboard from './components/AdminDashboard';
import { useData } from './DataContext';

// Icons
import { MessageSquare, PhoneCall, HelpCircle, FileText, ChevronRight, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const { submitQuoteRequest, isLoading } = useData();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteSubmit = async (req: QuoteRequest) => {
    console.log('Centralized quote request logged:', req);
    await submitQuoteRequest(req);
  };

  // Render active screen
  const renderActiveView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesView onNavigate={handleNavigate} />;
      case 'mining':
        return <MiningView onNavigate={handleNavigate} />;
      case 'manpower':
        return <ManpowerView onNavigate={handleNavigate} />;
      case 'careers':
        return <CareersView onNavigate={handleNavigate} />;
      case 'news':
        return <NewsView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#00091d] text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-brand-gold selection:text-brand-navy relative overflow-hidden">
      {/* Dynamic Frosted Background Decorators */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="glowing-bg-mesh" />
        <div className="dot-grid-overlay" />
      </div>

      {/* Global Navigation Bar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Area */}
      <main className="flex-grow pb-16 lg:pb-0">
        {isLoading ? (
          <div className="mx-auto max-w-7xl px-6 md:px-12 py-32 space-y-12 animate-pulse mt-[80px]">
            {/* Header / Hero Skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-full w-40" />
              <div className="h-12 bg-slate-300 dark:bg-white/15 rounded-2xl w-full max-w-2xl" />
              <div className="h-6 bg-slate-200 dark:bg-white/10 rounded-full w-full max-w-md" />
            </div>

            {/* Grid Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border border-slate-200/80 dark:border-white/10 rounded-3xl p-8 space-y-6 bg-slate-50/50 dark:bg-white/5">
                  <div className="h-12 w-12 bg-slate-300 dark:bg-white/15 rounded-2xl" />
                  <div className="space-y-3">
                    <div className="h-5 bg-slate-300 dark:bg-white/15 rounded-full w-2/3" />
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-full w-full" />
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-full w-5/6" />
                  </div>
                  <div className="h-8 bg-slate-300 dark:bg-white/15 rounded-full w-24 pt-2" />
                </div>
              ))}
            </div>

            {/* Content Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="h-3 bg-slate-200 dark:bg-white/10 rounded-full w-32" />
                <div className="h-10 bg-slate-300 dark:bg-white/15 rounded-2xl w-4/5" />
                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-full w-full" />
                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-full w-11/12" />
              </div>
              <div className="lg:col-span-5 h-64 bg-slate-300 dark:bg-white/15 rounded-3xl" />
            </div>
          </div>
        ) : (
          <>
            {/* Render Hero ONLY on home page */}
            {currentPage === 'home' && (
              <Hero onQuoteSubmit={handleQuoteSubmit} onNavigate={handleNavigate} />
            )}

            {/* Dynamic Inner Page Content with custom entering motion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>

      {/* Global Sitemapped Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 flex flex-col items-end space-y-3">
        {/* Scroll to Top with Circular Progress Indicator */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-[#0084C2] dark:text-brand-gold shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 relative border border-slate-200/60 dark:border-white/10 z-50 select-none"
              aria-label="Scroll to Top"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  className="stroke-slate-100/50 dark:stroke-slate-800/50"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  className="stroke-[#0084C2] dark:stroke-brand-gold transition-all duration-100"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray="100.53"
                  strokeDashoffset={100.53 - (scrollProgress / 100) * 100.53}
                  strokeLinecap="round"
                />
              </svg>
              <ArrowUp className="h-4.5 w-4.5 relative z-10" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 2.8 WhatsApp Floating Action Button (persistent click-to-chat) */}
        <div className="group flex flex-col items-end space-y-2">
          {/* Hover tag line */}
          <div className="bg-emerald-500 text-white font-semibold font-display text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-emerald-400">
            Chat Live with Operations
          </div>

          <a
            href="https://wa.me/23273959933"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 hover:scale-105 transition-all duration-300 relative cursor-pointer border border-emerald-400"
            aria-label="Chat with Gateway Logistics on WhatsApp"
          >
            {/* Pulsing outer rings */}
            <span className="absolute -inset-1.5 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
            <svg 
              className="h-5.5 w-5.5 fill-current text-white relative z-10" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
