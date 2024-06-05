import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CycleContext);

  return (
    <>
      <HistoryContainer>
        <h1>Meu histórico</h1>
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle) => {
                return (
                  <tr>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} min</td>
                    <td>{cycle.startedAt.toString()}</td>
                    <td>
                      <Status statusColor="green">{cycle.id}</Status>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </HistoryList>
      </HistoryContainer>
    </>
  );
}
