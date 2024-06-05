import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CountdownContainder,
  FormContainder,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./style";
import { differenceInSeconds } from "date-fns/differenceInSeconds";

const newCiclyFormValidationSchema = z.object({
  task: z.string().min(1, "Informe uma tarefa"),
  minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCiclyFormValidationSchema>;

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
}

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCiclyFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [minutesAmountPassed, setMinutesAmountPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setMinutesAmountPassed(differenceInSeconds(new Date(), activeCycle.startedAt))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])


  function handleCreateCycle({ task, minutesAmount }: NewCycleFormData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedAt: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setMinutesAmountPassed(0)
    reset();
  }


  const totalMinutes = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalMinutes - minutesAmountPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])


  const isTaskFullfilled = watch("task");

  function handleStopCycle() {
    setCycles(cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedAt: new Date() }
      } else {
        return cycle
      }
    }),
    )

    setActiveCycleId(null)
  }

  console.log(activeCycle);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <FormContainder>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            data-testid="task-input"
            type="text"
            placeholder="Dê um nome para seu projeto"
            id="task"
            list="task-suggestion"
            required
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id="task-suggestion">
            <option>Projeto one</option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            data-testid="minutes-amount-input"
            step={5}
            min={5}
            max={60}
            placeholder="00"
            id="minutesAmount"
            required
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainder>

        <CountdownContainder>
          <span data-testid="hour">{minutes[0]}</span>
          <span data-testid="minutes">{minutes[1]}</span>
          <Separator>:</Separator>
          <span data-testid="seconds-1">{seconds[0]}</span>
          <span data-testid="seconds-2">{seconds[1]}</span>
        </CountdownContainder>

        {activeCycle ? <StopCountdownButton
          data-testid="stop-button"
          onClick={handleStopCycle}
        >
          <HandPalm size={24} />
          Interromper
        </StopCountdownButton> : <StartCountdownButton
          disabled={!isTaskFullfilled}
          data-testid="start-button"
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>}

      </form>
    </HomeContainer>
  );
}
