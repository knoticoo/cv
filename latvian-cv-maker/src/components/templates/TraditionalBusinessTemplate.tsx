'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface TraditionalBusinessTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function TraditionalBusinessTemplate({ cvData, locale }: TraditionalBusinessTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white traditional-business-cv" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Centered Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        {/* Contact Information */}
        <div className="text-gray-700 space-y-1">
          {personalInfo.address.street && (
            <p>{personalInfo.address.street}, {personalInfo.address.city}, {personalInfo.address.postalCode}</p>
          )}
          {personalInfo.phone && <p>Tel: {personalInfo.phone}</p>}
          {personalInfo.email && <p>Email: {personalInfo.email}</p>}
          {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
        </div>

        {/* Photo - Centered above contact info */}
        {personalInfo.photo && (
          <div className="mt-4 mb-4">
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-32 object-cover border border-gray-400 mx-auto"
            />
          </div>
        )}
      </div>

      {/* Main Content - Single Column Layout */}
      <div className="max-w-4xl mx-auto px-8">
        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
              PROFESIONĀLAIS KOPSAVILKUMS
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {cvData.professionalSummary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              DARBA PIEREDZE
            </h2>
            <div className="space-y-6">
              {cvData.workExperience.map((exp, index) => (
                <div key={exp.id} className="border-l-4 border-gray-400 pl-6">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-semibold">{exp.company}</p>
                    <p className="text-gray-600 text-sm">
                      {formatDate(exp.startDate, locale)} - {exp.current ? 'Pašlaik' : (exp.endDate ? formatDate(exp.endDate, locale) : '')}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-2 text-justify">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="ml-4">
                      <p className="text-gray-700 font-medium mb-1">Galvenie sasniegumi:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              IZGLĪTĪBA
            </h2>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-400 pl-6">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 font-semibold">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">
                    {formatDate(edu.startDate, locale)} - {edu.current ? 'Pašlaik' : (edu.endDate ? formatDate(edu.endDate, locale) : '')}
                    {edu.location && ` | ${edu.location}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-gray-600 text-sm">Vidējā atzīme: {edu.gpa}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-700 mt-2 text-justify">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {(cvData.skills.length > 0 || cvData.itSkills.length > 0) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              PRASMES
            </h2>
            
            {/* Professional Skills */}
            {cvData.skills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Profesionālās prasmes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cvData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-gray-700">• {skill.name}</span>
                      {skill.proficiency && (
                        <span className="text-gray-500 text-sm">({skill.proficiency})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IT Skills */}
            {cvData.itSkills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">IT prasmes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cvData.itSkills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-gray-700">• {skill.name}</span>
                      {skill.proficiency && (
                        <span className="text-gray-500 text-sm">({skill.proficiency})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Skills */}
            {cvData.languageSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Valodu prasmes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cvData.languageSkills.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">• {lang.language}</span>
                      <span className="text-gray-600 font-medium">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {cvData.skills.some(skill => skill.proficiency === 'Expert') && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              EKSPERTA PRASMES
            </h2>
            <div className="space-y-2">
              {cvData.skills
                .filter(skill => skill.proficiency === 'Expert')
                .map((skill, index) => (
                  <div key={index} className="border-l-4 border-gray-400 pl-6">
                    <p className="text-gray-700">
                      <span className="font-semibold">{skill.name}:</span> Eksperta līmenis
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* References */}
        {cvData.references.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              ATSAUKSMES
            </h2>
            <div className="space-y-4">
              {cvData.references.map((ref, index) => (
                <div key={index} className="border-l-4 border-gray-400 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">{ref.name}</h3>
                  <p className="text-gray-700">{ref.position} at {ref.company}</p>
                  <p className="text-gray-600 text-sm">{ref.email}</p>
                  {ref.phone && <p className="text-gray-600 text-sm">Tel: {ref.phone}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            PAPILDU INFORMĀCIJA
          </h2>
          <div className="space-y-2 text-gray-700">
            {personalInfo.nationality && (
              <p><span className="font-semibold">Pilsonība:</span> {personalInfo.nationality}</p>
            )}
            {personalInfo.dateOfBirth && (
              <p><span className="font-semibold">Dzimšanas datums:</span> {formatDate(personalInfo.dateOfBirth, locale)}</p>
            )}
            {personalInfo.drivingLicense && (
              <p><span className="font-semibold">Autovadītāja apliecība:</span> {personalInfo.drivingLicense}</p>
            )}
            {personalInfo.website && (
              <p><span className="font-semibold">Mājaslapa:</span> {personalInfo.website}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}