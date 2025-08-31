'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { generateId } from '@/lib/utils';
import { storage, useAutoSave } from '@/lib/storage';
import CVEditor from '@/components/CVEditor';
import CVPreview from '@/components/CVPreview';
import AICVAssistant from '@/components/AICVAssistant';

export default function CreateCVPage() {
  const t = useTranslations('navigation');
  
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  // Always call the hook, but handle null case inside
  const { triggerAutoSave } = useAutoSave(cvData || {} as CVData);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm sm:text-base">Loading CV editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 text-center sm:text-left">
            {t('createCV')}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground text-center sm:text-left">
            Izveidojiet savu profesionālo CV, izmantojot mūsu interaktīvo redaktoru
          </p>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="flex lg:hidden gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => { setShowPreview(false); setShowAI(false); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
              !showPreview && !showAI
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            ✏️ Redaktors
          </button>
          <button
            onClick={() => { setShowPreview(true); setShowAI(false); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
              showPreview && !showAI
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            👁️ Priekšskatījums
          </button>
          <button
            onClick={() => { setShowPreview(false); setShowAI(true); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
              showAI
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            🤖 AI Asistents
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
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

          {/* AI Assistant Panel */}
          <div className="lg:sticky lg:top-8">
            <AICVAssistant cvData={cvData} onCVUpdate={updateCVData} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {!showPreview && !showAI ? (
            <div className="animate-fade-in">
              <CVEditor 
                cvData={cvData} 
                onUpdate={updateCVData}
              />
            </div>
          ) : showPreview ? (
            <div className="animate-fade-in">
              <CVPreview cvData={cvData} onUpdate={updateCVData} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <AICVAssistant cvData={cvData} onCVUpdate={updateCVData} />
            </div>
          )}
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden mt-6 p-4 bg-white rounded-lg border shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ātrās darbības</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => { setShowPreview(false); setShowAI(false); }}
              className="flex-1 py-2 px-3 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Atvērt redaktoru
            </button>
            <button
              onClick={() => { setShowPreview(true); setShowAI(false); }}
              className="flex-1 py-2 px-3 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Skatīt priekšskatījumu
            </button>
            <button
              onClick={() => { setShowPreview(false); setShowAI(true); }}
              className="flex-1 py-2 px-3 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              AI Asistents
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="py-2 px-3 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              ↑ Uz augšu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}