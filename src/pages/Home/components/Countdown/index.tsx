import { useEffect, useState } from "react";
import { CountdownContainder, Separator } from "./style";
import { differenceInSeconds } from "date-fns/differenceInSeconds";

export function Countdown({ minutes, seconds }) {
  const [minutesAmountPassed, setMinutesAmountPassed] = useState(0);
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
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedAt: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setMinutesAmountPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setMinutesAmountPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, activeCycleId, totalSeconds]);

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
