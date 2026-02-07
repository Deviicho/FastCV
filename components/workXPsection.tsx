'use client';

import styles from '../styles/newCVpage.module.css';

// 1. Keep the Interface (This stays the same)
interface WorkEntry {
  id: number;
  title: string;
  date: string;
  description: string;
}

// 2. Define the Props (This is what connects to the parent)
interface WorkXPProps {
  data: WorkEntry[];
  setData: React.Dispatch<React.SetStateAction<WorkEntry[]>>;
}

export function WorkXPsection({ data, setData }: WorkXPProps) {

  // Function to add a new empty work block
  const addWorkBlock = () => {
    const newEntry: WorkEntry = {
      id: Date.now(), 
      title: '',
      date: '',
      description: ''
    };
    // Updates the state in newCVpage
    setData([...data, newEntry]); 
  };

  // Function to update the specific text fields
  const handleUpdate = (id: number, field: keyof WorkEntry, value: string) => {
    setData(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  // Function to remove a block
  const removeWorkBlock = (id: number) => {
    setData(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.workXpSection}>
      <div className={styles.sTitleSectionContainer}>
         <h3>Work Experience</h3>
      </div>

      <div className={styles.flexWrapper}>
        {/* We map over 'data' provided by the parent */}
        {data.map((entry) => (
          <div key={entry.id} className={styles.workCard}>
            <div className={styles.cardHeader}>
               <input 
                type="text" 
                placeholder="Job Title" 
                className={styles.jobTitleInput}
                value={entry.title}
                onChange={(e) => handleUpdate(entry.id, 'title', e.target.value)}
              />
              <button 
                onClick={() => removeWorkBlock(entry.id)} 
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>

            <input 
              type="date" 
              className={styles.jobDateInput}
              value={entry.date}
              onChange={(e) => handleUpdate(entry.id, 'date', e.target.value)}
            />

            <textarea 
              placeholder="Job Description" 
              className={styles.jobDescriptionInput}
              value={entry.description}
              onChange={(e) => handleUpdate(entry.id, 'description', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className={styles.sectionContentContainer}>
            <button onClick={addWorkBlock} className={styles.addButton}>
                <p className={styles.plusIcon}>+</p> New experience
            </button>
      </div>
    </div>
  );
}