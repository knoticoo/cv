'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, Briefcase, GraduationCap, Star, Users } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ProfessionalSummaryForm from './forms/ProfessionalSummaryForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ReferencesForm from './forms/ReferencesForm';

interface CVEditorProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function CVEditor({ cvData, onUpdate }: CVEditorProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: t('personalInfo.title'),
      icon: User,
      component: PersonalInfoForm
    },
    {
      id: 'summary',
      label: 'Kopsavilkums',
      icon: FileText,
      component: ProfessionalSummaryForm
    },
    {
      id: 'experience',
      label: t('workExperience.title'),
      icon: Briefcase,
      component: WorkExperienceForm
    },
    {
      id: 'education',
      label: t('education.title'),
      icon: GraduationCap,
      component: EducationForm
    },
    {
      id: 'skills',
      label: t('skills.title'),
      icon: Star,
      component: SkillsForm
    },
    {
      id: 'references',
      label: t('references.title'),
      icon: Users,
      component: ReferencesForm
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">CV Redaktors</h2>
        <p className="text-muted-foreground mt-1">
          Aizpildiet informāciju pa sadaļām
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 p-1 m-6 mb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center space-x-2 text-xs sm:text-sm"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="p-6">
          {tabs.map((tab) => {
            const Component = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <Component cvData={cvData} onUpdate={onUpdate} />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex justify-between p-6 border-t bg-gray-50">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1].id);
            }
          }}
          disabled={activeTab === tabs[0].id}
        >
          {t('common.previous')}
        </Button>
        
        <Button
          onClick={() => {
            const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1].id);
            }
          }}
          disabled={activeTab === tabs[tabs.length - 1].id}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}