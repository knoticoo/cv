'use client';

import { useState } from 'react';
import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { CVPDF } from '@/lib/pdf-generator';
import { sanitizeFileName } from '@/lib/utils';

interface PDFDownloadButtonProps {
  cvData: CVData;
  locale: string;
  className?: string;
}

export default function PDFDownloadButton({ cvData, locale, className }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!cvData.personalInfo.firstName || !cvData.personalInfo.lastName) {
      alert('Lūdzu, aizpildiet vārdu un uzvārdu, lai lejupielādētu CV.');
      return;
    }

    setIsGenerating(true);
    
    try {
      const doc = <CVPDF cvData={cvData} locale={locale} />;
      const blob = await pdf(doc).toBlob();
      
      const fileName = sanitizeFileName(
        `CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.pdf`
      );
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Kļūda PDF ģenerēšanā. Lūdzu, mēģiniet vēlreiz.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isGenerating}
      className={className}
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {isGenerating ? 'Ģenerē PDF...' : 'Lejupielādēt PDF'}
    </Button>
  );
}