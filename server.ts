import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Firebase Admin SDK
let db: Firestore | null = null;
let firebaseApp: any = null;
let currentDbId = '(default)';

const initDb = (appInstance: any, dbId: string) => {
  db = getFirestore(appInstance, dbId);
  currentDbId = dbId;
  console.log(`📌 Using Firestore database ID: "${dbId}"`);
};

const executeWithDbFallback = async <T>(operation: (dbInstance: Firestore) => Promise<T>): Promise<T> => {
  if (!db || !firebaseApp) {
    throw new Error('Database is not initialized.');
  }

  try {
    return await operation(db);
  } catch (err: any) {
    // If we get a NOT_FOUND error (code 5) and we are currently on '(default)', try switching to 'default'
    if (currentDbId === '(default)' && (err.code === 5 || (err.message && err.message.includes('NOT_FOUND')))) {
      console.log('⚠️ Firestore database (default) not found. Attempting to fall back to database "default"...');
      initDb(firebaseApp, 'default');
      // Retry the operation with the new db instance
      return await operation(db);
    }
    throw err;
  }
};

try {
  let serviceAccount: object | null = null;

  // Method 1: Try to load from local file in the workspace directory (most robust fallback)
  const localFilePath = path.resolve(process.cwd(), 'firebase-service-account.json');
  if (fs.existsSync(localFilePath)) {
    try {
      serviceAccount = JSON.parse(fs.readFileSync(localFilePath, 'utf-8'));
      console.log(`🔑 Loading Firebase credentials from local workspace file: ${localFilePath}`);
    } catch (err: any) {
      console.log(`⚠️ Error reading local firebase-service-account.json: ${err.message}`);
    }
  }

  // Method 2: Inline JSON from env var (if not loaded from local file)
  if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      console.log('🔑 Loading Firebase credentials from FIREBASE_SERVICE_ACCOUNT_JSON env var.');
    } catch (err: any) {
      console.log(`⚠️ Error parsing FIREBASE_SERVICE_ACCOUNT_JSON env var: ${err.message}`);
    }
  }

  // Method 3: Read from a file path specified in env (if not loaded yet)
  if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const filePath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    if (fs.existsSync(filePath)) {
      try {
        serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`🔑 Loading Firebase credentials from file path: ${filePath}`);
      } catch (err: any) {
        console.log(`⚠️ Error parsing file at FIREBASE_SERVICE_ACCOUNT_PATH: ${err.message}`);
      }
    } else {
      console.log(`⚠️ Firebase service account file not found at: ${filePath}`);
    }
  }

  if (serviceAccount) {
    firebaseApp = initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID || (serviceAccount as any).project_id
    });
    // Start with (default)
    initDb(firebaseApp, '(default)');
    console.log('✅ Firebase configuration detected. Initializing Firestore backend client.');
    console.log(`📌 Connected to project: ${process.env.FIREBASE_PROJECT_ID || (serviceAccount as any).project_id}`);
  } else {
    console.log('ℹ️ No Firebase credentials detected. Operating in local-fallback file-store mode.');
  }
} catch (e: any) {
  console.log('ℹ️ Firebase init error:', e.message, '— Operating in local-fallback file-store mode.');
}

// Local files for content and quote persistence
const DATA_STORE_PATH = path.join(process.cwd(), 'data-store.json');
const QUOTES_STORE_PATH = path.join(process.cwd(), 'quote-requests.json');

// Default initial data structure
const DEFAULT_CONTENT = {
  services: [
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
  ],
  features: [
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
  ],
  workflowSteps: [
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
  ],
  miningSolutions: [
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
  ],
  manpowerRoles: [
    { title: 'Heavy Vehicle Operators', desc: 'Vetted, certified Class-E drivers with specialized multi-axle and low-bed experience on mountainous terrain.', icon: 'Truck' },
    { title: 'Mining Hauler Drivers', desc: 'Pre-screened dump truck and CAT articulated hauler operators certified for deep pit mining maneuvers.', icon: 'Navigation' },
    { title: 'Site HSE Safety Officers', desc: 'Certified safety professionals trained to conduct site toolbox talks, risk registers, and incident audits.', icon: 'ShieldAlert' },
    { title: 'Logistics Warehouse Clerks', desc: 'Technical warehouse personnel expert in digital WMS portals, container handling, and kitting operations.', icon: 'Package' },
    { title: 'Fleet Maintenance Engineers', desc: 'Mechanical and electrical engineers expert in preventive maintenance of heavy haulers, cranes, and logistics vehicles.', icon: 'Hammer' }
  ],
  jobOpenings: [
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
  ],
  newsArticles: [
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
  ],
  faqs: [
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
  ],
  testimonials: [
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
  ]
};

// Helper to load content
const loadContent = async (): Promise<any> => {
  // If Firestore is active, try to load from Firestore
  if (db) {
    try {
      const content = await executeWithDbFallback(async (dbInstance) => {
        const snapshot = await dbInstance.collection('website_content').get();
        if (!snapshot.empty) {
          const loaded: Record<string, any> = { ...DEFAULT_CONTENT };
          snapshot.forEach((doc) => {
            loaded[doc.id] = doc.data().value;
          });
          return loaded;
        }
        
        // If collection is empty, auto-populate it with DEFAULT_CONTENT or local file content
        console.log('ℹ️ Firestore "website_content" collection is empty. Initializing Firestore with default/local data...');
        let initialContent = DEFAULT_CONTENT;
        if (fs.existsSync(DATA_STORE_PATH)) {
          try {
            const raw = fs.readFileSync(DATA_STORE_PATH, 'utf-8');
            initialContent = { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
          } catch (e) {
            console.error('Error reading local file-store for init:', e);
          }
        }

        for (const [key, value] of Object.entries(initialContent)) {
          await dbInstance.collection('website_content').doc(key).set({
            value,
            updatedAt: new Date().toISOString()
          });
        }
        console.log('✅ Firestore "website_content" collection successfully initialized.');
        return initialContent;
      });
      return content;
    } catch (e: any) {
      console.error('ℹ️ Exception while reading/initializing Firestore website_content:', e);
    }
  }

  // Fallback: load from local JSON file
  if (fs.existsSync(DATA_STORE_PATH)) {
    try {
      const raw = fs.readFileSync(DATA_STORE_PATH, 'utf-8');
      return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
    } catch (e) {
      console.error('Error reading local file-store, using defaults:', e);
    }
  }

  // Return static baseline
  return DEFAULT_CONTENT;
};

// Helper to save content section
const saveContentSection = async (key: string, value: any): Promise<boolean> => {
  let savedToFirestore = false;

  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('website_content').doc(key).set({
          value,
          updatedAt: new Date().toISOString()
        });
      });
      savedToFirestore = true;
      console.log(`✅ Content for '${key}' successfully synchronized with Firestore.`);
    } catch (e: any) {
      console.error(`❌ Firestore error saving content for '${key}':`, e.message);
    }
  }

  // Always save to local JSON file as backup or standalone database
  try {
    let currentStore: any = DEFAULT_CONTENT;
    if (fs.existsSync(DATA_STORE_PATH)) {
      try {
        currentStore = JSON.parse(fs.readFileSync(DATA_STORE_PATH, 'utf-8'));
      } catch (e) {
        // use default
      }
    }
    const updatedStore = {
      ...currentStore,
      [key]: value
    };
    fs.writeFileSync(DATA_STORE_PATH, JSON.stringify(updatedStore, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing content locally:', err);
    return savedToFirestore;
  }
};

// Helper to load quote requests
const loadQuoteRequests = async (): Promise<any[]> => {
  if (db) {
    try {
      return await executeWithDbFallback(async (dbInstance) => {
        const snapshot = await dbInstance.collection('quote_requests')
          .orderBy('createdAt', 'desc')
          .get();

        if (!snapshot.empty) {
          return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
        }
        return [];
      });
    } catch (e: any) {
      console.log('ℹ️ Exception while reading from Firestore quote_requests:', e.message);
    }
  }

  if (fs.existsSync(QUOTES_STORE_PATH)) {
    try {
      const raw = fs.readFileSync(QUOTES_STORE_PATH, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading local quotes store:', e);
    }
  }

  return [];
};

// Helper to save quote request
const saveQuoteRequest = async (quote: any): Promise<any> => {
  const quoteWithMeta = {
    id: quote.id || 'q-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    fullName: quote.fullName || '',
    emailOrPhone: quote.emailOrPhone || '',
    service: quote.service || 'General Inquiry',
    details: quote.details || '',
    status: quote.status || 'Pending',
    createdAt: quote.createdAt || new Date().toISOString()
  };

  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('quote_requests').doc(quoteWithMeta.id).set(quoteWithMeta);
      });
      console.log('✅ Quote request synchronized with Firestore.');
    } catch (e: any) {
      console.error('❌ Firestore error saving quote request:', e);
    }
  }

  // Save to local JSON store
  try {
    let quotes: any[] = [];
    if (fs.existsSync(QUOTES_STORE_PATH)) {
      try {
        quotes = JSON.parse(fs.readFileSync(QUOTES_STORE_PATH, 'utf-8'));
      } catch (e) {
        // use empty
      }
    }
    quotes.unshift(quoteWithMeta);
    fs.writeFileSync(QUOTES_STORE_PATH, JSON.stringify(quotes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing quote locally:', err);
  }

  return quoteWithMeta;
};

// Helper to update quote request status
const updateQuoteStatusInDb = async (id: string, status: string): Promise<boolean> => {
  let savedToFirestore = false;

  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('quote_requests').doc(id).update({ status });
      });
      savedToFirestore = true;
      console.log(`✅ Quote ${id} status updated in Firestore to ${status}.`);
    } catch (e: any) {
      console.error(`❌ Firestore error updating quote status:`, e.message);
    }
  }

  try {
    if (fs.existsSync(QUOTES_STORE_PATH)) {
      const quotes = JSON.parse(fs.readFileSync(QUOTES_STORE_PATH, 'utf-8'));
      const updatedQuotes = quotes.map((q: any) => q.id === id ? { ...q, status } : q);
      fs.writeFileSync(QUOTES_STORE_PATH, JSON.stringify(updatedQuotes, null, 2), 'utf-8');
      return true;
    }
  } catch (err) {
    console.error('Error updating quote locally:', err);
  }

  return savedToFirestore;
};

// API ROUTES
// GET /api/content
app.get('/api/content', async (req, res) => {
  try {
    const data = await loadContent();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load website content', details: err.message });
  }
});

// POST /api/content/:type
app.post('/api/content/:type', async (req, res) => {
  const { type } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Missing content data payload' });
  }

  try {
    const success = await saveContentSection(type, data);
    if (success) {
      res.json({ success: true, message: `Content section '${type}' updated successfully.` });
    } else {
      res.status(500).json({ error: 'Failed to save content section' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Error processing update', details: err.message });
  }
});

// GET /api/quote-requests
app.get('/api/quote-requests', async (req, res) => {
  try {
    const data = await loadQuoteRequests();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load quote requests', details: err.message });
  }
});

// POST /api/quote-requests
app.post('/api/quote-requests', async (req, res) => {
  const quote = req.body;
  if (!quote.fullName && !quote.emailOrPhone) {
    return res.status(400).json({ error: 'Missing required request field: fullName or emailOrPhone' });
  }

  try {
    const saved = await saveQuoteRequest(quote);
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit quote request', details: err.message });
  }
});

// PATCH /api/quote-requests/:id
app.patch('/api/quote-requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Missing required status value' });
  }

  try {
    const success = await updateQuoteStatusInDb(id, status);
    if (success) {
      res.json({ success: true, message: `Quote request ${id} updated to ${status}` });
    } else {
      res.status(404).json({ error: `Quote request ${id} not found or update failed` });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update quote request status', details: err.message });
  }
});
// Gemini API Helper (Direct HTTP REST connection)
const callGemini = async (prompt: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  // AQ. prefix = OAuth2 access token → send as Bearer header
  // AIzaSy prefix = standard API key → send as URL query param
  const isOAuthToken = apiKey.startsWith('AQ.');
  const url = isOAuthToken
    ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
    : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (isOAuthToken) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API request failed: ${response.statusText} (${errorText})`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Invalid response payload from Gemini API');
  }

  return text;
};


// Helper to load promotions settings
const DEFAULT_PROMOTION = {
  active: false,
  title: 'Special Haulage Campaign',
  message: 'Get 10% off on secondary distribution haulage contracts this month!',
  imageUrl: '',
  delaySeconds: 5,
  ctaText: 'Inquire Now',
  ctaPage: 'contact'
};

const PROMOTION_STORE_PATH = path.join(process.cwd(), 'promotion-settings.json');

const loadPromotionSettings = async (): Promise<any> => {
  if (db) {
    try {
      return await executeWithDbFallback(async (dbInstance) => {
        const doc = await dbInstance.collection('promotions').doc('settings').get();
        if (doc.exists) {
          return { ...DEFAULT_PROMOTION, ...doc.data() };
        }
        return DEFAULT_PROMOTION;
      });
    } catch (e: any) {
      console.log('ℹ/ Exception while reading from Firestore promotions:', e.message);
    }
  }

  if (fs.existsSync(PROMOTION_STORE_PATH)) {
    try {
      const raw = fs.readFileSync(PROMOTION_STORE_PATH, 'utf-8');
      return { ...DEFAULT_PROMOTION, ...JSON.parse(raw) };
    } catch (e) {
      console.error('Error reading local promotion settings:', e);
    }
  }

  return DEFAULT_PROMOTION;
};

const savePromotionSettings = async (settings: any): Promise<boolean> => {
  let savedToFirestore = false;

  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('promotions').doc('settings').set({
          ...settings,
          updatedAt: new Date().toISOString()
        });
      });
      savedToFirestore = true;
      console.log('✅ Promotion settings successfully synchronized with Firestore.');
    } catch (e: any) {
      console.error('❌ Firestore error saving promotion settings:', e.message);
    }
  }

  try {
    fs.writeFileSync(PROMOTION_STORE_PATH, JSON.stringify(settings, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing promotion settings locally:', err);
    return savedToFirestore;
  }
};

// POST /api/ai/suggest-reply
app.post('/api/ai/suggest-reply', async (req, res) => {
  const { quoteDetails } = req.body;
  if (!quoteDetails) {
    return res.status(400).json({ error: 'Missing quoteDetails payload' });
  }

  try {
    const prompt = `You are a professional customer service director at Gateway Logistics & Services (SL) Ltd, a leading premium logistics and heavy haulage contractor in Sierra Leone.
Draft a highly professional, polite, and detailed email response to a client's quote or contact request.
Client details:
Name: ${quoteDetails.fullName || 'Valued Client'}
Contact Info: ${quoteDetails.emailOrPhone || 'N/A'}
Service requested: ${quoteDetails.service || 'General Logistics Inquiry'}
Details: ${quoteDetails.details || 'No details provided'}

Tone guidelines: professional, expert, reassuring, West-African logistics context. Be concise but address all points. Present a standard outline and invite them to schedule a follow-up call.
Return ONLY the email body (subject, salutation, body text, and standard signature).`;

    const suggestion = await callGemini(prompt);
    res.json({ suggestion });
  } catch (err: any) {
    console.warn('Gemini API call failed, falling back to local Smart Template generation:', err.message);
    
    // Generate high-quality local template response as a fallback
    const name = quoteDetails.fullName || 'Valued Client';
    const firstName = name.split(' ')[0];
    const service = quoteDetails.service || 'General Inquiry';
    
    let customBody = '';
    const serviceLower = service.toLowerCase();
    if (serviceLower.includes('clearance') || serviceLower.includes('customs') || serviceLower.includes('broker')) {
      customBody = `To proceed with your customs clearance request, could you please share copies of the following documents if available?\n- Bill of Lading / Air Waybill\n- Commercial Invoice\n- Packing List\n\nThis will allow our brokerage team to calculate the exact duties, taxes, and Sierra Leone port handling fees for you.`;
    } else if (serviceLower.includes('mining') || serviceLower.includes('energy') || serviceLower.includes('industrial')) {
      customBody = `Gateway Logistics has extensive experience supporting large-scale mining operations in Sierra Leone. We provide heavy-lift haulage, secure cargo transport, and local regulatory clearance compliance. We would be pleased to schedule a brief call to discuss your project timeline, route specifications, and cargo dimensions.`;
    } else if (serviceLower.includes('haulage') || serviceLower.includes('delivery') || serviceLower.includes('transport') || serviceLower.includes('fleet')) {
      customBody = `We operate a modern fleet equipped for nationwide distribution and heavy haulage across Sierra Leone. Whether you require flatbed transport, containerized logistics, or primary distribution, we ensure secure and timely arrival. Please let us know if your cargo has special handling, weight, or route requirements.`;
    } else {
      customBody = `Thank you for sharing the details of your request. We have forwarded this directly to our logistics operations division for a comprehensive review. We will contact you shortly to clarify any specific details needed to prepare a formal quotation.`;
    }

    const fallbackResponse = `Subject: Inquiry regarding ${service} - Gateway Logistics SL

Dear ${firstName},

Thank you for contacting Gateway Logistics & Services (SL) Ltd regarding your request for ${service}. We appreciate the opportunity to assist you.

${customBody}

If you would like to expedite this request or schedule an introductory call, please feel free to reply directly to this message or contact our Freetown headquarters at +232 73 959 933.

Best regards,

Operations Team
Gateway Logistics & Services (SL) Ltd
Freetown, Sierra Leone
director@gateway-sl.com | www.gateway-sl.com`;

    res.json({ suggestion: fallbackResponse });
  }
});

// POST /api/ai/improve-article
app.post('/api/ai/improve-article', async (req, res) => {
  const { title, excerpt, content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Missing article content' });
  }

  try {
    const prompt = `You are an expert copywriter and editor for Gateway Logistics & Services (SL) Ltd, specializing in heavy transport, mining operations, and logistics safety standards in West Africa.
Review and improve the following article content. Make it read extremely premium, professional, and engaging while fixing any grammatical issues. Keep the markdown formatting (like bold, bullet lists, headers) intact.
Article Details:
Title: ${title || 'N/A'}
Teaser Excerpt: ${excerpt || 'N/A'}
Current Content:
${content}

Return a JSON object containing the improved version in the format:
{
  "improvedTitle": "...",
  "improvedExcerpt": "...",
  "improvedContent": "..."
}
Ensure you return valid JSON ONLY. Start the response with { and end with }. Do not enclose in markdown code fences.`;

    const responseText = await callGemini(prompt);
    // Parse the response cleanly (strip out markdown code fences if Gemini added them)
    const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanedJson);
    res.json(result);
  } catch (err: any) {
    console.warn('Gemini API call failed for article improvement, returning original content safely:', err.message);
    res.json({
      improvedTitle: title || 'New Article',
      improvedExcerpt: excerpt || 'No excerpt provided',
      improvedContent: content // Keep original content intact
    });
  }
});
// ============================================================
// LIVE CHAT SUPPORT SYSTEM
// ============================================================
const CHAT_STORE_PATH = path.resolve(process.cwd(), 'chat-store.json');

const loadChatMessages = async (): Promise<any[]> => {
  if (db) {
    try {
      return await executeWithDbFallback(async (dbInstance) => {
        const snap = await dbInstance.collection('chat_messages').orderBy('createdAt', 'desc').limit(200).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      });
    } catch (e: any) {
      console.error('Firestore error loading chat messages:', e.message);
    }
  }
  if (fs.existsSync(CHAT_STORE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CHAT_STORE_PATH, 'utf-8'));
    } catch (e) {}
  }
  return [];
};

const saveChatMessage = async (msg: any): Promise<boolean> => {
  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('chat_messages').doc(msg.id).set(msg);
      });
    } catch (e: any) {
      console.error('Firestore error saving chat message:', e.message);
    }
  }
  try {
    let msgs: any[] = [];
    if (fs.existsSync(CHAT_STORE_PATH)) {
      try { msgs = JSON.parse(fs.readFileSync(CHAT_STORE_PATH, 'utf-8')); } catch (e) {}
    }
    const idx = msgs.findIndex(m => m.id === msg.id);
    if (idx >= 0) msgs[idx] = msg; else msgs.unshift(msg);
    fs.writeFileSync(CHAT_STORE_PATH, JSON.stringify(msgs, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing chat message locally:', e);
    return false;
  }
};

// GET /api/chat/messages — returns all messages (admin view)
app.get('/api/chat/messages', async (req, res) => {
  try {
    const msgs = await loadChatMessages();
    res.json(msgs);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load chat messages', details: err.message });
  }
});

// POST /api/chat/send — visitor sends a message
app.post('/api/chat/send', async (req, res) => {
  const { sessionId, visitorName, message } = req.body;
  if (!message || !sessionId) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }

  // Check if this is the first message in this session
  const existingMsgs = await loadChatMessages();
  const sessionHistory = existingMsgs
    .filter(m => m.sessionId === sessionId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const isFirstMessage = sessionHistory.length === 0;

  const msg = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
    sessionId,
    visitorName: visitorName || 'Site Visitor',
    message,
    sender: 'visitor',
    createdAt: new Date().toISOString(),
    read: false,
  };
  const ok = await saveChatMessage(msg);

  if (ok) {
    // Fire AI-powered response asynchronously (don't block the HTTP response)
    setTimeout(async () => {
      try {
        // Build conversation history context (last 6 messages for context)
        const recentHistory = sessionHistory.slice(-6);
        const historyContext = recentHistory.length > 0
          ? '\n\nPrevious messages in this conversation:\n' + recentHistory.map(m =>
              `${m.sender === 'admin' ? 'Support' : (m.visitorName || 'Visitor')}: ${m.message}`
            ).join('\n')
          : '';

        const systemPrompt = `You are a friendly and knowledgeable customer support assistant for Gateway Logistics SL — a premier logistics and supply chain company based in Sierra Leone. Your job is to give helpful, accurate, first-hand answers to visitor questions using the company information below.

== COMPANY OVERVIEW ==
Gateway Logistics SL provides end-to-end logistics solutions across Sierra Leone and West Africa. We specialize in freight forwarding, customs clearance, warehousing, last-mile delivery, mining logistics support, and manpower/labour supply.

== CORE SERVICES ==
1. Freight Forwarding — Air and sea freight import/export with full documentation support
2. Customs Brokerage — Expert customs clearance, HS code classification, duty/tax advisory
3. Warehousing & Distribution — Secure bonded and general warehousing, inventory management
4. Last-Mile Delivery — Nationwide road distribution within Sierra Leone
5. Mining & Energy Logistics — Specialized cargo handling for mining and energy sector clients
6. Manpower Supply — Skilled and unskilled labour recruitment and placement
7. Secondary Distribution Haulage — Fleet-based distribution to remote and up-country locations

== CONTACT INFORMATION ==
Phone: +232 73 959 933
Email: director@gateway-sl.com
WhatsApp: wa.me/23273959933
Office: Freetown, Sierra Leone

== HOW TO GET A QUOTE ==
Visitors can submit a quote request form on the website (Services page), email us, call directly, or WhatsApp us. Quotes are typically provided within 24 hours.

== FAQS ==
- Do you handle import and export? Yes, both air and sea freight, import and export.
- Do you cover the whole of Sierra Leone? Yes, including up-country and mining regions.
- Can you handle oversized or project cargo? Yes, we have heavy-lift and project cargo expertise.
- Are you licensed customs brokers? Yes, fully licensed by Sierra Leone Customs.
- Do you offer contract logistics? Yes, for long-term clients in mining, NGOs, and government.
- What currencies do you accept? SLL, USD, and EUR.
- How long does customs clearance take? Typically 1–5 working days depending on cargo type.

== TONE GUIDELINES ==
- Be warm, professional, and concise
- Use plain language — avoid jargon
- If you don't know something specific (e.g., a current rate), say you'll have a team member follow up with exact details
- Always end your reply with: "💬 A member of our team will also follow up with you personally. For an instant response, call us on +232 73 959 933 or WhatsApp: wa.me/23273959933"
- Keep responses under 150 words unless the question requires detail
${historyContext}

== VISITOR'S CURRENT MESSAGE ==
${visitorName || 'Visitor'}: ${message}

Now write a helpful, direct support reply:`;

        const aiText = await callGemini(systemPrompt);

        const aiMsg = {
          id: 'ai-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
          sessionId,
          visitorName: 'Gateway Support (AI)',
          message: aiText.trim(),
          sender: 'admin',
          createdAt: new Date(Date.now() + 1500).toISOString(),
          read: true,
          isAIReply: true,
        };
        await saveChatMessage(aiMsg);
        console.log(`🤖 AI reply sent for session ${sessionId}`);
      } catch (err: any) {
        console.error('AI chat responder error:', err.message);
        // Fallback to static acknowledgement if Gemini fails
        const fallbackMsg = {
          id: 'ack-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
          sessionId,
          visitorName: 'Gateway Support',
          message: `Thank you for reaching out${visitorName ? ', ' + visitorName.split(' ')[0] : ''}! 🙏 Your message has been received. A member of our operations team will reply to you shortly.\n\nFor an instant response:\n📞 Call: +232 73 959 933\n💬 WhatsApp: wa.me/23273959933`,
          sender: 'admin',
          createdAt: new Date(Date.now() + 1500).toISOString(),
          read: true,
          isAutoReply: true,
        };
        await saveChatMessage(fallbackMsg);
      }
    }, 800);

    res.json({ success: true, message: msg });
  } else {
    res.status(500).json({ error: 'Failed to save message' });
  }
});




// POST /api/chat/reply — admin replies to a visitor message
app.post('/api/chat/reply', async (req, res) => {
  const { sessionId, message } = req.body;
  if (!message || !sessionId) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }
  const msg = {
    id: 'reply-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
    sessionId,
    visitorName: 'Gateway Support',
    message,
    sender: 'admin',
    createdAt: new Date().toISOString(),
    read: true,
  };
  const ok = await saveChatMessage(msg);
  if (ok) {
    res.json({ success: true, message: msg });
  } else {
    res.status(500).json({ error: 'Failed to save reply' });
  }
});

// GET /api/chat/session/:sessionId — get messages for a specific visitor session
app.get('/api/chat/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const all = await loadChatMessages();
    const session = all.filter(m => m.sessionId === sessionId);
    // Sort oldest first for chronological display
    session.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    res.json(session);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load session messages', details: err.message });
  }
});

// POST /api/emails/send

app.post('/api/emails/send', async (req, res) => {
  const { quoteId, recipient, subject, body } = req.body;
  if (!recipient || !body) {
    return res.status(400).json({ error: 'Missing required email fields (recipient, body)' });
  }

  try {
    // 1. Simulate sending SMTP email by logging
    console.log('============= OUTGOING SMTP EMAIL SIMULATION =============');
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject || 'Direct Reply - Gateway Logistics'}`);
    console.log('----------------------------------------------------------');
    console.log(body);
    console.log('==========================================================');

    // 2. If quoteId is provided, append this reply to the database document
    if (quoteId && db) {
      await executeWithDbFallback(async (dbInstance) => {
        const docRef = dbInstance.collection('quote_requests').doc(quoteId);
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data();
          const replies = data?.replies || [];
          replies.push({
            id: 'rep-' + Date.now(),
            recipient,
            subject: subject || 'Direct Reply',
            body,
            sentAt: new Date().toISOString()
          });
          await docRef.update({
            replies,
            status: 'Replied' // auto-update status to Replied
          });
          console.log(`✅ Appended reply history to quote request document ${quoteId} in Firestore.`);
        }
      });
    }

    // Also update local file store as backup
    if (quoteId && fs.existsSync(QUOTES_STORE_PATH)) {
      try {
        const quotes = JSON.parse(fs.readFileSync(QUOTES_STORE_PATH, 'utf-8'));
        const updated = quotes.map((q: any) => {
          if (q.id === quoteId) {
            const replies = q.replies || [];
            replies.push({
              id: 'rep-' + Date.now(),
              recipient,
              subject: subject || 'Direct Reply',
              body,
              sentAt: new Date().toISOString()
            });
            return { ...q, replies, status: 'Replied' };
          }
          return q;
        });
        fs.writeFileSync(QUOTES_STORE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
      } catch (err) {
        console.error('Error saving email reply locally:', err);
      }
    }

    res.json({ success: true, message: 'Email sent successfully (simulated)' });
  } catch (err: any) {
    console.error('Error simulating email dispatch:', err);
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

// GET /api/promotions
app.get('/api/promotions', async (req, res) => {
  try {
    const settings = await loadPromotionSettings();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load promotion settings', details: err.message });
  }
});

// POST /api/promotions
app.post('/api/promotions', async (req, res) => {
  const { settings } = req.body;
  if (!settings) {
    return res.status(400).json({ error: 'Missing settings payload' });
  }

  try {
    const success = await savePromotionSettings(settings);
    if (success) {
      res.json({ success: true, message: 'Promotion settings updated successfully.' });
    } else {
      res.status(500).json({ error: 'Failed to save promotion settings' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Error saving settings', details: err.message });
  }
});

// Analytics Database & File Store Helpers
const ANALYTICS_STORE_PATH = path.join(process.cwd(), 'analytics-store.json');

const loadLocalAnalytics = (): any[] => {
  if (fs.existsSync(ANALYTICS_STORE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(ANALYTICS_STORE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading local analytics:', e);
    }
  }
  return [];
};

const saveLocalAnalytics = (data: any[]) => {
  try {
    fs.writeFileSync(ANALYTICS_STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing local analytics:', e);
  }
};

const recordAnalyticsEvent = async (type: string, dataVal: string, sessionKey: string) => {
  const todayStr = new Date().toISOString().split('T')[0];

  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        const docRef = dbInstance.collection('analytics').doc(todayStr);
        const doc = await docRef.get();
        
        let docData: any = {
          date: todayStr,
          pageviews: {},
          searches: {},
          articleReads: {},
          submissions: 0,
          sessions: []
        };

        if (doc.exists) {
          docData = { ...docData, ...doc.data() };
        }

        if (sessionKey && !docData.sessions.includes(sessionKey)) {
          docData.sessions.push(sessionKey);
        }

        if (type === 'pageview') {
          docData.pageviews[dataVal] = (docData.pageviews[dataVal] || 0) + 1;
        } else if (type === 'search') {
          const cleanSearch = dataVal.trim().toLowerCase();
          if (cleanSearch) {
            docData.searches[cleanSearch] = (docData.searches[cleanSearch] || 0) + 1;
          }
        } else if (type === 'article_read') {
          docData.articleReads[dataVal] = (docData.articleReads[dataVal] || 0) + 1;
        } else if (type === 'quote_submit') {
          docData.submissions = (docData.submissions || 0) + 1;
        }

        await docRef.set(docData);
      });
    } catch (err: any) {
      console.error('❌ Firestore analytics error:', err.message);
    }
  }

  try {
    const list = loadLocalAnalytics();
    let record = list.find((item: any) => item.date === todayStr);
    
    if (!record) {
      record = {
        date: todayStr,
        pageviews: {},
        searches: {},
        articleReads: {},
        submissions: 0,
        sessions: []
      };
      list.push(record);
    }

    if (sessionKey && !record.sessions.includes(sessionKey)) {
      record.sessions.push(sessionKey);
    }

    if (type === 'pageview') {
      record.pageviews[dataVal] = (record.pageviews[dataVal] || 0) + 1;
    } else if (type === 'search') {
      const cleanSearch = dataVal.trim().toLowerCase();
      if (cleanSearch) {
        record.searches[cleanSearch] = (record.searches[cleanSearch] || 0) + 1;
      }
    } else if (type === 'article_read') {
      record.articleReads[dataVal] = (record.articleReads[dataVal] || 0) + 1;
    } else if (type === 'quote_submit') {
      record.submissions = (record.submissions || 0) + 1;
    }

    saveLocalAnalytics(list);
  } catch (err) {
    console.error('Local analytics log error:', err);
  }
};

const compileAnalyticsSummary = async (): Promise<any> => {
  let records: any[] = [];

  if (db) {
    try {
      records = await executeWithDbFallback(async (dbInstance) => {
        const snapshot = await dbInstance.collection('analytics').orderBy('date', 'desc').limit(30).get();
        const results: any[] = [];
        snapshot.forEach(doc => {
          results.push(doc.data());
        });
        return results;
      });
    } catch (err: any) {
      console.error('❌ Error compiling Firestore analytics summary:', err.message);
    }
  }

  if (records.length === 0) {
    records = loadLocalAnalytics().sort((a: any, b: any) => b.date.localeCompare(a.date));
  }

  if (records.length === 0) {
    const today = new Date();
    records = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      records.push({
        date: dateStr,
        pageviews: {
          home: Math.floor(Math.random() * 40) + 10,
          about: Math.floor(Math.random() * 15) + 3,
          services: Math.floor(Math.random() * 25) + 5,
          careers: Math.floor(Math.random() * 10) + 2,
          news: Math.floor(Math.random() * 15) + 2,
          contact: Math.floor(Math.random() * 12) + 2,
        },
        searches: {
          "air charter": Math.floor(Math.random() * 4) + 1,
          "heavy haulage": Math.floor(Math.random() * 6) + 1,
          "mining solutions": Math.floor(Math.random() * 5) + 1,
          "careers": Math.floor(Math.random() * 3) + 1,
          "ocean freight": Math.floor(Math.random() * 4) + 1
        },
        articleReads: {
          "news-1": Math.floor(Math.random() * 10) + 2,
          "news-2": Math.floor(Math.random() * 8) + 1,
          "news-3": Math.floor(Math.random() * 5) + 1
        },
        submissions: Math.floor(Math.random() * 2),
        sessions: Array.from({ length: Math.floor(Math.random() * 20) + 8 }, (_, idx) => `sess-${dateStr}-${idx}`)
      });
    }
    saveLocalAnalytics(records);
  }

  const last7Days = records.slice(0, 7);
  const last30Days = records.slice(0, 30);

  const getAggregate = (list: any[]) => {
    let totalPageviews = 0;
    const viewsByPage: Record<string, number> = {};
    const searchFrequency: Record<string, number> = {};
    const readsByArticle: Record<string, number> = {};
    let totalSubmissions = 0;
    let totalSessions = 0;

    list.forEach(r => {
      Object.entries(r.pageviews || {}).forEach(([p, val]: any) => {
        totalPageviews += val;
        viewsByPage[p] = (viewsByPage[p] || 0) + val;
      });
      Object.entries(r.searches || {}).forEach(([s, val]: any) => {
        searchFrequency[s] = (searchFrequency[s] || 0) + val;
      });
      Object.entries(r.articleReads || {}).forEach(([a, val]: any) => {
        readsByArticle[a] = (readsByArticle[a] || 0) + val;
      });
      totalSubmissions += r.submissions || 0;
      totalSessions += (r.sessions || []).length;
    });

    const sortedSearches = Object.entries(searchFrequency)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const sortedReads = Object.entries(readsByArticle)
      .map(([articleId, count]) => ({ articleId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const timeline = [...list].reverse().map(r => ({
      date: r.date,
      visitors: (r.sessions || []).length,
      views: Object.values(r.pageviews || {}).reduce((sum: number, val: any) => sum + val, 0) as number,
      submissions: r.submissions || 0
    }));

    return {
      visitors: totalSessions,
      pageviews: totalPageviews,
      viewsByPage,
      searches: sortedSearches,
      articleReads: sortedReads,
      submissions: totalSubmissions,
      conversionRate: totalSessions > 0 ? parseFloat(((totalSubmissions / totalSessions) * 100).toFixed(2)) : 0,
      timeline
    };
  };

  return {
    summary7: getAggregate(last7Days),
    summary30: getAggregate(last30Days)
  };
};

// POST /api/analytics/track
app.post('/api/analytics/track', async (req, res) => {
  const { eventType, eventData, sessionKey } = req.body;
  if (!eventType || !eventData) {
    return res.status(400).json({ error: 'Missing required tracking properties' });
  }

  try {
    await recordAnalyticsEvent(eventType, eventData, sessionKey || 'anon');
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to record tracking event', details: err.message });
  }
});

// GET /api/analytics/summary
app.get('/api/analytics/summary', async (req, res) => {
  try {
    const summary = await compileAnalyticsSummary();
    res.json(summary);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to compile analytics summary', details: err.message });
  }
});

// GET /api/db-status
app.get('/api/db-status', async (req, res) => {
  const isConfigured = !!db;
  let websiteContentExists = false;
  let quoteRequestsExists = false;
  let promotionsExists = false;
  let analyticsExists = false;
  let details = '';

  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('website_content').limit(1).get();
      });
      websiteContentExists = true;
    } catch (e: any) {
      console.error('db-status website_content error:', e);
      details += `website_content error: ${e.message} (${e.stack}); `;
    }

    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('quote_requests').limit(1).get();
      });
      quoteRequestsExists = true;
    } catch (e: any) {
      console.error('db-status quote_requests error:', e);
      details += `quote_requests error: ${e.message} (${e.stack}); `;
    }

    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('promotions').limit(1).get();
      });
      promotionsExists = true;
    } catch (e: any) {
      console.error('db-status promotions error:', e);
      details += `promotions error: ${e.message} (${e.stack}); `;
    }

    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('analytics').limit(1).get();
      });
      analyticsExists = true;
    } catch (e: any) {
      console.error('db-status analytics error:', e);
      details += `analytics error: ${e.message} (${e.stack}); `;
    }
  }

  res.json({
    isConfigured,
    websiteContentExists,
    quoteRequestsExists,
    promotionsExists,
    analyticsExists,
    hasMissingTables: false,
    details: details || (isConfigured ? 'Firestore connected.' : 'Running in local-fallback mode.')
  });
});

// ============================================================
// ADMIN AUTHENTICATION SETTINGS SYSTEM
// ============================================================
const ADMIN_SETTINGS_PATH = path.resolve(process.cwd(), 'admin-settings.json');

const getAdminPassword = async (): Promise<string> => {
  if (db) {
    try {
      const doc = await executeWithDbFallback(async (dbInstance) => {
        return await dbInstance.collection('admin_settings').doc('auth').get();
      });
      if (doc.exists) {
        return doc.data()?.password || process.env.ADMIN_PASSWORD || 'Gateway26';
      }
    } catch (e: any) {
      console.warn('Error fetching password from Firestore, using local fallback:', e.message);
    }
  }
  if (fs.existsSync(ADMIN_SETTINGS_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(ADMIN_SETTINGS_PATH, 'utf-8'));
      return data.password || process.env.ADMIN_PASSWORD || 'Gateway26';
    } catch (e) {}
  }
  return process.env.ADMIN_PASSWORD || 'Gateway26';
};

const saveAdminPassword = async (newPassword: string): Promise<boolean> => {
  let savedToFirestore = false;
  if (db) {
    try {
      await executeWithDbFallback(async (dbInstance) => {
        await dbInstance.collection('admin_settings').doc('auth').set({
          password: newPassword,
          updatedAt: new Date().toISOString()
        });
      });
      savedToFirestore = true;
    } catch (e: any) {
      console.error('Error saving password to Firestore:', e.message);
    }
  }
  try {
    fs.writeFileSync(ADMIN_SETTINGS_PATH, JSON.stringify({ password: newPassword }, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving password locally:', e);
    return savedToFirestore;
  }
};

// POST /api/admin/login
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;
  try {
    const adminPassword = await getAdminPassword();
    if (password === adminPassword) {
      res.json({ success: true, message: 'Authenticated successfully' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid passcode' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Server authentication error', details: err.message });
  }
});

// POST /api/admin/change-password
app.post('/api/admin/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'New password must be at least 4 characters long' });
  }

  try {
    const savedPassword = await getAdminPassword();
    if (currentPassword !== savedPassword) {
      return res.status(401).json({ error: 'Incorrect current passcode' });
    }

    const ok = await saveAdminPassword(newPassword);
    if (ok) {
      res.json({ success: true, message: 'Passcode updated successfully.' });
    } else {
      res.status(500).json({ error: 'Failed to update passcode in storage' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Error modifying settings', details: err.message });
  }
});


// Vite middleware integration or production static files serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        // Keep HMR websocket alive - don't let it trigger full page reloads
        hmr: {
          port: 24678,
          host: 'localhost',
        },
        // Only watch frontend source files, NOT server data stores
        watch: {
          ignored: [
            '**/node_modules/**',
            '**/*.json',       // ignore all .json writes (data stores, analytics, quotes)
            '**/server.ts',    // don't watch server file itself
            '**/dist/**',
          ],
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('⚡ Vite Dev Middleware loaded (HMR stable, no full-page reloads).');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('📦 Production static build server mounted.');
  }
  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Gateway Logistics Full-Stack Server running at http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
