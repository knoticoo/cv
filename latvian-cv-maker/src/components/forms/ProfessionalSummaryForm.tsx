'use client';

import { useTranslations } from 'next-intl';
import { CVData } from '@/types/cv';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface ProfessionalSummaryFormProps {
  cvData: CVData;
  onUpdate: (updates: Partial<CVData>) => void;
}

export default function ProfessionalSummaryForm({ cvData, onUpdate }: ProfessionalSummaryFormProps) {
  const t = useTranslations();

  const updateSummary = (value: string) => {
    onUpdate({ professionalSummary: value });
  };

  return (
    <div className="form-section">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Profesionālais kopsavilkums</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 Īsumā aprakstiet savu profesionālo pieredzi, galvenās prasmes un karjeras mērķus. 
            Ideālais garums ir 3-4 teikumi.
          </p>
        </div>

        <div>
          <Label htmlFor="professionalSummary">
            Profesionālais kopsavilkums ({cvData.professionalSummary?.length || 0}/500)
          </Label>
          <Textarea
            id="professionalSummary"
            value={cvData.professionalSummary || ''}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Piemēram: Pieredzējis programmatūras izstrādātājs ar 5+ gadu pieredzi web aplikāciju izstrādē. Specializējos React un Node.js tehnoloģijās. Meklēju iespējas attīstīt savas prasmes starptautiskā komandā..."
            rows={6}
            maxLength={500}
          />
        </div>

        {/* Character count indicator */}
        <div className="flex justify-end">
          <span className={`text-xs ${
            (cvData.professionalSummary?.length || 0) > 450 
              ? 'text-red-500' 
              : 'text-gray-500'
          }`}>
            {cvData.professionalSummary?.length || 0}/500 rakstzīmes
          </span>
        </div>
      </div>
    </div>
  );
}