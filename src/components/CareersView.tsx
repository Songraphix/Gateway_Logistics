import React, { useState, useRef, useEffect } from 'react';
import { Page, JobOpening } from '../types';
import { useData } from '../DataContext';
import { useLanguage } from '../LanguageContext';
import { 
  Users, Award, HeartHandshake, Upload, Briefcase, MapPin, 
  Clock, ArrowRight, X, ChevronRight, FileText, CheckCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

interface CareersViewProps {
  onNavigate: (page: Page) => void;
}

export default function CareersView({ onNavigate }: CareersViewProps) {
  const { language, translateJob } = useLanguage();
  const { jobOpenings } = useData();
  const [openings, setOpenings] = useState<JobOpening[]>(jobOpenings);
  
  useEffect(() => {
    setOpenings(jobOpenings);
  }, [jobOpenings]);

  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  
  // Application Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const values = [
    { 
      title: language === 'en' ? 'Zero Harm Integrity' : 'Intégrité Zéro Dommage', 
      desc: language === 'en' 
        ? 'We hold an absolute safety rulebook. Protecting yourself, your peers, and customer cargo is our core condition of hire.' 
        : 'Nous appliquons un règlement de sécurité absolu. Vous protéger, protéger vos collègues et le fret client est notre priorité absolue.', 
      icon: Award 
    },
    { 
      title: language === 'en' ? 'Multinational Quality' : 'Qualité Multinationale', 
      desc: language === 'en' 
        ? 'Our personnel pipeline operates under global HSE protocols, standard contract benefits, and systematic audits.' 
        : 'Notre vivier de personnel fonctionne selon les protocoles de sécurité HSE internationaux, avec des avantages contractuels et audits systématiques.', 
      icon: HeartHandshake 
    },
    { 
      title: language === 'en' ? 'Local Empowerment' : 'Valorisation de l\'Emploi Local', 
      desc: language === 'en' 
        ? 'We are proud to champion 100% Sierra Leonean operations. We invest heavily in driver simulators and training.' 
        : 'Nous sommes fiers de défendre des opérations 100% sierra-léonaises et d\'investir massivement dans la formation et les simulateurs de conduite.', 
      icon: Users 
    }
  ];

  // Drag and Drop File Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
 
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        setUploadedFile(file);
      } else {
        alert(language === 'en' ? 'Please upload a PDF or Microsoft Word document.' : 'Veuillez télécharger un document PDF ou Microsoft Word.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
    }
  };

  const handleManualUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setSelectedRole(job.title);
    setApplicationSubmitted(false);
    // Smooth scroll down to application form if open in-page, or open modal
    document.getElementById('application-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    
    // Simulate API Submission
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setSelectedRole('');
      setUploadedFile(null);
      setSelectedJob(null);
    }, 5000);
  };

  const clearOpenings = () => {
    // Allows previewing the empty-state component
    setOpenings([]);
  };

  const resetOpenings = () => {
    setOpenings(jobOpenings);
  };

  return (
    <div id="careers-view" className="space-y-0 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 5.6.1 Page Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-100 to-white dark:from-[#00091d] dark:to-[#001030] py-20 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200')]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#00091d] dark:via-[#00091d]/90 dark:to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 space-y-3 z-10 pt-8">
          <span className="text-[10px] font-mono tracking-widest text-[#0084C2] dark:text-brand-cyan uppercase font-bold block">
            {language === 'en' ? "JOIN SIERRA LEONE'S LEADING TRANSPORT FLEET" : "REJOIGNEZ LA PLUS GRANDE FLOTTE DE TRANSPORT DE SIERRA LEONE"}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[#001F54] dark:text-white">
            {language === 'en' ? 'Careers at Gateway' : 'Carrières chez Gateway'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-sans leading-relaxed font-medium">
            {language === 'en'
              ? 'Build your professional future under premium international safety standards, certified HSE training, and market-leading contractor care packages.'
              : 'Construisez votre avenir professionnel sous des normes de sécurité internationales haut de gamme, avec formation certifiée HSE et avantages exclusifs.'}
          </p>
        </div>
      </div>

      {/* 5.6.2 Why Work With Gateway - Core values */}
      <section className="py-24 bg-white dark:bg-[#00091d] transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-3"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#0084C2] dark:text-brand-cyan block">
              {language === 'en' ? 'OUR INTERNAL ENVIRONMENT' : 'NOTRE ENVIRONNEMENT INTERNE'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
              {language === 'en' ? 'The Gateway Employment Standard' : 'La Norme d\'Emploi Gateway'}
            </h2>
            <div className="h-1 w-12 bg-brand-cyan mx-auto rounded-full" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'We recruit and reward specialists who champion discipline, integrity, and proactive safety guidelines.'
                : 'Nous recrutons et récompensons les spécialistes qui défendent la discipline, l\'intégrité et la sécurité proactive.'}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {values.map((v, idx) => {
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
                <motion.div 
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 ease-out ${style.cardClass}`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${style.iconBgClass} ${style.iconClass}`}>
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-bold text-brand-navy dark:text-white group-hover:text-white transition-colors duration-300">
                      {v.title}
                    </h3>
                    <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                      <div className="min-h-0 overflow-hidden">
                        <p className={`text-xs leading-relaxed mt-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 delay-75 ${style.textClass}`}>
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5.6.3 Current Openings Section */}
      <section className="py-24 bg-slate-50/50 dark:bg-black/10 border-y border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block">
                {language === 'en' ? 'VACANCIES BOARD' : 'TABLEAU DES OFFRES'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
                {language === 'en' ? 'Active Job Opportunities' : 'Opportunités d\'Emploi Actives'}
              </h2>
            </div>

            {/* Simulated CMS toggle controls */}
            <div className="flex items-center space-x-3 text-xs">
              {openings.length > 0 ? (
                <button 
                  onClick={clearOpenings}
                  className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50 px-3 py-1.5 rounded-lg border border-red-200 cursor-pointer"
                >
                  {language === 'en' ? 'Clear Board (Test Empty State)' : 'Vider le tableau (Test État Vide)'}
                </button>
              ) : (
                <button 
                  onClick={resetOpenings}
                  className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-200 cursor-pointer"
                >
                  {language === 'en' ? 'Reload Positions' : 'Recharger les postes'}
                </button>
              )}
            </div>
          </div>

          {/* Jobs display list or Empty state fallback */}
          {openings.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
              <Briefcase className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto animate-pulse" />
              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-brand-navy dark:text-white">
                  {language === 'en' ? 'No Active Positions Open' : 'Aucun poste actif ouvert'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? 'We are not actively seeking specific roles currently. However, we accept general resumes for future Class-E hauling operators and dispatch crews. Submit your CV using the form below.'
                    : 'Nous ne recherchons pas activement de rôles spécifiques actuellement. Nous acceptons cependant les candidatures spontanées pour de futurs conducteurs et équipes.'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedRole('General Application');
                  document.getElementById('application-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-semibold px-4 py-2 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                {language === 'en' ? 'Send General Application' : 'Envoyer une candidature spontanée'}
              </motion.button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {openings.map((job) => {
                const translated = translateJob(job);
                return (
                  <motion.div 
                    key={job.id}
                    variants={staggerItem}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02, 
                      borderColor: '#0084C2',
                      boxShadow: '0 20px 40px -15px rgba(0, 132, 194, 0.18)' 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md cursor-pointer transition-colors"
                  >
                    <div className="space-y-4">
                      {/* Header tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-mono font-black tracking-wider uppercase bg-[#0084C2]/10 text-[#0084C2] dark:bg-brand-cyan/15 dark:text-brand-cyan px-2.5 py-1 rounded-md">
                          {translated.department}
                        </span>
                        <span className="text-[9px] font-mono font-black tracking-wider uppercase bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-450 px-2.5 py-1 rounded-md">
                          {translated.type}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-display text-lg font-black text-[#001F54] dark:text-white">
                          {translated.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                          <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                          <span>{translated.location}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {translated.summary}
                      </p>

                      {/* Requirements snippets */}
                      <div className="space-y-1 pt-4 border-t border-slate-200 dark:border-white/10">
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                          {language === 'en' ? 'Key Vetting Criteria:' : 'Critères de sélection :'}
                        </span>
                        <ul className="space-y-1 text-[11px] text-slate-755 dark:text-slate-300 font-medium">
                          {translated.requirements.slice(0, 2).map((req, rIdx) => (
                            <li key={rIdx} className="flex items-start space-x-1.5">
                              <span className="text-brand-gold font-bold shrink-0">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApplyClick(job)}
                        className="w-full bg-brand-navy dark:bg-[#0084C2] text-white hover:bg-slate-800 dark:hover:bg-[#0084C2]/80 font-display font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-2 transition-all"
                      >
                        <span>{language === 'en' ? 'Apply For This Role' : 'Postuler à ce poste'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* 5.6.4 Application Form Section */}
      <section id="application-form-section" className="py-24 bg-white dark:bg-[#00091d] border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-3xl px-6 md:px-12 space-y-12">
          
          <motion.div 
            className="text-center max-w-xl mx-auto space-y-2"
            {...fadeInUp}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan block">
              {language === 'en' ? 'SECURE SUBMISSION PORTAL' : 'PORTAIL DE SOUMISSION SÉCURISÉ'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
              {language === 'en' ? 'Submit Your Job Application' : 'Soumettre votre candidature'}
            </h2>
            <div className="h-1 w-12 bg-brand-cyan mx-auto rounded-full" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Complete the details below, attach your resume/license scans, and our contractor team will initiate screening.'
                : 'Complétez les détails ci-dessous, joignez votre CV et notre équipe lancera le processus de sélection.'}
            </p>
          </motion.div>

          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullname" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Full Name' : 'Nom complet'}
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    required
                    placeholder="e.g. Alieu Sesay"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Email Address' : 'Adresse e-mail'}
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="e.g. alieu@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Phone Number (Sierra Leone)' : 'Numéro de téléphone'}
                  </label>
                  <input
                    id="phone-input"
                    type="text"
                    required
                    placeholder="e.g. +232 7X XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  />
                </div>

                {/* Target Role Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="role-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Position of Interest' : 'Poste d\'intérêt'}
                  </label>
                  <select
                    id="role-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-brand-navy dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  >
                    <option value="">{language === 'en' ? '-- General / Sourcing Pool --' : '-- Candidature spontanée / Vivier --'}</option>
                    <option value="Logistics Operations Coordinator">Logistics Operations Coordinator</option>
                    <option value="HSE Compliance Officer (Mining Operations)">HSE Compliance Officer (Mining)</option>
                    <option value="Senior Heavy Haulage Operator">Senior Heavy Haulage Operator</option>
                    <option value="Class-E Heavy Driver Sourcing">Class-E Heavy Driver (General)</option>
                    <option value="Other Technical / Mechanical Roles">Other Technical / Mechanical</option>
                  </select>
                </div>
              </div>

              {/* Drag and Drop CV File Upload Block (§Usability Patterns - File Upload) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Attach Curriculum Vitae / License PDF (Required)' : 'Joindre votre CV / Permis PDF (Requis)'}
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive 
                      ? 'border-[#0084C2] bg-[#0084C2]/10 dark:bg-brand-cyan/5' 
                      : 'border-slate-300 dark:border-white/10 bg-white dark:bg-slate-900 hover:border-brand-gold dark:hover:border-brand-gold hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onClick={handleManualUploadClick}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                  />

                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto animate-bounce" />
                    {uploadedFile ? (
                      <div className="flex items-center justify-center space-x-2 text-[#0084C2] dark:text-brand-cyan text-sm font-semibold">
                        <FileText className="h-4.5 w-4.5" />
                        <span>{uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-brand-navy dark:text-white">
                          {language === 'en' 
                            ? 'Drag and drop your CV file here, or click to search folder' 
                            : 'Glissez-déposez votre CV ici, ou cliquez pour parcourir vos dossiers'}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">
                          {language === 'en' ? 'Supports PDF, DOCX, DOC files under 10MB' : 'Accepte les fichiers PDF, DOCX, DOC de moins de 10 Mo'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Alerts with stunning success animation */}
              <AnimatePresence mode="wait">
                {applicationSubmitted ? (
                  <motion.div 
                    key="success-card-careers"
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
                        {language === 'en' ? 'Application Registered' : 'Candidature Enregistrée'}
                      </motion.h4>
                      <motion.p 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
                      >
                        {language === 'en' 
                          ? 'Thank you. Your dossier and resume have been successfully secured in our recruitment database. Our HR vetting team will review your qualifications and contact you within 5 business days.' 
                          : 'Merci. Votre dossier et votre CV ont été enregistrés avec succès dans notre base de données. Notre équipe de recrutement examinera vos qualifications d\'ici 5 jours ouvrables.'}
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
                    key="submit-btn-careers"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-md shadow-brand-gold/15"
                  >
                    <span>{language === 'en' ? 'Submit Vetting Documents' : 'Soumettre les documents'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

