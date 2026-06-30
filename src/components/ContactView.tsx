import React, { useState } from 'react';
import { Page, FAQItem } from '../types';
import { useData } from '../DataContext';
import { useLanguage } from '../LanguageContext';
import { 
  Phone, Mail, MapPin, CheckCircle, ArrowRight, Clock, Plus, Minus, Send, HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

interface ContactViewProps {
  onNavigate: (page: Page) => void;
}

export default function ContactView({ onNavigate }: ContactViewProps) {
  const { language, translateFAQ } = useLanguage();
  const { faqs } = useData();
  const [activeTab, setActiveTab] = useState<'general' | 'quote'>('general');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('ocean-freight');
  const [message, setMessage] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    // Simulate submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setQuoteDetails('');
    }, 5000);
  };

  const handleToggleFaq = (idx: number) => {
    if (openFaqIndex === idx) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(idx);
    }
  };

  return (
    <div id="contact-view" className="space-y-0 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 5.8.1 Shorter Page Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-3 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? 'CENTRAL OPERATIONS REGISTRAR' : 'REGISTRE CENTRAL DES OPÉRATIONS'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'Get in Touch' : 'Contactez-nous'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-sans leading-relaxed font-medium">
            {language === 'en'
              ? 'Connect with our Freetown dispatchers, schedule warehouse layout inspections, or request customized logistics pricing protocols.'
              : 'Communiquez avec nos répartiteurs à Freetown, planifiez des inspections ou demandez des tarifs logistiques personnalisés.'}
          </p>
        </div>
      </div>

      {/* 5.8.2 Dual-Column Contact Layout */}
      <section className="py-24 bg-white dark:bg-[#00091d] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Interactive Form panel */}
            <motion.div 
              className="lg:col-span-7 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-md"
              {...fadeInUp}
            >
              {/* Form Tab controls */}
              <div className="flex bg-slate-200 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-300 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => { setActiveTab('general'); setFormSubmitted(false); }}
                  className={`flex-1 py-3 text-center rounded-xl font-display text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all ${
                    activeTab === 'general'
                      ? 'bg-white text-brand-navy shadow-sm border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'General Inquiry' : 'Demande Générale'}
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('quote'); setFormSubmitted(false); }}
                  className={`flex-1 py-3 text-center rounded-xl font-display text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all ${
                    activeTab === 'quote'
                      ? 'bg-white text-brand-navy shadow-sm border border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Bespoke Quote Proposal' : 'Proposition de Devis Personnalisé'}
                </button>
              </div>

              {/* Form Title */}
              <div className="space-y-1">
                <h3 className="font-display text-xl font-extrabold text-brand-navy dark:text-white uppercase">
                  {activeTab === 'general' 
                    ? (language === 'en' ? 'Submit General Query' : 'Soumettre une demande générale') 
                    : (language === 'en' ? 'Structure Cargo Proposal' : 'Structurer une proposition de fret')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeTab === 'general' 
                    ? (language === 'en' ? 'Submit your administrative or operational questions to our Freetown support desk.' : 'Soumettez vos questions administratives ou opérationnelles à notre bureau d\'assistance de Freetown.') 
                    : (language === 'en' ? 'Submit your weight guidelines, haulage parameters, and destination data for immediate pricing.' : 'Soumettez vos directives de poids, vos paramètres de transport et vos données de destination pour une tarification immédiate.')}
                </p>
              </div>

              {/* Unified Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="full-name-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Your Name / Representative' : 'Votre nom / Représentant'}
                  </label>
                  <input
                    id="full-name-input"
                    type="text"
                    required
                    placeholder="e.g. Samuel Kargbo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email-addr" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {language === 'en' ? 'Email Address' : 'Adresse e-mail'}
                    </label>
                    <input
                      id="email-addr"
                      type="email"
                      required
                      placeholder="e.g. samuel@domain.com"
                      value={fullName ? email : ''} // guard against autofills
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone-num" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {language === 'en' ? 'Phone Number' : 'Numéro de téléphone'}
                    </label>
                    <input
                      id="phone-num"
                      type="text"
                      required
                      placeholder="e.g. +232 7X XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                    />
                  </div>
                </div>

                {/* Conditional Fields based on Tabs */}
                {activeTab === 'quote' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Target Service */}
                    <div className="space-y-1.5">
                      <label htmlFor="service-type-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {language === 'en' ? 'Required Capability' : 'Capacité requise'}
                      </label>
                      <select
                        id="service-type-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                      >
                        <option value="ocean-freight" className="bg-white dark:bg-slate-900 text-brand-navy dark:text-white">{language === 'en' ? 'Ocean Freight Shipping' : 'Transport maritime'}</option>
                        <option value="air-freight" className="bg-white dark:bg-slate-900 text-brand-navy dark:text-white">{language === 'en' ? 'Air Cargo Charters' : 'Fret aérien'}</option>
                        <option value="land-express" className="bg-white dark:bg-slate-900 text-brand-navy dark:text-white">{language === 'en' ? 'Land Haulage & Trucking' : 'Transport routier & Camionnage'}</option>
                        <option value="customs-clearance" className="bg-white dark:bg-slate-900 text-brand-navy dark:text-white">{language === 'en' ? 'Customs & Brokerage' : 'Douanes & Transit'}</option>
                        <option value="warehousing" className="bg-white dark:bg-slate-900 text-brand-navy dark:text-white">{language === 'en' ? 'Warehousing & Layout Yards' : 'Entreposage & Plateformes'}</option>
                        <option value="mining-solutions" className="bg-white dark:bg-slate-900 text-brand-navy dark:text-white">{language === 'en' ? 'Mining Solutions Support' : 'Solutions pour l\'industrie minière'}</option>
                      </select>
                    </div>

                    {/* Weight / Metric parameters */}
                    <div className="space-y-1.5">
                      <label htmlFor="quote-details-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {language === 'en' ? 'Load Weight / Volumes' : 'Poids du chargement / Volumes'}
                      </label>
                      <input
                        id="quote-details-input"
                        type="text"
                        placeholder="e.g. 2x 40ft containers, 25 Tons"
                        value={quoteDetails}
                        onChange={(e) => setQuoteDetails(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Message / Details */}
                <div className="space-y-1.5">
                  <label htmlFor="msg-details" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {activeTab === 'general' 
                      ? (language === 'en' ? 'Your Message' : 'Votre message') 
                      : (language === 'en' ? 'Project Parameters & Destinations' : 'Paramètres du projet & Destinations')}
                  </label>
                  <textarea
                    id="msg-details"
                    required
                    rows={4}
                    placeholder={activeTab === 'general' 
                      ? (language === 'en' ? 'Provide administrative details or queries...' : 'Fournissez des détails administratifs ou des questions...') 
                      : (language === 'en' ? 'Indicate pick up hubs, routing points, hazard classifications, and timelines...' : 'Indiquez les centres de ramassage, les itinéraires, la classe de danger, les délais...')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors resize-none"
                  />
                </div>

                {/* Submit alerts with stunning success animation */}
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div 
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-6 text-center space-y-4 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      {/* Radial green glow */}
                      <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

                      <motion.div
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
                        className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10"
                      >
                        <CheckCircle className="h-9 w-9" />
                      </motion.div>

                      <div className="space-y-1.5 max-w-sm">
                        <motion.h4 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="font-display font-black text-sm text-emerald-800 dark:text-emerald-400 uppercase tracking-wider"
                        >
                          {language === 'en' ? 'Transmission Successful' : 'Transmission Réussie'}
                        </motion.h4>
                        <motion.p 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
                        >
                          {language === 'en' 
                            ? 'Your logistics parameters have been logged in our central register. Our dispatch operations director will contact you within 2 business hours.' 
                            : 'Vos paramètres logistiques ont été enregistrés dans notre registre central. Notre directeur des opérations vous contactera d\'ici 2 heures.'}
                        </motion.p>
                      </div>

                      {/* Visual Progress indicator representing 5s timer */}
                      <div className="w-full h-1 bg-emerald-500/15 rounded-full overflow-hidden mt-2">
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: "0%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-md shadow-brand-gold/15"
                    >
                      <Send className="h-4 w-4" />
                      <span>{activeTab === 'general' 
                        ? (language === 'en' ? 'Send Query Memo' : 'Envoyer la note') 
                        : (language === 'en' ? 'Submit Pricing Specification' : 'Soumettre le devis')}</span>
                    </motion.button>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>

            {/* Right Column: Contact info card + Google Map */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Contact card details */}
              <motion.div 
                className="bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-slate-100 rounded-3xl p-8 space-y-6 shadow-md relative overflow-hidden transition-colors duration-300 cursor-pointer"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                {...fadeInUp}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
                  {language === 'en' ? 'DIRECTORY DETAILS' : 'ANNUAIRE DES COORDONNÉES'}
                </span>
                <h3 className="font-display text-lg font-bold uppercase text-brand-navy dark:text-white">
                  {language === 'en' ? 'Freetown Central Office' : 'Siège Central de Freetown'}
                </h3>

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start space-x-3.5">
                    <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono block text-slate-500 dark:text-slate-400">{language === 'en' ? 'REGISTERED LOCATION' : 'SIÈGE SOCIAL'}</span>
                      <span className="font-sans text-xs text-slate-700 dark:text-slate-300">55 Wilkinson Road, Freetown, Sierra Leone</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3.5">
                    <Phone className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono block text-slate-500 dark:text-slate-400">{language === 'en' ? 'TELEPHONE HOTLINE' : 'LIGNE DIRECTE'}</span>
                      <a href="tel:+23273959933" className="font-mono text-xs hover:underline text-brand-gold font-bold">+232 73 959 933</a>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3.5">
                    <Mail className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono block text-slate-500 dark:text-slate-400">{language === 'en' ? 'OFFICIAL CORRESPONDENCE' : 'CORRESPONDANCE OFFICIELLE'}</span>
                      <a href="mailto:director@gateway-sl.com" className="font-mono text-xs hover:underline text-brand-navy dark:text-brand-cyan break-all">director@gateway-sl.com</a>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3.5">
                    <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono block text-slate-500 dark:text-slate-400">{language === 'en' ? 'BUSINESS DISPATCH HOURS' : 'HEURES D\'OUVERTURE'}</span>
                      <span className="font-sans text-xs text-slate-700 dark:text-slate-300">{language === 'en' ? 'Mon–Sat: 8:00 AM – 6:00 PM' : 'Lun–Sam: 8h00 – 18h00'}</span>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Actual High-Contrast Embedded Geographical Map Frame */}
              <motion.div 
                id="google-map-embed" 
                className="rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10 h-[300px] relative bg-slate-100 dark:bg-slate-900 transition-colors duration-300"
                {...fadeInUp}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0792198547476!2d-13.266209599999998!3d8.4674744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjgnMDIuOSJOIDEzwrAxNSc1OC40Ilc!5e0!3m2!1sen!2ssl!4v1700000000000!5m2!1sen!2ssl" 
                  className="absolute inset-0 w-full h-full border-0 grayscale dark:invert-[0.9] dark:opacity-80" 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gateway Logistics Central Office Map"
                />
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* 5.8.3 FAQ Accordion Section */}
      <section id="faq-section" className="py-24 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left FAQ intro */}
            <motion.div 
              className="lg:col-span-5 space-y-4"
              {...fadeInUp}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan">
                {language === 'en' ? 'INFORMATION DISCOVERY' : 'FOIRE AUX QUESTIONS'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white uppercase">
                {language === 'en' ? 'Frequently Asked Operational Questions' : 'Questions Opérationnelles Fréquentes'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                {language === 'en'
                  ? 'Review key logistics inquiries regarding regional networks, unpaved route safety parameters, low-bed trailer capacities, and recruitment schemes.'
                  : 'Consultez les principales questions concernant les réseaux régionaux, la sécurité routière, les capacités de remorque et le recrutement.'}
              </p>
              <div className="pt-2">
                <a 
                  href="mailto:director@gateway-sl.com"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0084C2] hover:text-[#005B9E] dark:text-brand-cyan dark:hover:text-brand-cyan-hover"
                >
                  <span>{language === 'en' ? 'Submit secondary inquiries' : 'Soumettre d\'autres questions'}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Right Accordion lists */}
            <motion.div 
              className="lg:col-span-7 space-y-4"
              {...fadeInUp}
            >
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                const translated = translateFAQ(faq);
                return (
                  <div 
                    key={idx}
                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all shadow-xs hover:shadow-md"
                  >
                    {/* Header trigger */}
                    <button
                      type="button"
                      onClick={() => handleToggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-display text-sm font-semibold text-brand-navy dark:text-white hover:text-[#0084C2] dark:hover:text-brand-cyan transition-colors cursor-pointer"
                    >
                      <span>{translated.question}</span>
                      <span className="ml-4 shrink-0 p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                        {isOpen ? <Minus className="h-4 w-4 text-brand-gold" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    {/* Expandable answer with framer-motion */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/10">
                            {translated.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5.8.4 Closing tagline band */}
      <section className="py-16 bg-gradient-to-br from-[#001030] via-[#001F54] to-[#001030] text-white text-center relative overflow-hidden">
        <div className="mx-auto max-w-xl px-6">
          <blockquote className="font-display text-2xl font-black uppercase tracking-tight text-white leading-none">
            {language === 'en' ? '"We move more than cargo.' : '"Nous transportons plus que du fret.'} <br />
            <span className="text-brand-gold">{language === 'en' ? 'We move progress."' : 'Nous transportons le progrès."'}</span>
          </blockquote>
        </div>
      </section>
    </div>
  );
}

