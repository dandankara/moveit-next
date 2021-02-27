import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

const Countdown = createContext({});

interface CountdownContextData {

  minutes: number;
  seconds: number;
  Finished: boolean;
  active: boolean;
  startCountdown:() => void;
  resetCountDown:() => void;

}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }) {

  const { newChalleng } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60)
  const [active, setActive] = useState(false)
  const [Finished, setFinished] = useState(false);

  const minutes = Math.floor(time / 60); //minutos arredondados
  const seconds = time % 60; //resto do que sobra da divisão da linha de cima torna os segundos 

  function startCountdown() {
    setActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setActive(false);
    setTime(0.1 * 60);
    setFinished(false);
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
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      Finished,
      active,
      startCountdown,
      resetCountDown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}