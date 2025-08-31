'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface CreativeColorfulTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function CreativeColorfulTemplate({ cvData, locale }: CreativeColorfulTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white creative-colorful-cv">
      {/* Colorful Geometric Header */}
      <div className="relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-400 to-purple-400 rounded-full opacity-20 translate-x-24 -translate-y-24"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-green-400 to-blue-400 rounded-full opacity-20 translate-x-20 translate-y-20"></div>
        </div>

        <div className="relative p-8">
          <div className="flex items-center space-x-8">
            {personalInfo.photo && (
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full opacity-30 blur-lg"></div>
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {personalInfo.firstName}
                </span>
                <span className="text-gray-900 ml-2">{personalInfo.lastName}</span>
              </h1>
              
              <div className="flex flex-wrap gap-3 mt-4">
                {personalInfo.email && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    ✉️ {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📱 {personalInfo.phone}
                  </div>
                )}
                {personalInfo.address.city && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    📍 {personalInfo.address.city}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <div className="mb-10">
            <div className="relative">
              <h2 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Radošais Profils
                </span>
              </h2>
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-6 rounded-2xl border-l-4 border-purple-500">
                <p className="text-gray-700 leading-relaxed text-lg italic">{cvData.professionalSummary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Experience with Colorful Timeline */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Radošā Ceļojuma
              </span>
            </h2>
            
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"></div>
              
              {cvData.workExperience.map((exp, index) => (
                <div key={exp.id} className="relative mb-8 last:mb-0">
                  {/* Timeline Node */}
                  <div className="absolute left-4 top-4 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="ml-16">
                    <div className="bg-white rounded-2xl shadow-lg border-l-4 border-purple-500 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-purple-600 font-semibold text-lg">{exp.company}</p>
                          {exp.location && <p className="text-gray-500">{exp.location}</p>}
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {formatDate(exp.startDate, locale)} - {exp.current ? 'tagad' : formatDate(exp.endDate || '', locale)}
                        </div>
                      </div>
                      
                      {exp.description && (
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                      )}
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                          <h4 className="font-semibold text-purple-700 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            Sasniegumi
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start">
                                <span className="text-pink-500 mr-2 text-lg">★</span>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Izglītības Ceļš
              </span>
            </h2>
            
            <div className="space-y-6">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-green-600 font-semibold">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600">{edu.location}</p>}
                      {edu.gpa && <p className="text-gray-600">📊 {edu.gpa}</p>}
                      {edu.thesis && <p className="text-gray-600">📋 {edu.thesis}</p>}
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {formatDate(edu.startDate, locale)} - {edu.current ? 'tagad' : formatDate(edu.endDate || '', locale)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-3">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Showcase */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* IT Skills Hexagon Grid */}
          {cvData.itSkills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  💻 Tehnoloģijas
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cvData.itSkills.map((skill, index) => (
                  <div
                    key={skill.id}
                    className="relative group"
                  >
                    <div className={`
                      p-4 rounded-xl text-center font-medium text-white text-sm
                      ${index % 4 === 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                        index % 4 === 1 ? 'bg-gradient-to-br from-pink-500 to-red-500' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
                        'bg-gradient-to-br from-green-500 to-blue-500'
                      }
                      transform group-hover:scale-105 transition-transform duration-200
                    `}>
                      <div className="font-semibold">{skill.name}</div>
                      <div className="text-xs opacity-90">{skill.proficiency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Language Skills Circular */}
          {cvData.languageSkills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  🌍 Valodas
                </span>
              </h3>
              <div className="space-y-4">
                {cvData.languageSkills.map((lang, index) => (
                  <div key={lang.id} className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm
                      ${index % 3 === 0 ? 'bg-gradient-to-br from-green-500 to-teal-500' :
                        index % 3 === 1 ? 'bg-gradient-to-br from-teal-500 to-blue-500' :
                        'bg-gradient-to-br from-blue-500 to-purple-500'
                      }
                    `}>
                      {lang.language.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{getLanguageLabel(lang.language, locale)}</div>
                      <div className="text-sm text-gray-600">{lang.proficiency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Other Skills as Tags */}
        {cvData.skills.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                ⭐ Citas Prasmes
              </span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {cvData.skills.map((skill, index) => (
                <span
                  key={skill.id}
                  className={`
                    px-4 py-2 rounded-full text-white font-medium text-sm
                    ${index % 5 === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      index % 5 === 1 ? 'bg-gradient-to-r from-pink-500 to-red-500' :
                      index % 5 === 2 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                      index % 5 === 3 ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                      'bg-gradient-to-r from-yellow-500 to-orange-500'
                    }
                    transform hover:scale-105 transition-transform duration-200 shadow-lg
                  `}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Colorful Footer */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white text-center py-6">
        <p className="font-medium">Radīts ar krāsām un iedvesmu 🎨</p>
      </div>
    </div>
  );
}