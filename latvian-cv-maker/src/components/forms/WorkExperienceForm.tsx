'use client';

import { useTranslations } from 'next-intl';
import { CVData, WorkExperience } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Briefcase, X } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface WorkExperienceFormProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function WorkExperienceForm({ cvData, onUpdate }: WorkExperienceFormProps) {
  const t = useTranslations('workExperience');
  const tCommon = useTranslations('common');
  const tTips = useTranslations('tips');

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: generateId(),
      position: '',
      company: '',
      location: '',
      startDate: '',
      current: false,
      description: ''
    };

    onUpdate({
      workExperience: [...cvData.workExperience, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updatedExperience = cvData.workExperience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate({ workExperience: updatedExperience });
  };

  const removeExperience = (id: string) => {
    const filteredExperience = cvData.workExperience.filter(exp => exp.id !== id);
    onUpdate({ workExperience: filteredExperience });
  };

  const addAchievement = (experienceId: string) => {
    const updatedExperience = cvData.workExperience.map(exp =>
      exp.id === experienceId 
        ? { ...exp, achievements: [...(exp.achievements || []), ''] }
        : exp
    );
    onUpdate({ workExperience: updatedExperience });
  };

  const updateAchievement = (experienceId: string, index: number, value: string) => {
    const updatedExperience = cvData.workExperience.map(exp =>
      exp.id === experienceId 
        ? { 
            ...exp, 
            achievements: exp.achievements?.map((ach, i) => i === index ? value : ach) || []
          }
        : exp
    );
    onUpdate({ workExperience: updatedExperience });
  };

  const removeAchievement = (experienceId: string, index: number) => {
    const updatedExperience = cvData.workExperience.map(exp =>
      exp.id === experienceId 
        ? { 
            ...exp, 
            achievements: exp.achievements?.filter((_, i) => i !== index) || []
          }
        : exp
    );
    onUpdate({ workExperience: updatedExperience });
  };

  return (
    <div className="space-y-6">
      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 {tTips('workExperience')}
        </p>
      </div>

      {/* Experience Entries */}
      {cvData.workExperience.map((experience, index) => (
        <div key={experience.id} className="form-section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Darba pieredze {index + 1}
              </h3>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeExperience(experience.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`position-${experience.id}`}>{t('position')} *</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Programmatūras izstrādātājs"
                />
              </div>
              <div>
                <Label htmlFor={`company-${experience.id}`}>{t('company')} *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="SIA 'Tehnoloģiju uzņēmums'"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`location-${experience.id}`}>{t('location')}</Label>
              <Input
                id={`location-${experience.id}`}
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                placeholder="Rīga, Latvija"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`startDate-${experience.id}`}>{t('startDate')} *</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${experience.id}`}>{t('endDate')}</Label>
                <Input
                  id={`endDate-${experience.id}`}
                  type="date"
                  value={experience.endDate || ''}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  disabled={experience.current}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onChange={(e) => {
                    updateExperience(experience.id, 'current', e.target.checked);
                    if (e.target.checked) {
                      updateExperience(experience.id, 'endDate', '');
                    }
                  }}
                  className="rounded"
                />
                <Label htmlFor={`current-${experience.id}`}>{t('current')}</Label>
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${experience.id}`}>{t('description')} *</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                placeholder="Aprakstiet savus galvenos pienākumus un atbildības..."
                rows={4}
              />
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>{t('achievements')} ({tCommon('optional')})</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(experience.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Pievienot sasniegumu
                </Button>
              </div>
              {experience.achievements?.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                    placeholder="Piemēram: Palielināju pārdošanas apjomu par 25%"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAchievement(experience.id, achIndex)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Add Experience Button */}
      <div className="text-center">
        <Button onClick={addExperience} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          {t('addExperience')}
        </Button>
      </div>
    </div>
  );
}