import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

  const { activeChallenge, resetChalleng } = useContext(ChallengesContext);
  
  return(
    <div className={styles.ChallengeBoxContainer}>

      { activeChallenge ? (
        <div className={styles.ChallengeActive}>

          <header>Ganha {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p> {activeChallenge.description} </p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.ButtonFailed}
              onClick={resetChalleng}> Falhei </button>

            <button 
              type="button"
              className={styles.ButtonComplet}> Completei </button>
          </footer>

        </div>
      ) :(
        <div className={styles.NotActive}>
        <strong>Inicie um ciclo para receber os desafios</strong>
        <p>
          <img src="icons/level-up.svg" alt="Levelup"/>
          Avance de level completando desafios
        </p>
      </div>
      ) }

    </div>
  )
}