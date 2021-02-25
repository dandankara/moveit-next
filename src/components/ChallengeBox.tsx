import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
  return(
    <div className={styles.ChallengeBoxContainer}>

      <div className={styles.NotActive}>
        <strong>Inicie um ciclo para receber os desafios</strong>
        <p>
          <img src="icons/level-up.svg" alt="Levelup"/>
          Avance de level completando desafios
        </p>
      </div>

    </div>
  )
}