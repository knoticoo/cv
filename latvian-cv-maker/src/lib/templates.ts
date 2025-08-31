import { CVTemplate } from '@/types/cv';

export const templates: CVTemplate[] = [
  {
    id: 'europass',
    name: 'Europass',
    description: 'Oficiālā Eiropas Savienības CV veidne, atzīta visā ES',
    category: 'europass',
    preview: '/templates/europass-preview.jpg',
    isPremium: false,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  {
    id: 'modern-professional',
    name: 'Mūsdienīgs Profesionāls',
    description: 'Tīrs, mūsdienīgs dizains ar uzsvaru uz lasāmību',
    category: 'modern',
    preview: '/templates/modern-preview.jpg',
    isPremium: false,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  {
    id: 'traditional-business',
    name: 'Tradicionāls Biznesa',
    description: 'Konservatīvs stils tradicionālām nozarēm',
    category: 'traditional',
    preview: '/templates/traditional-preview.jpg',
    isPremium: false,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  // Creative Templates
  {
    id: 'creative-designer',
    name: 'Radošs Dizaineris',
    description: 'Kreatīvs dizains ar krāsu akcentiem dizaina profesijām',
    category: 'creative',
    preview: '/templates/creative-designer-preview.jpg',
    isPremium: true,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  {
    id: 'creative-minimalist',
    name: 'Minimālistisks Radošs',
    description: 'Elegants minimālisms ar radošiem elementiem',
    category: 'creative',
    preview: '/templates/creative-minimalist-preview.jpg',
    isPremium: true,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  {
    id: 'creative-colorful',
    name: 'Krāsains Radošs',
    description: 'Spilgts dizains ar unikālām krāsām un formām',
    category: 'creative',
    preview: '/templates/creative-colorful-preview.jpg',
    isPremium: true,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  {
    id: 'creative-infographic',
    name: 'Infogrāfisks CV',
    description: 'Vizuāls CV ar diagrammām un ikonām',
    category: 'creative',
    preview: '/templates/creative-infographic-preview.jpg',
    isPremium: true,
    supportedLanguages: ['lv', 'ru', 'en']
  },
  {
    id: 'creative-portfolio',
    name: 'Portfolio Stils',
    description: 'CV ar portfolio elementiem radošajām profesijām',
    category: 'creative',
    preview: '/templates/creative-portfolio-preview.jpg',
    isPremium: true,
    supportedLanguages: ['lv', 'ru', 'en']
  }
];

export const getTemplateById = (id: string): CVTemplate | undefined => {
  return templates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): CVTemplate[] => {
  if (category === 'all') return templates;
  return templates.filter(template => template.category === category);
};

export const getFreeTemplates = (): CVTemplate[] => {
  return templates.filter(template => !template.isPremium);
};

export const getPremiumTemplates = (): CVTemplate[] => {
  return templates.filter(template => template.isPremium);
};

// Template-specific styling configurations
export const templateStyles = {
  europass: {
    primaryColor: '#003d82',
    secondaryColor: '#f0f0f0',
    fontFamily: 'Arial',
    headerStyle: 'official',
    sectionSpacing: 'compact',
    photoPosition: 'top-right',
    features: ['EU Standard', 'Official Format', 'Multi-language', 'Skills Framework']
  },
  'modern-professional': {
    primaryColor: '#2563eb',
    secondaryColor: '#f1f5f9',
    fontFamily: 'Inter',
    headerStyle: 'clean',
    sectionSpacing: 'comfortable',
    photoPosition: 'top-left',
    features: ['Clean Design', 'Photo Support', 'Color Accents', 'Modern Layout']
  },
  'traditional-business': {
    primaryColor: '#1f2937',
    secondaryColor: '#f9fafb',
    fontFamily: 'Times New Roman',
    headerStyle: 'formal',
    sectionSpacing: 'traditional',
    photoPosition: 'top-center',
    features: ['Conservative', 'Professional', 'Print Optimized', 'Classic Layout']
  },
  'creative-designer': {
    primaryColor: '#ec4899',
    secondaryColor: '#fdf2f8',
    fontFamily: 'Inter',
    headerStyle: 'creative',
    sectionSpacing: 'dynamic',
    photoPosition: 'integrated',
    features: ['Creative Design', 'Color Gradients', 'Portfolio Integration', 'Visual Elements']
  },
  'creative-minimalist': {
    primaryColor: '#059669',
    secondaryColor: '#f0fdf4',
    fontFamily: 'Inter',
    headerStyle: 'minimal',
    sectionSpacing: 'spacious',
    photoPosition: 'subtle',
    features: ['Minimal Design', 'Elegant Typography', 'Subtle Colors', 'White Space']
  },
  'creative-colorful': {
    primaryColor: '#7c3aed',
    secondaryColor: '#faf5ff',
    fontFamily: 'Inter',
    headerStyle: 'bold',
    sectionSpacing: 'creative',
    photoPosition: 'prominent',
    features: ['Bold Colors', 'Unique Layout', 'Eye-catching', 'Personality']
  },
  'creative-infographic': {
    primaryColor: '#ea580c',
    secondaryColor: '#fff7ed',
    fontFamily: 'Inter',
    headerStyle: 'visual',
    sectionSpacing: 'infographic',
    photoPosition: 'integrated',
    features: ['Visual Charts', 'Icons', 'Data Visualization', 'Infographic Style']
  },
  'creative-portfolio': {
    primaryColor: '#0891b2',
    secondaryColor: '#f0f9ff',
    fontFamily: 'Inter',
    headerStyle: 'portfolio',
    sectionSpacing: 'showcase',
    photoPosition: 'hero',
    features: ['Portfolio Showcase', 'Project Gallery', 'Work Samples', 'Creative Layout']
  }
};

// Premium feature definitions
export const premiumFeatures = {
  design: {
    customColors: 'Custom color schemes and branding',
    premiumFonts: 'Access to premium typography options',
    layoutVariations: 'Multiple layout arrangements',
    customSections: 'Create custom CV sections',
    brandingRemoval: 'Remove "Created with CV Maker" watermark'
  },
  export: {
    multipleFormats: 'Export to PDF, Word, HTML, and plain text',
    highResolution: 'High-resolution PDF export (300 DPI)',
    customWatermarks: 'Add personal or company watermarks',
    batchExport: 'Export multiple CV versions at once',
    qrCodes: 'Generate QR codes for digital CV access'
  },
  storage: {
    cloudSync: 'Cloud storage and cross-device sync',
    unlimitedCVs: 'Create unlimited CV versions',
    versionHistory: 'Track and restore previous versions',
    backupRestore: 'Automated backup and restore',
    teamSharing: 'Share CVs with team members or coaches'
  },
  customization: {
    sectionReordering: 'Drag and drop section reordering',
    conditionalSections: 'Show/hide sections based on content',
    customFields: 'Add custom fields to any section',
    templateCustomization: 'Modify templates to match your style',
    responsivePreview: 'Preview how CV looks on different devices'
  }
};

export const getPremiumFeaturesByCategory = (category: keyof typeof premiumFeatures) => {
  return premiumFeatures[category];
};

export const getAllPremiumFeatures = () => {
  return Object.entries(premiumFeatures).reduce((acc, [category, features]) => {
    acc[category] = features;
    return acc;
  }, {} as typeof premiumFeatures);
};