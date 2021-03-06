import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

  const { activeChallenge, resetChalleng, completeChallenge } = useContext(ChallengesContext);
  const { resetCountDown } = useContext(CountdownContext);


  function ChallengeSucess () { //função para chamar outras função para simplificar
    completeChallenge(); //função de desafio completo, aumenta xp pipipopo
    resetCountDown(); //resetar o contador

  }

  function ChallengeFailed () {
    resetChalleng();
    resetCountDown();
  }
  
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
              onClick={ChallengeFailed}> Falhei </button>

            <button 
              type="button"
              className={styles.ButtonComplet}
              onClick={ChallengeSucess}> Completei </button>
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