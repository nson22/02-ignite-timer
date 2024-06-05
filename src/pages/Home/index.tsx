import { HomeContainer } from "./style";
import { NewCycleForm } from "./components/NewCycleForm";
import {
  StartCountdownButton,
  StopCountdownButton,
} from "./components/NewCycleForm/style";
import { HandPalm, Play } from "phosphor-react";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";

const newCiclyFormValidationSchema = z.object({
  task: z.string().min(1, "Informe uma tarefa"),
  minutesAmount: z.number().min(1).max(60),
});

type newCycleFormData = z.infer<typeof newCiclyFormValidationSchema>;

export function Home() {
  const { createNewCycle, stopCurrentCycle, activeCycle } =
    useContext(CycleContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCiclyFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const isTaskFullfilled = watch("task");

  function handleCreateNewCycle({ task, minutesAmount }: newCycleFormData) {
    createNewCycle({ task, minutesAmount });
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton
            data-testid="btn-stop"
            onClick={stopCurrentCycle}
          >
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
