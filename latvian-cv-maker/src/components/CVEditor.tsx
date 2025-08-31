'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, Briefcase, GraduationCap, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const tPersonalInfo = useTranslations('personalInfo');
  const tWorkExperience = useTranslations('workExperience');
  const tEducation = useTranslations('education');
  const tSkills = useTranslations('skills');
  const tReferences = useTranslations('references');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: tPersonalInfo('title'),
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
      label: tWorkExperience('title'),
      icon: Briefcase,
      component: WorkExperienceForm
    },
    {
      id: 'education',
      label: tEducation('title'),
      icon: GraduationCap,
      component: EducationForm
    },
    {
      id: 'skills',
      label: tSkills('title'),
      icon: Star,
      component: SkillsForm
    },
    {
      id: 'references',
      label: tReferences('title'),
      icon: Users,
      component: ReferencesForm
    }
  ];

  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < tabs.length - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-semibold">CV Redaktors</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Aizpildiet informāciju pa sadaļām
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={!canGoPrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Iepriekšējā
            </Button>
            
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {tabs.length}
            </span>
            
            <Button
              size="sm"
              onClick={goToNext}
              disabled={!canGoNext}
              className="flex items-center gap-2"
            >
              Nākamā
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {tabs[currentIndex].label}
            </h3>
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <TabsList className="hidden lg:grid w-full grid-cols-6 p-1 m-6 mb-0">
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

        <div className="p-4 sm:p-6">
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

      {/* Navigation Buttons - Only show on mobile */}
      <div className="lg:hidden flex justify-between p-4 border-t bg-gray-50">
        <Button
          variant="outline"
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {tCommon('previous')}
        </Button>
        
        <Button
          onClick={goToNext}
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          {tCommon('next')}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}