'use client';

import styles from '../styles/newCVpage.module.css';

// 1. Keep the Interface
interface EducationEntry {
  id: number;
  title: string;
  date: string;
  description: string;
}

// 2. Define Props for Parent communication
interface EducationProps {
  data: EducationEntry[];
  setData: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
}

export function EducationSection({ data, setData }: EducationProps) {

  // Function to add a new empty education block to the parent state
  const addEducationBlock = () => {
    const newEntry: EducationEntry = {
      id: Date.now(),
      title: '',
      date: '',
      description: ''
    };
    setData([...data, newEntry]);
  };

  // Function to update fields in the parent state
  const handleUpdate = (id: number, field: keyof EducationEntry, value: string) => {
    setData(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  // Function to remove a block from the parent state
  const removeEducationBlock = (id: number) => {
    setData(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.workXpSection}>
      <div className={styles.sTitleSectionContainer}>
         <h3>Education</h3>
      </div>

      <div className={styles.flexWrapper}>
        {/* Map over data from the parent prop */}
        {data.map((entry) => (
          <div key={entry.id} className={styles.workCard}>
            <div className={styles.cardHeader}>
               <input 
                type="text" 
                placeholder="Degree/Certificate" 
                className={styles.jobTitleInput}
                value={entry.title}
                onChange={(e) => handleUpdate(entry.id, 'title', e.target.value)}
              />
              <button 
                onClick={() => removeEducationBlock(entry.id)} 
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
              placeholder="Education Description" 
              className={styles.jobDescriptionInput}
              value={entry.description}
              onChange={(e) => handleUpdate(entry.id, 'description', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className={styles.sectionContentContainer}>
            <button onClick={addEducationBlock} className={styles.addButton}>
              <p className={styles.plusIcon}>+</p> New education
            </button>
      </div>
    </div>
  );
}