import { ReactNode, createContext, useState } from "react";

interface newCycleFormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

interface CycleContextType {
  cycles: Array<Cycle>;
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  minutesAmountPassed: number;
  setCurrentCycleAsDone: () => void;
  setSecondsAmount: (seconds: number) => void;
  createNewCycle: (data: newCycleFormData) => void;
  stopCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const [minutesAmountPassed, setMinutesAmountPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setCurrentCycleAsDone() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedAt: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function setSecondsAmount(seconds: number) {
    setMinutesAmountPassed(seconds);
  }

  function createNewCycle({ task, minutesAmount }: newCycleFormData) {
    const id = new Date().getTime().toString();

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setMinutesAmountPassed(0);
    // reset();
  }

  function stopCurrentCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedAt: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        minutesAmountPassed,
        setCurrentCycleAsDone,
        setSecondsAmount,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
