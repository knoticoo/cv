import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, locale: string = 'lv'): string {
  if (!date) return '';
  
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long' 
  };
  
  return dateObj.toLocaleDateString(locale, options);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Latvian phone number format validation
  const phoneRegex = /^(\+371|371)?[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9\-_\.]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

export function getLanguageLabel(code: string, locale: string): string {
  const languages: Record<string, Record<string, string>> = {
    lv: {
      lv: 'Latviešu',
      ru: 'Krievu',
      en: 'Angļu',
      de: 'Vācu',
      fr: 'Franču',
      es: 'Spāņu',
      it: 'Itāļu'
    },
    ru: {
      lv: 'Латышский',
      ru: 'Русский',
      en: 'Английский',
      de: 'Немецкий',
      fr: 'Французский',
      es: 'Испанский',
      it: 'Итальянский'
    },
    en: {
      lv: 'Latvian',
      ru: 'Russian',
      en: 'English',
      de: 'German',
      fr: 'French',
      es: 'Spanish',
      it: 'Italian'
    }
  };
  
  return languages[locale]?.[code] || code;
}

export function getProficiencyLabel(level: string, locale: string): string {
  const levels: Record<string, Record<string, string>> = {
    lv: {
      'A1': 'A1 - Sākuma līmenis',
      'A2': 'A2 - Pamata līmenis',
      'B1': 'B1 - Vidējs līmenis',
      'B2': 'B2 - Augstāks vidējais līmenis',
      'C1': 'C1 - Augsts līmenis',
      'C2': 'C2 - Mātes valodas līmenis',
      'Native': 'Dzimtā valoda'
    },
    ru: {
      'A1': 'A1 - Начальный уровень',
      'A2': 'A2 - Базовый уровень',
      'B1': 'B1 - Средний уровень',
      'B2': 'B2 - Выше среднего',
      'C1': 'C1 - Высокий уровень',
      'C2': 'C2 - Уровень носителя',
      'Native': 'Родной язык'
    },
    en: {
      'A1': 'A1 - Beginner',
      'A2': 'A2 - Elementary',
      'B1': 'B1 - Intermediate',
      'B2': 'B2 - Upper Intermediate',
      'C1': 'C1 - Advanced',
      'C2': 'C2 - Proficient',
      'Native': 'Native'
    }
  };
  
  return levels[locale]?.[level] || level;
}