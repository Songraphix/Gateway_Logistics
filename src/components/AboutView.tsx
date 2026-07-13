import React from 'react';
import { Page, FeatureItem } from '../types';
import { useData } from '../DataContext';
import { ShieldAlert, Eye, Target, Compass, Award, Shield, Users, Clock, Cpu, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import TeamSection from './TeamSection';

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

interface AboutViewProps {
  onNavigate: (page: Page) => void;
}

// ---- Mobile-expandable About Feature Card (Key Pillars section) ----
function MobileAboutFeatureCard({ f, translatedFeature, idx, style, renderIcon }: {
  f: any; translatedFeature: any; idx: number; style: any;
  renderIcon: (name: string, cls?: string) => React.ReactNode;
}) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <motion.div
      key={f.id}
      variants={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
      onClick={() => setExpanded(e => !e)}
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex-1 lg:hover:flex-[2.5] shadow-sm hover:shadow-2xl ${style.cardClass}`}
    >
      <div className="relative lg:absolute lg:inset-0 p-8 flex flex-col justify-start min-w-[280px]">
        <div className="flex items-center space-x-4 mb-8">
          <span className="font-mono text-xl lg:text-2xl font-black tracking-widest opacity-80">
            #{idx + 1}
          </span>
          {/* Mobile chevron */}
          <div className={`ml-auto lg:hidden flex items-center justify-center w-6 h-6 rounded-full bg-white/20 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg lg:text-xl font-extrabold uppercase leading-tight">
            {translatedFeature.title}
          </h3>

          <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]`}>
            <div className="min-h-0 overflow-hidden">
              <p className={`text-xs lg:text-sm leading-relaxed mt-2 transition-opacity duration-500 delay-100 ${expanded ? 'opacity-100' : 'opacity-0'} lg:opacity-0 lg:group-hover:opacity-100 ${style.textClass}`}>
                {translatedFeature.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const { language, translateFeature } = useLanguage();
  const { features } = useData();
  
  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case 'Clock': return <Clock className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Users': return <Users className={className} />;
      default: return <Award className={className} />;
    }
  };

  return (
    <div id="about-view" className="space-y-0 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 5.2.1 Shorter Page Header Banner with high-contrast Navy overlay */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        {/* Subtle background image decoration */}
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />
 
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-3 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? 'ABOUT OUR ORGANISATION' : 'À PROPOS DE NOTRE ORGANISATION'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'About Gateway Logistics' : 'À Propos de Gateway Logistics'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-sans leading-relaxed font-medium">
            {language === 'en' 
              ? 'Delivering precision haulage, comprehensive marine customs clearing, and robust driver supply contracts since our establishment in Freetown.'
              : 'Fournir un transport de précision, un dédouanement maritime complet et des contrats de chauffeurs robustes depuis notre création à Freetown.'}
          </p>
        </div>
      </div>
 
      {/* 5.2.2 Our Story — 2-column detailed narrative */}
      <section id="our-story" className="py-24 bg-white dark:bg-[#00091d] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Story text block */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2]">
                  {language === 'en' ? 'FOUNDATION & LEGACY' : 'FONDATION & HÉRITAGE'}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
                  {language === 'en' ? 'A Legacy of Resilient Operations in West Africa' : 'Un Héritage d\'Opérations Résilientes en Afrique de l\'Ouest'}
                </h2>
              </div>
 
              <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  {language === 'en'
                    ? 'Gateway Logistics & Services (SL) Ltd was birthed from a strategic vision: to build a highly disciplined logistics, customs clearing, and manpower sourcing enterprise that meets the rigorous performance standards of multinational mining, energy, and engineering entities operating in Sierra Leone.'
                    : 'Gateway Logistics & Services (SL) Ltd est née d\'une vision stratégique : bâtir une entreprise de logistique, de dédouanement et de recrutement de main-d\'œuvre hautement disciplinée qui répond aux normes de performance rigoureuses des entités multinationales de l\'industrie minière, de l\'énergie et de l\'ingénierie opérant en Sierra Leone.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'Headquartered at 55 Wilkinson Road in Freetown, we have grown from a local customs agency into a full-scale heavy haulage and industrial contractor. Our reach spans from the container gates of Freetown Port to the remote, unpaved corridors of active mining sites in Lunsar, Koidu, and beyond.'
                    : 'Basés au 55 Wilkinson Road à Freetown, nous sommes passés d\'une agence de douane locale à un entrepreneur de transport lourd et industriel à part entière. Notre portée s\'étend des portes de conteneurs du port de Freetown aux couloirs isolés et non asphaltés des sites miniers actifs de Lunsar, Koidu et au-delà.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'Our operational model is built around compliance, risk management, and the nurturing of local talent. By investing in modern GPS tracking equipment, robust defensive driver simulations, and strict drug/alcohol screening protocols, we ensure our clients experience zero downtime and total compliance.'
                    : 'Notre modèle opérationnel repose sur la conformité, la gestion des risques et la valorisation des talents locaux. En investissant dans des équipements modernes de suivi GPS, des simulations de conduite défensive et des protocoles de dépistage stricts, nous garantissons à nos clients une conformité totale.'}
                </p>
              </div>
            </motion.div>
 
            {/* Right Column: Compelling visual frame */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-brand-cyan/10 pointer-events-none -rotate-1" />
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/5">
                  <img 
                    src="/assets/aboutpageImage.png" 
                    alt="Active logistics loading terminal"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 5.2.3 Mission & Vision — 2 side-by-side cards with contrast background */}
      <section id="mission-vision" className="py-20 bg-slate-50/50 dark:bg-black/10 border-y border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="uiverse-card bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden shadow-md cursor-pointer"
              {...fadeInUp}
            >
              <div className="go-corner">
                <div className="go-arrow">→</div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan/10 text-[#0084C2]">
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="card-title-hover font-display text-xl font-black uppercase tracking-tight text-[#001F54] dark:text-white relative z-10">
                  {language === 'en' ? 'Our Mission' : 'Notre Mission'}
                </h3>
                <p className="card-text-hover text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-medium relative z-10">
                  {language === 'en'
                    ? 'To provide secure, reliable, and compliant logistics, customs brokerage, and specialized manpower services to support major mining and industrial lifecycles in Sierra Leone, while empowering our workforce and sustaining zero-harm performance.'
                    : 'Fournir des services de logistique, de courtage en douane et de main-d\'œuvre spécialisée sécurisés, fiables et conformes pour soutenir les cycles de vie industriels et miniers en Sierra Leone, tout en valorisant notre personnel.'}
                </p>
              </div>
            </motion.div>
 
            {/* Vision Card */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="uiverse-card bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 relative overflow-hidden shadow-md cursor-pointer"
              {...fadeInUp}
            >
              <div className="go-corner">
                <div className="go-arrow">→</div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                <Eye className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="card-title-hover font-display text-xl font-black uppercase tracking-tight text-[#001F54] dark:text-white relative z-10">
                  {language === 'en' ? 'Our Vision' : 'Notre Vision'}
                </h3>
                <p className="card-text-hover text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-medium relative z-10">
                  {language === 'en'
                    ? 'To be recognized as the premier integrated logistics and manpower supply company in West Africa—celebrated for our operational discipline, strict safety governance, technological infrastructure, and positive local economic contributions.'
                    : 'Être reconnu comme la première entreprise intégrée de logistique et d\'approvisionnement en main-d\'œuvre en Afrique de l\'Ouest, célébrée pour sa discipline opérationnelle, sa sécurité et ses contributions économiques.'}
                </p>
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>

      {/* 5.2.3b New Team Section */}
      <TeamSection />

      {/* 5.2.4 Why Choose Us — Reuse the 4-feature card component */}
      <section id="why-choose-us-reused" className="py-24 bg-white dark:bg-[#00091d] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-3"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'OUR STANDARDS' : 'NOS NORMES'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#001F54] dark:text-white uppercase">
              {language === 'en' ? 'Our Key Pillars of Execution' : 'Nos Piliers Clés d\'Exécution'}
            </h2>
            <div className="h-1 w-12 bg-brand-gold mx-auto rounded-full" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Four fundamental guidelines that drive every container cleared, haulage truck dispatched, and driver certified.'
                : 'Quatre directives fondamentales qui guident chaque conteneur dédouané, camion expédié et chauffeur certifié.'}
            </p>
          </motion.div>
 
          <motion.div 
            className="flex flex-col lg:flex-row h-auto lg:h-[350px] w-full gap-4 mt-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f, idx) => {
              const translatedFeature = translateFeature(f);
              // Defined design-paired palettes using Gateway Brand Palette
              const cardStyles = [
                {
                  // Card 1: Brand Cyan
                  cardClass: "bg-[#009BE2] dark:bg-[#0070A3] text-white",
                  textClass: "text-white/90 font-medium",
                  iconClass: "text-white",
                  bulletClass: "text-white/80",
                  dotColor: "bg-white"
                },
                {
                  // Card 2: Brand Orange/Gold (Replaces Green)
                  cardClass: "bg-[#ff9d24] dark:bg-[#d17a00] text-white",
                  textClass: "text-white/90 font-medium",
                  iconClass: "text-white",
                  bulletClass: "text-white/80",
                  dotColor: "bg-white"
                },
                {
                  // Card 3: Brand Navy (or White in light mode)
                  cardClass: "bg-white dark:bg-[#001F54] text-[#001F54] dark:text-white border border-slate-200 dark:border-white/10",
                  textClass: "text-[#12336D] dark:text-slate-300 font-medium",
                  iconClass: "text-[#009BE2] dark:text-[#ff9d24]",
                  bulletClass: "text-[#12336D] dark:text-slate-400",
                  dotColor: "bg-[#009BE2]"
                },
                {
                  // Card 4: Light Gray
                  cardClass: "bg-[#F5F9FD] dark:bg-[#001030] text-[#001F54] dark:text-white border border-slate-200 dark:border-white/10",
                  textClass: "text-[#12336D] dark:text-slate-300 font-medium",
                  iconClass: "text-[#009BE2] dark:text-[#ff9d24]",
                  bulletClass: "text-[#12336D] dark:text-slate-400",
                  dotColor: "bg-[#009BE2]"
                }
              ];
 
              const style = cardStyles[idx];
 
              return (
                <MobileAboutFeatureCard
                  key={f.id}
                  f={f}
                  translatedFeature={translatedFeature}
                  idx={idx}
                  style={style}
                  renderIcon={renderIcon}
                />
              );
            })}
          </motion.div>
        </div>
      </section>
 
      {/* 5.2.5 Our Promise Tagline Band */}
      <section id="our-promise" className="py-16 bg-gradient-to-r from-[#001030] via-[#001F54] to-[#001030] text-white text-center border-y border-white/10">
        <div className="mx-auto max-w-3xl px-6 md:px-12 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold block">
            {language === 'en' ? 'UNCOMPROMISING TRANSPARENCY' : 'TRANSPARENCE SANS COMPROMIS'}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'en' 
              ? '"We Promise Safety, Integrity, and Absolute Logistics Compliance"'
              : '"Nous Promettons Sécurité, Intégrité et Conformité Logistique Absolue"'}
          </h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            {language === 'en'
              ? 'Every route surveyed, every tariff classified, and every role supplied is backed by our full professional warranty and direct contract metrics.'
              : 'Chaque itinéraire étudié, chaque tarif classé et chaque rôle fourni est soutenu par notre garantie professionnelle complète.'}
          </p>
        </div>
      </section>
 
      {/* Final CTA Banner */}
      <section id="about-cta" className="py-20 bg-slate-50/50 dark:bg-black/10 border-t border-slate-200 dark:border-white/10 text-center transition-colors duration-300">
        <div className="mx-auto max-w-xl px-6 md:px-12 space-y-6 animate-fade-in-slow">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#001F54] dark:text-white uppercase">
            {language === 'en' ? 'Need to Vet Our Fleet Capabilities?' : 'Besoin d\'Évaluer nos Capacités de Flotte ?'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {language === 'en'
              ? 'Speak directly with our Freetown headquarters directors. We welcome site inspections and safety audits from multinational entities.'
              : 'Parlez directement aux directeurs de notre siège à Freetown. Nous accueillons volontiers les inspections de site.'}
          </p>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('contact')}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md"
            >
              {language === 'en' ? 'Get in Touch with Directors' : 'Contacter les Directeurs'}
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
