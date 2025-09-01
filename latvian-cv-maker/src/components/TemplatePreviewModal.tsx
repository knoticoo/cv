'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, Eye, Check } from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';
import { CVData } from '@/types/cv';
import { CVTemplate } from '@/types/cv';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: CVTemplate | null;
  onSelectTemplate: (templateId: string) => void;
  selectedTemplate: string;
}

export default function TemplatePreviewModal({
  isOpen,
  onClose,
  template,
  onSelectTemplate,
  selectedTemplate
}: TemplatePreviewModalProps) {
  const [previewLocale, setPreviewLocale] = useState('lv');

  // Sample CV data for preview
  const sampleCVData: CVData = {
    id: 'preview',
    personalInfo: {
      firstName: 'Anna',
      lastName: 'Bērziņa',
      email: 'anna.berzina@email.com',
      phone: '+371 20000000',
      address: {
        street: 'Rīgas iela 123',
        city: 'Rīga',
        postalCode: 'LV-1001',
        country: 'Latvija'
      },
      dateOfBirth: '1990-05-15',
      nationality: 'Latviete',
      maritalStatus: 'Brīva',
      drivingLicense: ['B kategorija'],
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      website: 'www.annaberzina.lv',
      linkedin: 'linkedin.com/in/annaberzina',
      github: 'github.com/annaberzina'
    },
    professionalSummary: 'Pieredzējusi mārketinga speciāliste ar 5+ gadiem darba pieredzes digitālā mārketingā. Speciāliste sociālo tīklu stratēģiju izstrādē, satura veidošanā un klientu attiecību pārvaldībā. Veiksmīgi vadījusi vairākas mārketinga kampaņas, kas palielināja klientu bāzi un pārdošanas apjomus.',
    workExperience: [
      {
        id: '1',
        position: 'Galvenā mārketinga speciāliste',
        company: 'TechStart Latvia',
        location: 'Rīga, Latvija',
        startDate: '2022-01-01',
        endDate: undefined,
        current: true,
        description: 'Vadu digitālā mārketinga komandu un izstrādāju stratēģijas produktu pozicionēšanai.',
        achievements: [
          'Palielināju mājaslapas apmeklētāju skaitu par 150%',
          'Ieviešu jaunas sociālo tīklu stratēģijas',
          'Vadu 3 mārketinga speciālistu komandu'
        ]
      },
      {
        id: '2',
        position: 'Mārketinga speciāliste',
        company: 'Digital Solutions',
        location: 'Rīga, Latvija',
        startDate: '2020-03-01',
        endDate: '2021-12-31',
        current: false,
        description: 'Veidoju saturu sociālajiem tīkliem un vadīju e-pasta mārketinga kampaņas.',
        achievements: [
          'Palielināju e-pasta saraksta abonentu skaitu par 200%',
          'Izveidoju 50+ satura gabalus mēnesī',
          'Palielināju sociālo tīklu sekotāju skaitu par 300%'
        ]
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Maģistra grāds mārketingā',
        institution: 'Rīgas Ekonomikas augstskola',
        location: 'Rīga, Latvija',
        startDate: '2018-09-01',
        endDate: '2020-06-30',
        current: false,
        gpa: '9.2',
        description: 'Studēju digitālo mārketinga stratēģijas un klientu attiecību pārvaldību.',
        thesis: 'Digitālā mārketinga ietekme uz mazā un vidējā uzņēmējdarbību Latvijā'
      },
      {
        id: '2',
        degree: 'Bakalaura grāds biznesa vadībā',
        institution: 'Latvijas Universitāte',
        location: 'Rīga, Latvija',
        startDate: '2015-09-01',
        endDate: '2018-06-30',
        current: false,
        gpa: '8.8',
        description: 'Studēju uzņēmējdarbības pamatus un mārketinga principus.',
        thesis: 'Mārketinga stratēģiju analīze Latvijas uzņēmumiem'
      }
    ],
    skills: [
      {
        id: '1',
        name: 'Digitālais mārketings',
        category: 'Mārketings',
        proficiency: 'Expert'
      },
      {
        id: '2',
        name: 'Sociālie tīkli',
        category: 'Mārketings',
        proficiency: 'Advanced'
      },
      {
        id: '3',
        name: 'Satura veidošana',
        category: 'Kreativitāte',
        proficiency: 'Intermediate'
      }
    ],
          itSkills: [
        {
          id: '1',
          name: 'Google Analytics',
          category: 'Tool',
          proficiency: 'Advanced',
          yearsOfExperience: 4
        },
        {
          id: '2',
          name: 'Facebook Business Manager',
          category: 'Software',
          proficiency: 'Intermediate',
          yearsOfExperience: 3
        },
        {
          id: '3',
          name: 'Mailchimp',
          category: 'Software',
          proficiency: 'Intermediate',
          yearsOfExperience: 3
        },
        {
          id: '4',
          name: 'Canva',
          category: 'Tool',
          proficiency: 'Intermediate',
          yearsOfExperience: 2
        }
      ],
          languageSkills: [
        {
          id: '1',
          language: 'Latviešu',
          proficiency: 'Native'
        },
        {
          id: '2',
          language: 'Angļu',
          proficiency: 'C1'
        },
        {
          id: '3',
          language: 'Krievu',
          proficiency: 'B2'
        }
      ],
    references: [
      {
        id: '1',
        name: 'Jānis Ozols',
        position: 'Mārketinga direktors',
        company: 'TechStart Latvia',
        email: 'janis.ozols@techstart.lv',
        phone: '+371 20000001',
        relationship: 'Bijušais vadītājs'
      },
      {
        id: '2',
        name: 'Māra Kalniņa',
        position: 'Uzņēmējdarbības attīstības vadītāja',
        company: 'Digital Solutions',
        email: 'mara.kalnina@digitalsolutions.lv',
        phone: '+371 20000002',
        relationship: 'Bijušā vadītāja'
      }
    ],
    template: 'europass',
    language: 'lv',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!template) return null;

  const isSelected = selectedTemplate === template.id;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {template.name} - Priekšskatījums
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">{template.description}</p>
        </DialogHeader>

        {/* Template Preview Controls */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Valoda:</span>
              <select
                value={previewLocale}
                onChange={(e) => setPreviewLocale(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="lv">Latviešu</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Kategorija:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                template.category === 'europass' ? 'bg-blue-100 text-blue-800' :
                template.category === 'modern' ? 'bg-green-100 text-green-800' :
                template.category === 'traditional' ? 'bg-gray-100 text-gray-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {template.category === 'europass' ? 'Europass' :
                 template.category === 'modern' ? 'Modern' :
                 template.category === 'traditional' ? 'Traditional' : 'Creative'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {template.isPremium && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Premium
              </span>
            )}
            
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={() => {
                onSelectTemplate(template.id);
                onClose();
              }}
              className="flex items-center space-x-2"
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4" />
                  Izvēlēts
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Izmantot šo veidni
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Template Preview */}
        <div className="flex-1 overflow-auto border rounded-lg">
          <div className="bg-white">
            <TemplateRenderer
              cvData={sampleCVData}
              templateId={template.id}
              locale={previewLocale}
            />
          </div>
        </div>

        {/* Template Features */}
        <div className="flex-shrink-0 bg-gray-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Veidnes īpašības:</h3>
          <div className="flex flex-wrap gap-2">
            {template.isPremium && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                ✨ Premium dizains
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              📱 Responsive
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              🎨 Unikāls stils
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              🌍 Daudzvalodu atbalsts
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}