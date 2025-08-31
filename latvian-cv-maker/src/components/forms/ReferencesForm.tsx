'use client';

import { useTranslations } from 'next-intl';
import { CVData, Reference } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Users } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface ReferencesFormProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function ReferencesForm({ cvData, onUpdate }: ReferencesFormProps) {
  const t = useTranslations('references');
  const tCommon = useTranslations('common');

  const addReference = () => {
    const newReference: Reference = {
      id: generateId(),
      name: '',
      position: '',
      company: '',
      email: '',
      relationship: ''
    };

    onUpdate({
      references: [...cvData.references, newReference]
    });
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    const updatedReferences = cvData.references.map(ref =>
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    onUpdate({ references: updatedReferences });
  };

  const removeReference = (id: string) => {
    const filteredReferences = cvData.references.filter(ref => ref.id !== id);
    onUpdate({ references: filteredReferences });
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          ℹ️ Atsauksmes parasti pieprasa pēc vajadzības. Varat atstāt šo sadaļu tukšu un pievienot vēlāk.
        </p>
      </div>

      {/* Reference Entries */}
      {cvData.references.map((reference, index) => (
        <div key={reference.id} className="form-section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Atsauksme {index + 1}
              </h3>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeReference(reference.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${reference.id}`}>{t('name')} *</Label>
                <Input
                  id={`name-${reference.id}`}
                  value={reference.name}
                  onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                  placeholder="Anna Kalniņa"
                />
              </div>
              <div>
                <Label htmlFor={`position-${reference.id}`}>{t('position')} *</Label>
                <Input
                  id={`position-${reference.id}`}
                  value={reference.position}
                  onChange={(e) => updateReference(reference.id, 'position', e.target.value)}
                  placeholder="Projektu vadītāja"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`company-${reference.id}`}>{t('company')} *</Label>
              <Input
                id={`company-${reference.id}`}
                value={reference.company}
                onChange={(e) => updateReference(reference.id, 'company', e.target.value)}
                placeholder="SIA 'Uzņēmums'"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`email-${reference.id}`}>{t('email')} *</Label>
                <Input
                  id={`email-${reference.id}`}
                  type="email"
                  value={reference.email}
                  onChange={(e) => updateReference(reference.id, 'email', e.target.value)}
                  placeholder="anna.kalnina@uznemums.lv"
                />
              </div>
              <div>
                <Label htmlFor={`phone-${reference.id}`}>{t('phone')}</Label>
                <Input
                  id={`phone-${reference.id}`}
                  type="tel"
                  value={reference.phone || ''}
                  onChange={(e) => updateReference(reference.id, 'phone', e.target.value)}
                  placeholder="+371 20123456"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`relationship-${reference.id}`}>{t('relationship')} *</Label>
              <Input
                id={`relationship-${reference.id}`}
                value={reference.relationship}
                onChange={(e) => updateReference(reference.id, 'relationship', e.target.value)}
                placeholder="Tiešais vadītājs, Kolēģis, Klients"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Reference Button */}
      <div className="text-center">
        <Button onClick={addReference} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          {t('addReference')}
        </Button>
      </div>
    </div>
  );
}