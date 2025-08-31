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
    fontSize: 11,
    lineHeight: 1.4,
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e11d48',
  },
  photoContainer: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e11d48',
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#e11d48',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    fontWeight: 500,
    color: '#e11d48',
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
    marginBottom: 4,
  },
  achievementsList: {
    paddingLeft: 15,
  },
  achievement: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#fef2f2',
    color: '#e11d48',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 9,
    fontWeight: 500,
  },
  languageSkill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  languageName: {
    fontSize: 11,
    fontWeight: 500,
    color: '#1f2937',
  },
  proficiencyBadge: {
    backgroundColor: '#e11d48',
    color: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 8,
    fontWeight: 600,
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
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    };
    return dateObj.toLocaleDateString(locale, options);
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
            <Text style={styles.description}>{cvData.professionalSummary}</Text>
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
                  {formatDate(exp.startDate)} - {exp.current ? 'tagad' : formatDate(exp.endDate || '')}
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
              <View key={edu.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.dateLocation}>
                  {formatDate(edu.startDate)} - {edu.current ? 'tagad' : formatDate(edu.endDate || '')}
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
              <View key={ref.id} style={{ marginBottom: 10 }}>
                <Text style={styles.jobTitle}>{ref.name}</Text>
                <Text style={styles.company}>{ref.position} • {ref.company}</Text>
                <Text style={styles.contactInfo}>{ref.email}</Text>
                {ref.phone && <Text style={styles.contactInfo}>{ref.phone}</Text>}
                <Text style={styles.description}>{ref.relationship}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};