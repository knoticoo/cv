'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CVData } from '@/types/cv';
import { generateId } from '@/lib/utils';
import { storage, useAutoSave } from '@/lib/storage';
import CVEditor from '@/components/CVEditor';
import CVPreview from '@/components/CVPreview';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CreateCVPage() {
  const t = useTranslations('navigation');
  const router = useRouter();
  
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Always call the hook, but handle null case inside
  const { triggerAutoSave } = useAutoSave(cvData || {} as CVData);

  // Initialize CV data on mount to avoid SSR/client mismatches
  useEffect(() => {
    // Check if we're editing an existing CV
    const urlParams = new URLSearchParams(window.location.search);
    const cvId = urlParams.get('id');
    
    if (cvId) {
      // Load existing CV for editing
      const existingCV = storage.loadCV(cvId);
      if (existingCV) {
        setCVData(existingCV);
        setIsEditing(true);
        setLoading(false);
        return;
      }
    }
    
    // Load last saved CV or create new one
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
    setLoading(false);
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
          {isEditing && (
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/profile')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Atpakaļ uz profilu
              </Button>
            </div>
          )}
          


          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 text-center sm:text-left">
            {isEditing ? 'Rediģēt CV' : t('createCV')}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground text-center sm:text-left">
            {isEditing 
              ? 'Rediģējiet savu CV, izmantojot mūsu interaktīvo redaktoru'
              : 'Izveidojiet savu profesionālo CV, izmantojot mūsu interaktīvo redaktoru'
            }
          </p>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="flex lg:hidden gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => { setShowPreview(false); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
              !showPreview
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            ✏️ Redaktors
          </button>
          <button
            onClick={() => { setShowPreview(true); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
              showPreview
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            👁️ Priekšskatījums
          </button>

        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
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

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {!showPreview ? (
            <div className="animate-fade-in">
              <CVEditor 
                cvData={cvData} 
                onUpdate={updateCVData}
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              <CVPreview cvData={cvData} onUpdate={updateCVData} />
            </div>
          )}
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden mt-6 p-4 bg-white rounded-lg border shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Ātrās darbības</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => { setShowPreview(false); }}
              className="flex-1 py-2 px-3 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Atvērt redaktoru
            </button>
            <button
              onClick={() => { setShowPreview(true); }}
              className="flex-1 py-2 px-3 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Skatīt priekšskatījumu
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