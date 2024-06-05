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
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} min</td>
                    <td>{cycle.startedAt.toISOString()}</td>
                    <td>
                      {cycle.finishedAt && (
                        <Status statusColor="green">Concluído</Status>
                      )}
                      {cycle.interruptedAt && (
                        <Status statusColor="red">Interrompido</Status>
                      )}
                      {!cycle.finishedAt && !cycle.interruptedAt && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
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
