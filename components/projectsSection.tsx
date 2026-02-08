'use client';

import styles from '../styles/newCVpage.module.css';

interface ProjectEntry {
  id: number;
  title: string;
  date: string;
  description: string;
  link: string;
}

interface ProjectsProps {
  data: ProjectEntry[];
  setData: React.Dispatch<React.SetStateAction<ProjectEntry[]>>;
}

export function ProjectsSection({ data, setData }: ProjectsProps) {

  const addProjectBlock = () => {
    const newEntry: ProjectEntry = {
      id: Date.now(),
      title: '',
      date: '',
      description: '',
      link: ''
    };
    setData([...data, newEntry]);
  };

  const handleUpdate = (id: number, field: keyof ProjectEntry, value: string) => {
    setData(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const removeProjectBlock = (id: number) => {
    setData(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.workXpSection}>
      <div className={styles.sTitleSectionContainer}>
         <h3>Projects</h3>
      </div>

      <div className={styles.flexWrapper}>
        {data.map((entry) => (
          <div key={entry.id} className={styles.workCard}>
            <div className={styles.cardHeader}>
               <input 
                type="text" 
                placeholder="Project Name" 
                className={styles.jobTitleInput}
                value={entry.title}
                onChange={(e) => handleUpdate(entry.id, 'title', e.target.value)}
              />
              <button 
                onClick={() => removeProjectBlock(entry.id)} 
                className={styles.deleteBtn}
              >
                <img src="/trash.svg" alt="" className="trash-icon" />
              </button>
            </div>

            <input 
              type="date" 
              placeholder='DD/MM/YYYY'
              className={styles.jobDateInput}
              value={entry.date}
              onChange={(e) => handleUpdate(entry.id, 'date', e.target.value)}
            />

            <textarea 
              placeholder="Project Description" 
              className={styles.jobDescriptionInput}
              value={entry.description}
              onChange={(e) => handleUpdate(entry.id, 'description', e.target.value)}
            />
            
            <input 
              type="url" 
              placeholder="Project Link"
              className={styles.projectLinkInput}
              value={entry.link}
              onChange={(e) => handleUpdate(entry.id, 'link', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className={styles.sectionContentContainer}>
            <button onClick={addProjectBlock} className={styles.addButton}>
              <p className={styles.plusIcon}>+</p> New project
            </button>
      </div>
    </div>
  );
}