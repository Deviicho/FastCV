import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  leftColumn: { width: '30%', backgroundColor: '#F8F9FA', padding: 20, height: '100%' },
  profileImage: { width: 100, height: 100, marginBottom: 20, border: '1px solid #131313' },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid #CCC' },
  sidebarText: { fontSize: 9, marginBottom: 4, color: '#333' },
  sidebarLabel: { fontSize: 8, fontWeight: 'bold', color: '#666', marginTop: 5, textTransform: 'uppercase' },
  
  progressBarTrack: { width: '100%', height: 5, backgroundColor: '#E0E0E0', borderRadius: 3, marginTop: 2, marginBottom: 8 },
  progressBarFill: { height: '100%', backgroundColor: '#333', borderRadius: 3 },

  rightColumn: { width: '70%', padding: 30 },
  header: { marginBottom: 25 },
  name: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' },
  profession: { fontSize: 12, color: '#555', marginTop: 4, textTransform: 'uppercase' },
  mainSectionTitle: { fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #131313', paddingBottom: 3, marginBottom: 10, marginTop: 15 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  entryTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  entryDate: { fontSize: 9, color: '#666' },
  description: { fontSize: 9, lineHeight: 1.4, color: '#444', marginBottom: 4 },
  projectLink: { fontSize: 9, fontWeight: 'bold', color: '#000', marginTop: 2, marginBottom: 10 },
});

interface Props { personal: any; work: any[]; education: any[]; projects: any[]; skills: any[]; langs: any[]; }

export const ResumePDF = ({ personal, work, education, projects, skills, langs }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.leftColumn}>
        {personal.photo && <Image src={personal.photo} style={styles.profileImage} />}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Details</Text>
          <Text style={styles.sidebarLabel}>Date of Birth</Text>
          <Text style={styles.sidebarText}>{personal.dob} {personal.pob}</Text>
          <Text style={styles.sidebarLabel}>Address</Text>
          <Text style={styles.sidebarText}>{personal.address}</Text>
          <Text style={styles.sidebarLabel}>Phone</Text>
          <Text style={styles.sidebarText}>{personal.phone}</Text>
          <Text style={styles.sidebarLabel}>Email</Text>
          <Text style={styles.sidebarText}>{personal.email}</Text>
        </View>

        {skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Skills</Text>
            {skills.map((s, i) => (
              <View key={i}>
                <Text style={styles.sidebarText}>{s.title}</Text>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: `${s.level}%` }]} />
                </View>
              </View>
            ))}
          </View>
        )}

        {langs.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Languages</Text>
            {langs.map((l, i) => (
              <View key={i}>
                <Text style={styles.sidebarText}>{l.title}</Text>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: `${l.level}%` }]} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.rightColumn}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.firstName} {personal.lastName}</Text>
          <Text style={styles.profession}>{personal.profession}</Text>
        </View>

        {personal.summary && (
          <View>
            <Text style={styles.mainSectionTitle}>Profile</Text>
            <Text style={styles.description}>{personal.summary}</Text>
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={styles.mainSectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 5 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{edu.title}</Text>
                  <Text style={styles.entryDate}>{edu.date}</Text>
                </View>
                <Text style={styles.description}>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}

        {work.length > 0 && (
          <View>
            <Text style={styles.mainSectionTitle}>Employment History</Text>
            {work.map((job, i) => (
              <View key={i} style={{ marginBottom: 5 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{job.title}</Text>
                  <Text style={styles.entryDate}>{job.date}</Text>
                </View>
                <Text style={styles.description}>{job.description}</Text>
              </View>
            ))}
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={styles.mainSectionTitle}>Personal Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{proj.title}</Text>
                  <Text style={styles.entryDate}>{proj.date}</Text>
                </View>
                <Text style={styles.description}>{proj.description}</Text>
                {proj.link && <Text style={styles.projectLink}>{proj.link}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);