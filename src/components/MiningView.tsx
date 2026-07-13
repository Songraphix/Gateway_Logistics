import React from 'react';
import { Page, FeatureItem } from '../types';
import { MINING_SOLUTIONS } from '../data';
import { useLanguage } from '../LanguageContext';
import { 
  MapPin, Bus, Flame, Wrench, Home, ShieldAlert, BadgeCheck, 
  ArrowRight, Award, Lightbulb, Workflow, HelpCircle, ChevronDown 
} from 'lucide-react';
import NetworkGraphic from './NetworkGraphic';
import { motion } from 'motion/react';
import { useMobileScrollExpand } from '../hooks/useMobileScrollExpand';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface MiningViewProps {
  onNavigate: (page: Page) => void;
}

// ---- Mobile-expandable Mining Solution Card ----
function MobileMiningCard({ sol, translated, idx, style, renderIcon, language }: {
  sol: any; translated: any; idx: number; style: any;
  renderIcon: (name: string, cls?: string) => React.ReactNode;
  language: string;
}) {
  const { ref, expanded, toggle } = useMobileScrollExpand(0.55);
  return (
    <motion.div
      ref={ref}
      key={sol.id}
      variants={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={toggle}
      className={`group mobile-expand-card rounded-3xl p-8 pb-10 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-out cursor-pointer relative ${style.cardClass}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors duration-300 ${style.iconBgClass} ${style.iconClass}`}>
            {renderIcon(sol.iconName, 'h-6 w-6')}
          </div>
          <span className="font-mono text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-white/70 uppercase transition-colors duration-300">
            {language === 'en' ? 'SOLUTION' : 'SOLUTION'} 0{idx + 1}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-base font-bold text-brand-navy dark:text-white group-hover:text-white transition-colors duration-300">
            {translated.title}
          </h3>
          <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[0fr]'} lg:group-hover:grid-rows-[1fr]`}>
            <div className="min-h-0 overflow-hidden">
              <p className={`text-xs leading-relaxed mt-2 opacity-0 ${expanded ? '!opacity-100' : ''} group-hover:opacity-100 transition-all duration-300 delay-75 ${style.textClass}`}>
                {translated.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-current/10 flex items-center justify-between text-[11px] font-mono group-hover:text-white/90 transition-colors duration-500">
        <span>HSE Code:</span>
        <span className="font-bold">{language === 'en' ? '100% Zero-Harm Vetted' : 'Évalué 100% Zéro Dommage'}</span>
      </div>

      {/* Mobile-only expand chevron */}
      <div className={`absolute bottom-14 right-3 lg:hidden flex items-center justify-center w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white/70" />
      </div>
    </motion.div>
  );
}

export default function MiningView({ onNavigate }: MiningViewProps) {
  const { language, translateFeature } = useLanguage();
  
  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case 'MapPin': return <MapPin className={className} />;
      case 'Bus': return <Bus className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Home': return <Home className={className} />;
      default: return <Workflow className={className} />;
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (window.innerWidth >= 1024) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-active');
        } else {
          entry.target.classList.remove('scroll-active');
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.mobile-expand-card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [language]);

  return (
    <div id="mining-solutions-view" className="space-y-0 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 5.4.1 Page Header Banner with high-contrast background */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-3 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? 'SPECIALIZED HEAVY CAPABILITIES' : 'CAPACITÉS LOURDES SPÉCIALISÉES'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'Mining Logistics Solutions' : 'Solutions Logistiques Minières'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-sans leading-relaxed font-medium">
            {language === 'en'
              ? 'Supporting the heavy lifecycles of tier-one iron ore, rutile, gold, and bauxite mining operations with robust, compliance-driven supply chains.'
              : 'Soutien des cycles de vie des opérations de fer, rutile, or et bauxite avec des chaînes d\'approvisionnement robustes.'}
          </p>
        </div>
      </div>

      {/* Centered Intro Paragraph */}
      <motion.section 
        className="py-16 bg-white dark:bg-[#000d26] border-b border-slate-200 dark:border-white/10 transition-colors duration-300"
        {...fadeInUp}
      >
        <div className="mx-auto max-w-3xl px-6 md:px-12 text-center space-y-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-navy dark:text-white uppercase">
            {language === 'en' ? 'Heavy Industry Demands Structural Accountability' : 'L\'Industrie Lourde Exige une Responsabilité Structurelle'}
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">
            {language === 'en'
              ? 'Mining operations require more than standard container freight shipping. They require a rigorous, secure network that operates smoothly in challenging weather, on unpaved site roads, and under stringent multinational safety criteria. Gateway is engineered to support mine mobilizations from day one.'
              : 'Les opérations minières nécessitent plus qu\'un transport standard de conteneurs. Elles exigent un réseau rigoureux et sécurisé qui fonctionne sans heurts par tous les temps, sur les routes non revêtues et selon des critères stricts.'}
          </p>
        </div>
      </motion.section>

      {/* 5.4.3 5-Solution Cards Grid */}
      <section className="py-24 bg-slate-50/50 dark:bg-black/10 border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-2"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'CORE SOLUTIONS INDEX' : 'INDEX DES SOLUTIONS CLÉS'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#001F54] dark:text-white uppercase">
              {language === 'en' ? 'Our Specialized Mining Services' : 'Nos Services Miniers Spécialisés'}
            </h2>
            <div className="h-1 w-12 bg-brand-cyan mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {MINING_SOLUTIONS.map((sol, idx) => {
              const translated = translateFeature(sol);
              const cardStyles = [
                {
                  cardClass: "bg-slate-50 dark:bg-[#0a1835] border border-slate-200/80 dark:border-white/10 text-[#001F54] dark:text-white hover:bg-[#001F54] hover:border-[#001F54] dark:hover:bg-[#001F54] group-hover:text-white",
                  textClass: "text-slate-600 dark:text-slate-300 font-medium group-hover:text-white/90",
                  iconClass: "text-[#0084C2] dark:text-brand-cyan group-hover:text-white",
                  iconBgClass: "bg-white/10 dark:bg-black/25 group-hover:bg-white/20",
                  bulletClass: "text-slate-700 dark:text-slate-300 group-hover:text-white/80",
                  dotColor: "bg-[#0084C2] group-hover:bg-brand-gold"
                },
                {
                  cardClass: "bg-[#ff9d24]/10 dark:bg-[#ff9d24]/5 border border-[#ff9d24]/30 dark:border-[#ff9d24]/20 text-[#001F54] dark:text-amber-100 hover:bg-[#ff9d24] hover:border-[#ff9d24] dark:hover:bg-[#ff9d24] group-hover:text-white",
                  textClass: "text-[#001F54]/85 dark:text-amber-100/90 font-medium group-hover:text-white/90",
                  iconClass: "text-[#ff9d24] group-hover:text-white",
                  iconBgClass: "bg-[#ff9d24]/10 dark:bg-[#ff9d24]/10 group-hover:bg-white/20",
                  bulletClass: "text-[#001F54] dark:text-[#ff9d24] group-hover:text-white/80",
                  dotColor: "bg-[#ff9d24] group-hover:bg-white"
                },
                {
                  cardClass: "bg-[#009BE2]/10 dark:bg-[#009BE2]/5 border border-[#009BE2]/30 dark:border-[#009BE2]/20 text-brand-navy dark:text-cyan-100 hover:bg-[#009BE2] hover:border-[#009BE2] dark:hover:bg-[#009BE2] group-hover:text-white",
                  textClass: "text-brand-navy/85 dark:text-cyan-100/90 font-medium group-hover:text-white/90",
                  iconClass: "text-[#009BE2] group-hover:text-white",
                  iconBgClass: "bg-[#009BE2]/10 dark:bg-[#009BE2]/10 group-hover:bg-white/20",
                  bulletClass: "text-brand-navy dark:text-brand-cyan group-hover:text-white/80",
                  dotColor: "bg-[#009BE2] group-hover:bg-brand-gold"
                },
                {
                  cardClass: "bg-slate-50 dark:bg-[#0a1835] border border-slate-200/80 dark:border-white/10 text-[#001F54] dark:text-white hover:bg-[#001030] hover:border-[#001030] dark:hover:bg-[#001030] group-hover:text-white",
                  textClass: "text-slate-600 dark:text-slate-300 font-medium group-hover:text-white/90",
                  iconClass: "text-[#0084C2] dark:text-brand-cyan group-hover:text-white",
                  iconBgClass: "bg-white/10 dark:bg-black/25 group-hover:bg-white/20",
                  bulletClass: "text-slate-700 dark:text-slate-300 group-hover:text-white/80",
                  dotColor: "bg-[#0084C2] group-hover:bg-brand-gold"
                }
              ];
              const style = cardStyles[idx % cardStyles.length];

              return (
                <MobileMiningCard
                  key={sol.id}
                  sol={sol}
                  translated={translated}
                  idx={idx}
                  style={style}
                  renderIcon={renderIcon}
                  language={language}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5.4.4 Animated Network Graphic Section (Reused) */}
      <section className="space-y-0">
        <div className="bg-gradient-to-r from-[#001030] via-[#001F54] to-[#001030] text-white text-center py-10 border-b border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold block">
            {language === 'en' ? 'INFRASTRUCTURE INTEGRATION' : 'INTEGRATION D\'INFRASTRUCTURE'}
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            {language === 'en' ? 'Why Mining Companies Choose Gateway Logistics' : 'Pourquoi les Compagnies Minières Choisissent Gateway Logistics'}
          </h2>
        </div>
        <NetworkGraphic />
      </section>

      {/* 5.4.5 Closing Tagline / CTA */}
      <section className="py-24 bg-white dark:bg-[#000d26] text-center transition-colors duration-300">
        <div className="mx-auto max-w-2xl px-6 md:px-12 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan">
            {language === 'en' ? 'GATEWAY QUALITY PACT' : 'PACTE DE QUALITÉ GATEWAY'}
          </span>
          <blockquote className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white uppercase leading-tight">
            {language === 'en' ? '"Your Success Is Our Mission"' : '"Votre Réussite Est Notre Mission"'}
          </blockquote>
          <p className="text-xs text-slate-500 dark:text-slate-450 max-w-md mx-auto leading-relaxed">
            {language === 'en'
              ? 'Let us handle your site mobilizations, haulage rotations, and critical resource paths under standard SLAs. Connect with our dedicated Mining Support division directors.'
              : 'Laissez-nous gérer vos mobilisations de sites, rotations de transport et ressources critiques sous accords de niveau de service (SLA). Contactez nos directeurs.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-colors shadow-md"
            >
              {language === 'en' ? 'Consult with Mining Directors' : 'Consulter les Directeurs de Mine'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto border border-brand-navy/20 text-brand-navy hover:bg-slate-100 font-display font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-colors dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              {language === 'en' ? 'Request Operational Logs' : 'Demander les Journaux d\'Opérations'}
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}

