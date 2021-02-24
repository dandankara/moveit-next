import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  const [time, setTime] = useState(25 * 60)//calculo para trabalhar com segundos
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60); //minutos arredondados
  const seconds = time % 60; //resto do que sobra da divisão da linha de cima torna os segundos 
  
  //verifico se tem começa com dois, pra separar em duas strings diferentes '2' e '5'
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setActive(true);
  }
  
  useEffect(() =>{
    if(active && time > 0){
      setTimeout(() => {
        setTime(time - 1);
      },1000)
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

      <button type="button" className={styles.countdownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
    </div>

  )
}