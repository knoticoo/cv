'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface ModernProfessionalTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function ModernProfessionalTemplate({ cvData, locale }: ModernProfessionalTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white modern-professional-cv" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header with Photo */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
        <div className="flex items-center space-x-6">
          {/* Photo */}
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Personal Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {cvData.workExperience.length > 0 && (
              <p className="text-xl text-blue-100 mb-4">
                {cvData.workExperience[0].position}
              </p>
            )}
            
            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address.city && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span>{personalInfo.address.city}, {personalInfo.address.country}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Skills & Education */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills Section */}
            {cvData.skills.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-blue-600 rounded mr-3"></div>
                  Prasmes
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (skill.proficiency === 'Expert' ? 5 : skill.proficiency === 'Advanced' ? 4 : skill.proficiency === 'Intermediate' ? 3 : 2) ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Skills */}
            {cvData.languageSkills.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-green-600 rounded mr-3"></div>
                  Valodu prasmes
                </h2>
                <div className="space-y-3">
                  {cvData.languageSkills.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{lang.language}</span>
                      <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-purple-600 rounded mr-3"></div>
                  Izglītība
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-purple-200 pl-4">
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm">{edu.institution}</p>
                      <p className="text-gray-500 text-xs">
                        {formatDate(edu.startDate, locale)} - {edu.current ? 'Pašlaik' : (edu.endDate ? formatDate(edu.endDate, locale) : '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Experience & Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            {cvData.professionalSummary && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-indigo-600 rounded mr-3"></div>
                  Profesionālais kopsavilkums
                </h2>
                <p className="text-gray-700 leading-relaxed">{cvData.professionalSummary}</p>
              </div>
            )}

            {/* Work Experience */}
            {cvData.workExperience.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-1 h-6 bg-indigo-600 rounded mr-3"></div>
                  Darba pieredze
                </h2>
                <div className="space-y-6">
                  {cvData.workExperience.map((exp, index) => (
                    <div key={exp.id} className="border-l-4 border-indigo-200 pl-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                          <p className="text-indigo-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {formatDate(exp.startDate, locale)} - {exp.current ? 'Pašlaik' : (exp.endDate ? formatDate(exp.endDate, locale) : '')}
                          </p>
                          {exp.location && (
                            <p className="text-sm text-gray-500">{exp.location}</p>
                          )}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                      )}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm">{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IT Skills */}
            {cvData.itSkills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-teal-600 rounded mr-3"></div>
                  IT prasmes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cvData.itSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {cvData.references.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-orange-600 rounded mr-3"></div>
                  Atsauksmes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {cvData.references.map((ref, index) => (
                    <div key={index} className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800">{ref.name}</h3>
                      <p className="text-gray-600 text-sm">{ref.position} at {ref.company}</p>
                      <p className="text-gray-500 text-xs">{ref.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}