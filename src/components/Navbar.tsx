import React, { useState, useEffect } from 'react';
import { Phone, Clock, Menu, X, ArrowRight, ChevronDown, Compass, Shield, Users, Briefcase, FileText, Landmark, Sun, Moon, Home, ArrowUpDown } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ currentPage, onNavigate, theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'company' | null>(null);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [mobileCompanyExpanded, setMobileCompanyExpanded] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Sync mobile menu expansion states when it opens based on the current page
  useEffect(() => {
    if (mobileMenuOpen) {
      if (['services', 'mining', 'manpower'].includes(currentPage)) {
        setMobileServicesExpanded(true);
      } else {
        setMobileServicesExpanded(false);
      }
      if (['about', 'careers', 'news', 'contact'].includes(currentPage)) {
        setMobileCompanyExpanded(true);
      } else {
        setMobileCompanyExpanded(false);
      }
    }
  }, [mobileMenuOpen, currentPage]);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      return localStorage.getItem('topBarMinimized') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update showHeader (scroll direction)
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMinimize = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    try {
      localStorage.setItem('topBarMinimized', String(next));
    } catch (e) {}
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="contents">
      {/* Small floating logo circle shown on mobile when the top bar is manually minimized */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <button
              onClick={toggleMinimize}
              className="flex items-center space-x-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-white/10 p-1.5 rounded-full shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
              title="Expand Top Bar"
            >
              <Logo showText={false} minimized={true} className="h-7 w-7" />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 pr-1.5">
                {language === 'en' ? 'Tap to Expand' : 'Agrandir'}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto'
      } ${isMinimized ? 'hidden lg:block' : 'block'}`}>
        {/* 2.1 Utility Bar - Hidden when scrolled */}
        <div className={`hidden lg:block rounded-full border py-1.5 px-6 text-xs shadow-sm transition-all duration-300 max-w-7xl mx-auto mb-2 bg-black/30 backdrop-blur-xl border-white/10 text-white ${
          isScrolled ? 'h-0 py-0 overflow-hidden opacity-0 mb-0' : 'opacity-100'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <a href="tel:+23273959933" className="flex items-center space-x-2 text-white/80 hover:text-[#0084C2] transition-colors">
                <Phone className="h-3.5 w-3.5 text-[#0084C2]" />
                <span className="font-mono font-bold text-[11px]">+232 73 959 933</span>
              </a>
              <div className="flex items-center space-x-2 text-white/60">
                <Clock className="h-3.5 w-3.5 text-[#0084C2]" />
                <span className="text-[11px]">{t('nav.hours')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/60 font-mono text-[11px]">director@gateway-sl.com</span>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-transform hover:scale-105 duration-200"
              >
                <span>{t('nav.getQuote')}</span>
                <ArrowRight className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2.2 Rounded Floating Navigation Bar — True Frosted Glass */}
        <nav className={`transition-all duration-500 max-w-7xl mx-auto w-full rounded-full border shadow-2xl ${
          isScrolled 
            ? 'bg-black/40 backdrop-blur-2xl py-2 px-2.5 sm:px-3 border-white/10 shadow-black/30' 
            : 'bg-black/25 backdrop-blur-2xl py-2.5 sm:py-3 px-3 sm:px-4 border-white/10 shadow-black/10'
        } ${
          isMinimized ? 'hidden lg:flex' : 'flex'
        }`}>
          <div className="w-full pl-3 pr-1 sm:px-6 flex justify-between items-center">
            
            {/* Logo - Full Brand Logo representing the globe, plane, ship & text */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="cursor-pointer group flex items-center"
              title={t('nav.title')}
            >
              <Logo showText={true} lightText={true} className="h-12 transition-transform group-hover:scale-[1.02] duration-300" />
            </div>

            {/* Desktop Nav Links - Consolidates 8 pages into 4 items */}
            <div className="hidden lg:flex items-center space-x-1">
              
              {/* Direct Home Link */}
              <button
                onClick={() => handleNavClick('home')}
                className={`px-4 py-2 font-display text-xs uppercase tracking-widest font-black transition-all duration-200 cursor-pointer rounded-full ${
                  currentPage === 'home'
                    ? 'text-brand-cyan bg-brand-cyan/10'
                    : 'text-white/80 hover:text-brand-cyan hover:bg-white/10'
                }`}
              >
                {t('nav.home')}
              </button>

              {/* Dropdown 1: Services & Solutions */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-4 py-2 font-display text-xs uppercase tracking-widest font-black transition-all duration-200 cursor-pointer rounded-full ${
                    ['services', 'mining', 'manpower'].includes(currentPage)
                      ? 'text-brand-cyan bg-brand-cyan/10'
                      : 'text-white/80 hover:text-brand-cyan hover:bg-white/10'
                  }`}
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 16px)' }}
                      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 16px)' }}
                      exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 16px)' }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 w-80 bg-black/50 backdrop-blur-2xl text-white rounded-2xl shadow-2xl border border-white/10 p-2.5 overflow-hidden z-50"
                    >
                      <button
                        onClick={() => handleNavClick('services')}
                        className={`w-full text-left p-3.5 rounded-xl hover:bg-white/10 transition-all flex items-start space-x-3.5 group/item ${
                          currentPage === 'services' ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan group-hover/item:bg-brand-cyan group-hover/item:text-white transition-all">
                          <Compass className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">{t('nav.core_logistics')}</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{t('nav.core_desc')}</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('mining')}
                        className={`w-full text-left p-3.5 rounded-xl hover:bg-white/10 transition-all flex items-start space-x-3.5 group/item ${
                          currentPage === 'mining' ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-brand-gold/20 text-brand-gold group-hover/item:bg-brand-gold group-hover/item:text-brand-navy transition-all">
                          <Landmark className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">{t('nav.mining_logistics')}</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{t('nav.mining_desc')}</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('manpower')}
                        className={`w-full text-left p-3.5 rounded-xl hover:bg-white/10 transition-all flex items-start space-x-3.5 group/item ${
                          currentPage === 'manpower' ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">{t('nav.manpower')}</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{t('nav.manpower_desc')}</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropdown 2: Company */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-4 py-2 font-display text-xs uppercase tracking-widest font-black transition-all duration-200 cursor-pointer rounded-full ${
                    ['about', 'careers', 'news'].includes(currentPage)
                      ? 'text-brand-cyan bg-brand-cyan/10'
                      : 'text-white/80 hover:text-brand-cyan hover:bg-white/10'
                  }`}
                >
                  <span>{t('nav.company')}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 16px)' }}
                      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 16px)' }}
                      exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 16px)' }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 w-80 bg-black/50 backdrop-blur-2xl text-white rounded-2xl shadow-2xl border border-white/10 p-2.5 overflow-hidden z-50"
                    >
                      <button
                        onClick={() => handleNavClick('about')}
                        className={`w-full text-left p-3.5 rounded-xl hover:bg-white/10 transition-all flex items-start space-x-3.5 group/item ${
                          currentPage === 'about' ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan group-hover/item:bg-brand-cyan group-hover/item:text-white transition-all">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">{t('nav.about')}</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{t('nav.about_desc')}</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('careers')}
                        className={`w-full text-left p-3.5 rounded-xl hover:bg-white/10 transition-all flex items-start space-x-3.5 group/item ${
                          currentPage === 'careers' ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-brand-gold/20 text-brand-gold group-hover/item:bg-brand-gold group-hover/item:text-brand-navy transition-all">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">{t('nav.careers')}</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{t('nav.careers_desc')}</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('news')}
                        className={`w-full text-left p-3.5 rounded-xl hover:bg-white/10 transition-all flex items-start space-x-3.5 group/item ${
                          currentPage === 'news' ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 group-hover/item:bg-purple-500 group-hover/item:text-white transition-all">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-white">{t('nav.news')}</div>
                          <div className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{t('nav.news_desc')}</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Contact Link */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-4 py-2 font-display text-xs uppercase tracking-widest font-black transition-all duration-200 cursor-pointer rounded-full ${
                  currentPage === 'contact'
                    ? 'text-brand-cyan bg-brand-cyan/10'
                    : 'text-white/80 hover:text-brand-cyan hover:bg-white/10'
                }`}
              >
                {t('nav.contact')}
              </button>
            </div>

            {/* Action Items */}
            <div className="flex items-center space-x-1.5 sm:space-x-4">
              
              {/* Premium Language Toggler Pill */}
              <div className="flex bg-white/10 border border-white/10 p-0.5 sm:p-1 rounded-full text-[10px] font-bold">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all uppercase cursor-pointer text-[9px] sm:text-[10px] ${
                    language === 'en'
                      ? 'bg-[#0084C2] text-white shadow-sm'
                      : 'text-white/60 hover:text-[#0084C2]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full transition-all uppercase cursor-pointer text-[9px] sm:text-[10px] ${
                    language === 'fr'
                      ? 'bg-[#0084C2] text-white shadow-sm'
                      : 'text-white/60 hover:text-[#0084C2]'
                  }`}
                >
                  FR
                </button>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-white/10 text-white/70 hover:bg-white/10 cursor-pointer transition-all duration-200 shrink-0"
                aria-label="Toggle dark/light theme"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-brand-gold animate-pulse-slow" /> : <Moon className="h-4 w-4 text-white" />}
              </button>

              {/* Mobile Minimize Toggle Button */}
              <button
                onClick={toggleMinimize}
                className="lg:hidden flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 cursor-pointer transition-all duration-200 shrink-0"
                title="Minimize Top Bar"
                aria-label="Minimize top bar"
              >
                <ChevronDown className="h-4 w-4 rotate-180 text-slate-700 dark:text-slate-200" />
              </button>

              {/* Primary CTA Consultation Button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 items-center space-x-2 cursor-pointer shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/35 hover:-translate-y-0.5"
              >
                <span>{t('nav.consult')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>
        </nav>
      </header>
      {/* 2.3 Mobile App-style Bottom Navigation Bar with Curved Cutout & Floating Circle */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[64px] z-50 select-none">
        {/* Dynamic Curved Background Behind Tabs */}
        {(() => {
          const activeIndex = mobileMenuOpen 
            ? 4 
            : currentPage === 'contact' 
            ? 2 
            : currentPage === 'about' 
            ? 3 
            : ['services', 'mining', 'manpower'].includes(currentPage) 
            ? 1 
            : 0;

          const centerPercent = (activeIndex * 20) + 10;

          return (
            <>
              <div className="absolute inset-x-0 bottom-0 h-[64px] z-0 pointer-events-none overflow-hidden">
                {/* Left flat bar */}
                <motion.div
                  animate={{
                    width: `calc(${centerPercent}% - 48px)`
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="absolute left-0 top-0 bottom-0 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-white/10"
                />

                {/* Curved Cutout SVG */}
                <motion.div
                  animate={{
                    left: `calc(${centerPercent}% - 48px)`
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="absolute top-0 w-[96px] h-[64px]"
                >
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 96 64"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0,0 
                         C 18,0 14,32 48,32 
                         C 82,32 78,0 96,0"
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-200/80 dark:text-white/10"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 0,0 
                         C 18,0 14,32 48,32 
                         C 82,32 78,0 96,0
                         L 96,64
                         L 0,64
                         Z"
                      fill="currentColor"
                      className="text-white dark:text-slate-950"
                    />
                  </svg>
                </motion.div>

                {/* Right flat bar */}
                <motion.div
                  animate={{
                    left: `calc(${centerPercent}% + 48px)`
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="absolute right-0 top-0 bottom-0 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-white/10"
                />
              </div>

              {/* Content Container on top of Background */}
              <div className="relative z-10 h-full w-full flex justify-between items-center px-1">
                {[
                  {
                    id: 'home' as const,
                    label: language === 'en' ? 'Home' : 'Accueil',
                    icon: Home,
                    onClick: () => {
                      handleNavClick('home');
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    id: 'services' as const,
                    label: 'Services',
                    icon: Compass,
                    onClick: () => {
                      handleNavClick('services');
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    id: 'contact' as const,
                    label: language === 'en' ? 'Dispatch' : 'Transit',
                    icon: ArrowUpDown,
                    onClick: () => {
                      handleNavClick('contact');
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    id: 'about' as const,
                    label: language === 'en' ? 'About' : 'À Propos',
                    icon: Shield,
                    onClick: () => {
                      handleNavClick('about');
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    id: 'menu' as const,
                    label: 'Menu',
                    icon: mobileMenuOpen ? X : Menu,
                    onClick: () => {
                      setMobileMenuOpen(!mobileMenuOpen);
                    },
                  }
                ].map((tab, idx) => {
                  const isTabActive = idx === activeIndex;
                  const IconComponent = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      onClick={tab.onClick}
                      className="relative w-1/5 h-full flex flex-col items-center justify-center cursor-pointer select-none"
                    >
                      {isTabActive ? (
                        <>
                          <motion.div
                            initial={{ scale: 0.5, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                            className="absolute -top-4 w-12 h-12 rounded-full bg-[#0084C2] dark:bg-brand-gold text-white dark:text-brand-navy shadow-lg shadow-[#0084C2]/30 dark:shadow-brand-gold/30 flex items-center justify-center border-4 border-white dark:border-slate-950 z-20"
                          >
                            <IconComponent className="h-5 w-5" />
                          </motion.div>
                          <span className="absolute bottom-1 text-[9px] font-black tracking-tight text-[#0084C2] dark:text-brand-gold z-10">
                            {tab.label}
                          </span>
                        </>
                      ) : (
                        <>
                          <IconComponent className="h-5 w-5 mb-0.5 text-slate-500 dark:text-slate-400 hover:text-[#0084C2] transition-colors" />
                          <span className="text-[9px] font-bold tracking-tight text-slate-500 dark:text-slate-400 hover:text-[#0084C2] transition-colors">
                            {tab.label}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          );
        })()}
      </div>

      {/* Mobile Pop-out Menu (iOS style, floating above the bottom navigation bar) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur/Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-[1px] z-40"
            />

            {/* iOS style floating pop-out card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="lg:hidden fixed bottom-[76px] right-4 left-4 sm:left-auto sm:w-[360px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-50 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl p-5 overflow-y-auto max-h-[calc(100vh-140px)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#0084C2] px-3 font-bold block">
                  {t('nav.directive')}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {/* Home Direct Link */}
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-display text-xs font-black uppercase tracking-wider transition-all ${
                      currentPage === 'home' 
                        ? 'bg-[#0084C2]/10 text-[#0084C2] border border-[#0084C2]/25' 
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4" />
                      <span>{t('nav.home')}</span>
                    </div>
                    <ArrowRight className={`h-4 w-4 ${currentPage === 'home' ? 'text-[#0084C2]' : 'text-slate-400'}`} />
                  </button>

                  {/* Services Category Dropdown */}
                  <div className="border-b border-slate-100 dark:border-white/5 pb-2">
                    <button
                      onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-display text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center space-x-2">
                        <Compass className="h-4 w-4 text-[#0084C2]" />
                        <span>{t('nav.services')}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${mobileServicesExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden pl-4 space-y-1 mt-1"
                        >
                          {[
                            { page: 'services', label: t('nav.core_logistics'), icon: Compass, desc: t('nav.core_desc') },
                            { page: 'mining', label: t('nav.mining_logistics'), icon: Landmark, desc: t('nav.mining_desc') },
                            { page: 'manpower', label: t('nav.manpower'), icon: Users, desc: t('nav.manpower_desc') }
                          ].map((item) => {
                            const IconComp = item.icon;
                            const isActive = currentPage === item.page;
                            return (
                              <button
                                key={item.page}
                                onClick={() => handleNavClick(item.page as Page)}
                                className={`w-full text-left p-3 rounded-xl transition-all flex items-start space-x-3 ${
                                  isActive 
                                    ? 'bg-[#0084C2]/10 text-[#0084C2] border border-[#0084C2]/25' 
                                    : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-[#0084C2]/20 text-[#0084C2]' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                                  <IconComp className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[11px] font-black uppercase tracking-wider leading-tight">{item.label}</div>
                                  <div className="text-[9px] text-slate-400 mt-0.5 leading-normal truncate">{item.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company Category Dropdown */}
                  <div className="border-b border-slate-100 dark:border-white/5 pb-2">
                    <button
                      onClick={() => setMobileCompanyExpanded(!mobileCompanyExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-display text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-brand-gold" />
                        <span>{t('nav.company')}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${mobileCompanyExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileCompanyExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden pl-4 space-y-1 mt-1"
                        >
                          {[
                            { page: 'about', label: t('nav.about'), icon: Shield, desc: t('nav.about_desc') },
                            { page: 'careers', label: t('nav.careers'), icon: Briefcase, desc: t('nav.careers_desc') },
                            { page: 'news', label: t('nav.news'), icon: FileText, desc: t('nav.news_desc') },
                            { page: 'contact', label: t('nav.contact'), icon: Phone, desc: language === 'en' ? 'Get in Touch' : 'Contactez-nous' }
                          ].map((item) => {
                            const IconComp = item.icon;
                            const isActive = currentPage === item.page;
                            return (
                              <button
                                key={item.page}
                                onClick={() => handleNavClick(item.page as Page)}
                                className={`w-full text-left p-3 rounded-xl transition-all flex items-start space-x-3 ${
                                  isActive 
                                    ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/25 dark:text-brand-gold' 
                                    : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-brand-gold/20 text-brand-gold' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                                  <IconComp className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[11px] font-black uppercase tracking-wider leading-tight">{item.label}</div>
                                  <div className="text-[9px] text-slate-400 mt-0.5 leading-normal truncate">{item.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5 mt-4">
                <div className="flex justify-between items-center gap-2">
                  <a href="tel:+23273959933" className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-[#0084C2]" />
                    <span className="font-mono text-[10px] font-bold tracking-tight">+232 73 959 933</span>
                  </a>

                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer transition-all duration-200"
                    aria-label="Toggle dark/light theme"
                  >
                    {theme === 'dark' ? (
                      <div className="flex items-center space-x-1">
                        <Sun className="h-3.5 w-3.5 text-brand-gold" />
                        <span className="text-[9px] font-mono uppercase font-black tracking-wider text-slate-300">{t('nav.theme_light')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Moon className="h-3.5 w-3.5 text-brand-navy" />
                        <span className="text-[9px] font-mono uppercase font-black tracking-wider text-[#001F54]">{t('nav.theme_dark')}</span>
                      </div>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-[#0084C2] hover:bg-[#005B9E] text-white font-display font-extrabold py-3 rounded-xl text-[11px] uppercase tracking-widest text-center cursor-pointer transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-[#0084C2]/20"
                >
                  <span>{t('nav.request_dispatch')}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
