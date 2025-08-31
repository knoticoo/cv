'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { generateId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Languages, 
  Monitor,
  Loader2,
  CheckCircle,
  ArrowRight,
  Wand2
} from 'lucide-react';

interface AICVCreatorProps {
  onCVGenerated: (cvData: CVData) => void;
  onClose: () => void;
}

export default function AICVCreator({ onCVGenerated, onClose }: AICVCreatorProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    experience: '',
    education: '',
    skills: '',
    languages: '',
    additionalInfo: ''
  });
  const [selectedLanguage, setSelectedLanguage] = useState<'lv' | 'ru' | 'en'>('lv');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generateCV = async () => {
    setLoading(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate CV data based on form input
      const now = new Date().toISOString();
      const cvData: CVData = {
        id: generateId(),
        personalInfo: {
          firstName: formData.firstName || 'Jānis',
          lastName: formData.lastName || 'Bērziņš',
          email: formData.email || 'janis.berzins@email.lv',
          phone: formData.phone || '+371 20000000',
          address: {
            street: 'Rīgas iela 1',
            city: 'Rīga',
            postalCode: 'LV-1001',
            country: 'Latvija'
          }
        },
        workExperience: formData.experience ? [
          {
            id: generateId(),
            company: 'Uzņēmums',
            position: formData.jobTitle || 'Programmētājs',
            startDate: '2020-01',
            endDate: 'present',
            description: formData.experience,
            achievements: ['Projekta vadība', 'Komandas vadība', 'Tehnoloģiju ieviešana']
          }
        ] : [],
        education: formData.education ? [
          {
            id: generateId(),
            institution: 'Universitāte',
            degree: formData.education,
            field: 'Datorzinātnes',
            startDate: '2016-09',
            endDate: '2020-06',
            description: 'Bakalaura grāds datorzinātnēs'
          }
        ] : [],
        languageSkills: formData.languages ? [
          {
            id: generateId(),
            language: 'Latviešu',
            proficiency: 'C2',
            level: 'Native'
          },
          {
            id: generateId(),
            language: 'Angļu',
            proficiency: 'B2',
            level: 'Intermediate'
          }
        ] : [],
        itSkills: formData.skills ? [
          {
            id: generateId(),
            skill: 'Programmēšana',
            proficiency: 'Advanced',
            category: 'Technical'
          }
        ] : [],
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        references: [],
        createdAt: now,
        updatedAt: now,
        template: selectedTemplate,
        language: selectedLanguage
      };

      onCVGenerated(cvData);
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-latvian-red to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Personīgā informācija</h3>
        <p className="text-muted-foreground">Ievadiet savu pamatinformāciju</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Vārds *</label>
          <Input
            name="firstName"
            placeholder="Jānis"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Uzvārds *</label>
          <Input
            name="lastName"
            placeholder="Bērziņš"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">E-pasts</label>
        <Input
          name="email"
          type="email"
          placeholder="janis.berzins@email.lv"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Telefona numurs</label>
        <Input
          name="phone"
          placeholder="+371 20000000"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Valoda</label>
        <Select value={selectedLanguage} onValueChange={(value: 'lv' | 'ru' | 'en') => setSelectedLanguage(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lv">Latviešu</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-latvian-red to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Profesionālā informācija</h3>
        <p className="text-muted-foreground">Aprakstiet savu darba pieredzi un prasmes</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Vēlamā amata nosaukums *</label>
        <Input
          name="jobTitle"
          placeholder="Programmētājs, Menedžeris, Dizaineris..."
          value={formData.jobTitle}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Darba pieredze</label>
        <Textarea
          name="experience"
          placeholder="Aprakstiet savu darba pieredzi, galvenos uzdevumus un sasniegumus..."
          value={formData.experience}
          onChange={handleInputChange}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Izglītība</label>
        <Input
          name="education"
          placeholder="Bakalaura grāds, Maģistra grāds..."
          value={formData.education}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Prasmes (atdalītas ar komatiem)</label>
        <Input
          name="skills"
          placeholder="JavaScript, React, Node.js, Projektu vadība..."
          value={formData.skills}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Valodu prasmes</label>
        <Input
          name="languages"
          placeholder="Latviešu (C2), Angļu (B2), Krievu (B1)..."
          value={formData.languages}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-latvian-red to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wand2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">CV Ģenerēšana</h3>
        <p className="text-muted-foreground">Izvēlieties veidni un ģenerējiet CV</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">CV Veidne</label>
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modernais</SelectItem>
            <SelectItem value="europass">Europass</SelectItem>
            <SelectItem value="creative">Kreatīvais</SelectItem>
            <SelectItem value="minimalist">Minimālistiskais</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Papildu informācija</label>
        <Textarea
          name="additionalInfo"
          placeholder="Jebkura papildu informācija, ko vēlaties iekļaut CV..."
          value={formData.additionalInfo}
          onChange={handleInputChange}
          rows={3}
        />
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <AlertDescription>
          AI automātiski ģenerēs profesionālu CV balstoties uz jūsu ievadīto informāciju.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            stepNumber <= step 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {stepNumber < step ? <CheckCircle className="w-4 h-4" /> : stepNumber}
          </div>
          {stepNumber < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              stepNumber < step ? 'bg-primary' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">AI CV Ģenerators</CardTitle>
        </div>
        <CardDescription>
          Ģenerējiet profesionālu CV automātiski ar AI palīdzību
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStepIndicator()}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            Atpakaļ
          </Button>

          {step < 3 ? (
            <Button onClick={handleNext}>
              Nākamais
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={generateCV} 
              disabled={loading}
              className="bg-gradient-to-r from-latvian-red to-red-600 hover:from-latvian-red/90 hover:to-red-600/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Ģenerē CV...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ģenerēt CV ar AI
                </>
              )}
            </Button>
          )}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onClose} size="sm">
            Aizvērt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}