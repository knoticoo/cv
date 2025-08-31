import { CVData, CoverLetterData, UserPreferences } from '@/types/cv';
import { useState } from 'react';

const STORAGE_KEYS = {
  CV_DATA: 'latvian-cv-maker-cv-data',
  COVER_LETTERS: 'latvian-cv-maker-cover-letters',
  USER_PREFERENCES: 'latvian-cv-maker-preferences',
  SAVED_CVS: 'latvian-cv-maker-saved-cvs',
} as const;

// Local Storage Functions
export const storage = {
  // CV Data
  saveCV: (cvData: CVData): void => {
    try {
      const savedCVs = storage.getSavedCVs();
      const existingIndex = savedCVs.findIndex(cv => cv.id === cvData.id);
      
      if (existingIndex >= 0) {
        savedCVs[existingIndex] = cvData;
      } else {
        savedCVs.push(cvData);
      }
      
      localStorage.setItem(STORAGE_KEYS.SAVED_CVS, JSON.stringify(savedCVs));
      localStorage.setItem(STORAGE_KEYS.CV_DATA, JSON.stringify(cvData));
    } catch (error) {
      console.error('Error saving CV:', error);
    }
  },

  loadCV: (id?: string): CVData | null => {
    try {
      if (id) {
        const savedCVs = storage.getSavedCVs();
        return savedCVs.find(cv => cv.id === id) || null;
      }
      
      const data = localStorage.getItem(STORAGE_KEYS.CV_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading CV:', error);
      return null;
    }
  },

  getSavedCVs: (): CVData[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_CVS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading saved CVs:', error);
      return [];
    }
  },

  deleteCV: (id: string): void => {
    try {
      const savedCVs = storage.getSavedCVs();
      const filtered = savedCVs.filter(cv => cv.id !== id);
      localStorage.setItem(STORAGE_KEYS.SAVED_CVS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
  },

  // Cover Letters
  saveCoverLetter: (coverLetter: CoverLetterData): void => {
    try {
      const saved = storage.getSavedCoverLetters();
      const existingIndex = saved.findIndex(cl => cl.id === coverLetter.id);
      
      if (existingIndex >= 0) {
        saved[existingIndex] = coverLetter;
      } else {
        saved.push(coverLetter);
      }
      
      localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(saved));
    } catch (error) {
      console.error('Error saving cover letter:', error);
    }
  },

  getSavedCoverLetters: (): CoverLetterData[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COVER_LETTERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading cover letters:', error);
      return [];
    }
  },

  deleteCoverLetter: (id: string): void => {
    try {
      const saved = storage.getSavedCoverLetters();
      const filtered = saved.filter(cl => cl.id !== id);
      localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting cover letter:', error);
    }
  },

  // User Preferences
  savePreferences: (preferences: UserPreferences): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  },

  loadPreferences: (): UserPreferences | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading preferences:', error);
      return null;
    }
  },

  // Auto-save functionality
  autoSave: (cvData: CVData): void => {
    const preferences = storage.loadPreferences();
    if (preferences?.autoSave !== false) {
      storage.saveCV(cvData);
    }
  },

  // Clear all data
  clearAllData: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },

  // Export data for backup
  exportData: (): string => {
    try {
      const data = {
        cvs: storage.getSavedCVs(),
        coverLetters: storage.getSavedCoverLetters(),
        preferences: storage.loadPreferences(),
        exportDate: new Date().toISOString(),
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '';
    }
  },

  // Import data from backup
  importData: (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.cvs) {
        localStorage.setItem(STORAGE_KEYS.SAVED_CVS, JSON.stringify(data.cvs));
      }
      if (data.coverLetters) {
        localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(data.coverLetters));
      }
      if (data.preferences) {
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(data.preferences));
      }
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },
};

// Hook for auto-save functionality
export const useAutoSave = (cvData: CVData, delay: number = 2000) => {
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const triggerAutoSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    const timeout = setTimeout(() => {
      storage.autoSave(cvData);
    }, delay);

    setSaveTimeout(timeout);
  };

  return { triggerAutoSave };
};