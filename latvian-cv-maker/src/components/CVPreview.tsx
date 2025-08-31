'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Printer, Share2, Eye, Palette } from 'lucide-react';
import PDFDownloadButton from './PDFDownloadButton';
import TemplateRenderer from './TemplateRenderer';
import TemplateSelector from './TemplateSelector';

interface CVPreviewProps {
  cvData: CVData;
  onUpdate?: (updates: Partial<CVData>) => void;
}

export default function CVPreview({ cvData, onUpdate }: CVPreviewProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);



  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Share CV');
  };

  const handleTemplateChange = (templateId: string) => {
    if (onUpdate) {
      onUpdate({ template: templateId });
    }
    setShowTemplateSelector(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Preview Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">CV Priekšskatījums</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowTemplateSelector(!showTemplateSelector)}
            >
              <Palette className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <PDFDownloadButton 
              cvData={cvData} 
              locale={locale}
              className="h-8 px-3 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Template Selector */}
      {showTemplateSelector && onUpdate && (
        <div className="p-4 border-b bg-gray-50">
          <TemplateSelector 
            cvData={cvData}
            onTemplateChange={handleTemplateChange}
            selectedTemplate={cvData.template}
          />
        </div>
      )}

      {/* CV Content */}
      <div className="cv-preview" style={{ minHeight: '297mm' }}>
        <TemplateRenderer 
          cvData={cvData}
          templateId={cvData.template}
          locale={locale}
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-500">
        Izveidots ar Latvian CV Maker • {new Date().getFullYear()}
      </div>
    </div>
  );
}