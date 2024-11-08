import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleFinished,
} from "../reducers/cycles/actions";

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setQuantitySecondsPassed: (seconds: number) => void;
  createNewCycle: (data: NewCycleContextFormData) => void;
  handleInterruptCycle: () => void;
}

interface CycleContextProviderProps {
  children: ReactNode;
}

interface NewCycleContextFormData {
  task: string;
  minutesAmount: number;
}

export const CycleContext = createContext({} as CycleContextType);

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

    if(storageStateAsJSON) {
      return JSON.parse(storageStateAsJSON);
    }
  });
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);



  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);


    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState])




  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId);

  function setQuantitySecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleFinished);
  }
  function createNewCycle(data: NewCycleContextFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }
  function handleInterruptCycle() {
    dispatch(interruptCurrentCycleAction(activeCycleId));
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setQuantitySecondsPassed,
        createNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
