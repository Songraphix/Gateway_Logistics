import React, { createContext, useContext, useState, useEffect } from 'react';
import { Page, ServiceItem, FeatureItem, WorkflowStep, JobOpening, NewsArticle, FAQItem } from './types';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateService: (service: ServiceItem) => ServiceItem;
  translateFeature: (feature: FeatureItem) => FeatureItem;
  translateWorkflow: (step: WorkflowStep) => WorkflowStep;
  translateWorkflowStep: (step: WorkflowStep) => WorkflowStep;
  translateManpowerRole: (role: any) => any;
  translateJob: (job: JobOpening) => JobOpening;
  translateNews: (article: NewsArticle) => NewsArticle;
  translateFAQ: (faq: FAQItem) => FAQItem;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Utility
    'nav.home': 'Home',
    'nav.services': 'Services & Solutions',
    'nav.company': 'Company',
    'nav.about': 'About Us',
    'nav.careers': 'Careers',
    'nav.news': 'News & Insights',
    'nav.contact': 'Contact Us',
    'nav.getQuote': 'Get a Quote',
    'nav.consult': 'Consult Dispatcher',
    'nav.hours': 'Mon–Sat, 8am–6pm (Freetown Time)',
    'nav.title': 'Gateway Logistics & Services',
    'nav.directive': 'MAIN DEPLOYMENT DIRECTIVES',
    'nav.request_dispatch': 'REQUEST IMMEDIATE DISPATCH',
    'nav.core_logistics': 'Core Logistics',
    'nav.core_desc': 'Freight, clearing & custom heavy transport.',
    'nav.mining_logistics': 'Mining Logistics',
    'nav.mining_desc': 'Bulk ore shipping and mine site rigging.',
    'nav.manpower': 'Manpower & Supply',
    'nav.manpower_desc': 'Vetted heavy drivers and safety site crews.',
    'nav.about_desc': 'Our history, certifications & local footprint.',
    'nav.careers_desc': 'Join our crew & professional site contractors.',
    'nav.news_desc': 'Port announcements & logistics reports.',
    'nav.theme_light': 'Light',
    'nav.theme_dark': 'Dark',

    // Hero Section & Slide Control
    'hero.eyebrow': 'GATEWAY LOGISTICS (SL)',
    'hero.cta_consult': 'Initiate Dispatch Consultation',
    'hero.cta_explore': 'Explore Services',
    'hero.enjoy': 'Enjoy precision delivery',
    'hero.next': 'NEXT CAPABILITY',
    'hero.live_control': 'LIVE CENTRAL CONTROL',
    'hero.delivery_solutions': 'DELIVER SOLUTIONS',
    'hero.fleet_status': 'Fleet & Crew Status Active',
    'hero.secure_pct': '100% SECURE',
    'hero.zero_harm': 'ZERO-HARM RECORD',

    // Counter stats
    'stats.years': 'Active Service',
    'stats.safe': 'Zero-Harm Record',
    'stats.crew': 'Vetted Operators',
    'stats.rigs': 'Heavy Trucks & Fleet',

    // WhatsApp
    'whatsapp.chat': 'Chat Live with Operations',

    // Footer
    'footer.motto': 'Deploying high-tier, HSE-compliant logistics, heavy lifting, and vetted human resources across Sierra Leone since 2011.',
    'footer.quick_links': 'Quick Navigation',
    'footer.services': 'Our Operations',
    'footer.contact': 'Operations Command',
    'footer.rights': 'All Rights Reserved.',
    'footer.developed': 'Gateway Logistics & Services (SL) Ltd.',

    // Common labels
    'common.back': 'Back',
    'common.apply': 'Apply Now',
    'common.read_more': 'Read Full Article',
    'common.submit': 'Submit Request',
    'common.loading': 'Loading...',
    'common.email': 'Email or Phone',
    'common.details': 'Requirement Details',
    'common.success': 'Request submitted successfully!',
  },
  fr: {
    // Navigation & Utility
    'nav.home': 'Accueil',
    'nav.services': 'Services & Solutions',
    'nav.company': 'Entreprise',
    'nav.about': 'À Propos',
    'nav.careers': 'Carrières',
    'nav.news': 'Actualités & Bilans',
    'nav.contact': 'Contactez-nous',
    'nav.getQuote': 'Obtenir un Devis',
    'nav.consult': 'Consulter le Répartiteur',
    'nav.hours': 'Lun–Sam, 8h–18h (Heure de Freetown)',
    'nav.title': 'Logistique & Services Gateway',
    'nav.directive': 'DIRECTIVES PRINCIPALES DE DÉPLOIEMENT',
    'nav.request_dispatch': 'DEMANDER UNE RÉPARTITION IMMÉDIATE',
    'nav.core_logistics': 'Logistique de Base',
    'nav.core_desc': 'Fret, dédouanement et transport lourd personnalisé.',
    'nav.mining_logistics': 'Logistique Minière',
    'nav.mining_desc': 'Transport de minerai en vrac et gréement de site.',
    'nav.manpower': 'Main-d’œuvre & Approvisionnement',
    'nav.manpower_desc': 'Chauffeurs poids lourds certifiés et équipes de sécurité.',
    'nav.about_desc': 'Notre histoire, certifications et ancrage local.',
    'nav.careers_desc': 'Rejoignez notre équipe et sous-traitants de site.',
    'nav.news_desc': 'Annonces portuaires et rapports logistiques.',
    'nav.theme_light': 'Clair',
    'nav.theme_dark': 'Sombre',

    // Hero Section & Slide Control
    'hero.eyebrow': 'LOGISTIQUE GATEWAY (SL)',
    'hero.cta_consult': 'Initier la Consultation',
    'hero.cta_explore': 'Explorer les Services',
    'hero.enjoy': 'Profitez d\'une livraison de précision',
    'hero.next': 'PROCHAINE CAPACITÉ',
    'hero.live_control': 'CONTRÔLE CENTRAL EN DIRECT',
    'hero.delivery_solutions': 'SOLUTIONS DE LIVRAISON',
    'hero.fleet_status': 'Statut Flotte & Équipage Actif',
    'hero.secure_pct': '100% SÉCURISÉ',
    'hero.zero_harm': 'RECORD SANS ACCIDENT',

    // Counter stats
    'stats.years': 'Service Actif',
    'stats.safe': 'Record Zéro Accident',
    'stats.crew': 'Opérateurs Qualifiés',
    'stats.rigs': 'Camions Lourds & Flotte',

    // WhatsApp
    'whatsapp.chat': 'Discuter en direct avec l\'équipe',

    // Footer
    'footer.motto': 'Déploiement d\'une logistique haut de gamme conforme aux normes HSE, d\'engins de levage lourd et de main-d’œuvre qualifiée en Sierra Leone depuis 2011.',
    'footer.quick_links': 'Navigation Rapide',
    'footer.services': 'Nos Opérations',
    'footer.contact': 'Commandement des Opérations',
    'footer.rights': 'Tous droits réservés.',
    'footer.developed': 'Gateway Logistics & Services (SL) Ltd.',

    // Common labels
    'common.back': 'Retour',
    'common.apply': 'Postuler',
    'common.read_more': 'Lire l\'article complet',
    'common.submit': 'Soumettre la Demande',
    'common.loading': 'Chargement...',
    'common.email': 'E-mail ou Téléphone',
    'common.details': 'Détails des exigences',
    'common.success': 'Demande soumise avec succès !',
  }
};

// Complete French content mapping for data.ts arrays
const FRENCH_SERVICES: Record<string, Partial<ServiceItem>> = {
  'ocean-freight': {
    title: 'Fret Maritime & Consignation',
    category: 'Mer',
    shortDesc: 'Logistique maritime de bout en bout reliant la Sierra Leone aux grands corridors commerciaux mondiaux.',
    detailedDesc: 'En tant qu\'opérateur portuaire de premier plan, nous gérons des opérations d\'expédition maritime complètes. Des conteneurs complets (FCL) aux expéditions groupées (LCL), notre logistique de fret maritime garantit un transit efficace de port à port et de port à porte sous des protocoles de sécurité très stricts.',
    bullets: [
      'Solutions de conteneurs complets (FCL) et de groupage (LCL)',
      'Représentation d\'agence portuaire et consignation de navires au port de Freetown',
      'Manutention spécialisée pour les marchandises dangereuses, les minerais et le vrac',
      'Services de consolidation, de cross-docking et de dépotage de conteneurs'
    ]
  },
  'air-freight': {
    title: 'Fret Aérien & Cargo',
    category: 'Air',
    shortDesc: 'Expéditions aériennes urgentes avec traitement douanier accéléré à l\'aéroport international de Lungi.',
    detailedDesc: 'Pour les pièces de rechange urgentes, les fournitures médicales ou les cargaisons à haute valeur ajoutée, nos solutions de fret aérien offrent le transit le plus rapide. Nous proposons des consolidations régulières et des vols nolisés, appuyés par des capacités de pré-dédouanement pour minimiser l\'attente.',
    bullets: [
      'Expéditions prioritaires express et opérations de vols charters mondiaux',
      'Chaîne du froid pour les fournitures médicales et de laboratoire sensibles à la température',
      'Coordination douanière sur site à l\'aéroport de Lungi (FNA)',
      'Transit sécurisé pour l\'or, les minéraux précieux et les cargaisons diplomatiques'
    ]
  },
  'land-express': {
    title: 'Transport Lourd Routier',
    category: 'Terre',
    shortDesc: 'Transport routier lourd robuste, distribution secondaire et répartition de flotte à travers le pays.',
    detailedDesc: 'Notre flotte de poids lourds est conçue pour surmonter les terrains complexes de Sierra Leone, reliant les ports côtiers aux sites miniers de l\'intérieur (Lunsar, Koidu, Tonkolili). Grâce au suivi GPS, au géofencing et à l\'analyse de la fatigue des conducteurs, votre cargaison est toujours en sécurité.',
    bullets: [
      'Transport lourd, remorques surbaissées et cargaisons industrielles hors normes',
      'Études d\'itinéraires, inspections de ponts et coordination des services publics',
      'Réseaux de distribution primaire, secondaire et du dernier kilomètre',
      'Suivi de la fatigue des conducteurs et surveillance GPS de la flotte en temps réel'
    ]
  },
  'customs-clearance': {
    title: 'Courtage & Dédouanement',
    category: 'Réglementaire',
    shortDesc: 'Courtage réglementaire et traitement accéléré pour une conformité douanière sans faille.',
    detailedDesc: 'La gestion des régimes douaniers exige une documentation extrêmement rigoureuse. Nos courtiers en douane dédiés garantissent une conformité absolue, gérant les droits d\'importation, les classifications tarifaires et les permis d\'importation temporaires pour éviter les frais de surestarie.',
    bullets: [
      'Conseil en inspection avant expédition et classification tarifaire douanière',
      'Traitement SGS, guichet unique et portail ASYCUDA',
      'Traitement des exonérations de droits pour les mines et les organisations humanitaires',
      'Documentation de transit sous douane et entreposage agréé'
    ]
  },
  'warehousing': {
    title: 'Centres de Stockage & Logistique',
    category: 'Stockage',
    shortDesc: 'Solutions d\'entreposage modernes et sécurisées avec suivi d\'inventaire en temps réel.',
    detailedDesc: 'Nous exploitons des entrepôts hautement sécurisés situés à des carrefours logistiques stratégiques. Des zones de dépôt pour les pièces minières lourdes au stockage à sec pour les approvisionnements de camp, nos installations disposent de contrôles d\'inventaire stricts et d\'une surveillance 24/7.',
    bullets: [
      'Solutions de stockage sous douane, non dédouané et en parc ouvert',
      'Système de gestion d\'entrepôt (WMS) en temps réel avec portails numériques',
      'Caméras de surveillance, contrôle d\'accès et intervention rapide',
      'Préparation de kits, consolidation, emballage et stockage conteneurisé'
    ]
  },
  'project-cargo': {
    title: 'Cargaisons de Projet & Levage',
    category: 'Spécialisé',
    shortDesc: 'Ingénierie logistique complexe pour les infrastructures industrielles, minières et énergétiques.',
    detailedDesc: 'Le déplacement de machines lourdes ou l\'installation de complexes industriels nécessite une ingénierie dédiée. Notre équipe coordonne des mobilisations massives, alliant étude d\'itinéraire et équipes de grutage spécialisées.',
    bullets: [
      'Planification de fret multimodal et équipes de gestion de projet dédiées',
      'Grutage, gréement et ingénierie de levage lourd sur site',
      'Relocalisation d\'usines industrielles et mobilisation complète de mines',
      'Évaluations complètes des risques et plans d\'assurance transport sur mesure'
    ]
  }
};

const FRENCH_FEATURES: Record<string, Partial<FeatureItem>> = {
  'precision': {
    title: 'Précision dans la Livraison',
    desc: 'Notre engagement envers la précision garantit que votre cargaison arrive en toute sécurité et exactement à temps, même sur les terrains les plus difficiles.',
    bullets: ['Taux de ponctualité de 99,4%', 'Télématique et suivi en temps réel', 'Plan de gestion d\'itinéraire rigoureux']
  },
  'tailored': {
    title: 'Solutions Minières Sur Mesure',
    desc: 'Nous offrons une logistique et une main-d\'œuvre spécialisées conçues autour du cycle de vie complexe des projets miniers lourds.',
    bullets: ['Mobilisation minière de bout en bout', 'Manipulateurs de matières dangereuses', 'Intégration de la chaîne d\'approvisionnement sur site']
  },
  'safety': {
    title: 'Sécurité HSE Inflexible',
    desc: 'Nous fonctionnons selon une philosophie de zéro accident. Nos protocoles de sécurité stricts, nos certifications de conduite défensive et nos audits réguliers établissent la norme du marché.',
    bullets: ['Cadres HSE alignés sur l\'ISO', 'Audits réguliers alcool & drogues', 'Certifications de conduite défensive']
  },
  'people': {
    title: 'Talents Locaux Qualifiés',
    desc: 'Notre vivier de ressources humaines répond aux critères stricts des multinationales, avec des chauffeurs de poids lourds et des techniciens rigoureusement sélectionnés.',
    bullets: ['Chauffeurs contrôlés à 100%', 'Certifications HSE obligatoires', 'Équipes d\'accompagnement des sous-traitants']
  }
};

const FRENCH_WORKFLOW: Record<string, Partial<WorkflowStep>> = {
  '01': {
    title: 'Cadrage & Planification Technique',
    desc: 'Nous réalisons des études d\'itinéraire complètes, des analyses des besoins en machines lourdes et des registres de risques pour cartographier la chaîne.'
  },
  '02': {
    title: 'Mobilisation Agile & Répartition',
    desc: 'Les ressources, les chauffeurs spécialisés, les remorques sur mesure et les protocoles de douane sont activés simultanément via notre hub central.'
  },
  '03': {
    title: 'Surveillance Sécurisée & Livraison',
    desc: 'Grâce au suivi par satellite et aux briefings HSE quotidiens, nous livrons et déchargeons vos cargaisons sous la supervision de gréeurs professionnels.'
  }
};

const FRENCH_MANPOWER: Record<string, { title: string; desc: string }> = {
  'Heavy Vehicle Operators': {
    title: 'Opérateurs de Véhicules Lourds',
    desc: 'Chauffeurs de classe E certifiés et vérifiés avec une expérience spécialisée multi-essieux et plateau bas sur terrain montagneux.'
  },
  'Mining Hauler Drivers': {
    title: 'Chauffeurs de Tombereaux Miniers',
    desc: 'Opérateurs de tombereaux et de camions articulés CAT pré-sélectionnés et certifiés pour les manœuvres en mine à ciel ouvert.'
  },
  'Site HSE Safety Officers': {
    title: 'Agents de Sécurité HSE sur Site',
    desc: 'Professionnels de la sécurité certifiés formés pour animer les causeries de sécurité, gérer les registres de risques et auditer les incidents.'
  },
  'Logistics Warehouse Clerks': {
    title: 'Auxiliaires de Magasin Logistique',
    desc: 'Personnel technique d\'entrepôt expert des portails WMS numériques, de la gestion des conteneurs et des opérations de préparation.'
  },
  'Fleet Maintenance Engineers': {
    title: 'Ingénieurs de Maintenance de Flotte',
    desc: 'Ingénieurs mécaniciens et électriciens experts en maintenance préventive des transporteurs lourds, grues et véhicules logistiques.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'fr') return saved as Language;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const translateService = (service: ServiceItem): ServiceItem => {
    if (language === 'en') return service;
    const frData = FRENCH_SERVICES[service.id];
    if (!frData) return service;
    return {
      ...service,
      title: frData.title || service.title,
      category: frData.category || service.category,
      shortDesc: frData.shortDesc || service.shortDesc,
      detailedDesc: frData.detailedDesc || service.detailedDesc,
      bullets: frData.bullets || service.bullets,
    };
  };

  const translateFeature = (feature: FeatureItem): FeatureItem => {
    if (language === 'en') return feature;
    const frData = FRENCH_FEATURES[feature.id];
    if (!frData) return feature;
    return {
      ...feature,
      title: frData.title || feature.title,
      desc: frData.desc || feature.desc,
      bullets: frData.bullets || feature.bullets,
    };
  };

  const translateWorkflow = (step: WorkflowStep): WorkflowStep => {
    if (language === 'en') return step;
    const frData = FRENCH_WORKFLOW[step.stepNumber];
    if (!frData) return step;
    return {
      ...step,
      title: frData.title || step.title,
      desc: frData.desc || step.desc,
    };
  };

  const translateJob = (job: JobOpening): JobOpening => {
    if (language === 'en') return job;
    // Simple general translation for department & labels for French
    const transDept = job.department === 'Haulage & Dispatch' ? 'Transport & Répartition' :
                     job.department === 'Health, Safety & Environment' ? 'Santé, Sécurité & Environnement' :
                     'Division Fret Lourd';
    
    const transLoc = job.location.includes('Freetown') ? 'Freetown (Wilkinson Road)' :
                     job.location.includes('Lunsar') ? 'Opérations Site Lunsar' :
                     'Port Loko & Itinéraires Intérieurs';

    return {
      ...job,
      department: transDept,
      location: transLoc,
      // Provide generic translated details based on active job to keep types strictly happy
      title: job.id === 'logistics-coord' ? 'Coordinateur des Opérations Logistiques' :
             job.id === 'hse-mining' ? 'Responsable de la Conformité HSE (Opérations Minières)' :
             'Opérateur de Transport Lourd Senior',
      summary: job.id === 'logistics-coord' ? 'Coordonner la répartition quotidienne, gérer les alertes d\'itinéraires et superviser le suivi par satellite.' :
               job.id === 'hse-mining' ? 'Superviser la sécurité quotidienne de notre division de transport routier minier et de navettes.' :
               'Conduire des remorques surbaissées spéciales transportant des machines d\'extraction lourdes.',
    };
  };

  const translateNews = (article: NewsArticle): NewsArticle => {
    if (language === 'en') return article;
    return {
      ...article,
      title: article.id === 'news-lunsar-contract' ? 'Gateway Logistics décroche un contrat minier majeur à Lunsar' :
             article.id === 'news-safety-first' ? 'L\'avenir de la logistique minière : des opérations ultra-sécurisées' :
             article.id === 'news-fleet-expansion' ? 'Gateway agrandit sa flotte avec de nouveaux camions Volvo FH16' :
             'Jalon Zéro Accident : Gateway franchit le cap des 500 000 heures sans sinistre',
      category: article.category === 'Project Spotlights' ? 'Project Spotlights' :
                article.category === 'Safety & Operations' ? 'Safety & Operations' :
                article.category === 'Company News' ? 'Company News' : 'Safety & Operations',
      excerpt: article.id === 'news-lunsar-contract' ? 'Gateway Logistics a officiellement signé une prolongation de contrat de trois ans pour la logistique de Lunsar.' :
               article.id === 'news-safety-first' ? 'Découvrez comment Gateway redéfinit le transport routier grâce aux outils de suivi de fatigue en temps réel.' :
               article.id === 'news-fleet-expansion' ? 'Nous avons pris livraison de dix nouveaux camions Volvo FH16 pour renforcer nos capacités de levage.' :
               'Gateway Logistics a franchi le jalon important de 500 000 heures consécutives sans aucun accident sur ses chantiers.',
      content: article.id === 'news-lunsar-contract'
        ? 'Nous sommes fiers d\'annoncer que Gateway Logistics & Services (SL) Ltd a obtenu une prolongation de contrat majeure de trois ans pour fournir des services logistiques de site complets, le transport de personnel et le transport de réactifs critiques pour les opérations de minerai de fer de premier plan dans la région de Lunsar.\n\nDans le cadre de cet accord, Gateway déploiera une flotte dédiée de 25 transporteurs de personnel et poids lourds, ainsi qu\'une équipe de 50 chauffeurs de véhicules lourds qualifiés, des répartiteurs et des coordinateurs de sécurité HSE.'
        : article.id === 'news-safety-first'
        ? 'Les opérations de transport lourd en Sierra Leone présentent des défis uniques, qu\'il s\'agisse de routes emportées par la mousson ou de pistes poussiéreuses d\'accès aux mines. Réussir dans ces environnements exige une approche de sécurité rigoureuse.\n\nDans cet article, notre responsable HSE décrit les trois piliers de l\'architecture de sécurité de Gateway :\n\n1. Capteurs biométriques de fatigue en cabine.\n2. Académie de conduite défensive obligatoire de 4 semaines.\n3. Alcooltests quotidiens et inspections pré-départ des véhicules.'
        : article.id === 'news-fleet-expansion'
        ? 'Pour répondre à la demande croissante de fret de projets miniers et d\'exportations, Gateway Logistics a pris livraison de dix camions Volvo FH16 neufs équipés de kits tout-terrain et d\'une sécurité de cabine améliorée.\n\nCes véhicules sont spécialement optimisés pour tirer des charges lourdes et des citernes de carburant. Avec une efficacité de carburant Euro 5, ils réduisent notre empreinte carbone.'
        : 'Gateway Logistics a atteint un jalon incroyable : 500 000 heures de travail consécutives avec zéro accident avec arrêt de travail (LTI) sur toutes ses opérations en Sierra Leone.\n\nNous dédions ce jalon à nos chauffeurs de première ligne et à nos techniciens au sol. Leur engagement quotidien envers la sécurité routière est ce qui maintient Gateway au sommet de la logistique industrielle.',
    };
  };

  const translateFAQ = (faq: FAQItem): FAQItem => {
    if (language === 'en') return faq;
    // Map of questions to answers in French
    if (faq.question.includes('regions')) {
      return {
        question: 'Dans quelles régions de Sierra Leone Gateway Logistics opère-t-elle ?',
        answer: 'Gateway est entièrement agréée et opérationnelle dans toute la Sierra Leone. Bien que notre siège social et notre courtage en douane principal soient basés à Freetown et à l\'aéroport de Lungi, nous maintenons des équipes permanentes à Lunsar, Koidu et Tonkolili.'
      };
    }
    if (faq.question.includes('safety')) {
      return {
        question: 'Comment assurez-vous la sécurité sur les itinéraires miniers difficiles ?',
        answer: 'La sécurité est notre priorité absolue. Nous employons des ingénieurs sécurité à plein temps qui étudient les itinéraires et les ponts. De plus, notre flotte dispose de GPS, de caméras anti-distraction en cabine et de limiteurs de vitesse.'
      };
    }
    return faq;
  };

  const translateWorkflowStep = (step: WorkflowStep): WorkflowStep => {
    return translateWorkflow(step);
  };

  const translateManpowerRole = (role: { title: string; desc: string; icon: string }) => {
    if (language === 'en') return role;
    const frData = FRENCH_MANPOWER[role.title];
    if (!frData) return role;
    return {
      ...role,
      title: frData.title,
      desc: frData.desc
    };
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      translateService,
      translateFeature,
      translateWorkflow,
      translateWorkflowStep,
      translateManpowerRole,
      translateJob,
      translateNews,
      translateFAQ
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
