import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
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

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

 

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

  const currentSeconds = activeCycle ? totalSeconds - minutesAmountPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const isTaskFullfilled = watch("task");

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <NewCycleForm />
        <Countdown />
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
