'use client';

import styles from '../styles/newCVpage.module.css';

interface SkillEntry {
  id: number;
  title: string;
  level: number;
}

interface SkillsProps {
  data: SkillEntry[];
  setData: React.Dispatch<React.SetStateAction<SkillEntry[]>>;
}

export function SkillsSection({ data, setData }: SkillsProps) {

  const addSkillBlock = () => {
    const newEntry: SkillEntry = {
      id: Date.now(),
      title: '',
      level: 50, // Default to middle
    };
    setData([...data, newEntry]);
  };

  const handleUpdate = (id: number, field: keyof SkillEntry, value: string | number) => {
    setData(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const removeSkillBlock = (id: number) => {
    setData(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.langsANDskillsSection}>
      <div className={styles.sTitleSectionContainer}>
         <h3>Skills</h3>
      </div>

      <div className={styles.flexWrapper}>
        {data.map((entry) => (
          <div key={entry.id} className={styles.langANDskillCard}>
            <div className={styles.cardHeader}>
               <input 
                type="text" 
                placeholder="Enter a skill" 
                className={styles.langTitleInput}
                value={entry.title}
                onChange={(e) => handleUpdate(entry.id, 'title', e.target.value)}
              />
              <button 
                onClick={() => removeSkillBlock(entry.id)} 
                className={styles.langANDskilldeleteBtn}
              >
                <img src="/trash.svg" alt="" className="trash-icon" />
              </button>
            </div>

            <input 
              type="range" 
              min="0" 
              max="100" 
              value={entry.level}
              className={styles.rangeInput} 
              onChange={(e) => handleUpdate(entry.id, 'level', parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div className={styles.sectionContentContainer}>
            <button onClick={addSkillBlock} className={styles.addLangButton}>
              <p className={styles.plusIcon}>+</p> New skill
            </button>
      </div>
    </div>
  );
}