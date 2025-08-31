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
  
  const [cvData, setCVData] = useState<CVData>({
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    template: 'modern',
    language: 'lv'
  });

  const { triggerAutoSave } = useAutoSave(cvData);

  // Load saved CV on mount
  useEffect(() => {
    const savedCV = storage.loadCV();
    if (savedCV) {
      setCVData(savedCV);
    }
  }, []);

  const updateCVData = (updates: Partial<CVData>) => {
    const newData = {
      ...cvData,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setCVData(newData);
    triggerAutoSave();
  };

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
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
}