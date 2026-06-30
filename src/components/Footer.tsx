import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, ArrowUp, ArrowRight } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language, t } = useLanguage();

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="global-footer" className="relative bg-gradient-to-br from-[#00091d] via-[#001438] to-[#001e4e] border-t border-white/10 text-slate-300 overflow-hidden pt-16 pb-8">
      {/* Abstract Background Decorators */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      {/* Massive Faded Background Watermark Texture */}
      <div className="absolute bottom-[-10%] left-[-5%] select-none pointer-events-none font-display font-black text-[12vw] leading-none text-white/[0.015] uppercase tracking-wider z-0">
        GATEWAY
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-12 z-10">
        {/* Pre-footer Call to Action Panel */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {language === 'en' ? (
                <>We Move More Than Cargo. <span className="text-brand-gold">We Move Progress.</span></>
              ) : (
                <>Nous déplaçons bien plus que du fret. <span className="text-brand-gold">Nous déplaçons le progrès.</span></>
              )}
            </h3>
            <p className="text-sm text-slate-400 max-w-lg">
              {language === 'en' 
                ? "Partner with Sierra Leone's trusted logistics, hauling, and personnel contractor to streamline your supply chain."
                : "Partenaire de confiance en Sierra Leone pour la logistique, le transport lourd et la main-d'œuvre."}
            </p>
          </div>
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 items-center space-x-2 cursor-pointer shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/40 hover:-translate-y-0.5"
          >
            <span>{language === 'en' ? 'Initiate Quote Request' : 'Initier une demande de devis'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 5-Column Navigation Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-gold">
              {t('nav.company')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Our Story & Mission' : 'Notre histoire & mission'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Why Operators Choose Us' : 'Pourquoi nous choisir'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('careers')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Careers & Employment' : 'Carrières & recrutement'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {t('nav.contact')}
                </button>
              </li>
              <li className="pt-2">
                <button onClick={() => handleNavClick('admin')} className="hover:text-blue-400 hover:underline transition-all cursor-pointer text-left font-mono text-[11px] text-brand-gold/70 flex items-center gap-1">
                  <span>🔑</span>
                  <span>{language === 'en' ? 'Admin Operations' : 'Portail Admin'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Logistics Services */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-gold">
              {t('nav.services')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Ocean Freight Shipping' : 'Expédition de fret maritime'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Air Cargo Charters' : 'Vols charters cargo'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Land Express & Heavy Haul' : 'Transport lourd terrestre'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Customs Brokerage' : 'Courtage en douane'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Industrial / Mining */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-gold">
              {language === 'en' ? 'Mining & Manpower' : 'Mines & Main d\'œuvre'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick('mining')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Mining Solutions Core' : 'Solutions minières fondamentales'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('mining')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Site Logistics & Shuttles' : 'Logistique de site & navettes'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('manpower')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Personnel Recruitment' : 'Recrutement de personnel'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('manpower')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Vetted Driver Supply' : 'Fourniture de chauffeurs qualifiés'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: News & Resources */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-gold">
              {language === 'en' ? 'Insights' : 'Perspectives'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick('news')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Company Announcements' : 'Annonces de l\'entreprise'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('news')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Industry Case Studies' : 'Études de cas industrielles'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('news')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'Health & Safety (HSE) Logs' : 'Bilans de santé & sécurité (HSE)'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-blue-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? 'FAQ & Assistance' : 'FAQ & assistance'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Central Office Information */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-gold">
              {language === 'en' ? 'Central Office' : 'Bureau Central'}
            </h4>
            <ul className="space-y-3 text-xs leading-relaxed text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <span>55 Wilkinson Road, Freetown, Sierra Leone</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-cyan shrink-0" />
                <a href="tel:+23273959933" className="hover:text-blue-400 font-mono">+232 73 959 933</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-cyan shrink-0" />
                <a href="mailto:director@gateway-sl.com" className="hover:text-blue-400 font-mono break-all">director@gateway-sl.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Metadata Row with Socials & NAP & Top Scroll Button */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3.5 text-center md:text-left">
            <div className="flex items-center">
              <Logo showText={false} className="h-10 w-10" />
              <span className="font-display font-black text-lg tracking-tighter ml-2.5 uppercase text-white">
                gateway
              </span>
            </div>
            <div className="text-xs text-slate-500 space-y-1 md:pl-4 md:border-l border-white/10">
              <p>© {new Date().getFullYear()} Gateway Logistics & Services (SL) Ltd. {t('footer.rights')}</p>
              <p className="font-mono text-[10px]">
                {language === 'en' 
                  ? 'Registered Business in Freetown, Sierra Leone | Licenced Port & Customs Broker.'
                  : 'Entreprise enregistrée à Freetown, Sierra Leone | Courtier portuaire et douanier agréé.'}
              </p>
            </div>
          </div>

          {/* Social icons in outline circles */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-400 hover:text-white hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Visit our LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-400 hover:text-white hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-400 hover:text-white hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Visit our Instagram profile"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <button
              onClick={handleScrollTop}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-brand-navy hover:bg-brand-gold-hover transition-all cursor-pointer ml-4 shadow-md shadow-brand-gold/15"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
