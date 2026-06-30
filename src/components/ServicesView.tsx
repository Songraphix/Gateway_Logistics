import React, { useState } from 'react';
import { Page, ServiceItem } from '../types';
import { useData } from '../DataContext';
import { useLanguage } from '../LanguageContext';
import { 
  Ship, Plane, Truck, FileText, Database, ShieldCheck, 
  ArrowRight, ShieldAlert, BadgeCheck, CheckCircle, Search
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

interface ServicesViewProps {
  onNavigate: (page: Page) => void;
}

export default function ServicesView({ onNavigate }: ServicesViewProps) {
  const { language, translateService } = useLanguage();
  const { services } = useData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredServices = services.filter((s) => {
    const translated = translateService(s);
    const query = searchQuery.toLowerCase();
    const matchesTitle = translated.title.toLowerCase().includes(query);
    const matchesDesc = (translated.detailedDesc && translated.detailedDesc.toLowerCase().includes(query)) || 
                        (translated.description && translated.description.toLowerCase().includes(query));
    const matchesCategory = translated.category && translated.category.toLowerCase().includes(query);
    const matchesBullet = translated.bullets && translated.bullets.some(b => b.toLowerCase().includes(query));
    return matchesTitle || matchesDesc || matchesCategory || matchesBullet;
  });

  const renderIcon = (name: string, className: string = "h-6 w-6") => {
    switch (name) {
      case 'Ship': return <Ship className={className} />;
      case 'Plane': return <Plane className={className} />;
      case 'Truck': return <Truck className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Database': return <Database className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  return (
    <div id="services-view" className="space-y-0 text-slate-800 dark:text-slate-100">
      
      {/* 5.3.1 Page Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 md:px-12 text-center space-y-4 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? 'OUR CORE CAPABILITIES' : 'NOS CAPACITÉS CLÉS'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'Operational Excellence & Services' : 'Excellence Opérationnelle & Services'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-sans leading-relaxed font-medium">
            {language === 'en'
              ? 'From maritime freight containers and air priority charters to heavy low-bed haulage and bonded storage, we deliver comprehensive, certified logistics structures.'
              : 'Du fret maritime par conteneur et des chartes aériennes prioritaires au transport routier lourd surbaissé et à l\'entreposage sous douane.'}
          </p>
        </div>
      </div>

      {/* Search bar panel */}
      <section className="py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 sticky top-[60px] md:top-[85px] z-20 shadow-xs transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'SERVICE CATALOGUE FILTER' : 'FILTRE DU CATALOGUE DES SERVICES'}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {searchQuery 
                ? (language === 'en' ? `Showing results for "${searchQuery}"` : `Résultats pour "${searchQuery}"`)
                : (language === 'en' ? 'Quickly locate standard & specialized solutions' : 'Localisez rapidement nos solutions standard & spécialisées')}
            </p>
          </div>
          
          <div className="relative w-full sm:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder={language === 'en' ? 'Search capabilities & services...' : 'Rechercher des capacités & services...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 5.3.2 Alternating Detailed Service Blocks */}
      <div id="service-blocks-container" className="divide-y divide-slate-200/85 dark:divide-white/10 bg-white dark:bg-[#00091d] transition-colors duration-300">
        {filteredServices.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto px-6 space-y-4">
            <Search className="h-12 w-12 text-slate-300 dark:text-white/10 mx-auto" />
            <h3 className="font-display text-lg font-bold text-[#001F54] dark:text-white uppercase tracking-tight">
              {language === 'en' ? 'No Matching Services Found' : 'Aucun service correspondant trouvé'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {language === 'en' 
                ? 'Try adjusting your search criteria, or contact our central dispatch operations team directly to consult on custom logistics deployments.' 
                : 'Essayez d\'ajuster vos critères de recherche ou contactez directement notre équipe pour de la logistique sur mesure.'}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#0084C2] dark:text-brand-cyan hover:underline uppercase tracking-wider cursor-pointer"
            >
              {language === 'en' ? 'Clear Search Filter' : 'Effacer le filtre de recherche'}
            </button>
          </div>
        ) : (
          filteredServices.map((s, idx) => {
            const translated = translateService(s);
            const isEven = idx % 2 === 0;
            return (
              <motion.section 
                key={s.id} 
                id={`service-block-${s.id}`}
                className={`py-24 transition-colors duration-300 ${
                  isEven ? 'bg-white dark:bg-[#000d26]' : 'bg-slate-50/50 dark:bg-[#00091d]/40'
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Text Column - Left on Even, Right on Odd */}
                    <div className={`lg:col-span-6 space-y-6 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      <div className="space-y-3">
                        {/* Subtitle / category indicator */}
                        <div className="flex items-center space-x-2 text-brand-cyan">
                          <div className="p-1.5 rounded-lg bg-brand-cyan/10">
                            {renderIcon(s.iconName, "h-5 w-5")}
                          </div>
                          <span className="text-xs font-mono tracking-widest uppercase font-extrabold text-[#0084C2] dark:text-brand-cyan">
                            {translated.category} {language === 'en' ? 'LOGISTICS' : 'LOGISTIQUE'}
                          </span>
                        </div>

                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
                          {translated.title}
                        </h2>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                        {translated.detailedDesc}
                      </p>

                      {/* Specifications list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#0084C2] dark:text-brand-cyan">
                          {language === 'en' ? 'Core Capabilities Included:' : 'Capacités Essentielles Incluses :'}
                        </h4>
                        <motion.ul 
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                          variants={staggerContainer}
                          initial="initial"
                          whileInView="whileInView"
                          viewport={{ once: true }}
                        >
                          {translated.bullets.map((bullet, bIdx) => (
                            <motion.li 
                              key={bIdx}
                              variants={staggerItem}
                              whileHover={{ 
                                y: -4, 
                                scale: 1.02, 
                                borderColor: '#0084C2',
                                boxShadow: '0 10px 15px -3px rgba(0, 132, 194, 0.12), 0 4px 6px -2px rgba(0, 132, 194, 0.05)'
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="flex items-start space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-3 shadow-sm cursor-pointer transition-colors"
                            >
                              <CheckCircle className="h-4.5 w-4.5 text-[#0084C2] dark:text-brand-cyan shrink-0 mt-0.5" />
                              <span className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-semibold">
                                {bullet}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>

                    {/* Visual Column - Right on Even, Left on Odd */}
                    <div className={`lg:col-span-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}>
                      <div className="relative group">
                        {/* Decorative back framing */}
                        <div className={`absolute -inset-2.5 rounded-3xl bg-brand-gold/10 pointer-events-none transition-transform group-hover:scale-102 ${
                          isEven ? 'rotate-1' : '-rotate-1'
                        }`} />
                        
                        <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5">
                          <img 
                            src={s.imageUrl} 
                            alt={translated.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          {/* Shaded visual frame detail */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 right-4 bg-[#001F54]/95 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase">
                            {language === 'en' ? 'CAPABILITY' : 'CAPACITÉ'} 0{idx + 1}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.section>
            );
          })
        )}
      </div>

      {/* 5.3.3 Central corporate banner */}
      <motion.section 
        id="services-tailored-cta" 
        className="py-24 bg-gradient-to-br from-[#001030] via-[#001F54] to-[#001030] text-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Ambient decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-3xl px-6 md:px-12 space-y-6 z-10">
          <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
            {language === 'en' ? 'INDIVIDUAL COOPERATION SCHEMES' : 'RÉGIMES DE COOPÉRATION INDIVIDUELS'}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase">
            {language === 'en' ? 'Need a Logistics Solution Tailored to Your Industrial Scope?' : 'Besoin d\'une Solution Logistique Adaptée à Votre Portée Industrielle ?'}
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {language === 'en'
              ? 'We handle turn-key mobilizations, heavy mining haulage routes, and ongoing customs clearing agreements. Let our director team compile a competitive cost prospectus.'
              : 'Nous gérons les mobilisations clés en main, le transport minier lourd et le dédouanement continu. Laissez nos directeurs composer un devis compétitif.'}
          </p>
          <div className="pt-2 flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('contact')}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-all shadow-md"
            >
              {language === 'en' ? 'Request Custom Rates' : 'Demander des Tarifs Personnalisés'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('contact')}
              className="border border-white/20 hover:border-white text-white font-display font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer transition-all"
            >
              {language === 'en' ? 'Schedule Site Audit' : 'Planifier un Audit de Site'}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
