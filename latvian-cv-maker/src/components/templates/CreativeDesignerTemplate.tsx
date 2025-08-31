'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface CreativeDesignerTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function CreativeDesignerTemplate({ cvData, locale }: CreativeDesignerTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white creative-designer-cv">
      {/* Creative Header with Gradient */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-8">
        <div className="flex items-center space-x-6">
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.firstName}
              <span className="block text-pink-200">{personalInfo.lastName}</span>
            </h1>
            
            <div className="space-y-1 text-pink-100">
              {personalInfo.email && <p>✉️ {personalInfo.email}</p>}
              {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
              {personalInfo.address.city && <p>📍 {personalInfo.address.city}, {personalInfo.address.country}</p>}
            </div>
            
            <div className="flex space-x-4 mt-4">
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github} className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
                  GitHub
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">✨ Radošais Profils</h2>
            </div>
            <div className="bg-pink-50 p-4 rounded-b-lg border-l-4 border-pink-500">
              <p className="text-gray-700 leading-relaxed italic">{cvData.professionalSummary}</p>
            </div>
          </div>
        )}

        {/* Experience with Creative Styling */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">🚀 Radošā Pieredze</h2>
            </div>
            <div className="bg-purple-50 p-4 rounded-b-lg">
              {cvData.workExperience.map((exp, index) => (
                <div key={exp.id} className="relative mb-6 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  
                  <div className="ml-8">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 font-semibold">{exp.company}</p>
                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                      </div>
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {formatDate(exp.startDate, locale)} - {exp.current ? 'tagad' : formatDate(exp.endDate || '', locale)}
                      </div>
                    </div>
                    
                    {exp.description && (
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                    )}
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <h4 className="font-semibold text-purple-700 mb-2">🎯 Sasniegumi:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start">
                              <span className="text-pink-500 mr-2">▸</span>
                              <span className="text-gray-700">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">🎓 Radošā Izglītība</h2>
            </div>
            <div className="bg-indigo-50 p-4 rounded-b-lg">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-indigo-600 font-semibold">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                      {edu.gpa && <p className="text-gray-600 text-sm">📊 {edu.gpa}</p>}
                      {edu.thesis && <p className="text-gray-600 text-sm">📋 {edu.thesis}</p>}
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {formatDate(edu.startDate, locale)} - {edu.current ? 'tagad' : formatDate(edu.endDate || '', locale)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-2 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Language Skills */}
          {cvData.languageSkills.length > 0 && (
            <div>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-t-lg">
                <h3 className="font-bold">🌍 Valodas</h3>
              </div>
              <div className="bg-green-50 p-4 rounded-b-lg space-y-3">
                {cvData.languageSkills.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium">{getLanguageLabel(lang.language, locale)}</span>
                    <div className="flex space-x-1">
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, index) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full ${
                            ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'].indexOf(lang.proficiency) >= index
                              ? 'bg-gradient-to-r from-green-500 to-teal-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IT Skills */}
          {cvData.itSkills.length > 0 && (
            <div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-t-lg">
                <h3 className="font-bold">💻 IT Prasmes</h3>
              </div>
              <div className="bg-orange-50 p-4 rounded-b-lg">
                <div className="flex flex-wrap gap-2">
                  {cvData.itSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Other Skills */}
        {cvData.skills.length > 0 && (
          <div className="mt-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-t-lg">
              <h3 className="font-bold">⭐ Citas Prasmes</h3>
            </div>
            <div className="bg-yellow-50 p-4 rounded-b-lg">
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* References */}
        {cvData.references.length > 0 && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-3 rounded-t-lg">
              <h3 className="font-bold">👥 Atsauksmes</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-b-lg">
              <div className="grid md:grid-cols-2 gap-4">
                {cvData.references.map((ref) => (
                  <div key={ref.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-pink-500">
                    <h4 className="font-bold text-gray-900">{ref.name}</h4>
                    <p className="text-purple-600 font-medium">{ref.position}</p>
                    <p className="text-gray-700">{ref.company}</p>
                    <p className="text-gray-600 text-sm">{ref.email}</p>
                    {ref.phone && <p className="text-gray-600 text-sm">{ref.phone}</p>}
                    <p className="text-gray-500 text-xs italic mt-1">{ref.relationship}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Creative Footer */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-center py-4">
        <p className="text-sm">Radīts ar kreativitāti un aizrautību ✨</p>
      </div>
    </div>
  );
}