// CV Data Models for Latvian CV Maker

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  dateOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  drivingLicense?: string[];
  photo?: string; // Base64 or URL
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string; // undefined if current
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
  thesis?: string;
}

export interface LanguageSkill {
  id: string;
  language: string;
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  certifications?: string[];
}

export interface ITSkill {
  id: string;
  name: string;
  category: 'Programming' | 'Software' | 'Database' | 'Framework' | 'Tool' | 'Other';
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  relationship: string;
}

export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  professionalSummary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  languageSkills: LanguageSkill[];
  itSkills: ITSkill[];
  skills: Skill[];
  references: Reference[];
  hobbies?: string[];
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
  template: string;
  language: 'lv' | 'ru' | 'en';
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  category: 'europass' | 'modern' | 'traditional' | 'creative';
  preview: string; // URL to preview image
  isPremium: boolean;
  supportedLanguages: ('lv' | 'ru' | 'en')[];
}

export interface CoverLetterData {
  id: string;
  cvId: string;
  recipientName?: string;
  recipientTitle?: string;
  companyName?: string;
  position: string;
  content: string;
  template: string;
  language: 'lv' | 'ru' | 'en';
  createdAt: string;
  updatedAt: string;
}

// Form validation schemas
export interface CVFormErrors {
  personalInfo?: Partial<Record<keyof PersonalInfo, string>>;
  workExperience?: Record<string, Partial<Record<keyof WorkExperience, string>>>;
  education?: Record<string, Partial<Record<keyof Education, string>>>;
  languageSkills?: Record<string, Partial<Record<keyof LanguageSkill, string>>>;
  itSkills?: Record<string, Partial<Record<keyof ITSkill, string>>>;
  skills?: Record<string, Partial<Record<keyof Skill, string>>>;
  references?: Record<string, Partial<Record<keyof Reference, string>>>;
}

// Export formats
export type ExportFormat = 'pdf' | 'docx' | 'txt' | 'json';

// Privacy settings
export interface PrivacySettings {
  isPublic: boolean;
  shareableLink?: string;
  allowDownload: boolean;
  allowCopy: boolean;
  expirationDate?: string;
}

// User preferences
export interface UserPreferences {
  defaultLanguage: 'lv' | 'ru' | 'en';
  defaultTemplate: string;
  autoSave: boolean;
  notifications: boolean;
  privacySettings: PrivacySettings;
}