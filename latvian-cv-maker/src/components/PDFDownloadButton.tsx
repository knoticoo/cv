'use client';

import { useState, useCallback } from 'react';
import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Download, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cvData.personalInfo.firstName || !cvData.personalInfo.lastName) {
      setError('Lūdzu, aizpildiet vārdu un uzvārdu, lai lejupielādētu CV.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Set a timeout for PDF generation (30 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('PDF ģenerēšana aizņēma pārāk daudz laika')), 30000);
      });
      
      const doc = <CVPDF cvData={cvData} locale={locale} />;
      const pdfPromise = pdf(doc).toBlob();
      
      const blob = await Promise.race([pdfPromise, timeoutPromise]) as Blob;
      
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
      
      setSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Kļūda PDF ģenerēšanā. Lūdzu, mēģiniet vēlreiz.');
      }
    } finally {
      setIsGenerating(false);
    }
  }, [cvData, locale]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccess(false);
  }, []);

  return (
    <div className="w-full">
      <Button 
        onClick={handleDownload} 
        disabled={isGenerating}
        className={className}
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : success ? (
          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {isGenerating ? 'Ģenerē PDF...' : success ? 'PDF Ģenerēts!' : 'Lejupielādēt PDF'}
      </Button>
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={clearError}
                className="text-xs text-red-600 hover:text-red-800 mt-1 underline"
              >
                Aizvērt
              </button>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-green-700">PDF veiksmīgi ģenerēts un lejupielādēts!</p>
              <button
                onClick={clearSuccess}
                className="text-xs text-green-600 hover:text-green-800 mt-1 underline"
              >
                Aizvērt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}