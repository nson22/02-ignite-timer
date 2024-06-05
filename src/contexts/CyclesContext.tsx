import { ReactNode, createContext, useReducer, useState } from "react";

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

enum CycleActions {
  CREATE,
  STOP,
  DONE,
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case CycleActions.CREATE:
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };

        case CycleActions.STOP:
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedAt: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        case CycleActions.DONE:
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedAt: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [minutesAmountPassed, setMinutesAmountPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsAmount(seconds: number) {
    setMinutesAmountPassed(seconds);
  }

  function setCurrentCycleAsDone() {
    dispatch({
      type: CycleActions.DONE,
      payload: {
        activeCycleId,
      },
    });
  }

  function stopCurrentCycle() {
    dispatch({
      type: CycleActions.STOP,
      payload: {
        activeCycleId,
      },
    });
  }

  function createNewCycle({ task, minutesAmount }: newCycleFormData) {
    const id = new Date().getTime().toString();

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt: new Date(),
    };

    dispatch({
      type: CycleActions.CREATE,
      payload: {
        newCycle,
      },
    });
    setMinutesAmountPassed(0);
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
