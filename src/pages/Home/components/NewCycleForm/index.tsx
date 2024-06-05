import { HandPalm, Play } from "phosphor-react";
import {
  CountdownContainder,
  FormContainder,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./style";

export function NewCycleForm() {
  return (
    <form onSubmit={handleSubmit(handleCreateCycle)}>
      <FormContainder>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          data-testid="inp-task"
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
          data-testid="inp-minutesAmount"
          step={5}
          min={1}
          max={60}
          placeholder="00"
          id="minutesAmount"
          required
          disabled={!!activeCycle}
          {...register("minutesAmount", { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </FormContainder>

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
  );
}
