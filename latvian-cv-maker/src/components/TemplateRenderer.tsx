'use client';

import { CVData } from '@/types/cv';
import EuropassTemplate from './templates/EuropassTemplate';
import ModernProfessionalTemplate from './templates/ModernProfessionalTemplate';
import TraditionalBusinessTemplate from './templates/TraditionalBusinessTemplate';
import CreativeDesignerTemplate from './templates/CreativeDesignerTemplate';
import CreativeMinimalistTemplate from './templates/CreativeMinimalistTemplate';
import CreativeColorfulTemplate from './templates/CreativeColorfulTemplate';
import CreativeInfographicTemplate from './templates/CreativeInfographicTemplate';
import CreativePortfolioTemplate from './templates/CreativePortfolioTemplate';

interface TemplateRendererProps {
  cvData: CVData;
  templateId: string;
  locale: string;
}

export default function TemplateRenderer({ cvData, templateId, locale }: TemplateRendererProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case 'europass':
        return <EuropassTemplate cvData={cvData} locale={locale} />;
      case 'modern-professional':
        return <ModernProfessionalTemplate cvData={cvData} locale={locale} />;
      case 'traditional-business':
        return <TraditionalBusinessTemplate cvData={cvData} locale={locale} />;
      case 'creative-designer':
        return <CreativeDesignerTemplate cvData={cvData} locale={locale} />;
      case 'creative-minimalist':
        return <CreativeMinimalistTemplate cvData={cvData} locale={locale} />;
      case 'creative-colorful':
        return <CreativeColorfulTemplate cvData={cvData} locale={locale} />;
      case 'creative-infographic':
        return <CreativeInfographicTemplate cvData={cvData} locale={locale} />;
      case 'creative-portfolio':
        return <CreativePortfolioTemplate cvData={cvData} locale={locale} />;
      default:
        // Default to the original preview component for basic templates
        return (
          <div className="bg-white p-8">
            <div className="flex items-start space-x-6 mb-8">
              {cvData.personalInfo.photo && (
                <img
                  src={cvData.personalInfo.photo}
                  alt={`${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`}
                  className="w-32 h-32 rounded-lg object-cover border"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                </h1>
                <div className="space-y-1 text-gray-600">
                  {cvData.personalInfo.email && <p>📧 {cvData.personalInfo.email}</p>}
                  {cvData.personalInfo.phone && <p>📱 {cvData.personalInfo.phone}</p>}
                  {cvData.personalInfo.address.city && (
                    <p>📍 {cvData.personalInfo.address.city}, {cvData.personalInfo.address.country}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Basic sections for default templates */}
            {cvData.professionalSummary && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-primary pb-1">
                  Profesionālais kopsavilkums
                </h2>
                <p className="text-gray-700">{cvData.professionalSummary}</p>
              </div>
            )}
            
            {/* Add other sections as needed for basic templates */}
          </div>
        );
    }
  };

  return (
    <div className="cv-template-container">
      {renderTemplate()}
    </div>
  );
}