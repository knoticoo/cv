'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { generateId } from '@/lib/utils';
import { storage, useAutoSave } from '@/lib/storage';
import CVEditor from '@/components/CVEditor';
import CVPreview from '@/components/CVPreview';

export default function CreateCVPage() {
  const t = useTranslations();
  
  const [cvData, setCVData] = useState<CVData | null>(null);
  const { triggerAutoSave } = useAutoSave(cvData);

  // Initialize CV data on mount to avoid SSR/client mismatches
  useEffect(() => {
    const savedCV = storage.loadCV();
    if (savedCV) {
      setCVData(savedCV);
    } else {
      // Create initial CV data only on client side
      const now = new Date().toISOString();
      setCVData({
        id: generateId(),
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            postalCode: '',
            country: 'Latvija'
          }
        },
        workExperience: [],
        education: [],
        languageSkills: [],
        itSkills: [],
        skills: [],
        references: [],
        createdAt: now,
        updatedAt: now,
        template: 'modern',
        language: 'lv'
      });
    }
  }, []);

  const updateCVData = (updates: Partial<CVData>) => {
    if (!cvData) return;
    
    const newData = {
      ...cvData,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setCVData(newData);
    triggerAutoSave();
  };

  // Show loading state while initializing
  if (!cvData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading CV editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('navigation.createCV')}
          </h1>
          <p className="text-muted-foreground">
            Izveidojiet savu profesionālo CV, izmantojot mūsu interaktīvo redaktoru
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <CVEditor 
              cvData={cvData} 
              onUpdate={updateCVData}
            />
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8">
            <CVPreview cvData={cvData} onUpdate={updateCVData} />
          </div>
        </div>
      </div>
    </div>
  );
}