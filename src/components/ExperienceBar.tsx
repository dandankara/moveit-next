import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){

  const {currentExperience, experienceLevelUp} = useContext(ChallengesContext);

  const barToNextLevel = Math.round(currentExperience * 100) / experienceLevelUp;
  
  return(
    <header className={styles.experienceBar}>
      <span> 0 xp </span>

      <div>
        <div style={{ width: `${barToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${barToNextLevel}%` }} >
          {currentExperience} xp
        </span>
      </div>

      <span> {experienceLevelUp} xp </span>
    </header>
  );
}