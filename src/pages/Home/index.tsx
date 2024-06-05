import { createContext, useEffect, useState } from "react";
import { HomeContainer } from "./style";
import { NewCycleForm } from "./components/NewCycleForm";
import {
  StartCountdownButton,
  StopCountdownButton,
} from "./components/NewCycleForm/style";
import { HandPalm, Play } from "phosphor-react";
import { Countdown } from "./components/Countdown";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  setCurrentCycleAsDone: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

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

  function handleCreateCycle({ task, minutesAmount }: NewCycleFormData) {
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
    reset();
  }

  function handleStopCycle() {
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

  const isTaskFullfilled = watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, setCurrentCycleAsDone }}
        >
          <NewCycleForm />
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton data-testid="btn-stop" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={!isTaskFullfilled}
            data-testid="btn-start"
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
