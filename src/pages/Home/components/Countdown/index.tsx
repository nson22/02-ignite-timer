import { useContext, useEffect } from "react";
import { CountdownContainder, Separator } from "./style";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import { CycleContext } from "../..";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    setCurrentCycleAsDone,
    minutesAmountPassed,
    setSecondsAmount,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startedAt
        );

        if (secondsDifference >= totalSeconds) {
          setCurrentCycleAsDone();
          setSecondsAmount(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsAmount(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    setCurrentCycleAsDone,
    setSecondsAmount,
  ]);

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

  return (
    <CountdownContainder>
      <span data-testid="minutesOne">{minutes[0]}</span>
      <span data-testid="minutesTwo">{minutes[1]}</span>
      <Separator>:</Separator>
      <span data-testid="secondsOne">{seconds[0]}</span>
      <span data-testid="secondsTwo">{seconds[1]}</span>
    </CountdownContainder>
  );
}
