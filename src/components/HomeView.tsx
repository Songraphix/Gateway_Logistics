import React from 'react';
import { Page, ServiceItem, FeatureItem, WorkflowStep } from '../types';
import { useData } from '../DataContext';
import { 
  Ship, Plane, Truck, FileText, Database, ShieldCheck, 
  ArrowRight, Shield, Users, Clock, Cpu, Award, Zap, ChevronRight, ChevronLeft, Star, Quote
} from 'lucide-react';
import NetworkGraphic from './NetworkGraphic';
import { useLanguage } from '../LanguageContext';
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

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const { language, t, translateService, translateFeature, translateWorkflow } = useLanguage();
  const { services, features, workflowSteps, testimonials } = useData();
  
  // Icon selector helper
  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case 'Ship': return <Ship className={className} />;
      case 'Plane': return <Plane className={className} />;
      case 'Truck': return <Truck className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Database': return <Database className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Users': return <Users className={className} />;
      default: return <Award className={className} />;
    }
  };

  const partnerLogos = [
    'Vonto', 'Shandong Mining', 'Kingho Energy', 'Sierra Rutile', 'Leone Rock Metal', 'Dawn Logistics'
  ];

  // Testimonial Carousel state and logic
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrevTestimonial = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  return (
    <div id="home-view" className="space-y-0 text-slate-800 dark:text-slate-100">
      
      {/* 5.1.2 Trust Strip — light band with 4 critical pillars */}
      <section id="trust-strip" className="bg-slate-50/55 dark:bg-slate-900/60 backdrop-blur-md py-8 border-b border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 lg:divide-x divide-slate-300 dark:divide-white/10">
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-xs font-extrabold tracking-wider text-brand-navy dark:text-brand-gold uppercase">
                  {language === 'en' ? 'RELIABLE TEAM' : 'ÉQUIPE FIABLE'}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-300">
                  {language === 'en' ? '100% vetted multi-axle drivers' : 'Chauffeurs certifiés et expérimentés'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 lg:pl-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-xs font-extrabold tracking-wider text-brand-navy dark:text-brand-gold uppercase">
                  {language === 'en' ? 'SAFE OPERATIONS' : 'OPÉRATIONS SÉCURISÉES'}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-300">
                  {language === 'en' ? 'Zero-harm site compliance code' : 'Code de conformité zéro accident'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 lg:pl-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-xs font-extrabold tracking-wider text-brand-navy dark:text-brand-gold uppercase">
                  {language === 'en' ? 'ON-TIME DISPATCH' : 'EXPÉDITION À TEMPS'}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-300">
                  {language === 'en' ? '99.4% prompt transport logistics' : '99,4% de ponctualité logistique'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 pt-3 md:pt-0 lg:pl-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-xs font-extrabold tracking-wider text-brand-navy dark:text-brand-gold uppercase">
                  {language === 'en' ? 'TRUSTED COOPERATION' : 'PARTENAIRE DE CONFIANCE'}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-300">
                  {language === 'en' ? 'Corporate & mining supply expert' : 'Expert de l\'approvisionnement minier'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.1.3 About snippet — 2-column core description */}
      <section id="about-snippet" className="py-24 bg-white dark:bg-[#00091d] overflow-hidden transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Beautiful brand narrative */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
                  {language === 'en' ? 'PIONEERING LOGISTICAL PATHWAYS' : 'VOIES LOGISTIQUES PIONNIÈRES'}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white">
                  {language === 'en' 
                    ? 'Sierra Leone’s Premier Heavy Transport & Supply-Chain Partner' 
                    : 'Premier Partenaire de Transport Lourd & de Chaîne d\'Approvisionnement en Sierra Leone'}
                </h2>
              </div>
              
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {language === 'en' 
                  ? 'Founded as a comprehensive logistics hub in Freetown, Gateway Logistics & Services (SL) Ltd integrates global standard clearing protocols, super-heavy transport equipment fleets, and skilled mining site crew contracts.'
                  : 'Fondée en tant que hub logistique complet à Freetown, Gateway Logistics & Services (SL) Ltd intègre des protocoles de dédouanement de classe mondiale, des flottes d\'équipements de transport super-lourds et des contrats d\'équipes qualifiées sur sites miniers.'}
              </p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {language === 'en'
                  ? 'We design and engineer bespoke hauling networks, bridging the physical gaps between container hubs, airstrips, and critical mine locations across the West African region. We operate under uncompromising ISO safety criteria to protect personnel and valuable client cargo.'
                  : 'Nous concevons et développons des réseaux de transport sur mesure, comblant les écarts physiques entre les terminaux à conteneurs, les pistes d\'atterrissage et les sites miniers critiques à travers la région de l\'Afrique de l\'Ouest. Nous opérons selon des critères de sécurité ISO intransigeants.'}
              </p>

              <div className="pt-2 flex">
                <button
                  onClick={() => onNavigate('about')}
                  className="font-display text-xs uppercase tracking-wider text-brand-cyan font-bold flex items-center space-x-2 group hover:text-brand-cyan-hover transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? 'Learn more about our operations' : 'En savoir plus sur nos opérations'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Right: Compelling high-capacity logistics visuals */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                {/* Visual back frame */}
                <div className="absolute -inset-2 rounded-3xl bg-brand-gold/15 dark:bg-brand-gold/5 rotate-2 pointer-events-none" />
                <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800" 
                    alt="Active port cargo loading"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay shadow tag */}
                  <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 shadow-md px-4 py-2.5 rounded-xl flex items-center space-x-3.5">
                    <ShieldCheck className="h-5 w-5 text-brand-gold" />
                    <div>
                      <span className="text-[10px] font-mono block text-[#0084C2] dark:text-brand-cyan">HSE COMPLIANCE</span>
                      <span className="text-xs font-bold font-display block text-[#001F54] dark:text-white">ISO 9001, 14001, 45001</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.1.4 Core Services overview — H2 + 6 photo-led service cards */}
      <section id="services-overview" className="py-24 bg-slate-50/50 dark:bg-black/10 border-y border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          {/* Header block */}
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-3"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] block">
              {language === 'en' ? 'OUR CAPABILITIES' : 'NOS CAPACITÉS'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#001F54] dark:text-white uppercase">
              {language === 'en' ? 'End-To-End Logistics Services' : 'Services Logistiques de Bout en Bout'}
            </h2>
            <div className="h-1 w-16 bg-[#0084C2] mx-auto rounded-full" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Coordinating container flows, technical brokerage, laydown yards, and custom transport routes across West Africa.'
                : 'Coordination des flux de conteneurs, courtage technique, aires de stockage et itinéraires de transport personnalisés à travers l\'Afrique de l\'Ouest.'}
            </p>
          </motion.div>

          {/* 3x2 Service Card Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((s) => {
              const translatedService = translateService(s);
              return (
                <motion.div 
                  key={s.id}
                  variants={staggerItem}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="uiverse-card group bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo portion */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={s.imageUrl} 
                      alt={translatedService.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Category tag bottom left */}
                    <span className="absolute bottom-3 left-3 bg-white/95 dark:bg-[#001F54]/95 backdrop-blur-md text-slate-800 dark:text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-md border border-slate-200 dark:border-white/10 shadow-sm">
                      {translatedService.category}
                    </span>
                    {/* Go Corner Animation */}
                    <button 
                      onClick={() => onNavigate('services')}
                      aria-label={`View detailed ${translatedService.title}`}
                      className="go-corner"
                    >
                      <div className="go-arrow">→</div>
                    </button>
                  </div>

                  {/* Info portion */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[#0084C2] dark:text-brand-cyan">
                        {renderIcon(s.iconName, "h-4 w-4")}
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black">{language === 'en' ? 'Capabilities' : 'Capacités'}</span>
                      </div>
                      <h3 className="card-title-hover font-display text-lg font-black text-[#001F54] dark:text-white transition-colors z-10 relative">
                        {translatedService.title}
                      </h3>
                      <p className="card-text-hover text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed font-medium z-10 relative">
                        {translatedService.shortDesc}
                      </p>
                    </div>

                    <button 
                      onClick={() => onNavigate('services')}
                      className="mt-4 text-[11px] font-black font-display uppercase tracking-wider text-[#0084C2] hover:text-[#005B9E] dark:text-brand-cyan dark:hover:text-brand-cyan-hover transition-colors flex items-center space-x-1"
                    >
                      <span>{language === 'en' ? 'View Specifications' : 'Voir les Spécifications'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div className="text-center pt-4" {...fadeInUp}>
            <button
              onClick={() => onNavigate('services')}
              className="bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy hover:bg-brand-navy-light dark:hover:bg-brand-gold-hover font-display font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              {language === 'en' ? 'View Full Operational Capabilities' : 'Voir toutes les capacités opérationnelles'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 5.1.5 Why Choose Us — H2 + 4 feature cards with alternating premium grid tones */}
      <section id="why-choose-us" className="py-24 bg-white dark:bg-[#00091d] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            {...fadeInUp}
          >
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan block">
                {language === 'en' ? 'COMPETITIVE ADVANTAGE' : 'AVANTAGE CONCURRENTIEL'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
                {language === 'en' ? 'Why Elite Operators Align With Gateway Logistics' : 'Pourquoi les Opérateurs d\'Élite s\'alignent avec Gateway'}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Operating heavy logistics in frontier environments demands structural reliability. We combine extensive regional logistics knowledge with compliance practices.'
                  : 'Opérer de la logistique lourde dans des environnements complexes exige une fiabilité structurelle absolue. Nous associons expertise régionale et conformité stricte.'}
              </p>
            </div>
          </motion.div>

          {/* Feature grid with alternating backdrops */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f, idx) => {
              const translatedFeature = translateFeature(f);
              // Defined design-paired palettes to guarantee absolute contrast in both Light & Dark modes
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

              const style = cardStyles[idx];

              return (
                <motion.div 
                  key={f.id}
                  variants={staggerItem}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group rounded-3xl p-8 flex flex-col cursor-pointer ${style.cardClass} shadow-sm hover:shadow-xl transition-all duration-300 ease-out`}
                >
                  
                  <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors duration-300 ${style.iconBgClass} ${style.iconClass}`}>
                        {renderIcon(f.iconName, "h-6 w-6")}
                      </div>
                      <span className="font-mono text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-white/70 uppercase transition-colors duration-300">
                        CRITERIA 0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-base font-bold text-brand-navy dark:text-white group-hover:text-white transition-colors duration-300">
                        {translatedFeature.title}
                      </h3>
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                        <div className="min-h-0 overflow-hidden">
                          <p className={`text-xs leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 ${style.textClass}`}>
                            {translatedFeature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Render inline bullets */}
                  {translatedFeature.bullets && (
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                      <div className="min-h-0 overflow-hidden">
                        <ul className={`space-y-1 mt-4 pt-4 border-t border-current/10 text-[10px] font-mono tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 ${style.bulletClass}`}>
                      {translatedFeature.bullets.map((b, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${style.dotColor}`} />
                          <span>{b}</span>
                        </li>
                      ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5.1.6 Mining Industry banner — Network Graphic visual core + CTA */}
      <section id="mining-industry-banner" className="space-y-0">
        <NetworkGraphic />
        
        {/* Sub-banner CTA linking to mining solution page */}
        <div className="bg-[#0084C2]/10 dark:bg-[#0084C2]/20 text-slate-800 dark:text-slate-100 py-10 border-y border-slate-200 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan font-black">{language === 'en' ? 'HEAVY OPERATIONS SUPPORT' : 'SUPPORT DES OPÉRATIONS LOURDES'}</span>
              <h3 className="font-display text-xl font-bold text-[#001F54] dark:text-brand-gold">
                {language === 'en' ? 'Exclusive logistics structures engineered for mine lifecycles.' : 'Structures logistiques exclusives conçues pour les cycles de vie des mines.'}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('mining')}
              className="bg-[#0084C2] hover:bg-[#005B9E] text-white font-display font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors cursor-pointer shadow-md shadow-[#0084C2]/15"
            >
              <span>{language === 'en' ? 'Explore Mining Solutions' : 'Explorer les Solutions Minières'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5.1.7 How We Work — 3 connected numbered steps */}
      <section id="how-we-work" className="py-24 bg-slate-50/50 dark:bg-slate-900/10 border-y border-slate-200/80 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-lg mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'WORKFLOW EFFICIENCY' : 'EFFICACITÉ DES OPÉRATIONS'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#001F54] dark:text-white uppercase">
              {language === 'en' ? 'How We Execute' : 'Notre Processus d\'Exécution'}
            </h2>
            <div className="h-1 w-12 bg-brand-gold mx-auto rounded-full" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Our phased approach guarantees precision dispatch, continuous oversight, and flawless logistics delivery.'
                : 'Notre approche par phases garantit une répartition précise, une surveillance continue et une livraison sans faille.'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row h-[420px] lg:h-[350px] w-full gap-4 mt-8 relative z-10">
            {workflowSteps.map((w, idx) => {
              const translatedWorkflow = translateWorkflow(w);
              const cardStyles = [
                {
                  cardClass: "bg-[#009BE2] dark:bg-[#0070A3] text-white",
                  textClass: "text-white/90 font-medium",
                  iconClass: "text-[#009BE2] bg-white dark:text-white dark:bg-white/20",
                  numberClass: "text-white"
                },
                {
                  cardClass: "bg-[#ff9d24] dark:bg-[#d17a00] text-white",
                  textClass: "text-white/90 font-medium",
                  iconClass: "text-[#ff9d24] bg-white dark:text-white dark:bg-white/20",
                  numberClass: "text-white"
                },
                {
                  cardClass: "bg-white dark:bg-[#001F54] text-[#001F54] dark:text-white border border-slate-200 dark:border-white/10",
                  textClass: "text-[#12336D] dark:text-slate-300 font-medium",
                  iconClass: "text-[#009BE2] dark:text-[#ff9d24] bg-slate-100 dark:bg-[#001030]",
                  numberClass: "text-[#001F54] dark:text-[#ff9d24]"
                }
              ];
              const style = cardStyles[idx % cardStyles.length];

              return (
                <div 
                  key={w.stepNumber}
                  className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex-1 lg:hover:flex-[2.5] shadow-sm hover:shadow-2xl ${style.cardClass}`}
                >
                  <div className="absolute inset-0 p-8 flex flex-col justify-start min-w-[280px]">
                    <div className="flex items-center justify-between mb-8">
                      <span className={`font-display text-4xl font-black tracking-tight opacity-90 ${style.numberClass}`}>
                        {w.stepNumber}
                      </span>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${style.iconClass}`}>
                        <Zap className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-display text-lg lg:text-xl font-extrabold leading-tight">
                        {translatedWorkflow.title}
                      </h3>
                      
                      <div className="grid grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                        <div className="min-h-0 overflow-hidden">
                          <p className={`text-xs lg:text-sm leading-relaxed mt-2 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 ${style.textClass}`}>
                            {translatedWorkflow.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      {testimonials && testimonials.length > 0 && (
        <section id="testimonials-section" className="py-24 bg-white dark:bg-[#000a1d] relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-lg mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
                {language === 'en' ? 'TRUST & RELIABILITY' : 'CONFIANCE & FIABILITÉ'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#001F54] dark:text-white uppercase">
                {language === 'en' ? 'Client Endorsements' : 'Témoignages Clients'}
              </h2>
              <div className="h-1 w-12 bg-brand-gold mx-auto rounded-full" />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {language === 'en' 
                  ? 'Hear from some of the leading mining and resource operators who rely on Gateway Logistics every day.' 
                  : 'Découvrez les retours de nos partenaires et opérateurs miniers qui font confiance à Gateway Logistics au quotidien.'}
              </p>
            </div>

            {/* Testimonial Stage */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] p-8 md:p-14 relative shadow-xl shadow-slate-100/50 dark:shadow-none min-h-[320px] flex flex-col justify-between overflow-hidden">
                {/* Large decorative quotation mark */}
                <div className="absolute top-6 right-8 text-slate-200 dark:text-white/5 pointer-events-none">
                  <Quote className="h-28 w-28 stroke-[0.5]" />
                </div>

                {/* Animated content */}
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 relative z-10 flex-grow flex flex-col justify-center"
                >
                  {/* Star Rating */}
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonials[currentTestimonial].rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-sm md:text-base lg:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>

                  {/* Author Meta */}
                  <div className="flex items-center space-x-4 pt-2">
                    {testimonials[currentTestimonial].avatarUrl ? (
                      <img 
                        src={testimonials[currentTestimonial].avatarUrl} 
                        alt={testimonials[currentTestimonial].author} 
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full object-cover border-2 border-[#0084C2]/30 dark:border-brand-gold/30 shadow-md"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-display font-extrabold text-sm border-2 border-brand-gold/30">
                        {testimonials[currentTestimonial].author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-black text-xs md:text-sm text-[#001F54] dark:text-white uppercase tracking-wider">
                        {testimonials[currentTestimonial].author}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {testimonials[currentTestimonial].role}, <span className="text-[#0084C2] dark:text-brand-cyan">{testimonials[currentTestimonial].company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Left/Right manual trigger buttons */}
                <div className="absolute right-6 bottom-6 flex space-x-2 z-20">
                  <button
                    onClick={handlePrevTestimonial}
                    className="h-10 w-10 rounded-full border border-slate-200 dark:border-white/10 hover:border-[#0084C2] bg-white dark:bg-slate-900 hover:bg-[#0084C2]/5 text-slate-600 dark:text-slate-300 hover:text-[#0084C2] transition-all flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="h-10 w-10 rounded-full border border-slate-200 dark:border-white/10 hover:border-[#0084C2] bg-white dark:bg-slate-900 hover:bg-[#0084C2]/5 text-slate-600 dark:text-slate-300 hover:text-[#0084C2] transition-all flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Indicator dots navigation */}
              <div className="flex justify-center space-x-2.5 pt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 transition-all rounded-full cursor-pointer ${
                      currentTestimonial === idx 
                        ? 'w-8 bg-brand-gold' 
                        : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                    }`}
                    title={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5.1.8 Mission Statement Block */}
      <section id="mission-block" className="py-24 bg-gradient-to-br from-[#001030] via-[#001F54] to-[#001030] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200')]" />
        
        <div className="relative mx-auto max-w-4xl px-6 md:px-12 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
            {language === 'en' ? 'CORPORATE DIRECTIVE' : 'DIRECTIVE DE L\'ENTREPRISE'}
          </span>
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight text-white">
            {language === 'en' ? (
              <>"Your Success Is Our <span className="text-brand-gold">Absolute Mission</span>"</>
            ) : (
              <>"Votre réussite est notre <span className="text-brand-gold">mission absolue</span>"</>
            )}
          </blockquote>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'We move more than containers, bulk ores, and driver manifests. We mobilize progress, industrial safety, and local employment opportunities in Sierra Leone.'
              : 'Nous déplaçons bien plus que des conteneurs, des minerais et des manifestes. Nous mobilisons le progrès, la sécurité industrielle et l\'emploi local en Sierra Leone.'}
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-colors"
            >
              {language === 'en' ? 'Consult with an Expert' : 'Consulter un Expert'}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="border border-white/20 hover:border-white text-white font-display font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-colors"
            >
              {language === 'en' ? 'View Our Story' : 'Voir Notre Histoire'}
            </button>
          </div>
        </div>
      </section>

      {/* 5.1.9 Partner Logos Marquee — horizontal scrolling */}
      <section id="partner-marquee" className="py-12 bg-white dark:bg-[#000c25] border-y border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 font-bold block text-center">
            {language === 'en' ? 'INTEGRATED CAPABILITIES WITH LEADING OPERATORS' : 'CAPACITÉS INTÉGRÉES AVEC DES OPÉRATEURS DE PREMIER PLAN'}
          </span>
          
          {/* Scrolling tape container */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex w-[200%] animate-scroll space-x-12">
              {/* Duplicate list to enable continuous loop */}
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((p, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-center glass-panel rounded-xl px-6 py-3 min-w-[150px] shadow-sm hover:shadow-md hover:scale-102 transition-all"
                >
                  <span className="font-display font-extrabold text-sm text-slate-500 tracking-wider uppercase dark:text-slate-300">
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.1.10 Final CTA Banner */}
      <section id="final-cta" className="py-20 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900/40 dark:via-[#00091d] dark:to-slate-900/40 text-slate-800 dark:text-slate-100 text-center border-t border-slate-200/80 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-6 md:px-12 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'Ready to Move Your Operation Forward?' : 'Prêt à propulser vos opérations ?'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
            {language === 'en'
              ? 'Connect with our dispatchers to structure highly customized contract rates, manpower support schemes, or clearing solutions.'
              : 'Contactez nos répartiteurs pour structurer des tarifs contractuels personnalisés, des plans de main-d\'œuvre ou des solutions de dédouanement.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-lg shadow-brand-gold/15"
            >
              {language === 'en' ? 'Request a Bespoke Proposal' : 'Demander une Proposition Personnalisée'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
