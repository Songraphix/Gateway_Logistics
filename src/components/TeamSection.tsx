import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

export default function TeamSection() {
  const { language } = useLanguage();

  const teamMembers = [
    {
      id: 1,
      name: "Ahmed Turay",
      role: language === 'en' ? "Managing Director" : "Directeur Général",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      name: "Sarah Kamara",
      role: language === 'en' ? "Head of Operations" : "Directrice des Opérations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      name: "David Koroma",
      role: language === 'en' ? "Logistics Commander" : "Commandant Logistique",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section id="team-section" className="py-24 bg-slate-50/50 dark:bg-[#00091d] transition-colors duration-300 overflow-hidden border-y border-slate-200/80 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Team Text Context */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
                {language === 'en' ? 'LEADERSHIP & EXPERTISE' : 'LEADERSHIP & EXPERTISE'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy dark:text-white uppercase">
                {language === 'en' ? 'Meet The Architects Of Our Operations' : 'Rencontrez les Architectes de nos Opérations'}
              </h2>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {language === 'en' 
                ? 'Our leadership brings decades of collective experience in maritime logistics, heavy haulage, and high-stakes supply chain management. We are united by a single goal: delivering uncompromising reliability.'
                : 'Notre direction apporte des décennies d\'expérience collective dans la logistique maritime, le transport lourd et la gestion des chaînes d\'approvisionnement à enjeux élevés.'}
            </p>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 mt-6">
              <h4 className="font-display font-bold text-[#001F54] dark:text-white mb-2">
                {language === 'en' ? 'The Gateway Advantage' : 'L\'Avantage Gateway'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Backed by certified professionals who understand the intricate demands of West African industrial environments.'
                  : 'Soutenu par des professionnels certifiés qui comprennent les exigences complexes des environnements industriels d\'Afrique de l\'Ouest.'}
              </p>
            </div>
          </motion.div>

          {/* Right: The CSS Animated Rotating Stack */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="team-stack-wrap">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-card bg-slate-100 dark:bg-[#001438] border border-white/20">
                  <div className="w-full h-full relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay at the bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001F54] via-[#001F54]/40 to-transparent opacity-90" />
                    
                    {/* Member details fixed at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white">
                      <h3 className="font-display font-black text-lg uppercase tracking-wider">{member.name}</h3>
                      <p className="text-[10px] font-mono tracking-widest text-brand-cyan">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
