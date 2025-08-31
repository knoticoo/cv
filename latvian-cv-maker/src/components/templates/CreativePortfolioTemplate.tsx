'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface CreativePortfolioTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function CreativePortfolioTemplate({ cvData, locale }: CreativePortfolioTemplateProps) {
  const { personalInfo } = cvData;

  return (
    <div className="bg-white creative-portfolio-cv">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-14 h-14 border-2 border-white rotate-12"></div>
        </div>

        <div className="relative p-12">
          <div className="flex items-center space-x-8">
            {personalInfo.photo && (
              <div className="relative">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={personalInfo.photo}
                    alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-pink-400 rounded-full"></div>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                {personalInfo.firstName}
                <span className="block text-cyan-200">{personalInfo.lastName}</span>
              </h1>
              
              {cvData.professionalSummary && (
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                  {cvData.professionalSummary}
                </p>
              )}
              
              {/* Contact Info as Stylized Cards */}
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.email && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                    <span className="text-yellow-300">✉️</span>
                    <span className="text-sm font-medium">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                    <span className="text-green-300">📱</span>
                    <span className="text-sm font-medium">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                    <span className="text-pink-300">🌐</span>
                    <span className="text-sm font-medium">Portfolio</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                    <span className="text-blue-300">💼</span>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="p-8 pt-0">
        {/* Experience Portfolio Style */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Projektu Portfolio
              </span>
            </h2>
            
            <div className="grid gap-8">
              {cvData.workExperience.map((exp, index) => (
                <div key={exp.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-cyan-300 transition-all duration-300 overflow-hidden">
                    {/* Project Header */}
                    <div className={`p-6 ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                      'bg-gradient-to-r from-purple-500 to-pink-500'
                    } text-white`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                          <p className="text-lg opacity-90">{exp.company}</p>
                          {exp.location && <p className="text-sm opacity-75">{exp.location}</p>}
                        </div>
                        <div className="text-right">
                          <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                            {formatDate(exp.startDate, locale)}
                          </div>
                          <div className="text-sm opacity-75 mt-1">
                            {exp.current ? 'Aktīvs projekts' : `līdz ${formatDate(exp.endDate || '', locale)}`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {exp.description && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">📋 Projekta apraksts</h4>
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
                              ✨
                            </span>
                            Galvenie sasniegumi
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {exp.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                  achIndex % 3 === 0 ? 'bg-cyan-500' :
                                  achIndex % 3 === 1 ? 'bg-blue-500' : 'bg-purple-500'
                                }`}>
                                  {achIndex + 1}
                                </div>
                                <span className="text-gray-700 text-sm flex-1">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education as Learning Journey */}
        {cvData.education.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Mācību Ceļojums
              </span>
            </h2>
            
            <div className="relative">
              {/* Learning Path Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-teal-500 transform -translate-x-1/2"></div>
              
              <div className="space-y-8">
                {cvData.education.map((edu, index) => (
                  <div key={edu.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-green-600 font-semibold">{edu.institution}</p>
                            {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                          </div>
                          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm">
                            {formatDate(edu.startDate, locale)} - {edu.current ? 'tagad' : formatDate(edu.endDate || '', locale)}
                          </div>
                        </div>
                        
                        {(edu.gpa || edu.thesis || edu.description) && (
                          <div className="space-y-2 text-sm">
                            {edu.gpa && <p><strong>Vidējā atzīme:</strong> {edu.gpa}</p>}
                            {edu.thesis && <p><strong>Diplomdarbs:</strong> {edu.thesis}</p>}
                            {edu.description && <p className="text-gray-700">{edu.description}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Center Node */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills as Visual Dashboard */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Prasmju Dashboard
            </span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Language Skills Radar */}
            {cvData.languageSkills.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">🌍</span>
                  Valodas
                </h3>
                <div className="space-y-4">
                  {cvData.languageSkills.map((lang, index) => (
                    <div key={lang.id} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">{getLanguageLabel(lang.language, locale)}</span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {lang.proficiency}
                        </span>
                      </div>
                      
                      {/* Circular Progress */}
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="url(#gradient-blue)"
                            strokeWidth="6"
                            strokeDasharray={`${(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'].indexOf(lang.proficiency) + 1) * 14.28} 100`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">
                            {Math.round((['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'].indexOf(lang.proficiency) + 1) * 14.28)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IT Skills Grid */}
            {cvData.itSkills.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-700 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-3">💻</span>
                  Tehnoloģijas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {cvData.itSkills.map((skill, index) => (
                    <div key={skill.id} className="group">
                      <div className={`
                        p-3 rounded-xl text-center font-medium text-white text-sm transition-transform duration-200 group-hover:scale-105
                        ${index % 4 === 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                          index % 4 === 1 ? 'bg-gradient-to-br from-pink-500 to-red-500' :
                          index % 4 === 2 ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
                          'bg-gradient-to-br from-cyan-500 to-blue-500'
                        }
                      `}>
                        <div className="font-bold text-xs mb-1">{skill.name}</div>
                        <div className="text-xs opacity-90">{skill.proficiency}</div>
                        {skill.yearsOfExperience && (
                          <div className="text-xs opacity-75">{skill.yearsOfExperience}g</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Skills Cloud */}
            {cvData.skills.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-orange-700 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">⭐</span>
                  Prasmes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill, index) => (
                    <span
                      key={skill.id}
                      className={`
                        px-3 py-2 rounded-full text-white font-medium text-sm transition-transform duration-200 hover:scale-105
                        ${index % 6 === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          index % 6 === 1 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                          index % 6 === 2 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                          index % 6 === 3 ? 'bg-gradient-to-r from-pink-500 to-purple-500' :
                          index % 6 === 4 ? 'bg-gradient-to-r from-purple-500 to-blue-500' :
                          'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }
                      `}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* References as Team Cards */}
        {cvData.references.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                Profesionālā Komanda
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {cvData.references.map((ref, index) => (
                <div key={ref.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-500 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                      ${index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                        index % 3 === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                        'bg-gradient-to-br from-green-500 to-teal-500'
                      }
                    `}>
                      {ref.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{ref.name}</h4>
                      <p className="text-gray-600 font-medium">{ref.position}</p>
                      <p className="text-gray-700">{ref.company}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-gray-600">📧 {ref.email}</p>
                        {ref.phone && <p className="text-gray-600">📱 {ref.phone}</p>}
                        <p className="text-gray-500 italic">{ref.relationship}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Footer */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white text-center py-8">
        <h3 className="text-2xl font-bold mb-2">Gatavs sadarbībai!</h3>
        <p className="text-cyan-100">Izveidots ar radošumu un profesionalitāti</p>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}