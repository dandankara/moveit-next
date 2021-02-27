import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import {CountdownContext} from '../contexts/CountdownContext';

export function Countdown() {

  const {
          minutes,
          seconds,
          Finished,
          active,
          startCountdown,
          resetCountDown
        } = useContext(CountdownContext);
  
  //verifico se tem começa com dois, pra separar em duas strings diferentes '2' e '5'
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

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