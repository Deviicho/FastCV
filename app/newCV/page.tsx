'use client';

import { useState, ChangeEvent, useRef } from "react";
import dynamic from 'next/dynamic';
import styles from "../../styles/newCVpage.module.css";

// Components
import { WorkXPsection } from '../../components/workXPsection';
import { EducationSection } from '../../components/educationSection';
import { ProjectsSection } from '../../components/projectsSection';
import { LanguagesSection } from '../../components/LangsSection';
import { SkillsSection } from '../../components/SkillsSection';
import { ResumePDF } from '../../components/ResumePDF';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface WorkEntry { id: number; title: string; date: string; description: string; }
interface EducationEntry { id: number; title: string; date: string; description: string; }
interface ProjectEntry { id: number; title: string; date: string; description: string; link: string; }
interface SkillEntry { id: number; title: string; level: number; }
interface LanguageEntry { id: number; title: string; level: number; }

export default function NewCVPage() {
  const [personal, setPersonal] = useState({
    firstName: '', lastName: '', email: '', phone: '', profession: '',
    address: '', dob: '', pob: '', summary: '', photo: ''
  });

  const [work, setWork] = useState<WorkEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [projects, setProjectEntries] = useState<ProjectEntry[]>([]);
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [langs, setLangs] = useState<LanguageEntry[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const previewScrollRef = useRef<HTMLDivElement>(null);

  const handlePersonalChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonal(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonal(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = () => {
    setIsPreviewMode(true);
    setTimeout(() => {
      previewScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className={styles.fullscreen}>
      <div className={styles.shadowCircle}></div>
      
      <h1 className={styles.title}>Fill in this form with your information</h1>
      <h3 className={styles.secondTitle}>this information will be used to create your CV</h3>

      {/* FORM SECTION */}
      <section className={styles.personalInfoSection}>
        <div className={styles.titleSectionContainer}><h3>Personal Information</h3></div>
        <div className={styles.inputsContainer}>
          <input required type="text" name="firstName" placeholder='First name' value={personal.firstName} onChange={handlePersonalChange} />
          <input required type="text" name="lastName" placeholder='Last name' value={personal.lastName} onChange={handlePersonalChange} />
          <input required type="text" name="email" placeholder='E-mail' value={personal.email} onChange={handlePersonalChange} />
          <input required type="tel" name="phone" placeholder='Phone number' value={personal.phone} onChange={handlePersonalChange} />
          <input required type="text" name="profession" placeholder='Profession' value={personal.profession} onChange={handlePersonalChange} />
          <input required type="text" name="address" placeholder='Address' value={personal.address} onChange={handlePersonalChange} />
          <input required type="date" name="dob" value={personal.dob} onChange={handlePersonalChange} />
          <input required type="text" name="pob" placeholder='Place of birth' value={personal.pob} onChange={handlePersonalChange} />
        </div>
        <label htmlFor='file-input' className={styles.fileInputLabel}>
          {personal.photo ? "Photo Selected ✓" : "Import a personal photo"}
        </label>
        <input className={styles.fileInput} id='file-input' type="file" onChange={handlePhotoUpload} accept="image/*" />
      </section>

      <section className={styles.professionalDetailsSection}>
        <div className={styles.titleSectionContainer}><h3>Professional Information</h3></div>
        <div className={styles.secondSectionContent}>
          <textarea name="summary" className={styles.pSumInput} placeholder="Profile summary" value={personal.summary} onChange={handlePersonalChange} />
          <WorkXPsection data={work} setData={setWork} />
          <EducationSection data={education} setData={setEducation} />
          <ProjectsSection data={projects} setData={setProjectEntries} />
          <div className={styles.languagesANDskillsContainer}>
            <LanguagesSection data={langs} setData={setLangs} />
            <SkillsSection data={skills} setData={setSkills} />
          </div>
        </div>
      </section>

      <button className={styles.GenerateBtn} onClick={handleGenerateClick}>Generate</button>

      {isPreviewMode && (
        <div className={styles.previewModeContainer} ref={previewScrollRef}>
          <div className={styles.previewStage}>
          <div className={styles.webPreviewPaper}>
            <div className={styles.leftColumn}>
              {personal.photo && <img src={personal.photo} className={styles.profileImage} alt="Profile" />}
              <div className={styles.sidebarSection}>
                <div className={styles.sidebarTitle}>Details</div>
                <div className={styles.sidebarLabel}>Date of Birth</div>
                <div className={styles.sidebarText}>{personal.dob} {personal.pob}</div>
                <div className={styles.sidebarLabel}>Address</div>
                <div className={styles.sidebarText}>{personal.address}</div>
                <div className={styles.sidebarLabel}>Phone</div>
                <div className={styles.sidebarText}>{personal.phone}</div>
                <div className={styles.sidebarLabel}>Email</div>
                <div className={styles.sidebarText}>{personal.email}</div>
              </div>

              {skills.length > 0 && (
                <div className={styles.sidebarSection}>
                  <div className={styles.sidebarTitle}>Skills</div>
                  {skills.map((s) => (
                    <div key={s.id} className={styles.skillRow}>
                      <div className={styles.sidebarText}>{s.title}</div>
                      <div className={styles.webProgressBar}>
                        <div className={styles.webProgressFill} style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {langs.length > 0 && (
                <div className={styles.sidebarSection}>
                  <div className={styles.sidebarTitle}>Languages</div>
                  {langs.map((l) => (
                    <div key={l.id} className={styles.skillRow}>
                      <div className={styles.sidebarText}>{l.title}</div>
                      <div className={styles.webProgressBar}>
                        <div className={styles.webProgressFill} style={{ width: `${l.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.previewHeader}>
                <h2>{personal.firstName} {personal.lastName}</h2>
                <p>{personal.profession}</p>
              </div>

              {personal.summary && (
                <div className={styles.previewSection}>
                  <div className={styles.mainSectionTitle}>Profile</div>
                  <div className={styles.description}>{personal.summary}</div>
                </div>
              )}

              {education.length > 0 && (
                <div className={styles.previewSection}>
                  <div className={styles.mainSectionTitle}>Education</div>
                  {education.map((edu) => (
                    <div key={edu.id} className={styles.previewEntry}>
                      <div className={styles.entryHeader}>
                        <div className={styles.entryTitle}>{edu.title}</div>
                        <div className={styles.entryDate}>{edu.date}</div>
                      </div>
                      <div className={styles.description}>{edu.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {work.length > 0 && (
                <div className={styles.previewSection}>
                  <div className={styles.mainSectionTitle}>Employment History</div>
                  {work.map((job) => (
                    <div key={job.id} className={styles.previewEntry}>
                      <div className={styles.entryHeader}>
                        <div className={styles.entryTitle}>{job.title}</div>
                        <div className={styles.entryDate}>{job.date}</div>
                      </div>
                      <div className={styles.description}>{job.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div className={styles.previewSection}>
                  <div className={styles.mainSectionTitle}>Personal Projects</div>
                  {projects.map((proj) => (
                    <div key={proj.id} className={styles.previewEntry} style={{ marginBottom: '15px' }}>
                      <div className={styles.entryHeader}>
                        <div className={styles.entryTitle}>{proj.title}</div>
                        <div className={styles.entryDate}>{proj.date}</div>
                      </div>
                      <div className={styles.description}>{proj.description}</div>
                      {proj.link && <div className={styles.sidebarLabel} style={{ marginTop: '2px', color: '#000' }}>{proj.link}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
            </div>


          <PDFDownloadLink
            key={JSON.stringify({personal, work, education, projects, skills, langs})}
            document={<ResumePDF personal={personal} work={work} education={education} projects={projects} langs={langs} skills={skills} />}
            fileName={`${personal.lastName || 'CV'}_Resume.pdf`}
            className={styles.downloadBtn}
          >
            {/* @ts-ignore */}
            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}