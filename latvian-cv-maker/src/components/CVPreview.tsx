'use client';

import { useTranslations, useLocale } from 'next-intl';
import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Print, Share2, Eye } from 'lucide-react';
import { formatDate, getLanguageLabel, getProficiencyLabel } from '@/lib/utils';
import PDFDownloadButton from './PDFDownloadButton';

interface CVPreviewProps {
  cvData: CVData;
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const t = useTranslations();
  const locale = useLocale();



  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Share CV');
  };

  const { personalInfo } = cvData;

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
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Print className="w-4 h-4" />
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

      {/* CV Content */}
      <div className="cv-preview p-8" style={{ minHeight: '297mm' }}>
        {/* Header Section */}
        <div className="flex items-start space-x-6 mb-8">
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-32 rounded-lg object-cover border"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="space-y-1 text-gray-600">
              {personalInfo.email && (
                <p>📧 {personalInfo.email}</p>
              )}
              {personalInfo.phone && (
                <p>📱 {personalInfo.phone}</p>
              )}
              {(personalInfo.address.street || personalInfo.address.city) && (
                <p>📍 {[personalInfo.address.street, personalInfo.address.city, personalInfo.address.country].filter(Boolean).join(', ')}</p>
              )}
              {personalInfo.linkedin && (
                <p>💼 <a href={personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn</a></p>
              )}
              {personalInfo.github && (
                <p>💻 <a href={personalInfo.github} className="text-blue-600 hover:underline">GitHub</a></p>
              )}
              {personalInfo.website && (
                <p>🌐 <a href={personalInfo.website} className="text-blue-600 hover:underline">Website</a></p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-primary pb-1">
              Profesionālais kopsavilkums
            </h2>
            <p className="text-gray-700 leading-relaxed">{cvData.professionalSummary}</p>
          </div>
        )}

        {/* Work Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Darba pieredze
            </h2>
            <div className="space-y-6">
              {cvData.workExperience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-primary pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(exp.startDate, locale)} - {exp.current ? 'tagad' : formatDate(exp.endDate || '', locale)}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Izglītība
            </h2>
            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-primary pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-primary font-medium">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(edu.startDate, locale)} - {edu.current ? 'tagad' : formatDate(edu.endDate || '', locale)}
                      </p>
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="text-gray-700 text-sm">Vidējā atzīme: {edu.gpa}</p>
                  )}
                  {edu.thesis && (
                    <p className="text-gray-700 text-sm">Diplomdarbs: {edu.thesis}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language Skills */}
        {cvData.languageSkills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Valodu prasmes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cvData.languageSkills.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{getLanguageLabel(lang.language, locale)}</span>
                    {lang.certifications && lang.certifications.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Sertifikāti: {lang.certifications.join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="skill-badge">
                    {getProficiencyLabel(lang.proficiency, locale)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IT Skills */}
        {cvData.itSkills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              IT prasmes
            </h2>
            <div className="space-y-3">
              {Object.entries(
                cvData.itSkills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof cvData.itSkills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill.id} className="skill-badge">
                        {skill.name} ({skill.proficiency})
                        {skill.yearsOfExperience && ` - ${skill.yearsOfExperience}g`}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Skills */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Citas prasmes
            </h2>
            <div className="space-y-3">
              {Object.entries(
                cvData.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof cvData.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill.id} className="skill-badge">
                        {skill.name}
                        {skill.proficiency && ` (${skill.proficiency})`}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {(personalInfo.dateOfBirth || personalInfo.nationality || personalInfo.maritalStatus || personalInfo.drivingLicense) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Papildu informācija
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {personalInfo.dateOfBirth && (
                <p><strong>Dzimšanas datums:</strong> {formatDate(personalInfo.dateOfBirth, locale)}</p>
              )}
              {personalInfo.nationality && (
                <p><strong>Tautība:</strong> {personalInfo.nationality}</p>
              )}
              {personalInfo.maritalStatus && (
                <p><strong>Ģimenes stāvoklis:</strong> {personalInfo.maritalStatus}</p>
              )}
              {personalInfo.drivingLicense && personalInfo.drivingLicense.length > 0 && (
                <p><strong>Autovadītāja apliecība:</strong> {personalInfo.drivingLicense.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        {/* References */}
        {cvData.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Atsauksmes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cvData.references.map((ref) => (
                <div key={ref.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                  <p className="text-gray-700">{ref.position}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-gray-600 text-sm">{ref.email}</p>
                  {ref.phone && <p className="text-gray-600 text-sm">{ref.phone}</p>}
                  <p className="text-gray-600 text-sm italic">{ref.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {cvData.hobbies && cvData.hobbies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Hobiji un intereses
            </h2>
            <div className="flex flex-wrap gap-2">
              {cvData.hobbies.map((hobby, index) => (
                <span key={index} className="skill-badge">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        {cvData.additionalInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-1">
              Papildu informācija
            </h2>
            <p className="text-gray-700 leading-relaxed">{cvData.additionalInfo}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-500">
        Izveidots ar Latvian CV Maker • {new Date().getFullYear()}
      </div>
    </div>
  );
}