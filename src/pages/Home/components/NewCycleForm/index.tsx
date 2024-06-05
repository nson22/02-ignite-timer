import { FormContainder, MinutesAmountInput, TaskInput } from "./style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newCiclyFormValidationSchema = z.object({
  task: z.string().min(1, "Informe uma tarefa"),
  minutesAmount: z.number().min(1).max(60),
});

type NewCycleFormData = z.infer<typeof newCiclyFormValidationSchema>;

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCiclyFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

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
