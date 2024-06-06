import { FormContainder, MinutesAmountInput, TaskInput } from "./style";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
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
  );
}
