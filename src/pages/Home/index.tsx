import { useState } from "react";
import { useForm } from "react-hook-form";
import { Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CountdownContainder,
  FormContainder,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./style";

const newCiclyFormValidationSchema = z.object({
  task: z.string().min(1, "Informe uma tarefa"),
  minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCiclyFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCiclyFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => {
    cycle.id === activeCycleId;
  });

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const id = new Date().getTime().toString();
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
    };

    setCycles((state) => [...cycles, newCycle]);
    setActiveCycleId(id);
    reset();
  }

  const isTaskFullfilled = watch("task");
  const isMinutesAmountFullfilled = watch("minutesAmount");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainder>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            data-testid="task-input"
            type="text"
            placeholder="Dê um nome para seu projeto"
            id="task"
            list="task-suggestion"
            required
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
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainder>

        <CountdownContainder>
          <span data-testid="hour">0</span>
          <span data-testid="minutes">0</span>
          <Separator>:</Separator>
          <span data-testid="seconds-1">0</span>
          <span data-testid="seconds-2">0</span>
        </CountdownContainder>

        <StartCountdownButton
          disabled={!isTaskFullfilled && !isMinutesAmountFullfilled}
          data-testid="start-button"
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
