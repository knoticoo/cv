'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CVData } from '@/types/cv';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Share2, 
  Eye,
  EyeOff,
  Printer
} from 'lucide-react';
import CVPreview from '@/components/CVPreview';
import PDFDownloadButton from '@/components/PDFDownloadButton';

export default function CVPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const cvId = params.id as string;
  
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPrintStyles, setShowPrintStyles] = useState(false);

  useEffect(() => {
    if (cvId) {
      loadCV();
    }
  }, [cvId]);

  const loadCV = () => {
    const cv = storage.loadCV(cvId);
    if (cv) {
      setCVData(cv);
    } else {
      // CV not found, redirect to profile
      router.push('/profile');
    }
    setLoading(false);
  };

  const handleEdit = () => {
    router.push(`/create?id=${cvId}`);
  };

  const handleBack = () => {
    router.push('/profile');
  };

  const handlePrint = () => {
    setShowPrintStyles(true);
    setTimeout(() => {
      window.print();
      setShowPrintStyles(false);
    }, 100);
  };

  const getLanguageLabel = (lang: string) => {
    const labels = {
      lv: 'Latviešu',
      ru: 'Русский',
      en: 'English'
    };
    return labels[lang as keyof typeof labels] || lang;
  };

  const getTemplateLabel = (template: string) => {
    const labels = {
      modern: 'Modernais',
      europass: 'Europass',
      creative: 'Kreatīvais',
      minimalist: 'Minimālistiskais',
      portfolio: 'Portfolio',
      infographic: 'Infografika'
    };
    return labels[template as keyof typeof labels] || template;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm sm:text-base">Loading CV...</p>
        </div>
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="text-center py-12 max-w-md">
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">CV nav atrasts</h3>
            <p className="text-muted-foreground mb-6">
              Pieprasītais CV nav atrasts vai ir dzēsts.
            </p>
            <Button onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atpakaļ uz profilu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Atpakaļ
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold">
                  {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {getLanguageLabel(cvData.language)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {getTemplateLabel(cvData.template)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEdit}
              >
                <Edit className="w-4 h-4 mr-2" />
                Rediģēt
              </Button>
              <PDFDownloadButton 
                cvData={cvData} 
                locale="lv"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4 mr-2" />
                Drukāt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="container mx-auto px-3 sm:px-4 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <CVPreview 
            cvData={cvData} 
            onUpdate={() => {}} // Read-only in preview mode
          />
        </div>
      </div>

      {/* Print Styles */}
      {showPrintStyles && (
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .cv-preview, .cv-preview * {
              visibility: visible;
            }
            .cv-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}</style>
      )}
    </div>
  );
}