'use client';

import { useTranslations } from 'next-intl';
import { CVData, PersonalInfo } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface PersonalInfoFormProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function PersonalInfoForm({ cvData, onUpdate }: PersonalInfoFormProps) {
  const t = useTranslations('personalInfo');
  const tCommon = useTranslations('common');
  const tTips = useTranslations('tips');
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    cvData.personalInfo.photo || null
  );

  const updatePersonalInfo = (field: keyof PersonalInfo | string, value: any) => {
    if (field.includes('.')) {
      // Handle nested fields like address.city
      const [parent, child] = field.split('.');
      onUpdate({
        personalInfo: {
          ...cvData.personalInfo,
          [parent]: {
            ...(cvData.personalInfo as any)[parent],
            [child]: value
          }
        }
      });
    } else {
      onUpdate({
        personalInfo: {
          ...cvData.personalInfo,
          [field]: value
        }
      });
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        updatePersonalInfo('photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    updatePersonalInfo('photo', '');
  };

  return (
    <div className="space-y-6">
      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 {tTips('personalInfo')}
        </p>
      </div>

      {/* Photo Upload */}
      <div className="form-section">
        <Label className="text-base font-semibold">{t('photo')}</Label>
        <div className="flex items-center space-x-4 mt-2">
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="CV Photo"
                className="w-24 h-24 rounded-lg object-cover border"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 w-6 h-6"
                onClick={removePhoto}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <Label htmlFor="photo-upload">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Augšupielādēt foto
                </span>
              </Button>
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG vai GIF. Maksimālais izmērs: 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="form-section">
        <h3 className="text-lg font-semibold mb-4">Pamata informācija</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">{t('firstName')} *</Label>
            <Input
              id="firstName"
              value={cvData.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              placeholder="Jānis"
            />
          </div>
          <div>
            <Label htmlFor="lastName">{t('lastName')} *</Label>
            <Input
              id="lastName"
              value={cvData.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              placeholder="Bērziņš"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">{t('email')} *</Label>
            <Input
              id="email"
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="janis.berzins@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">{t('phone')} *</Label>
            <Input
              id="phone"
              type="tel"
              value={cvData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+371 20123456"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="form-section">
        <h3 className="text-lg font-semibold mb-4">{t('address')}</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">{t('street')}</Label>
            <Input
              id="street"
              value={cvData.personalInfo.address.street}
              onChange={(e) => updatePersonalInfo('address.street', e.target.value)}
              placeholder="Brīvības iela 123"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">{t('city')} *</Label>
              <Input
                id="city"
                value={cvData.personalInfo.address.city}
                onChange={(e) => updatePersonalInfo('address.city', e.target.value)}
                placeholder="Rīga"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">{t('postalCode')}</Label>
              <Input
                id="postalCode"
                value={cvData.personalInfo.address.postalCode}
                onChange={(e) => updatePersonalInfo('address.postalCode', e.target.value)}
                placeholder="LV-1010"
              />
            </div>
            <div>
              <Label htmlFor="country">{t('country')}</Label>
              <Input
                id="country"
                value={cvData.personalInfo.address.country}
                onChange={(e) => updatePersonalInfo('address.country', e.target.value)}
                placeholder="Latvija"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="form-section">
        <h3 className="text-lg font-semibold mb-4">Papildu informācija</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={cvData.personalInfo.dateOfBirth || ''}
              onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="nationality">{t('nationality')}</Label>
            <Input
              id="nationality"
              value={cvData.personalInfo.nationality || ''}
              onChange={(e) => updatePersonalInfo('nationality', e.target.value)}
              placeholder="Latviešu"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maritalStatus">{t('maritalStatus')}</Label>
            <Input
              id="maritalStatus"
              value={cvData.personalInfo.maritalStatus || ''}
              onChange={(e) => updatePersonalInfo('maritalStatus', e.target.value)}
              placeholder="Neprecējies/Neprecējusies"
            />
          </div>
          <div>
            <Label htmlFor="drivingLicense">{t('drivingLicense')}</Label>
            <Input
              id="drivingLicense"
              value={cvData.personalInfo.drivingLicense?.join(', ') || ''}
              onChange={(e) => updatePersonalInfo('drivingLicense', e.target.value.split(', ').filter(Boolean))}
              placeholder="B kategorija"
            />
          </div>
        </div>
      </div>

      {/* Online Presence */}
      <div className="form-section">
        <h3 className="text-lg font-semibold mb-4">Tiešsaistes klātbūtne</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="website">{t('website')}</Label>
            <Input
              id="website"
              type="url"
              value={cvData.personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="https://www.jūsu-mājaslapa.lv"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">{t('linkedin')}</Label>
            <Input
              id="linkedin"
              type="url"
              value={cvData.personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/jūsu-profils"
            />
          </div>
          <div>
            <Label htmlFor="github">{t('github')}</Label>
            <Input
              id="github"
              type="url"
              value={cvData.personalInfo.github || ''}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              placeholder="https://github.com/jūsu-lietotājvārds"
            />
          </div>
        </div>
      </div>
    </div>
  );
}