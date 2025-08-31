import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// Register fonts for better text rendering
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.5,
    padding: 30,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e11d48',
    alignItems: 'flex-start',
  },
  photoContainer: {
    width: 80,
    height: 80,
    marginRight: 20,
    flexShrink: 0,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  contactInfo: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e11d48',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceItem: {
    marginBottom: 16,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#e11d48',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  company: {
    fontSize: 11,
    fontWeight: 500,
    color: '#e11d48',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  dateLocation: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 6,
    lineHeight: 1.3,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
    marginBottom: 4,
    textAlign: 'justify',
  },
  achievementsList: {
    paddingLeft: 12,
    marginTop: 6,
  },
  achievement: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  skillBadge: {
    backgroundColor: '#fef2f2',
    color: '#e11d48',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 8,
    fontWeight: 500,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  languageSkill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 6,
    borderRadius: 4,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  languageName: {
    fontSize: 10,
    fontWeight: 500,
    color: '#1f2937',
  },
  proficiencyBadge: {
    backgroundColor: '#e11d48',
    color: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 7,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  educationItem: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#10b981',
  },
  degree: {
    fontSize: 12,
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  institution: {
    fontSize: 11,
    fontWeight: 500,
    color: '#10b981',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  referenceItem: {
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#8b5cf6',
  },
  referenceName: {
    fontSize: 11,
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: 2,
  },
  referencePosition: {
    fontSize: 10,
    fontWeight: 500,
    color: '#8b5cf6',
    marginBottom: 2,
  },
  referenceContact: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  referenceRelationship: {
    fontSize: 9,
    color: '#374151',
    fontStyle: 'italic',
  },
  summaryText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginTop: 6,
  },
});

interface CVPDFProps {
  cvData: CVData;
  locale: string;
}

export const CVPDF = ({ cvData, locale }: CVPDFProps) => {
  const { personalInfo } = cvData;

  const formatDate = (date: string): string => {
    if (!date) return '';
    try {
      const dateObj = new Date(date);
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short' 
      };
      return dateObj.toLocaleDateString(locale, options);
    } catch {
      return date;
    }
  };

  const formatDateRange = (startDate: string, endDate?: string, current?: boolean): string => {
    const start = formatDate(startDate);
    if (current) return `${start} - tagad`;
    if (endDate) return `${start} - ${formatDate(endDate)}`;
    return start;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {personalInfo.photo && (
            <View style={styles.photoContainer}>
              <Image style={styles.photo} src={personalInfo.photo} />
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.name}>
              {personalInfo.firstName} {personalInfo.lastName}
            </Text>
            {personalInfo.email && (
              <Text style={styles.contactInfo}>📧 {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactInfo}>📱 {personalInfo.phone}</Text>
            )}
            {(personalInfo.address.street || personalInfo.address.city) && (
              <Text style={styles.contactInfo}>
                📍 {[personalInfo.address.street, personalInfo.address.city, personalInfo.address.country].filter(Boolean).join(', ')}
              </Text>
            )}
            {personalInfo.linkedin && (
              <Text style={styles.contactInfo}>💼 {personalInfo.linkedin}</Text>
            )}
            {personalInfo.github && (
              <Text style={styles.contactInfo}>💻 {personalInfo.github}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profesionālais kopsavilkums</Text>
            <Text style={styles.summaryText}>{cvData.professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {cvData.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Darba pieredze</Text>
            {cvData.workExperience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dateLocation}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  {exp.location && ` • ${exp.location}`}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <View style={styles.achievementsList}>
                    {exp.achievements.map((achievement, index) => (
                      <Text key={index} style={styles.achievement}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Izglītība</Text>
            {cvData.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.dateLocation}>
                  {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  {edu.location && ` • ${edu.location}`}
                </Text>
                {edu.gpa && (
                  <Text style={styles.description}>Vidējā atzīme: {edu.gpa}</Text>
                )}
                {edu.thesis && (
                  <Text style={styles.description}>Diplomdarbs: {edu.thesis}</Text>
                )}
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Language Skills */}
        {cvData.languageSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Valodu prasmes</Text>
            {cvData.languageSkills.map((lang) => (
              <View key={lang.id} style={styles.languageSkill}>
                <Text style={styles.languageName}>{lang.language}</Text>
                <Text style={styles.proficiencyBadge}>{lang.proficiency}</Text>
              </View>
            ))}
          </View>
        )}

        {/* IT Skills */}
        {cvData.itSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>IT prasmes</Text>
            <View style={styles.skillsGrid}>
              {cvData.itSkills.map((skill) => (
                <Text key={skill.id} style={styles.skillBadge}>
                  {skill.name} ({skill.proficiency})
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Other Skills */}
        {cvData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Citas prasmes</Text>
            <View style={styles.skillsGrid}>
              {cvData.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillBadge}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* References */}
        {cvData.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Atsauksmes</Text>
            {cvData.references.map((ref) => (
              <View key={ref.id} style={styles.referenceItem}>
                <Text style={styles.referenceName}>{ref.name}</Text>
                <Text style={styles.referencePosition}>{ref.position} • {ref.company}</Text>
                <Text style={styles.referenceContact}>{ref.email}</Text>
                {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
                <Text style={styles.referenceRelationship}>{ref.relationship}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};