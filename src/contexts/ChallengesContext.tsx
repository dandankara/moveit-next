import {createContext, useState, ReactNode, useEffect} from 'react';

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level:number;
  currentExperience: number;
  challegensCompleted: number;
  experienceLevelUp: number;
  activeChallenge: Challenge;
  resetChalleng: () => void;
  levelUp: () => void;
  newChalleng: () => void; 
  completeChallenge: () => void;
}

interface ChallengProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengsProvider({ children }:ChallengProviderProps){
  const [ level, setLevel] = useState(1);
  const [ currentExperience, setCurrenteExperience] = useState(0);
  const [ challegensCompleted, setChallegensCompleted] = useState(0);

  const [ activeChallenge, setactiveChallenge ] = useState(null);

  const experienceLevelUp = Math.pow((level + 1) * 4, 2) //calculo feito por rpg para upar de level

  useEffect(()=>{
    Notification.requestPermission();
  },[]) //Executa a função somente uma única vez quando existe um array de dependecia

  function levelUp(){
    setLevel(level + 1);
  }

  function newChalleng(){
  
    const randomChallenge = Math.floor(Math.random() * challenges.length);
    const challeng = challenges[randomChallenge];

    setactiveChallenge(challeng);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo Desafio'), {
        body: `Valendo ${challeng.amount}XP`
      }
    }

  }

  function resetChalleng() {
    setactiveChallenge(null);
  }

  function completeChallenge () {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if( finalExperience >= experienceLevelUp){
      finalExperience = finalExperience - experienceLevelUp;
      levelUp();
    }

    setCurrenteExperience(finalExperience);
    setactiveChallenge(null);
    setChallegensCompleted(challegensCompleted + 1);
  } 

  return(
    <ChallengesContext.Provider 
      value={{ 
        level,
        currentExperience,
        challegensCompleted,
        experienceLevelUp, 
        levelUp,
        newChalleng,
        activeChallenge,
        resetChalleng,
        completeChallenge, 
      }}>

      {children }
      
    </ChallengesContext.Provider>
  )
}