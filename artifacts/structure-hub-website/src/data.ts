export type Service = {
  slug: string;
  title: string;
  kicker: string;
  text: string;
  detail: string;
  icon: string;
  bullets: string[];
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  location: string;
  image: string;
  filter: string;
  status: 'Completed' | 'In progress';
  year: string;
  summary: string;
  scope: string[];
};

export type Equipment = {
  id: number;
  name: string;
  category: string;
  image: string;
  availability: 'Available' | 'On hire' | 'Maintenance';
  specs: string;
  rate: string;
};

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Site visit'
  | 'Quotation'
  | 'Won'
  | 'Lost';

export type Lead = {
  id: string;
  name: string;
  organisation: string;
  service: string;
  location: string;
  contact: string;
  brief: string;
  status: LeadStatus;
  createdAt: string;
  priority: 'High' | 'Normal';
};

export const services: Service[] = [
  {
    slug: 'construction',
    title: 'Construction',
    kicker: 'Build / 01',
    text: 'Residential, commercial and institutional builds, renovations, refurbishments and storey buildings.',
    detail: 'From first setting-out to the last finish, our construction team coordinates the people, materials and decisions needed to move a build forward with confidence.',
    icon: 'building',
    bullets: ['Concrete and steel frame structures', 'Schools and administration blocks', 'Renovations and refurbishments', 'Finishes, plumbing and electrical'],
  },
  {
    slug: 'civil-works',
    title: 'Civil works',
    kicker: 'Ground / 02',
    text: 'Roads, dams, foundations, pavements, landscaping, quantity and site surveying.',
    detail: 'The work beneath every successful project matters. Structure Hub brings practical civil engineering capability to the groundworks that make everything else possible.',
    icon: 'ruler',
    bullets: ['Road and dam construction', 'Reinforced foundations', 'Pavements and landscaping', 'Quantity and site surveying'],
  },
  {
    slug: 'steel-roofing',
    title: 'Steel & roofing',
    kicker: 'Frame / 03',
    text: 'Steel structures, roofing, structural fabrication and steel replacements built for service.',
    detail: 'Measured, fabricated and installed with a focus on fit, finish and long-term performance — including replacement roofing and steel rehabilitation.',
    icon: 'hammer',
    bullets: ['Structural steel fabrication', 'IBR and roof replacement', 'Steel frame structures', 'On-site installation'],
  },
  {
    slug: 'plant-hire',
    title: 'Plant & equipment hire',
    kicker: 'Capacity / 04',
    text: 'Practical equipment support for projects that need dependable capacity on site.',
    detail: 'Our hire service connects projects with the equipment, logistics and practical support they need to keep moving.',
    icon: 'truck',
    bullets: ['Equipment hire enquiries', 'Delivery and collection', 'Project-based availability', 'Maintenance support'],
  },
  {
    slug: 'hardware-supplies',
    title: 'Hardware supplies',
    kicker: 'Supply / 05',
    text: 'Building materials, steel, roofing, plumbing, electrical and construction supplies.',
    detail: 'A practical supply partner for the materials that keep jobs on schedule, from everyday hardware to steel and roofing requirements.',
    icon: 'clipboard',
    bullets: ['Building materials', 'Steel and roofing', 'Plumbing supplies', 'Electrical and general hardware'],
  },
  {
    slug: 'industrial-maintenance',
    title: 'Industrial maintenance',
    kicker: 'Maintain / 06',
    text: 'Mine shafts, plant maintenance and equipment maintenance for demanding environments.',
    detail: 'Experienced teams ready for maintenance work where safety, coordination and disciplined delivery matter.',
    icon: 'factory',
    bullets: ['Mine shaft works', 'Plant maintenance', 'Equipment maintenance', 'Industrial sub-contracting'],
  },
  {
    slug: 'solar',
    title: 'Solar upgrades',
    kicker: 'Power / 07',
    text: 'Farm and building solar upgrades that put dependable power within reach.',
    detail: 'Practical solar installation and upgrade work for homes, farms and working buildings that need more reliable power.',
    icon: 'sun',
    bullets: ['Solar upgrade installations', 'Farm and building systems', 'Site assessment', 'Maintenance planning'],
  },
];

export const projects: Project[] = [
  {
    slug: 'adventist-college-of-education',
    name: 'Adventist College of Education',
    kind: 'Institutional construction',
    location: 'Gweru, Zimbabwe',
    image: '/images/trucks-hero.jpg',
    filter: 'Construction',
    status: 'Completed',
    year: '2024',
    summary: 'Construction works delivered for a learning institution with the care, coordination and standards the brief demanded.',
    scope: ['Construction works', 'Site coordination', 'Materials and logistics', 'Finishing support'],
  },
  {
    slug: 'bata-md-house-roofing',
    name: 'Bata MD’s house roofing',
    kind: 'Roofing & steel works',
    location: 'Gweru, Zimbabwe',
    image: '/images/bata-roofing.jpg',
    filter: 'Roofing',
    status: 'Completed',
    year: '2025',
    summary: 'A complete roofing intervention, from measured steel sheets on the ground to a clean, weather-ready finish.',
    scope: ['Roofing replacement', 'Steel preparation', 'On-site installation', 'Final weatherproofing'],
  },
  {
    slug: 'gare-high-school-dormitory',
    name: 'Gare High School',
    kind: 'Girls dormitory construction',
    location: 'Zimbabwe',
    image: '/images/gare-school.jpg',
    filter: 'Schools',
    status: 'Completed',
    year: '2025',
    summary: 'A practical school building project shaped around durability, safe delivery and a community’s everyday needs.',
    scope: ['Dormitory construction', 'Foundations and structure', 'Roofing', 'Site finishing'],
  },
  {
    slug: 'dultrut-sub-contract',
    name: 'Dultrut sub-contract work',
    kind: 'Industrial maintenance',
    location: 'Zimbabwe',
    image: '/images/team-site.jpg',
    filter: 'Industrial',
    status: 'Completed',
    year: '2025',
    summary: 'A site-ready team working safely and methodically around industrial plant, access constraints and live operations.',
    scope: ['Industrial team mobilisation', 'Maintenance support', 'Site safety coordination', 'Equipment handling'],
  },
  {
    slug: 'uluju-farm-mansion',
    name: 'Uluju Farm mansion',
    kind: 'Residential construction',
    location: 'Uluju Farm, Zimbabwe',
    image: '/images/roofing-page.png',
    filter: 'Construction',
    status: 'In progress',
    year: '2025',
    summary: 'A substantial farm residence and related works delivered with the same attention to structure, finish and site reality.',
    scope: ['Mansion construction', 'Concrete works', 'Roofing and finishes', 'Site services'],
  },
  {
    slug: 'nehosho-sda-church',
    name: 'Nehosho SDA Church',
    kind: 'Reinforced foundation works',
    location: 'Nehosho, Zimbabwe',
    image: '/images/gare-page.png',
    filter: 'Civil',
    status: 'Completed',
    year: '2024',
    summary: 'Reinforced beam foundations and stub columns prepared for a community church project.',
    scope: ['Foundation setting-out', 'Reinforced beams', 'Stub columns', 'Concrete works'],
  },
];

export const equipment: Equipment[] = [
  { id: 1, name: 'Delivery truck', category: 'Logistics', image: '/images/trucks-page.png', availability: 'Available', specs: 'Material delivery · Gweru and surrounding areas', rate: 'Request a rate' },
  { id: 2, name: 'Flatbed truck', category: 'Logistics', image: '/images/trucks-hero.jpg', availability: 'On hire', specs: 'Steel, roofing and general construction loads', rate: 'Request a rate' },
  { id: 3, name: 'Site support fleet', category: 'Project support', image: '/images/team-page.png', availability: 'Available', specs: 'Project support and equipment movement', rate: 'Request a rate' },
];

export const industries = ['Mining', 'Education', 'Government', 'Healthcare', 'Retail', 'Commercial', 'Industrial', 'Residential', 'NGOs', 'Financial institutions'];

export const seedLeads: Lead[] = [
  { id: 'SH-1048', name: 'Tendai Moyo', organisation: 'Midlands Education Trust', service: 'Construction', location: 'Gweru', contact: 'tendai@example.com', brief: 'New classroom block and ablution facilities. Looking for an initial site visit.', status: 'Site visit', createdAt: '02 Sep 2026', priority: 'High' },
  { id: 'SH-1047', name: 'Patrick Dube', organisation: 'Dube Retail Holdings', service: 'Steel & roofing', location: 'Kwekwe', contact: '0772 300 412', brief: 'Roof replacement for a 1,200 sqm retail warehouse.', status: 'Quotation', createdAt: '01 Sep 2026', priority: 'Normal' },
  { id: 'SH-1046', name: 'Rudo Chiweshe', organisation: 'Private client', service: 'Solar upgrades', location: 'Gweru', contact: 'rudo@example.com', brief: 'Solar upgrade for a farm house and workshop.', status: 'New', createdAt: '31 Aug 2026', priority: 'Normal' },
  { id: 'SH-1045', name: 'Simba Ncube', organisation: 'Great Dyke Services', service: 'Industrial maintenance', location: 'Zvishavane', contact: '0712 100 887', brief: 'Plant maintenance support and a crew for a planned shutdown.', status: 'Contacted', createdAt: '29 Aug 2026', priority: 'High' },
];

export const leadStatuses: LeadStatus[] = ['New', 'Contacted', 'Site visit', 'Quotation', 'Won', 'Lost'];

const LEADS_KEY = 'structure-hub-leads-v1';

export function readLeads(): Lead[] {
  if (typeof window === 'undefined') return seedLeads;
  try {
    const saved = window.localStorage.getItem(LEADS_KEY);
    if (saved) return JSON.parse(saved) as Lead[];
  } catch {
    // Fall back to seeded demo data when storage is unavailable.
  }
  return seedLeads;
}

export function writeLeads(leads: Lead[]) {
  if (typeof window !== 'undefined') window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function addLead(lead: Lead) {
  const leads = readLeads();
  writeLeads([lead, ...leads]);
}
