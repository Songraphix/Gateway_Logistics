import { ServiceItem, FeatureItem, WorkflowStep, JobOpening, NewsArticle, FAQItem, TestimonialItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'ocean-freight',
    title: 'Ocean Freight Services',
    category: 'Sea',
    iconName: 'Ship',
    shortDesc: 'End-to-end maritime logistics connecting Sierra Leone with major global trade corridors.',
    detailedDesc: 'As a primary gateway operator, we manage comprehensive maritime shipping operations. From full container loads (FCL) to less-than-container loads (LCL), our ocean freight logistics ensure efficient port-to-port and port-to-door transit under stringent safety protocols.',
    bullets: [
      'FCL (Full Container Load) and LCL (Less than Container Load) solutions',
      'Port agency representation and vessel husbanding at Freetown Port',
      'Specialized handling for dangerous goods, mineral exports, and bulk shipping',
      'Consolidation, cross-docking, and container de-stuffing services'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'air-freight',
    title: 'Air Freight Cargo',
    category: 'Air',
    iconName: 'Plane',
    shortDesc: 'Time-critical air shipping with streamlined customs processing at Lungi International Airport.',
    detailedDesc: 'For urgent spare parts, medical supplies, or high-value payloads, our air cargo solutions offer the fastest transit. We provide scheduled consolidations and charter flights, backed by pre-clearance capabilities to minimize dock idle times.',
    bullets: [
      'Express priority shipping and global charter operations',
      'Cold chain handling for temperature-sensitive medical and lab supplies',
      'On-site customs coordination at Lungi Airport (FNA)',
      'Secure transit for gold, precious minerals, and diplomatic cargo'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'land-express',
    title: 'Land Express & Haulage',
    category: 'Ground',
    iconName: 'Truck',
    shortDesc: 'Robust cross-country heavy hauling, secondary distribution, and fleet dispatch.',
    detailedDesc: 'Our heavy-duty fleet is engineered to navigate Sierra Leone’s diverse terrain, connecting coastal hubs to inland mine locations (Lunsar, Koidu, Tonkolili). With GPS tracking, geo-fencing, and driver fatigue monitoring, your freight is always secure.',
    bullets: [
      'Super-heavy haulage, low-bed transport, and project oversized cargo',
      'Route surveys, bridges inspections, and utility coordination',
      'Primary, secondary, and last-mile distribution networks',
      'Dedicated driver fatigue tracking and real-time GPS fleet monitoring'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'customs-clearance',
    title: 'Customs Clearance & Brokerage',
    category: 'Regulatory',
    iconName: 'FileText',
    shortDesc: 'Regulatory brokerage and fast-track processing for flawless customs compliance.',
    detailedDesc: 'Navigating custom regimes requires precise documentation. Our dedicated customs brokers ensure absolute compliance, managing import duties, tariff classifications, and temporary import permits to avoid costly demurrage fees.',
    bullets: [
      'Pre-shipment inspection advisory and customs tariff classification',
      'SGS, single-window, andASYCUDA portal processing',
      'Duty exemption processing for mining and aid organisations',
      'Bonded transit documentation and custom warehousing clearance'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'warehousing',
    title: 'Warehousing & Logistics Hubs',
    category: 'Storage',
    iconName: 'Database',
    shortDesc: 'Secure, modern warehouse solutions with inventory tracking and storage space.',
    detailedDesc: 'We operate highly secure warehouses situated at strategic logistics junctions. From laydown yards for heavy mining spares to dry storage for camp supplies, our facilities feature strict inventory controls and 24/7 guard details.',
    bullets: [
      'Bonded, non-bonded, and open-yard laydown storage solutions',
      'Real-time Warehouse Management System (WMS) with digital portals',
      'High-security CCTV, access controls, and armed rapid response',
      'Kitting, consolidation, packing, and containerized storage'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'project-cargo',
    title: 'Project Cargo & Heavy Lift',
    category: 'Specialized',
    iconName: 'ShieldCheck',
    shortDesc: 'Complex logistics engineering for industrial, mining, and power generation infrastructure.',
    detailedDesc: 'Moving heavy machinery or setting up industrial facilities requires dedicated engineering. Our project cargo team coordinates massive mobilizations, combining route engineering with specialist crane and rigging crews.',
    bullets: [
      'Multi-modal freight planning and project management teams',
      'Crane, rigging, and heavy lift engineering on-site',
      'Industrial plant relocation and complete mine mobilization',
      'Comprehensive risk assessments and custom transit insurance plans'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800'
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'precision',
    title: 'Precision in Delivery',
    desc: 'Our commitment to precision ensures that your cargo arrives safely and exactly on time, every time, even over challenging terrains.',
    iconName: 'Clock',
    bullets: ['99.4% On-Time Delivery Record', 'Real-Time Telematics & Tracking', 'Strict Route Management Plan']
  },
  {
    id: 'tailored',
    title: 'Tailored Mining Solutions',
    desc: 'We offer specialized logistics and manpower designed around the highly complex lifecycle of heavy-industry mining projects.',
    iconName: 'Cpu',
    bullets: ['End-to-End Mine Mobilization', 'Dangerous Goods Handlers', 'On-Site Supply-Chain Integration']
  },
  {
    id: 'safety',
    title: 'HSE Uncompromising Safety',
    desc: 'We operate under a zero-harm philosophy. Our strict safety protocols, defensive driving certifications, and regular audits set the market standard.',
    iconName: 'Shield',
    bullets: ['ISO-Aligned HSE Frameworks', 'Regular Alcohol & Drug Audits', 'Defensive Driver Certifications']
  },
  {
    id: 'people',
    title: 'Qualified Local Talent',
    desc: 'Our human resource pipeline matches the strict criteria of multinational corporations, featuring pre-screened heavy drivers and technicians.',
    iconName: 'Users',
    bullets: ['100% Background-Vetted Drivers', 'HSE Certifications Mandatory', 'Robust Contractor Care Teams']
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Scope & Engineering Planning',
    desc: 'We conduct full route surveys, heavy machinery requirements analyses, and custom risk logs to map out the logistical chain.'
  },
  {
    stepNumber: '02',
    title: 'Agile Mobilization & Dispatch',
    desc: 'Resources, specialized drivers, custom rigs, and clearance protocols are activated simultaneously through our centralized operations hub.'
  },
  {
    stepNumber: '03',
    title: 'Secure Monitoring & Delivery',
    desc: 'Using satellite fleet tracking and daily HSE toolbox briefs, we deliver and unload your freight under professional rigging supervision.'
  }
];

export const MINING_SOLUTIONS: FeatureItem[] = [
  {
    id: 'site-logistics',
    title: 'Site Logistics Support',
    desc: 'Managing inner-site cargo, machinery movements, laydown yard organization, and dynamic stockpiling logistics directly integrated with mine planners.',
    iconName: 'MapPin'
  },
  {
    id: 'staff-transport',
    title: 'Staff Transport & Shuttles',
    desc: 'Operating safe, modern crew carriers and 4x4 passenger fleets to transfer mining personnel between coastal stations, airports, and remote camps.',
    iconName: 'Bus'
  },
  {
    id: 'fuel-supply',
    title: 'Fuel & Supply Delivery',
    desc: 'Bulk hauling of specialized mining reagents, lubricants, explosives precursors, and diesel fuel using specialized tankers under hazardous cargo protocols.',
    iconName: 'Flame'
  },
  {
    id: 'equipment-support',
    title: 'Heavy Equipment Support',
    desc: 'Transporting critical parts, engines, excavator buckets, and massive drilling parts on specialized multi-axle trailers with lead vehicles.',
    iconName: 'Wrench'
  },
  {
    id: 'camp-facility',
    title: 'Camp & Facility Management',
    desc: 'Handling supply-chains for remote mining camps, covering catering provisions, dry storage distribution, waste management runs, and site security logistics.',
    iconName: 'Home'
  }
];

export const MANPOWER_ROLES = [
  { title: 'Heavy Vehicle Operators', desc: 'Vetted, certified Class-E drivers with specialized multi-axle and low-bed experience on mountainous terrain.', icon: 'Truck' },
  { title: 'Mining Hauler Drivers', desc: 'Pre-screened dump truck and CAT articulated hauler operators certified for deep pit mining maneuvers.', icon: 'Navigation' },
  { title: 'Site HSE Safety Officers', desc: 'Certified safety professionals trained to conduct site toolbox talks, risk registers, and incident audits.', icon: 'ShieldAlert' },
  { title: 'Logistics Warehouse Clerks', desc: 'Technical warehouse personnel expert in digital WMS portals, container handling, and kitting operations.', icon: 'Package' },
  { title: 'Fleet Maintenance Engineers', desc: 'Mechanical and electrical engineers expert in preventive maintenance of heavy haulers, cranes, and logistics vehicles.', icon: 'Hammer' }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'logistics-coord',
    title: 'Logistics Operations Coordinator',
    department: 'Haulage & Dispatch',
    location: 'Freetown (Wilkinson Road)',
    type: 'Full-time',
    summary: 'Coordinate daily haulage dispatch, manage route alerts, liaise with port customs agents, and oversee real-time satellite fleet tracking systems.',
    requirements: [
      'Bachelor’s degree in Supply Chain, Business, or engineering field',
      'Minimum of 3 years of hands-on experience in fleet management or port operations',
      'High proficiency in utilizing GPS tracking platforms and digital ERP systems',
      'Excellent verbal and written communication skills in Krio and English'
    ],
    benefits: [
      'Highly competitive salary with performance bonuses',
      'Full private health coverage including spouse and children',
      'Continuous professional development and certified global logistics courses'
    ]
  },
  {
    id: 'hse-mining',
    title: 'HSE Compliance Officer (Mining Operations)',
    department: 'Health, Safety & Environment',
    location: 'Lunsar Site Operations',
    type: 'Full-time',
    summary: 'Oversee daily on-site safety operations for our mining haulage and staff shuttle division, ensuring strict alignment with ISO safety standards.',
    requirements: [
      'NEBOSH Certificate or equivalent formal safety qualification',
      'At least 4 years of experience as an HSE specialist on active mining sites',
      'Proven expertise conducting risk assessments, root-cause analyses, and safety audits',
      'Valid driving license with off-road and defensive driving training'
    ],
    benefits: [
      'On-site accommodation, full dining benefits, and field allowances',
      'International training on industrial risk management schemes',
      'Generous rotation schedule with paid travel return'
    ]
  },
  {
    id: 'heavy-haulage',
    title: 'Senior Heavy Haulage Operator',
    department: 'Heavy Freight Division',
    location: 'Port Loko & Inland Routes',
    type: 'Contract',
    summary: 'Operate specialized multi-axle heavy trailers, carrying mining plant machinery, cranes, and oversized industrial cargoes across challenging Sierra Leone routes.',
    requirements: [
      'Valid Class-E Sierra Leone driving license with impeccable safety record',
      'Over 7 years of specialized heavy-duty transport and low-bed haulage experience',
      'Ability to perform basic roadside safety checks and secure cargo loads using chains/tensioners',
      'Familiarity with mining site site induction rules and safety codes'
    ],
    benefits: [
      'Market-leading daily contract rates with trip allowances',
      'Full safety gear, insurance, and medical coverage on duty',
      'Opportunity for conversion to permanent long-term operations team'
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-lunsar-contract',
    title: 'Gateway Logistics Secures Landmark Mining Support Contract in Lunsar',
    category: 'Project Spotlights',
    excerpt: 'Gateway Logistics has officially signed a three-year contract extension to supply exclusive site transport, heavy hauling, and fuel logistics support for major iron-ore mine sites.',
    content: 'We are proud to announce that Gateway Logistics & Services (SL) Ltd has been awarded a massive three-year contract expansion to provide comprehensive site logistics, personnel shuttle transport, and critical reagent hauling services for tier-one iron ore operations in the Lunsar region.\n\nUnder this agreement, Gateway will deploy a dedicated fleet of 25 custom-specified crew carriers and heavy low-bed transporters, alongside a fully vetted crew of 50 heavy vehicle operators, dispatchers, and site HSE coordinators.\n\n"This extension is a testament to our team’s dedication to uncompromising safety and operational excellence," stated the Director. "We have proven our ability to operate with zero harm under challenging seasonal conditions, and we are excited to expand our footprint in Lunsar to drive sustainable industrial growth."',
    date: 'June 18, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'news-safety-first',
    title: 'The Future of Mining Logistics: Safety First Operations in Challenging Terrain',
    category: 'Safety & Operations',
    excerpt: 'An in-depth look at how Gateway is redefining heavy distribution through defensive driver certifications and real-time biometric driver fatigue monitoring.',
    content: 'Heavy haulage operations across Sierra Leone present unique challenges, from monsoon-related road washouts to steep mountainous terrains and heavy dust on mining access roads. Operating successfully in these environments demands a robust, scientific approach to safety management.\n\nIn this article, our HSE Compliance Lead outlines the three core pillars of Gateway’s safety architecture:\n\n1. Biometric Fatigue Trackers: Real-time cabin sensors that alert operators and dispatchers of early signs of micro-sleep or distraction.\n2. Specialized Defensive Driving Academy: Every Gateway driver undergoes a mandatory 4-week dry-season and wet-season defensive driving simulation course.\n3. Zero-Harm Compliance Audits: Daily sobriety checks and dynamic vehicle pre-start inspections.\n\nOur goal is simple: ensuring that every drop of cargo and every worker arrives safely, keeping mining operations running at peak efficiency.',
    date: 'May 24, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'news-fleet-expansion',
    title: 'Gateway Expands Fleet with New State-of-the-Art Volvo Heavy Haulers',
    category: 'Company News',
    excerpt: 'We have taken delivery of ten new heavy-duty Volvo FH16 trucks, reinforcing our heavy lifting capacities and last-mile mining support across the region.',
    content: 'To keep pace with the surging demand for mining project cargo and heavy mineral exports, Gateway Logistics has taken delivery of ten brand-new Volvo FH16 heavy haulers, equipped with custom off-road packages and enhanced cabin safety features.\n\nThese vehicles are specifically optimized for pulling ultra-heavy loads, low-bed platforms, and specialized fuel tankers. With advanced Euro 5 fuel efficiency and automated dual-clutch crawler gears, the new trucks significantly reduce carbon footprint while tackling steep grades with total stability.\n\n"Expanding our fleet represents our active commitment to modern infrastructure," stated our Fleet Director. "We don’t just offer services; we invest in the premium gear required to execute high-capacity projects without fail."',
    date: 'April 10, 2026',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516576885502-b2717a65f7c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'news-hse-milestone',
    title: 'Zero Harm Milestones: Gateway Logistics Achieves 500,000 LTI-Free Hours',
    category: 'Safety & Operations',
    excerpt: 'Gateway Logistics has officially reached a major safety milestone of half a million consecutive hours without any Lost Time Injury (LTI) in active mining projects.',
    content: 'Gateway Logistics has reached an incredible milestone: 500,000 consecutive worker hours with zero Lost Time Injuries (LTI) across all mining logistics and manpower operations in Sierra Leone.\n\nIn heavy logistics, an LTI-free record of this magnitude is extremely rare and represents thousands of successfully dispatched trucks, millions of kilometers driven on unpaved site roads, and highly synchronized teamwork between our field crew and safety marshals.\n\n"We dedicate this milestone to our frontline drivers and ground technicians," remarked our Director. "Their commitment to safety rules, pre-start checks, and speed limits is what keeps Gateway at the top of the industrial logistics sector in West Africa. We look forward to hitting the 1,000,000 mark next."',
    date: 'March 05, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=800'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What regions in Sierra Leone does Gateway Logistics operate in?',
    answer: 'Gateway is fully licensed and operational across the entirety of Sierra Leone. While our headquarters and primary customs brokerage are based in Freetown (Wilkinson Road) and Lungi Airport, we maintain permanent on-site dispatch teams, warehouses, and fleet services in key industrial hubs such as Lunsar, Koidu, and Tonkolili.'
  },
  {
    question: 'How do you ensure safety on challenging, unpaved mining routes?',
    answer: 'Safety is our absolute priority. We employ full-time route safety engineers who conduct detailed mapping, bridge load audits, and weather hazard logs. Additionally, our entire fleet is fitted with dynamic GPS tracking, real-time in-cab distraction warning cameras, and strict speed-limiter devices. Every driver undergoes a mandatory defensive driving certification aligned with ISO and mining corporation requirements.'
  },
  {
    question: 'Can you provide heavy equipment transport for oversized cargo?',
    answer: 'Yes. Our specialized Heavy Lift division operates modern low-bed trailers, multi-axle platforms, and high-capacity hydraulic trailers. We handle the entire engineering scope, including custom routing plans, structural bridge assessments, utility power line clearances, and armed government escort escorts for oversized payloads.'
  },
  {
    question: 'Are Gateway’s drivers and technicians background-vetted?',
    answer: 'Absolutely. We hold a strict pre-screening protocol for all driver and technical manpower supply. This includes certified health fitness audits, Class-E license validation, criminal background clearances, drug and alcohol screening, and rigorous driving assessments. We only supply personnel that meet the high-security requirements of multinational corporations.'
  },
  {
    question: 'How can we request a custom quote or initiate service contracts?',
    answer: 'You can submit a quote request directly using the "Request a Quote" forms on our website, specifying your cargo, destination, and service requirements. Alternatively, you can email our business development team at director@gateway-sl.com, call +232 73 959 933, or click our floating WhatsApp chat button to speak directly with an operations supervisor.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    author: 'Amara Kamara',
    role: 'Logistics Manager',
    company: 'Marampa Mines',
    text: 'Gateway Logistics has completely transformed our supply chain reliability. Their specialized defensive-trained drivers and real-time fleet GPS tracking gave us absolute peace of mind during the intense rainy season.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-2',
    author: 'Jonathan Cole',
    role: 'Operations Director',
    company: 'Sierra Minerals Ltd',
    text: 'Excellent service! They managed the entire customs clearance at Lungi and heavy machinery mobilization to site within record time, completely eliminating costly demurrage charges.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't-3',
    author: 'Fatmata Bangura',
    role: 'HR Business Partner',
    company: 'West Africa Energy Co.',
    text: 'The qualified heavy-duty operators and mechanics provided by Gateway’s manpower division met the highest safety certifications. Responsive, professional, and compliant with all HSE protocols.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  }
];

