'use client';

import { useTranslations, useLocale } from 'next-intl';
import { CVData, LanguageSkill, ITSkill, Skill } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Languages, Code, Star } from 'lucide-react';
import { generateId, getLanguageLabel, getProficiencyLabel } from '@/lib/utils';

interface SkillsFormProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function SkillsForm({ cvData, onUpdate }: SkillsFormProps) {
  const t = useTranslations('skills');
  const tCommon = useTranslations('common');
  const tTips = useTranslations('tips');
  const locale = useLocale();

  // Language Skills
  const addLanguageSkill = () => {
    const newLanguageSkill: LanguageSkill = {
      id: generateId(),
      language: '',
      proficiency: 'A1'
    };
    onUpdate({
      languageSkills: [...cvData.languageSkills, newLanguageSkill]
    });
  };

  const updateLanguageSkill = (id: string, field: keyof LanguageSkill, value: any) => {
    const updated = cvData.languageSkills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onUpdate({ languageSkills: updated });
  };

  const removeLanguageSkill = (id: string) => {
    const filtered = cvData.languageSkills.filter(skill => skill.id !== id);
    onUpdate({ languageSkills: filtered });
  };

  // IT Skills
  const addITSkill = () => {
    const newITSkill: ITSkill = {
      id: generateId(),
      name: '',
      category: 'Programming',
      proficiency: 'Beginner'
    };
    onUpdate({
      itSkills: [...cvData.itSkills, newITSkill]
    });
  };

  const updateITSkill = (id: string, field: keyof ITSkill, value: any) => {
    const updated = cvData.itSkills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onUpdate({ itSkills: updated });
  };

  const removeITSkill = (id: string) => {
    const filtered = cvData.itSkills.filter(skill => skill.id !== id);
    onUpdate({ itSkills: filtered });
  };

  // Other Skills
  const addSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      category: 'Professional'
    };
    onUpdate({
      skills: [...cvData.skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    const updated = cvData.skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onUpdate({ skills: updated });
  };

  const removeSkill = (id: string) => {
    const filtered = cvData.skills.filter(skill => skill.id !== id);
    onUpdate({ skills: filtered });
  };

  const commonLanguages = ['lv', 'ru', 'en', 'de', 'fr', 'es', 'it'];
  const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];
  const itCategories = ['Programming', 'Software', 'Database', 'Framework', 'Tool', 'Other'];
  const skillProficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className="space-y-8">
      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 {tTips('skills')}
        </p>
      </div>

      {/* Language Skills */}
      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{t('languageSkills')}</h3>
          </div>
          <Button variant="outline" size="sm" onClick={addLanguageSkill}>
            <Plus className="w-4 h-4 mr-1" />
            {t('addLanguage')}
          </Button>
        </div>

        <div className="space-y-4">
          {cvData.languageSkills.map((languageSkill) => (
            <div key={languageSkill.id} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label>{t('language')} *</Label>
                <Select
                  value={languageSkill.language}
                  onValueChange={(value) => updateLanguageSkill(languageSkill.id, 'language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Izvēlieties valodu" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonLanguages.map(lang => (
                      <SelectItem key={lang} value={lang}>
                        {getLanguageLabel(lang, locale)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t('proficiency')} *</Label>
                <Select
                  value={languageSkill.proficiency}
                  onValueChange={(value) => updateLanguageSkill(languageSkill.id, 'proficiency', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Izvēlieties līmeni" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map(level => (
                      <SelectItem key={level} value={level}>
                        {getProficiencyLabel(level, locale)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t('certifications')}</Label>
                <Input
                  value={languageSkill.certifications?.join(', ') || ''}
                  onChange={(e) => updateLanguageSkill(
                    languageSkill.id, 
                    'certifications', 
                    e.target.value.split(', ').filter(Boolean)
                  )}
                  placeholder="IELTS, TOEFL, utt."
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeLanguageSkill(languageSkill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IT Skills */}
      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{t('itSkills')}</h3>
          </div>
          <Button variant="outline" size="sm" onClick={addITSkill}>
            <Plus className="w-4 h-4 mr-1" />
            {t('addITSkill')}
          </Button>
        </div>

        <div className="space-y-4">
          {cvData.itSkills.map((itSkill) => (
            <div key={itSkill.id} className="grid md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Nosaukums *</Label>
                <Input
                  value={itSkill.name}
                  onChange={(e) => updateITSkill(itSkill.id, 'name', e.target.value)}
                  placeholder="JavaScript, Python, utt."
                />
              </div>
              <div>
                <Label>{t('category')}</Label>
                <Select
                  value={itSkill.category}
                  onValueChange={(value) => updateITSkill(itSkill.id, 'category', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {itCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t('proficiency')}</Label>
                <Select
                  value={itSkill.proficiency}
                  onValueChange={(value) => updateITSkill(itSkill.id, 'proficiency', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillProficiencies.map(prof => (
                      <SelectItem key={prof} value={prof}>
                        {prof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t('yearsOfExperience')}</Label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={itSkill.yearsOfExperience || ''}
                  onChange={(e) => updateITSkill(itSkill.id, 'yearsOfExperience', parseInt(e.target.value) || undefined)}
                  placeholder="Gadi"
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeITSkill(itSkill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Skills */}
      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{t('otherSkills')}</h3>
          </div>
          <Button variant="outline" size="sm" onClick={addSkill}>
            <Plus className="w-4 h-4 mr-1" />
            {t('addSkill')}
          </Button>
        </div>

        <div className="space-y-4">
          {cvData.skills.map((skill) => (
            <div key={skill.id} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Nosaukums *</Label>
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  placeholder="Komandas vadība, Projektu vadība"
                />
              </div>
              <div>
                <Label>{t('category')}</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  placeholder="Profesionālās, Personīgās"
                />
              </div>
              <div>
                <Label>{t('proficiency')}</Label>
                <Select
                  value={skill.proficiency || ''}
                  onValueChange={(value) => updateSkill(skill.id, 'proficiency', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Izvēlieties līmeni" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillProficiencies.map(prof => (
                      <SelectItem key={prof} value={prof}>
                        {prof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}