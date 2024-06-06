import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  setAsDoneCycleAction,
  stopCycleAction,
  createNewCycleAction,
} from "../reducers/cycles/actions";
import { Cycle, CycleReduce } from "../reducers/cycles/cycle";
import { differenceInSeconds } from "date-fns";

interface newCycleFormData {
  task: string;
  minutesAmount: number;
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
  const [cyclesState, dispatch] = useReducer(
    CycleReduce(),
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [minutesAmountPassed, setMinutesAmountPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startedAt));
    }
    return 0;
  });

  function setSecondsAmount(seconds: number) {
    setMinutesAmountPassed(seconds);
  }

  function setCurrentCycleAsDone() {
    dispatch(setAsDoneCycleAction());
  }

  function stopCurrentCycle() {
    dispatch(stopCycleAction());
  }

  function createNewCycle({ task, minutesAmount }: newCycleFormData) {
    const id = new Date().getTime().toString();

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt: new Date(),
    };

    dispatch(createNewCycleAction(newCycle));
    setMinutesAmountPassed(0);
  }

  useEffect(() => {
    const stateAsJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateAsJSON);
  }, [cyclesState]);

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
