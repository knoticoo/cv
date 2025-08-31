'use client';

import { useTranslations } from 'next-intl';
import { CVData, Education } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface EducationFormProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function EducationForm({ cvData, onUpdate }: EducationFormProps) {
  const t = useTranslations('education');
  const tCommon = useTranslations('common');
  const tTips = useTranslations('tips');

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      current: false
    };

    onUpdate({
      education: [...cvData.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updatedEducation = cvData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate({ education: updatedEducation });
  };

  const removeEducation = (id: string) => {
    const filteredEducation = cvData.education.filter(edu => edu.id !== id);
    onUpdate({ education: filteredEducation });
  };

  return (
    <div className="space-y-6">
      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 {tTips('education')}
        </p>
      </div>

      {/* Education Entries */}
      {cvData.education.map((education, index) => (
        <div key={education.id} className="form-section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Izglītība {index + 1}
              </h3>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeEducation(education.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor={`degree-${education.id}`}>{t('degree')} *</Label>
              <Input
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                placeholder="Bakalaura grāds datorzinātnēs"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${education.id}`}>{t('institution')} *</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="Latvijas Universitāte"
                />
              </div>
              <div>
                <Label htmlFor={`location-${education.id}`}>{t('location')}</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  placeholder="Rīga, Latvija"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`startDate-${education.id}`}>{t('startDate')} *</Label>
                <Input
                  id={`startDate-${education.id}`}
                  type="date"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${education.id}`}>{t('endDate')}</Label>
                <Input
                  id={`endDate-${education.id}`}
                  type="date"
                  value={education.endDate || ''}
                  onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                  disabled={education.current}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id={`current-${education.id}`}
                  checked={education.current}
                  onChange={(e) => {
                    updateEducation(education.id, 'current', e.target.checked);
                    if (e.target.checked) {
                      updateEducation(education.id, 'endDate', '');
                    }
                  }}
                  className="rounded"
                />
                <Label htmlFor={`current-${education.id}`}>{t('current')}</Label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`gpa-${education.id}`}>{t('gpa')}</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="8.5/10 vai Magna Cum Laude"
                />
              </div>
              <div>
                <Label htmlFor={`thesis-${education.id}`}>{t('thesis')}</Label>
                <Input
                  id={`thesis-${education.id}`}
                  value={education.thesis || ''}
                  onChange={(e) => updateEducation(education.id, 'thesis', e.target.value)}
                  placeholder="Diplomdarba nosaukums"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${education.id}`}>{t('description')}</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description || ''}
                onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                placeholder="Papildu informācija par studijām, specializāciju, projektiem..."
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <div className="text-center">
        <Button onClick={addEducation} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          {t('addEducation')}
        </Button>
      </div>
    </div>
  );
}