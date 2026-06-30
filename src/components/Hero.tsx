import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QuoteRequest } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, Compass, ShieldCheck, Star, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

import heroVideo1 from '@/assets/heroVideo 1.mp4';
import heroVideo2 from '@/assets/heroVideo 2.mp4';
import heroVideo3 from '@/assets/heroVideo 3.mp4';
import heroVideo4 from '@/assets/heroVideo 4.mp4';

const VIDEOS = [heroVideo1, heroVideo2, heroVideo3, heroVideo4];
const SLIDE_DURATION = 10000; // 10 seconds per scene

// Smooth counting animation component using IntersectionObserver
function AnimatedCounter({ value, duration = 1500, suffix = '', prefix = '' }: { value: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const currentEl = elementRef.current;
    
    if (currentEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(currentEl);
    }

    return () => {
      if (observer && currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasAnimated, value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums inline-block">
      {prefix}{count}{suffix}
    </span>
  );
}

interface HeroProps {
  onQuoteSubmit: (req: QuoteRequest) => void;
  onNavigate: (page: string) => void;
}

export default function Hero({ onQuoteSubmit, onNavigate }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoFading, setVideoFading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null, null]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressStart = useRef<number>(Date.now());
  const { language, t } = useLanguage();

  // Ticking clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = useCallback((next: number) => {
    setVideoFading(true);
    setTimeout(() => {
      setActiveSlide(next);
      setVideoFading(false);
      progressStart.current = Date.now();
      setProgress(0);
    }, 400);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    progressStart.current = Date.now();
    setProgress(0);

    timerRef.current = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % VIDEOS.length;
        setVideoFading(true);
        setTimeout(() => {
          setVideoFading(false);
          progressStart.current = Date.now();
          setProgress(0);
        }, 400);
        return next;
      });
    }, SLIDE_DURATION);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStart.current;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeSlide]);

  // Play correct video
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeSlide) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeSlide]);

  const handlePrevSlide = () => {
    const next = (activeSlide - 1 + VIDEOS.length) % VIDEOS.length;
    goToSlide(next);
  };

  const handleNextSlide = () => {
    const next = (activeSlide + 1) % VIDEOS.length;
    goToSlide(next);
  };

  const slides = language === 'en' ? [
    {
      index: '01/04',
      title: <>THE MOST <span className="text-brand-gold">TRUSTED</span> WAY TO SHIP &amp; DEPLOY <span className="text-brand-cyan">OPERATORS</span></>,
      titlePlain: 'THE MOST TRUSTED WAY TO SHIP & DEPLOY OPERATORS',
      highlight: 'OCEAN FREIGHT & CLEARING',
      desc: 'Seamless maritime logistics connecting Freetown with major global corridors — complete port husbanding and fast customs clearance.',
      badge: 'Maritime Logistics',
    },
    {
      index: '02/04',
      title: <>HEAVY <span className="text-brand-cyan">TRUCKING FLEET</span> NAVIGATING CHALLENGING <span className="text-brand-gold">TERRAIN</span></>,
      titlePlain: 'HEAVY TRUCKING FLEET NAVIGATING CHALLENGING TERRAIN',
      highlight: 'LAND HAULAGE & RIGS',
      desc: 'Certified heavy vehicle drivers and GPS-monitored trucks connecting coastal ports to inland mining sites safely and on time.',
      badge: 'Heavy Haulage',
    },
    {
      index: '03/04',
      title: <><span className="text-brand-gold">VETTED MANPOWER</span> RECRUITED FOR <span className="text-brand-cyan">GLOBAL STANDARDS</span></>,
      titlePlain: 'VETTED MANPOWER RECRUITED FOR GLOBAL STANDARDS',
      highlight: 'CERTIFIED SITE CREWS',
      desc: 'Background-checked, certified heavy operators, safety officers, and technicians deployed to high-scale industrial sites.',
      badge: 'Vetted Manpower',
    },
    {
      index: '04/04',
      title: <>END-TO-END <span className="text-brand-cyan">MINING LOGISTICS</span> THAT KEEP OPERATIONS <span className="text-brand-gold">MOVING</span></>,
      titlePlain: 'END-TO-END MINING LOGISTICS THAT KEEP OPERATIONS MOVING',
      highlight: 'MINING SUPPORT SOLUTIONS',
      desc: "From site logistics and fuel delivery to camp management — complete support built for the unique demands of Sierra Leone's mining sector.",
      badge: 'Mining Solutions',
    },
  ] : [
    {
      index: '01/04',
      title: <>LE MOYEN LE PLUS <span className="text-brand-gold">FIABLE</span> POUR EXPÉDIER &amp; DÉPLOYER DES <span className="text-brand-cyan">OPÉRATEURS</span></>,
      titlePlain: 'LE MOYEN LE PLUS FIABLE POUR EXPÉDIER & DÉPLOYER DES OPÉRATEURS',
      highlight: 'FRET MARITIME & DÉDOUANEMENT',
      desc: 'Logistique maritime fluide reliant Freetown aux principaux corridors mondiaux, avec consignation portuaire complète et dédouanement rapide.',
      badge: 'Logistique Maritime',
    },
    {
      index: '02/04',
      title: <>FLOTTE DE <span className="text-brand-cyan">CAMIONS LOURDS</span> NAVIGUANT SUR DES <span className="text-brand-gold">TERRAINS DIFFICILES</span></>,
      titlePlain: 'FLOTTE DE CAMIONS LOURDS NAVIGUANT SUR DES TERRAINS DIFFICILES',
      highlight: 'TRANSPORT ROUTIER & REMORQUES',
      desc: "Chauffeurs qualifiés et camions GPS reliant les ports côtiers aux chantiers miniers de l'intérieur en toute sécurité.",
      badge: 'Transport Lourd',
    },
    {
      index: '03/04',
      title: <><span className="text-brand-gold">MAIN-D'ŒUVRE</span> SÉLECTIONNÉE POUR LES <span className="text-brand-cyan">STANDARDS INTERNATIONAUX</span></>,
      titlePlain: "MAIN-D'ŒUVRE SÉLECTIONNÉE POUR LES STANDARDS INTERNATIONAUX",
      highlight: 'ÉQUIPES DE SITE CERTIFIÉES',
      desc: 'Opérateurs certifiés, agents de sécurité et techniciens qualifiés déployés sur des sites industriels à grande échelle.',
      badge: "Main-d'œuvre Qualifiée",
    },
    {
      index: '04/04',
      title: <>LOGISTIQUE <span className="text-brand-cyan">MINIÈRE</span> DE BOUT EN BOUT QUI MAINTIENT LES OPÉRATIONS EN <span className="text-brand-gold">MOUVEMENT</span></>,
      titlePlain: 'LOGISTIQUE MINIÈRE DE BOUT EN BOUT QUI MAINTIENT LES OPÉRATIONS EN MOUVEMENT',
      highlight: 'SOLUTIONS SUPPORT MINIER',
      desc: 'De la logistique de site à la gestion de camp — un soutien complet pour les exigences uniques du secteur minier.',
      badge: 'Solutions Minières',
    },
  ];

  return (
    <div id="hero-system" className="relative min-h-screen flex flex-col justify-between bg-[#00091d] pt-[130px] text-white overflow-hidden">

      {/* ── Full-screen video stack ── */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {VIDEOS.map((src, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el; }}
            muted
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{
              opacity: i === activeSlide ? (videoFading ? 0 : 0.38) : 0,
              zIndex: i === activeSlide ? 1 : 0,
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}

        {/* Dark gradient overlay — keeps text readable regardless of video */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00091d]/95 via-[#001438]/75 to-[#00091d]/60 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#00091d]/60 via-transparent to-[#00091d]/90 pointer-events-none" />

        {/* Dot grid */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

        {/* Accent blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0084C2]/12 rounded-full blur-[160px] z-10 pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[140px] z-10 pointer-events-none mix-blend-screen" />
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 md:px-12 w-full flex-grow flex flex-col justify-center py-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-8 lg:gap-x-12 items-end mt-8 md:mt-12 w-full">

          {/* ── LEFT: Text ── */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Eyebrow pill */}
                  <div className="inline-flex items-center space-x-2.5 bg-[#0084C2]/20 border border-[#0084C2]/35 px-4 py-2 rounded-full text-[#0084C2] text-[10px] font-black tracking-widest uppercase shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0084C2] animate-ping" />
                    <span>{slides[activeSlide].badge} • {t('hero.eyebrow')}</span>
                  </div>

                  {/* Main headline */}
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.92] text-white uppercase max-w-4xl">
                    {slides[activeSlide].title}
                  </h1>

                  {/* Highlight */}
                  <p className="font-display text-sm sm:text-base font-black tracking-widest text-[#0084C2] uppercase">
                    {slides[activeSlide].highlight}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xl font-medium">
                    {slides[activeSlide].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Slider Card */}
            <div className="block lg:hidden w-full max-w-md pt-2">
              <SliderCard
                slides={slides}
                activeSlide={activeSlide}
                progress={progress}
                onPrev={handlePrevSlide}
                onNext={handleNextSlide}
                t={t}
              />
            </div>

            {/* Mobile Live Status */}
            <div className="block lg:hidden w-full max-w-md">
              <LiveStatusCard currentTime={currentTime} t={t} />
            </div>

            {/* CTAs */}
            <div className="pt-2 lg:pt-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-6 py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shadow-lg shadow-brand-gold/25 hover:scale-[1.02]"
                >
                  <span>{t('hero.cta_consult')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="border border-white/25 hover:border-[#0084C2] text-white hover:text-[#0084C2] bg-white/5 hover:bg-white/10 font-display font-bold px-6 py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] shadow-md"
                >
                  <span>{t('hero.cta_explore')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Cards (Desktop) — bottom-aligned with CTA buttons ── */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-end space-y-4 w-full">
            <SliderCard
              slides={slides}
              activeSlide={activeSlide}
              progress={progress}
              onPrev={handlePrevSlide}
              onNext={handleNextSlide}
              t={t}
            />
            <LiveStatusCard currentTime={currentTime} t={t} />
          </div>

        </div>
      </div>

      {/* ── Stat Strip ── */}
      <div id="hero-stat-strip" className="relative z-20 w-full bg-black/40 border-t border-white/10 backdrop-blur-md shadow-inner py-6">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="flex items-center space-x-4 pt-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-gold shadow-md">
                <Compass className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl font-black text-white tracking-tight block">
                  <AnimatedCounter value={15} suffix={language === 'en' ? ' + Years' : ' + Ans'} />
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-300 block">{t('stats.years')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-cyan shadow-md">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl font-black text-white tracking-tight block">
                  <AnimatedCounter value={100} suffix="% Safe" />
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-300 block">{t('stats.safe')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-gold shadow-md">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl font-black text-white tracking-tight block">
                  <AnimatedCounter value={450} suffix={language === 'en' ? ' + Crew' : ' + Équipe'} />
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-300 block">{t('stats.crew')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 md:pt-0 md:pl-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-cyan shadow-md">
                <Star className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl font-black text-white tracking-tight block">
                  <AnimatedCounter value={120} suffix=" + Rigs" />
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-300 block">{t('stats.rigs')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

// ── Sub-components ──

interface SlideData { index: string; title: string; highlight: string; desc: string; badge: string; }

function SliderCard({ slides, activeSlide, progress, onPrev, onNext, t }: {
  slides: SlideData[];
  activeSlide: number;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
  t: (key: string) => string;
}) {
  const next = (activeSlide + 1) % slides.length;
  return (
    <div className="w-full max-w-md flex flex-col bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-white/10">
        <div
          className="h-full bg-[#0084C2] transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4">
        {/* Arrows + index */}
        <div className="flex items-center space-x-4">
          <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={onPrev}
              className="p-3 hover:bg-white/10 transition-colors text-white cursor-pointer border-r border-white/10"
              aria-label="Previous Scene"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={onNext}
              className="p-3 hover:bg-white/10 transition-colors text-white cursor-pointer"
              aria-label="Next Scene"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-display font-black text-lg text-[#0084C2] tracking-tight leading-none">
              {slides[activeSlide].index}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 mt-1">
              {t('hero.enjoy')}
            </span>
          </div>
        </div>

        {/* Next scene preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={next}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-xl p-2.5 pr-4 w-full sm:w-auto shadow-inner"
          >
            {/* Scene number indicator as visual stand-in for thumbnail */}
            <div className="h-10 w-16 rounded-lg border border-white/10 bg-gradient-to-br from-[#0084C2]/30 to-[#0A1F44]/60 flex items-center justify-center shrink-0">
              <span className="font-display font-black text-white text-xs">{String(next + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#0084C2] font-black">{t('hero.next')}</span>
              <span className="text-xs font-bold text-white truncate max-w-[130px]">
                {slides[next].badge}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scene dots */}
      <div className="flex items-center justify-center space-x-1.5 pb-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeSlide ? 'w-6 bg-[#0084C2]' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function LiveStatusCard({ currentTime, t }: { currentTime: string; t: (key: string) => string }) {
  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-lg relative overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold uppercase">
            {t('hero.live_control')}
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-300 flex items-center space-x-1.5 font-semibold">
          <span className="w-1.5 h-1.5 bg-[#0084C2] rounded-full inline-block" />
          <span>FNA TIME: <span className="text-white font-bold">{currentTime || '00:00:00'}</span></span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
              alt="Active Operations Dispatcher"
              className="h-11 w-11 rounded-full object-cover border-2 border-[#0084C2] shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">{t('hero.delivery_solutions')}</h4>
            <span className="text-[10px] text-slate-300 block font-semibold">{t('hero.fleet_status')}</span>
          </div>
        </div>

        <div className="text-right flex flex-col justify-center">
          <span className="font-mono text-xs text-brand-gold font-black">{t('hero.secure_pct')}</span>
          <span className="text-[9px] uppercase tracking-wider text-slate-300 block font-bold">{t('hero.zero_harm')}</span>
        </div>
      </div>
    </div>
  );
}
