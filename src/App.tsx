import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { MessageSquare, PhoneCall, HelpCircle, FileText, ChevronRight, ArrowUp, X, Send, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    try {
      const saved = sessionStorage.getItem('currentPage') as Page;
      if (saved && ['home', 'about', 'services', 'mining', 'manpower', 'careers', 'news', 'contact', 'admin'].includes(saved)) {
        return saved;
      }
    } catch (e) {}
    return 'home';
  });
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

  const { submitQuoteRequest, isLoading, promotionSettings, trackEvent } = useData();

  // ── Live Chat State ──────────────────────────────────────────
  const [csHubOpen, setCsHubOpen] = useState(false);
  const [csPanel, setCsPanel] = useState<'menu' | 'chat'>('menu');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatName, setChatName] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [isChatSending, setIsChatSending] = useState(false);
  const chatSessionId = useRef<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const pollTimerRef = useRef<any>(null);

  // Initialise sessionId ref properly
  useEffect(() => {
    try {
      let sid = sessionStorage.getItem('chatSessionId');
      if (!sid) { sid = 'sess-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8); sessionStorage.setItem('chatSessionId', sid); }
      chatSessionId.current = sid;
      // Check if this session already has messages (returning visitor)
      fetch(`/api/chat/session/${sid}`).then(r => r.json()).then((msgs: any[]) => {
        if (msgs && msgs.length > 0) { setChatMessages(msgs); setChatStarted(true); }
      }).catch(() => {});
    } catch {}
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Poll for new messages when chat panel is open
  const pollChatMessages = useCallback(() => {
    const sid = chatSessionId.current;
    if (!sid) return;
    fetch(`/api/chat/session/${sid}`).then(r => r.json()).then((msgs: any[]) => {
      if (msgs && Array.isArray(msgs)) setChatMessages(msgs);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (csPanel === 'chat' && csHubOpen) {
      pollChatMessages();
      pollTimerRef.current = setInterval(pollChatMessages, 5000);
    } else {
      clearInterval(pollTimerRef.current);
    }
    return () => clearInterval(pollTimerRef.current);
  }, [csPanel, csHubOpen, pollChatMessages]);

  const handleChatSend = async () => {
    const text = chatInput.trim();
    if (!text || isChatSending) return;
    setIsChatSending(true);
    setChatInput('');
    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: chatSessionId.current, visitorName: chatName || 'Site Visitor', message: text })
      });
      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [...prev, data.message]);
      }
    } catch {}
    setIsChatSending(false);
  };
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  useEffect(() => {
    trackEvent('pageview', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (promotionSettings && promotionSettings.active) {
      const dismissed = sessionStorage.getItem('dismissedPromotion');
      if (!dismissed) {
        const delayMs = (promotionSettings.delaySeconds || 5) * 1000;
        const timer = setTimeout(() => {
          setShowPromoPopup(true);
        }, delayMs);
        return () => clearTimeout(timer);
      }
    }
  }, [promotionSettings]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    try {
      sessionStorage.setItem('currentPage', page);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteSubmit = async (req: QuoteRequest) => {
    console.log('Centralized quote request logged:', req);
    const success = await submitQuoteRequest(req);
    if (success) {
      trackEvent('quote_submit', req.service || 'general');
    }
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

        {/* 2.8 ── Customer Service Hub FAB ─────────────────── */}
        <div className="flex flex-col items-end space-y-3">
          <AnimatePresence>
            {csHubOpen && (
              <motion.div
                key="cs-panel"
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-[320px] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
              >
                {csPanel === 'menu' ? (
                  /* ── MENU PANEL ── */
                  <div>
                    <div className="bg-gradient-to-r from-[#0084C2] to-indigo-600 px-5 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Gateway Logistics</p>
                          <h3 className="text-sm font-black text-white uppercase tracking-tight">Customer Support</h3>
                        </div>
                        <button type="button" onClick={() => setCsHubOpen(false)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-white/70 mt-1 font-medium">How can we help you today?</p>
                    </div>
                    <div className="p-3 space-y-2">
                      {/* Live Chat */}
                      <button
                        type="button"
                        onClick={() => { setCsPanel('chat'); }}
                        className="w-full flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0084C2] to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-white uppercase tracking-tight">Live Chat</p>
                          <p className="text-[10px] text-slate-400 font-medium">Chat with our operations team</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                      </button>

                      {/* Call */}
                      <a
                        href="tel:+23273959933"
                        className="w-full flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                          <Phone className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-white uppercase tracking-tight">Call Us Directly</p>
                          <p className="text-[10px] text-slate-400 font-mono">+232 73 959 933</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/23273959933"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 text-left transition-all cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                          <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-white uppercase tracking-tight">WhatsApp</p>
                          <p className="text-[10px] text-slate-400 font-medium">Message us on WhatsApp</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                    <p className="text-center text-[9px] text-slate-600 pb-3 font-mono">Typically replies within minutes</p>
                  </div>
                ) : (
                  /* ── LIVE CHAT PANEL ── */
                  <div className="flex flex-col h-[420px]">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-[#0084C2] to-indigo-600 px-4 py-3 flex items-center space-x-3 flex-shrink-0">
                      <button type="button" onClick={() => setCsPanel('menu')} className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
                        <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                      </button>
                      <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageSquare className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-white uppercase tracking-tight">Live Support Chat</p>
                        <p className="text-[9px] text-white/60 font-medium">Gateway Operations Team</p>
                      </div>
                      <button type="button" onClick={() => setCsHubOpen(false)} className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Name prompt (before chatting) */}
                    {!chatStarted ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#0084C2] to-indigo-600 flex items-center justify-center shadow-lg">
                          <MessageSquare className="h-7 w-7 text-white" />
                        </div>
                        <div className="text-center space-y-1">
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">Start a conversation</h4>
                          <p className="text-[11px] text-slate-400 font-medium">Our team is ready to assist you</p>
                        </div>
                        <div className="w-full space-y-2">
                          <input
                            type="text"
                            value={chatName}
                            onChange={e => setChatName(e.target.value)}
                            placeholder="Your name (optional)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors"
                          />
                          <textarea
                            value={chatInput}
                            onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (chatInput.trim()) { setChatStarted(true); handleChatSend(); } } }}
                            placeholder="How can we help you today?"
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors resize-none"
                          />
                          <button
                            type="button"
                            onClick={() => { if (chatInput.trim()) { setChatStarted(true); handleChatSend(); } }}
                            className="w-full bg-gradient-to-r from-[#0084C2] to-indigo-600 hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer active:scale-[0.98] shadow-lg"
                          >
                            Start Chat
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
                          {/* Welcome message */}
                          <div className="flex items-end space-x-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#0084C2] to-indigo-600 flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="h-3 w-3 text-white" />
                            </div>
                            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]">
                              <p className="text-[11px] text-white font-medium leading-relaxed">Hello{chatName ? `, ${chatName}` : ''}! 👋 Welcome to Gateway Logistics. How can our team assist you today?</p>
                              <p className="text-[9px] text-slate-500 mt-0.5">Support Team</p>
                            </div>
                          </div>
                          {chatMessages.map(msg => (
                            <div key={msg.id} className={`flex items-end space-x-2 ${msg.sender === 'visitor' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black text-white ${
                                msg.sender === 'visitor' ? 'bg-slate-600' : 'bg-gradient-to-br from-[#0084C2] to-indigo-600'
                              }`}>
                                {msg.sender === 'visitor' ? (chatName?.[0]?.toUpperCase() || 'Y') : 'G'}
                              </div>
                              <div className={`rounded-2xl px-3 py-2 max-w-[75%] ${
                                msg.sender === 'visitor'
                                  ? 'bg-gradient-to-br from-[#0084C2] to-indigo-600 rounded-br-sm'
                                  : 'bg-white/10 rounded-bl-sm'
                              }`}>
                                <p className="text-[11px] text-white font-medium leading-relaxed">{msg.message}</p>
                                <p className="text-[9px] text-white/40 mt-0.5">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                              </div>
                            </div>
                          ))}
                          <div ref={chatBottomRef} />
                        </div>

                        {/* Input Area */}
                        <div className="flex-shrink-0 p-3 border-t border-white/10 flex items-end space-x-2">
                          <textarea
                            value={chatInput}
                            onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); } }}
                            placeholder="Type a message…"
                            rows={1}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors resize-none"
                          />
                          <button
                            type="button"
                            onClick={handleChatSend}
                            disabled={!chatInput.trim() || isChatSending}
                            className="h-8 w-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0084C2] to-indigo-600 hover:opacity-90 text-white transition-all cursor-pointer active:scale-95 disabled:opacity-40 flex-shrink-0"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB Button */}
          <button
            type="button"
            onClick={() => { setCsHubOpen(prev => !prev); if (!csHubOpen) setCsPanel('menu'); }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0084C2] to-indigo-600 text-white shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
            aria-label="Customer Support"
          >
            <span className="absolute -inset-1.5 rounded-full bg-[#0084C2]/25 animate-ping pointer-events-none" />
            <AnimatePresence mode="wait">
              {csHubOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <MessageSquare className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* 2.9 Promotional Popup Modal Overlay */}
        <AnimatePresence>
          {showPromoPopup && promotionSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl text-left"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowPromoPopup(false);
                    try { sessionStorage.setItem('dismissedPromotion', 'true'); } catch (e) {}
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Banner Image if configured */}
                {promotionSettings.imageUrl && (
                  <div className="w-full overflow-hidden rounded-2xl mb-4 border border-slate-200 dark:border-white/15 max-h-[200px]">
                    <img
                      src={promotionSettings.imageUrl}
                      alt={promotionSettings.title}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#0084C2] dark:text-brand-gold font-bold uppercase">Special Announcement</span>
                    <h3 className="text-lg font-black uppercase text-brand-navy dark:text-white font-display tracking-tight leading-snug">
                      {promotionSettings.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {promotionSettings.message}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setShowPromoPopup(false);
                      try { sessionStorage.setItem('dismissedPromotion', 'true'); } catch (e) {}
                      if (promotionSettings.ctaPage === 'external' && promotionSettings.externalLink) {
                        window.open(promotionSettings.externalLink, '_blank', 'noopener,noreferrer');
                      } else {
                        handleNavigate(promotionSettings.ctaPage || 'contact');
                      }
                    }}
                    className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-gold/15 active:scale-[0.98] border border-brand-gold-hover/20 text-center block"
                  >
                    {promotionSettings.ctaText || 'Inquire Now'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
