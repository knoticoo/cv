'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface CreativeMinimalistTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function CreativeMinimalistTemplate({ cvData, locale }: CreativeMinimalistTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white creative-minimalist-cv">
      {/* Minimalist Header */}
      <div className="border-b-4 border-green-500 pb-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-5xl font-light text-gray-900 mb-2">
              {personalInfo.firstName}
            </h1>
            <h1 className="text-5xl font-bold text-green-600 mb-6">
              {personalInfo.lastName}
            </h1>
            
            <div className="space-y-2 text-gray-600">
              {personalInfo.email && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {personalInfo.email}
                </p>
              )}
              {personalInfo.phone && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {personalInfo.phone}
                </p>
              )}
              {personalInfo.address.city && (
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {personalInfo.address.city}, {personalInfo.address.country}
                </p>
              )}
            </div>

            <div className="flex space-x-4 mt-6">
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} className="text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-200 hover:border-green-500 transition-colors">
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github} className="text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-200 hover:border-green-500 transition-colors">
                  GitHub
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-200 hover:border-green-500 transition-colors">
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {personalInfo.photo && (
            <div className="ml-8">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-green-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {cvData.professionalSummary && (
        <div className="mb-12">
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-green-500"></div>
            <div className="pl-6">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Profils</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{cvData.professionalSummary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Experience */}
      {cvData.workExperience.length > 0 && (
        <div className="mb-12">
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-green-500"></div>
            <div className="pl-6">
              <h2 className="text-2xl font-light text-gray-900 mb-8">Pieredze</h2>
              
              {cvData.workExperience.map((exp, index) => (
                <div key={exp.id} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-green-600 font-medium text-lg">{exp.company}</p>
                      {exp.location && <p className="text-gray-500">{exp.location}</p>}
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {formatDate(exp.startDate, locale)}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">
                        {exp.current ? 'tagad' : formatDate(exp.endDate || '', locale)}
                      </div>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-gray-700">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills in Minimalist Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Languages */}
        {cvData.languageSkills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Valodas
            </h3>
            <div className="space-y-3">
              {cvData.languageSkills.map((lang) => (
                <div key={lang.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-700">{getLanguageLabel(lang.language, locale)}</span>
                    <span className="text-green-600 text-sm font-semibold">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-1 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'].indexOf(lang.proficiency) + 1) * 14.28}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IT Skills */}
        {cvData.itSkills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Tehnoloģijas
            </h3>
            <div className="space-y-2">
              {cvData.itSkills.map((skill) => (
                <div key={skill.id} className="bg-green-50 px-3 py-2 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-green-600 text-xs">{skill.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Skills */}
        {cvData.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">
              Prasmes
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* References */}
      {cvData.references.length > 0 && (
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-green-500"></div>
            <div className="pl-6">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Atsauksmes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {cvData.references.map((ref) => (
                  <div key={ref.id} className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{ref.name}</h4>
                    <p className="text-green-600 font-medium">{ref.position}</p>
                    <p className="text-gray-700">{ref.company}</p>
                    <p className="text-gray-600 text-sm mt-2">{ref.email}</p>
                    {ref.phone && <p className="text-gray-600 text-sm">{ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}