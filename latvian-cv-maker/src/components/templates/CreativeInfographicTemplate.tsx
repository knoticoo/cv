'use client';

import { CVData } from '@/types/cv';
import { formatDate, getLanguageLabel } from '@/lib/utils';

interface CreativeInfographicTemplateProps {
  cvData: CVData;
  locale: string;
}

export default function CreativeInfographicTemplate({ cvData, locale }: CreativeInfographicTemplateProps) {
  const { personalInfo } = cvData;

  // Calculate skill proficiency percentages
  const getSkillPercentage = (proficiency: string): number => {
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 100 };
    return levels[proficiency as keyof typeof levels] || 50;
  };

  const getLanguagePercentage = (proficiency: string): number => {
    const levels = { 'A1': 17, 'A2': 33, 'B1': 50, 'B2': 67, 'C1': 83, 'C2': 95, 'Native': 100 };
    return levels[proficiency as keyof typeof levels] || 50;
  };

  return (
    <div className="bg-white creative-infographic-cv">
      {/* Infographic Header */}
      <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white p-8">
        <div className="flex items-center space-x-8">
          {personalInfo.photo && (
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white p-2">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full opacity-80"></div>
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
            
            {/* Contact Info as Icons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✉️</span>
                  </div>
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">📱</span>
                  </div>
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address.city && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">📍</span>
                  </div>
                  <span className="text-sm">{personalInfo.address.city}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">🌐</span>
                  </div>
                  <span className="text-sm">Portfolio</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <div className="mb-10">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border-l-8 border-orange-500">
              <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">💡</span>
                Profils
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{cvData.professionalSummary}</p>
            </div>
          </div>
        )}

        {/* Experience Timeline */}
        {cvData.workExperience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
              <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">🚀</span>
              Karjeras Ceļš
            </h2>
            
            {cvData.workExperience.map((exp, index) => (
              <div key={exp.id} className="relative mb-8 last:mb-0">
                <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                  {/* Experience Number Badge */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-orange-600 font-semibold text-lg">{exp.company}</p>
                      {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                    
                    {/* Duration Infographic */}
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        📅 {formatDate(exp.startDate, locale)}
                      </div>
                      <div className="text-orange-600 font-bold text-sm mt-1">
                        {exp.current ? '▼ TAGAD' : `▼ ${formatDate(exp.endDate || '', locale)}`}
                      </div>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-4 bg-orange-50 p-4 rounded-lg">{exp.description}</p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                      <h4 className="font-bold text-orange-700 mb-3 flex items-center">
                        <span className="text-lg mr-2">🏆</span>
                        Sasniegumi
                      </h4>
                      <div className="grid gap-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start">
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                              {achIndex + 1}
                            </div>
                            <span className="text-gray-700 flex-1">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Infographic Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Language Skills Chart */}
          {cvData.languageSkills.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
                <span className="text-xl mr-2">🌍</span>
                Valodas
              </h3>
              <div className="space-y-4">
                {cvData.languageSkills.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{getLanguageLabel(lang.language, locale)}</span>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {lang.proficiency}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${getLanguagePercentage(lang.proficiency)}%` }}
                        />
                      </div>
                      <span className="absolute right-0 -top-6 text-xs text-gray-500">
                        {getLanguagePercentage(lang.proficiency)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IT Skills Radar */}
          {cvData.itSkills.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                <span className="text-xl mr-2">💻</span>
                IT Prasmes
              </h3>
              <div className="space-y-3">
                {cvData.itSkills.slice(0, 6).map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700 text-sm">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.proficiency}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                          style={{ width: `${getSkillPercentage(skill.proficiency)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Stats */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center">
              <span className="text-xl mr-2">📊</span>
              Statistika
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{cvData.workExperience.length}</div>
                <div className="text-sm text-gray-600">Darbavietas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{cvData.education.length}</div>
                <div className="text-sm text-gray-600">Izglītības līmeņi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{cvData.languageSkills.length}</div>
                <div className="text-sm text-gray-600">Valodas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{cvData.itSkills.length}</div>
                <div className="text-sm text-gray-600">IT Prasmes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infographic Footer with Icons */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6">
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-xl">🎨</span>
            </div>
            <span className="text-sm font-medium">Radošs</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-xl">💡</span>
            </div>
            <span className="text-sm font-medium">Inovatīvs</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-xl">🎯</span>
            </div>
            <span className="text-sm font-medium">Mērķtiecīgs</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-xl">🤝</span>
            </div>
            <span className="text-sm font-medium">Komandas spēlētājs</span>
          </div>
        </div>
      </div>
    </div>
  );
}