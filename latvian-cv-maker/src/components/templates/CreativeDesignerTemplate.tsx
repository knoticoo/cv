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
    <div className="bg-white creative-designer-cv" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Creative Header with Diagonal Design */}
      <div className="relative overflow-hidden">
        {/* Background with diagonal cut */}
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 h-64 relative">
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[100vw] border-b-[100px] border-transparent border-b-white"></div>
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 p-8">
          <div className="flex items-center justify-between h-full">
            {/* Left side - Name and Title */}
            <div className="text-white">
              <h1 className="text-5xl font-black mb-2 tracking-tight">
                {personalInfo.firstName}
              </h1>
              <h1 className="text-5xl font-black mb-4 tracking-tight text-pink-200">
                {personalInfo.lastName}
              </h1>
              {cvData.workExperience.length > 0 && (
                <p className="text-xl font-medium text-pink-100">
                  {cvData.workExperience[0].position}
                </p>
              )}
            </div>
            
            {/* Right side - Photo */}
            {personalInfo.photo && (
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={personalInfo.photo}
                    alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information Bar */}
      <div className="bg-gray-900 text-white py-4 px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          {personalInfo.email && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address.city && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span>{personalInfo.address.city}, {personalInfo.address.country}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Asymmetrical Layout */}
      <div className="p-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Narrow */}
          <div className="lg:col-span-4 space-y-8">
            {/* Skills Section */}
            {cvData.skills.length > 0 && (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-l-4 border-pink-400">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Prasmes
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill, index) => (
                    <div key={index} className="bg-white p-3 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{skill.name}</span>
                        <span className="text-sm text-pink-600 font-bold">
                          {skill.proficiency || 'Intermediate'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: skill.proficiency === 'Expert' ? '100%' : 
                                   skill.proficiency === 'Advanced' ? '80%' : 
                                   skill.proficiency === 'Intermediate' ? '60%' : '40%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Skills */}
            {cvData.languageSkills.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border-l-4 border-indigo-400">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌍</span>
                  Valodu prasmes
                </h2>
                <div className="space-y-3">
                  {cvData.languageSkills.map((lang, index) => (
                    <div key={index} className="bg-white p-3 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{lang.language}</span>
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                          {lang.proficiency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-l-4 border-green-400">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎓</span>
                  Izglītība
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                      <h3 className="font-bold text-gray-800 mb-1">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm mb-2">{edu.institution}</p>
                      <p className="text-green-600 text-xs font-medium">
                        {formatDate(edu.startDate, locale)} - {edu.current ? 'Pašlaik' : (edu.endDate ? formatDate(edu.endDate, locale) : '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Wide */}
          <div className="lg:col-span-8 space-y-8">
            {/* Professional Summary */}
            {cvData.professionalSummary && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">✨</span>
                  Profesionālais kopsavilkums
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{cvData.professionalSummary}</p>
              </div>
            )}

            {/* Work Experience */}
            {cvData.workExperience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-3xl mr-3">💼</span>
                  Darba pieredze
                </h2>
                <div className="space-y-6">
                  {cvData.workExperience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {/* Timeline connector */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 to-purple-500"></div>
                      
                      <div className="relative bg-white p-6 rounded-2xl shadow-lg border-l-4 border-pink-400 ml-8">
                        {/* Timeline dot */}
                        <div className="absolute -left-10 top-6 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                        
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                            <p className="text-pink-600 font-semibold text-lg">{exp.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              {formatDate(exp.startDate, locale)} - {exp.current ? 'Pašlaik' : (exp.endDate ? formatDate(exp.endDate, locale) : '')}
                            </p>
                            {exp.location && (
                              <p className="text-sm text-gray-500 mt-1">{exp.location}</p>
                            )}
                          </div>
                        </div>
                        
                        {exp.description && (
                          <p className="text-gray-700 mb-3">{exp.description}</p>
                        )}
                        
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
                            <p className="font-semibold text-gray-800 mb-2">🏆 Galvenie sasniegumi:</p>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start">
                                  <span className="text-pink-500 mr-2">•</span>
                                  {achievement}
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

            {/* IT Skills */}
            {cvData.itSkills.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">💻</span>
                  IT prasmes
                </h2>
                <div className="flex flex-wrap gap-3">
                  {cvData.itSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-blue-200 hover:shadow-md transition-shadow"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {cvData.references.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">🤝</span>
                  Atsauksmes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {cvData.references.map((ref, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                      <h3 className="font-bold text-gray-800 mb-1">{ref.name}</h3>
                      <p className="text-gray-600 text-sm">{ref.position} at {ref.company}</p>
                      <p className="text-orange-600 text-xs">{ref.email}</p>
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