import { CountdownContainder, Separator } from "./style";

export function Countdown({ minutes, seconds }) {
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
