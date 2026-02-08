'use client';

import styles from '../styles/newCVpage.module.css';

interface LanguageEntry {
  id: number;
  title: string;
  level: number;
}

interface LangsProps {
  data: LanguageEntry[];
  setData: React.Dispatch<React.SetStateAction<LanguageEntry[]>>;
}

export function LanguagesSection({ data, setData }: LangsProps) {

  const addLanguageBlock = () => {
    const newEntry: LanguageEntry = {
      id: Date.now(),
      title: '',
      level: 50,
    };
    setData([...data, newEntry]);
  };

  const handleUpdate = (id: number, field: keyof LanguageEntry, value: string | number) => {
    setData(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const removeLanguageBlock = (id: number) => {
    setData(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.langsANDskillsSection}>
      <div className={styles.sTitleSectionContainer}>
         <h3>Languages</h3>
      </div>

      <div className={styles.flexWrapper}>
        {data.map((entry) => (
          <div key={entry.id} className={styles.langANDskillCard}>
            <div className={styles.cardHeader}>
               <input 
                type="text" 
                placeholder="Enter a language" 
                className={styles.langTitleInput}
                value={entry.title}
                onChange={(e) => handleUpdate(entry.id, 'title', e.target.value)}
              />
              <button 
                onClick={() => removeLanguageBlock(entry.id)} 
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
            <button onClick={addLanguageBlock} className={styles.addLangButton}>
              <p className={styles.plusIcon}>+</p> New language
            </button>
      </div>
    </div>
  );
}