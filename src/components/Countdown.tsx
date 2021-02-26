import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

  const { newChalleng } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60)
  const [active, setActive] = useState(false)
  const [Finished, setFinished] = useState(false);

  const minutes = Math.floor(time / 60); //minutos arredondados
  const seconds = time % 60; //resto do que sobra da divisão da linha de cima torna os segundos 

  //verifico se tem começa com dois, pra separar em duas strings diferentes '2' e '5'
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setActive(false);
    setTime(0.1 * 60);
  }

  //lógica do countdown
  useEffect(() => {
    if (active && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (active && time === 0) {
      setFinished(true);
      setActive(false);
      newChalleng();
    }
  }, [active, time])

  return (

    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      { Finished ? (
        <button disabled className={styles.countdownButton} >
          Ciclo encerrado
        </button>
      ) : (
          <>
            {active ? (
              <button type="button" className={`${styles.countdownButton} ${styles.ButtonActive}`} onClick={resetCountDown}>
                Abandonar ciclo
              </button>
            ) : (
                <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                  Iniciar ciclo
                </button>
              )}

          </>
        )}
    </div>

  )
}