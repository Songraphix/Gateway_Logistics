import React from 'react';
import { Page } from '../types';
import { MANPOWER_ROLES, WORKFLOW_STEPS } from '../data';
import { useLanguage } from '../LanguageContext';
import { 
  Truck, Shield, Users, BadgeCheck, ClipboardCheck, ArrowRight, 
  Compass, Hammer, Package, ShieldAlert, HeartHandshake, CheckCircle, ChevronDown 
} from 'lucide-react';
import { motion } from 'motion/react';

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

interface ManpowerViewProps {
  onNavigate: (page: Page) => void;
}

// ---- Mobile-expandable Manpower Role Card ----
function MobileManpowerCard({ role, translated, idx, style, renderIcon, language }: {
  role: any; translated: any; idx: number; style: any;
  renderIcon: (name: string, cls?: string) => React.ReactNode;
  language: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => setExpanded(e => !e)}
      className={`group rounded-2xl p-6 pb-10 shadow-sm hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between space-y-4 cursor-pointer relative ${style.cardClass}`}
    >
      <div className="space-y-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${style.iconBgClass} ${style.iconClass}`}>
          {renderIcon(role.icon, 'h-5 w-5')}
        </div>
        <h3 className="font-display text-sm font-bold text-brand-navy dark:text-white group-hover:text-white transition-colors duration-300">
          {translated.title}
        </h3>
        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[0fr]'} lg:group-hover:grid-rows-[1fr]`}>
          <div className="min-h-0 overflow-hidden">
            <p className={`text-[11px] leading-relaxed mt-2 opacity-0 ${expanded ? '!opacity-100' : ''} lg:group-hover:opacity-100 transition-all duration-300 delay-75 ${style.textClass}`}>
              {translated.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-current/10">
        <span className="text-[9px] font-mono uppercase tracking-wider font-bold bg-black/5 dark:bg-white/10 group-hover:bg-white/20 px-2 py-0.5 rounded transition-colors duration-300 group-hover:text-white">
          {language === 'en' ? 'Vetted Class-E' : 'Classe-E Validé'}
        </span>
      </div>

      {/* Mobile-only expand chevron */}
      <div className={`absolute bottom-14 right-3 lg:hidden flex items-center justify-center w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white/70" />
      </div>
    </motion.div>
  );
}

// ---- Mobile-expandable Manpower Workflow Step Card ----
function MobileManpowerWorkflowCard({ w, translated, idx, style, language }: {
  w: any; translated: any; idx: number; style: any; language: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => setExpanded(e => !e)}
      className={`group rounded-3xl p-8 pb-10 space-y-4 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 ease-out relative ${style.cardClass}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-3xl font-black group-hover:text-white transition-colors duration-300">
          {w.stepNumber}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md uppercase font-black transition-colors duration-300 group-hover:text-white ${style.iconBgClass} ${style.iconClass}`}>
            {language === 'en' ? 'Vetting Standard' : 'Norme de Sélection'}
          </span>
          {/* Mobile chevron */}
          <div className={`lg:hidden flex items-center justify-center w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white/70" />
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-base font-bold text-brand-navy dark:text-white group-hover:text-white transition-colors duration-300">
          {translated.title}
        </h3>
        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]`}>
          <div className="min-h-0 overflow-hidden">
            <p className={`text-xs leading-relaxed mt-2 transition-all duration-300 delay-75 ${expanded ? 'opacity-100' : 'opacity-0'} lg:opacity-0 lg:group-hover:opacity-100 ${style.textClass}`}>
              {translated.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ManpowerView({ onNavigate }: ManpowerViewProps) {
  const { language, translateManpowerRole, translateWorkflowStep } = useLanguage();
  
  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case 'Truck': return <Truck className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Package': return <Package className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      default: return <Compass className={className} />;
    }
  };

  const guarantees = [
    { 
      title: language === 'en' ? '100% Background Screened' : 'Vérification des Antécédents à 100%', 
      desc: language === 'en' 
        ? 'No-exception verification of driving histories, credentials, and criminal records before hire.' 
        : 'Vérification stricte sans exception des antécédents de conduite, diplômes et casier judiciaire.' 
    },
    { 
      title: language === 'en' ? 'HSE Certifications Mandated' : 'Certifications HSE Obligatoires', 
      desc: language === 'en' 
        ? 'Every supplied specialist is fully indoctrinated in mining risk, safety codes, and emergency drills.' 
        : 'Chaque spécialiste fourni est formé aux risques miniers, codes de sécurité et exercices d\'urgence.' 
    },
    { 
      title: language === 'en' ? 'Defensive Driver Simulations' : 'Simulations de Conduite Défensive', 
      desc: language === 'en' 
        ? 'Comprehensive wet and dry season simulation assessments on mountainous unpaved terrain.' 
        : 'Évaluations complètes par simulateur en saison des pluies et sèche sur terrains montagneux non revêtus.' 
    },
    { 
      title: language === 'en' ? 'Contractor Care Protocols' : 'Protocoles de Protection des Sous-Traitants', 
      desc: language === 'en' 
        ? 'Dedicated HR managers on-site to handle personnel health, rosters, pay slips, and field safety gear.' 
        : 'Gestionnaires RH dédiés sur place pour s\'occuper de la santé, des plannings, des fiches de paie et de l\'équipement.' 
    }
  ];

  return (
    <div id="manpower-view" className="space-y-0 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 5.5.1 Shorter Page Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-3 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? 'MULTINATIONAL CONTRACT COMPLIANCE' : 'CONFORMITÉ CONTRACTUELLE MULTINATIONALE'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'Manpower & Driver Sourcing' : 'Sourcing de Main-d\'Œuvre & Chauffeurs'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-sans leading-relaxed font-medium">
            {language === 'en'
              ? 'Supplying background-vetted, certified heavy operators, safety officers, and technicians to fuel active mining projects under strict labor-law standards.'
              : 'Fourniture d\'opérateurs de machines lourdes, d\'agents de sécurité et de techniciens certifiés pour les projets miniers sous des lois du travail strictes.'}
          </p>
        </div>
      </div>

      {/* Intro section */}
      <motion.section 
        className="py-16 bg-white dark:bg-[#000d26] border-b border-slate-200 dark:border-white/10 transition-colors duration-300"
        {...fadeInUp}
      >
        <div className="mx-auto max-w-3xl px-6 md:px-12 text-center space-y-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-navy dark:text-white uppercase">
            {language === 'en' ? 'Qualified local specialists, pre-screened to meet your criteria' : 'Spécialistes locaux qualifiés, présélectionnés selon vos critères'}
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">
            {language === 'en'
              ? 'Sourcing qualified human capital is a key bottleneck for major operations. We hold a proprietary pipeline of certified Class-E drivers, heavy-machinery techs, and site safety inspectors. Our contractor schemes manage recruitment, screening, medicals, payroll, and insurance, giving you a turnkey workforce.'
              : 'Le sourcing de capital humain qualifié est un goulot d\'bouteille pour les grandes opérations. Nous détenons un vivier de conducteurs de classe E, techniciens et inspecteurs. Nous gérons le recrutement, la sélection, la médecine du travail, la paie et l\'assurance pour vous offrir une main-d\'œuvre clé en main.'}
          </p>
        </div>
      </motion.section>

      {/* 5.5.3 Roles We Supply */}
      <section className="py-24 bg-slate-50/50 dark:bg-black/10 border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-2"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'CAPABILITY PORTFOLIO' : 'PORTEFEUILLE DE CAPACITÉS'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
              {language === 'en' ? 'Key Sourcing Capabilities' : 'Capacités Clés de Recrutement'}
            </h2>
            <div className="h-1 w-12 bg-brand-gold mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {MANPOWER_ROLES.map((role, idx) => {
              const translated = translateManpowerRole(role);
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
                <MobileManpowerCard
                  key={idx}
                  role={role}
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

      {/* 5.5.4 How It Works — 3-step numbered workflow cards */}
      <section id="manpower-workflow" className="py-24 bg-white dark:bg-[#00091d] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-2"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'VETTING PHASES' : 'PHASES DE SÉLECTION'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
              {language === 'en' ? 'Workforce Screening Pipeline' : 'Vivier de Sélection des Effectifs'}
            </h2>
            <div className="h-1 w-12 bg-brand-cyan mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {WORKFLOW_STEPS.map((w, idx) => {
              const translated = translateWorkflowStep(w);
              const cardStyles = [
                {
                  cardClass: "bg-slate-50 dark:bg-[#0a1835] border border-slate-200/80 dark:border-white/10 text-[#001F54] dark:text-white hover:bg-[#001F54] hover:border-[#001F54] dark:hover:bg-[#001F54] group-hover:text-white",
                  textClass: "text-slate-600 dark:text-slate-300 font-medium group-hover:text-white/90",
                  iconClass: "text-[#0084C2] dark:text-brand-cyan group-hover:text-white",
                  iconBgClass: "bg-white/10 dark:bg-black/25 group-hover:bg-white/20"
                },
                {
                  cardClass: "bg-[#ff9d24]/10 dark:bg-[#ff9d24]/5 border border-[#ff9d24]/30 dark:border-[#ff9d24]/20 text-[#001F54] dark:text-amber-100 hover:bg-[#ff9d24] hover:border-[#ff9d24] dark:hover:bg-[#ff9d24] group-hover:text-white",
                  textClass: "text-[#001F54]/85 dark:text-amber-100/90 font-medium group-hover:text-white/90",
                  iconClass: "text-[#ff9d24] group-hover:text-white",
                  iconBgClass: "bg-[#ff9d24]/10 dark:bg-[#ff9d24]/10 group-hover:bg-white/20"
                },
                {
                  cardClass: "bg-[#009BE2]/10 dark:bg-[#009BE2]/5 border border-[#009BE2]/30 dark:border-[#009BE2]/20 text-brand-navy dark:text-cyan-100 hover:bg-[#009BE2] hover:border-[#009BE2] dark:hover:bg-[#009BE2] group-hover:text-white",
                  textClass: "text-brand-navy/85 dark:text-cyan-100/90 font-medium group-hover:text-white/90",
                  iconClass: "text-[#009BE2] group-hover:text-white",
                  iconBgClass: "bg-[#009BE2]/10 dark:bg-[#009BE2]/10 group-hover:bg-white/20"
                }
              ];
              const style = cardStyles[idx % cardStyles.length];

              return (
                <MobileManpowerWorkflowCard
                  key={w.stepNumber}
                  w={w}
                  translated={translated}
                  idx={idx}
                  style={style}
                  language={language}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5.5.5 Why Operators Choose Gateway Manpower */}
      <section className="py-24 bg-slate-50/50 dark:bg-black/10 border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text detail */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              {...fadeInUp}
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                  {language === 'en' ? 'GOVERNANCE & CARE' : 'GOUVERNANCE & BIEN-ÊTRE'}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white uppercase">
                  {language === 'en' ? 'Uncompromising Compliance For Peace of Mind' : 'Une Conformité Sans Compromis pour Votre Tranquillité'}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                {language === 'en'
                  ? 'Operating heavy logistics in mine leases requires workforce accountability. We assume full legal, administrative, and clinical liability for our dispatched specialists, protecting your operations from labor friction and regulatory issues.'
                  : 'L\'exploitation d\'une logistique lourde sur les concessions minières exige la responsabilisation de la main-d\'œuvre. Nous assumons l\'entière responsabilité légale, administrative et clinique de nos spécialistes dépêchés, protégeant ainsi vos opérations.'}
              </p>

              <div className="flex items-center space-x-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
                <HeartHandshake className="h-6 w-6 text-brand-cyan shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase text-brand-navy dark:text-white">{language === 'en' ? 'Robust Contractor Care Scheme' : 'Régime Robuste de Protection de l\'Entrepreneur'}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {language === 'en' 
                      ? 'Comprehensive health coverage, pay schedules, and site safety supervisors are included.' 
                      : 'Une couverture santé complète, des grilles de salaire et des superviseurs de sécurité sur site sont inclus.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Bullet checks */}
            <motion.div 
              className="lg:col-span-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guarantees.map((g, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItem}
                    whileHover={{ y: -4, scale: 1.02, borderColor: '#0084C2' }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-2 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4.5 w-4.5 text-brand-gold" />
                      <h4 className="font-display text-xs font-bold text-brand-navy dark:text-white">
                        {g.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {g.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5.5.6 Dual CTA Band */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-[#001030] via-[#001F54] to-[#001030] text-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative mx-auto max-w-3xl px-6 md:px-12 space-y-6 z-10">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
            {language === 'en' ? 'Structure Your Industrial Manpower Contract Now' : 'Structurez Votre Contrat de Main-d\'Œuvre Industrielle'}
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {language === 'en'
              ? 'Need to request an active team of vetted operators? Or are you a certified heavy-haul driver looking to join Sierra Leone\'s leading transport provider?'
              : 'Besoin de demander une équipe d\'opérateurs qualifiés ? Ou êtes-vous un chauffeur de poids lourd cherchant à rejoindre le leader de Sierra Leone ?'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-colors shadow-md"
            >
              {language === 'en' ? 'Request Certified Personnel' : 'Demander du Personnel Certifié'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('careers')}
              className="w-full sm:w-auto border border-white/20 hover:border-white text-white font-display font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-colors"
            >
              {language === 'en' ? 'Explore Vacant Driver Positions' : 'Explorer les Postes de Chauffeur'}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
