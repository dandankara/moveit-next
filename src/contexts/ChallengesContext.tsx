import {createContext, useState, ReactNode} from 'react';

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

  function levelUp(){
    setLevel(level + 1);
  }

  function newChalleng(){
  
    const randomChallenge = Math.floor(Math.random() * challenges.length);
    const challeng = challenges[randomChallenge];

    setactiveChallenge(challeng);

  }

  function resetChalleng() {
    setactiveChallenge(null);
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
      }}>

      {children }
      
    </ChallengesContext.Provider>
  )
}