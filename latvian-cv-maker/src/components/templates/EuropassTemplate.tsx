'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel, getProficiencyLabel } from '@/lib/utils';

interface EuropassTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function EuropassTemplate({ cvData, locale }: EuropassTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white p-8 europass-cv" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Europass Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">CURRICULUM VITAE</h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
      </div>

      {/* Personal Information Section */}
      <div className="mb-8">
        <div className="flex items-start space-x-6">
          {/* Photo */}
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-40 object-cover border border-gray-300"
                style={{ borderRadius: '0' }}
              />
            </div>
          )}
          
          {/* Personal Details */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide">
              PERSONĀLĀ INFORMĀCIJA
            </h2>
            
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <span className="font-semibold text-gray-700">Vārds, uzvārds:</span>
                <span className="col-span-2">{personalInfo.firstName} {personalInfo.lastName}</span>
              </div>
              
              {personalInfo.address.street && (
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-semibold text-gray-700">Adrese:</span>
                  <span className="col-span-2">
                    {[personalInfo.address.street, personalInfo.address.city, personalInfo.address.postalCode, personalInfo.address.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-semibold text-gray-700">Tālrunis:</span>
                  <span className="col-span-2">{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.email && (
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-semibold text-gray-700">E-pasts:</span>
                  <span className="col-span-2">{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.nationality && (
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-semibold text-gray-700">Pilsonība:</span>
                  <span className="col-span-2">{personalInfo.nationality}</span>
                </div>
              )}
              
              {personalInfo.dateOfBirth && (
                <div className="grid grid-cols-3 gap-4">
                  <span className="font-semibold text-gray-700">Dzimšanas datums:</span>
                  <span className="col-span-2">{formatDate(personalInfo.dateOfBirth, locale)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide">
            DARBA PIEREDZE
          </h2>
          
          {cvData.workExperience.map((exp, index) => (
            <div key={exp.id} className="mb-6">
              <div className="grid grid-cols-4 gap-4 mb-2">
                <div className="font-semibold text-gray-700">
                  {formatDate(exp.startDate, locale)} – {exp.current ? 'šobrīd' : formatDate(exp.endDate || '', locale)}
                </div>
                <div className="col-span-3">
                  <div className="font-semibold text-gray-900">{exp.position}</div>
                  <div className="text-blue-700 font-medium">{exp.company}</div>
                  {exp.location && <div className="text-gray-600 text-sm">{exp.location}</div>}
                </div>
              </div>
              
              {exp.description && (
                <div className="grid grid-cols-4 gap-4">
                  <div></div>
                  <div className="col-span-3 text-gray-700 text-sm">
                    {exp.description}
                  </div>
                </div>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div></div>
                  <div className="col-span-3">
                    <ul className="text-gray-700 text-sm space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide">
            IZGLĪTĪBA UN APMĀCĪBA
          </h2>
          
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="font-semibold text-gray-700">
                  {formatDate(edu.startDate, locale)} – {edu.current ? 'šobrīd' : formatDate(edu.endDate || '', locale)}
                </div>
                <div className="col-span-3">
                  <div className="font-semibold text-gray-900">{edu.degree}</div>
                  <div className="text-blue-700 font-medium">{edu.institution}</div>
                  {edu.location && <div className="text-gray-600 text-sm">{edu.location}</div>}
                  {edu.gpa && <div className="text-gray-600 text-sm">Vidējā atzīme: {edu.gpa}</div>}
                  {edu.thesis && <div className="text-gray-600 text-sm">Diplomdarbs: {edu.thesis}</div>}
                  {edu.description && <div className="text-gray-700 text-sm mt-1">{edu.description}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Personal Skills */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide">
          PERSONĪGĀS PRASMES
        </h2>

        {/* Language Skills */}
        {cvData.languageSkills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Dzimtā valoda(-s)</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="font-semibold text-gray-700">Valoda(-s):</div>
              <div className="col-span-3">
                {cvData.languageSkills
                  .filter(lang => lang.proficiency === 'Native')
                  .map(lang => getLanguageLabel(lang.language, locale))
                  .join(', ') || 'Nav norādīts'}
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-3">Citas valodas</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-semibold text-gray-700">Izpratne</div>
              <div className="font-semibold text-gray-700">Runāšana</div>
              <div className="font-semibold text-gray-700">Rakstīšana</div>
              <div></div>
            </div>
            
            {cvData.languageSkills
              .filter(lang => lang.proficiency !== 'Native')
              .map((lang) => (
                <div key={lang.id} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
                  <div className="font-medium">{getLanguageLabel(lang.language, locale)}</div>
                  <div className="text-center">{lang.proficiency}</div>
                  <div className="text-center">{lang.proficiency}</div>
                  <div className="text-center">{lang.proficiency}</div>
                </div>
              ))}
          </div>
        )}

        {/* Digital Skills */}
        {cvData.itSkills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Digitālās prasmes</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="font-semibold text-gray-700">Prasmes:</div>
              <div className="col-span-3">
                <div className="space-y-2">
                  {Object.entries(
                    cvData.itSkills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(`${skill.name} (${skill.proficiency})`);
                      return acc;
                    }, {} as Record<string, string[]>)
                  ).map(([category, skills]) => (
                    <div key={category}>
                      <span className="font-medium">{category}:</span> {skills.join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Skills */}
        {cvData.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Citas prasmes</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="font-semibold text-gray-700">Prasmes:</div>
              <div className="col-span-3">
                {cvData.skills.map(skill => skill.name).join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* Driving License */}
        {personalInfo.drivingLicense && personalInfo.drivingLicense.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Autovadītāja apliecība</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="font-semibold text-gray-700">Kategorija:</div>
              <div className="col-span-3">{personalInfo.drivingLicense.join(', ')}</div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      {(cvData.additionalInfo || cvData.hobbies) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide">
            PAPILDU INFORMĀCIJA
          </h2>
          
          {cvData.hobbies && cvData.hobbies.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="font-semibold text-gray-700">Hobiji:</div>
              <div className="col-span-3">{cvData.hobbies.join(', ')}</div>
            </div>
          )}
          
          {cvData.additionalInfo && (
            <div className="grid grid-cols-4 gap-4">
              <div className="font-semibold text-gray-700">Papildu:</div>
              <div className="col-span-3 text-gray-700">{cvData.additionalInfo}</div>
            </div>
          )}
        </div>
      )}

      {/* References */}
      {cvData.references.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide">
            ATSAUKSMES
          </h2>
          
          {cvData.references.map((ref) => (
            <div key={ref.id} className="grid grid-cols-4 gap-4 mb-4">
              <div className="font-semibold text-gray-700">Kontaktpersona:</div>
              <div className="col-span-3">
                <div className="font-semibold">{ref.name}</div>
                <div>{ref.position}, {ref.company}</div>
                <div className="text-sm text-gray-600">
                  {ref.email} {ref.phone && `• ${ref.phone}`}
                </div>
                <div className="text-sm text-gray-600 italic">{ref.relationship}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Europass Footer */}
      <div className="text-center text-xs text-gray-500 mt-12 pt-4 border-t border-gray-200">
        <p>© Eiropas Savienība, 2002-2024 | europass.europa.eu</p>
        <p className="mt-1">Lapa 1 / 1</p>
      </div>
    </div>
  );
}