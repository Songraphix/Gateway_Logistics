import React, { useState } from 'react';
import { Page, NewsArticle } from '../types';
import { useData } from '../DataContext';
import { useLanguage } from '../LanguageContext';
import { 
  Calendar, Clock, Search, ArrowRight, X, Sparkles, CheckCircle2, ChevronRight, BookOpen 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

interface NewsViewProps {
  onNavigate: (page: Page) => void;
}

export default function NewsView({ onNavigate }: NewsViewProps) {
  const { language, translateNews } = useLanguage();
  const { newsArticles } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  
  // Newsletter Signup State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const categories = ['All', 'Company News', 'Industry Insights', 'Safety & Operations', 'Project Spotlights'];

  const getCategoryDisplay = (cat: string) => {
    if (language === 'en') return cat;
    switch (cat) {
      case 'All': return 'Tous';
      case 'Company News': return 'Actualités';
      case 'Industry Insights': return 'Analyses';
      case 'Safety & Operations': return 'Sécurité & Opérations';
      case 'Project Spotlights': return 'Focus Projets';
      default: return cat;
    }
  };

  const translatedArticles = newsArticles.map((art) => translateNews(art));

  const filteredArticles = translatedArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 5000);
  };

  return (
    <div id="news-view" className="space-y-0 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 5.7.1 Page Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-3 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? 'OPERATIONAL LOGS & ANNOUNCEMENTS' : 'JOURNAUX OPÉRATIONNELS & ANNONCES'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'News & Insights' : 'Actualités & Bilans'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-sans leading-relaxed font-medium">
            {language === 'en'
              ? 'Follow active fleet expansion indices, mining contract milestones, regional haulage route safety logs, and global supply chain briefings.'
              : 'Suivez l\'expansion de notre flotte, les jalons de contrats miniers, la sécurité routière régionale et les bilans de la chaîne d\'approvisionnement.'}
          </p>
        </div>
      </div>

      {/* Categories filter tabs + Search bar panel */}
      <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 sticky top-[60px] md:top-[85px] z-20 shadow-xs">
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-display transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-gold text-brand-navy font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {getCategoryDisplay(cat)}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder={language === 'en' ? 'Search reports/updates...' : 'Rechercher des rapports/mises à jour...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
          </div>

        </div>
      </section>

      {/* 5.7.3 Blog Post Grid */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          {filteredArticles.length === 0 ? (
            <motion.div 
              className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl p-10 max-w-md mx-auto border border-slate-200 dark:border-white/10 space-y-3 shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Search className="h-8 w-8 text-slate-300 mx-auto" />
              <h3 className="font-display text-sm font-bold text-brand-navy dark:text-white">
                {language === 'en' ? 'No Matching Logs Found' : 'Aucun journal correspondant trouvé'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Try adjusting your filter or typing a simpler search string.' : 'Essayez d\'ajuster votre filtre ou de taper une recherche plus simple.'}
              </p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-brand-gold text-brand-navy font-semibold px-4 py-1.5 rounded-lg text-xs cursor-pointer"
              >
                {language === 'en' ? 'Reset Search Filters' : 'Réinitialiser les filtres'}
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredArticles.map((art, idx) => (
                <motion.div 
                  key={art.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-lg border border-slate-200 dark:border-white/10 hover:border-[#0084C2]/30 dark:hover:border-brand-cyan/40 transition-all flex flex-col justify-between"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Photo Portion */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={art.imageUrl} 
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#001030]/95 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md border border-white/10">
                      {getCategoryDisplay(art.category)}
                    </span>
                    <div className="absolute top-3 right-3 flex items-center space-x-2 text-[10px] font-mono bg-[#001F54]/95 backdrop-blur-md text-brand-gold border border-white/10 px-2.5 py-1 rounded-md">
                      <Calendar className="h-3 w-3" />
                      <span>{art.date}</span>
                    </div>
                  </div>

                  {/* Info portion */}
                  <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[#0084C2] dark:text-brand-cyan text-[10px] font-mono tracking-wider font-extrabold">
                        <Clock className="h-3 w-3" />
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-black text-[#001F54] dark:text-white leading-snug group-hover:text-[#0084C2] dark:group-hover:text-brand-cyan transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-3 leading-relaxed font-medium">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex">
                      <button
                        onClick={() => setSelectedArticle(art)}
                        className="text-xs font-black font-display uppercase tracking-wider text-[#0084C2] hover:text-[#005B9E] dark:text-[#00e5ff] dark:hover:text-brand-cyan transition-colors flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{language === 'en' ? 'Examine Full Bulletin' : 'Examiner le bulletin complet'}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5.7.4 Newsletter Signup Band */}
      <section id="newsletter-band" className="py-20 bg-gradient-to-br from-[#001030] via-[#001F54] to-[#001030] text-white relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative mx-auto max-w-4xl px-6 md:px-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <motion.div 
              className="lg:col-span-6 space-y-2 text-center lg:text-left"
              {...fadeInUp}
            >
              <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
                {language === 'en' ? 'SUBSCRIBE TO DISPATCH LOGS' : 'S\'INSCRIRE AUX JOURNAUX DE RÉPARTITION'}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                {language === 'en' ? 'Register For Monthly Bulletins' : 'Inscription aux Bulletins Mensuels'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Receive certified safety summaries, fleet additions, and regional route condition briefings directly.'
                  : 'Recevez directement les bilans de sécurité certifiés, les ajouts à la flotte et l\'état des itinéraires.'}
              </p>
            </motion.div>

            <motion.div 
              className="lg:col-span-6"
              {...fadeInUp}
            >
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder={language === 'en' ? 'Enter corporate email...' : 'Saisir l\'e-mail d\'entreprise...'}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan placeholder:text-slate-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Register Address' : 'S\'enregistrer'}
                  </motion.button>
                </div>

                {newsletterSubmitted && (
                  <p className="text-[11px] text-emerald-400 font-mono text-center sm:text-left">
                    {language === 'en'
                      ? '✔ Email registered successfully. You have been added to the Gateway Dispatch ledger.'
                      : '✔ E-mail enregistré avec succès. Vous avez été ajouté au grand livre Gateway.'}
                  </p>
                )}
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5.7.5 Detailed Article Modal Drawer overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            className="fixed inset-0 bg-[#001F54]/80 dark:bg-[#00091d]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-white/10 relative"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              
              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer z-10"
                title="Close article"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Cover Photo */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 sm:left-8 right-6 space-y-2">
                  <span className="bg-brand-gold text-brand-navy text-[10px] font-mono tracking-widest font-extrabold uppercase px-2.5 py-1 rounded-md">
                    {getCategoryDisplay(selectedArticle.category)}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Article Content Area */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                
                {/* Metadata strip */}
                <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-300 border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="flex items-center space-x-1.5 font-mono">
                    <Calendar className="h-4 w-4 text-brand-gold" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 font-mono">
                    <Clock className="h-4 w-4 text-[#0084C2] dark:text-brand-cyan" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* Body narrative with correct linebreaks */}
                <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-200 space-y-4 font-sans whitespace-pre-wrap">
                  {selectedArticle.content}
                </div>

                {/* Closing / share options */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs text-slate-400 dark:text-slate-300 font-mono">
                    {language === 'en' ? 'Operations Ledger Reference: GW-LOGS-2026' : 'Référence du Grand Livre des Opérations: GW-LOGS-2026'}
                  </span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy hover:bg-slate-800 dark:hover:bg-brand-gold-hover px-5 py-2 rounded-xl text-xs uppercase font-display font-semibold transition-all cursor-pointer"
                  >
                    {language === 'en' ? 'Return to Newsroom' : 'Retour à la Salle de Presse'}
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
