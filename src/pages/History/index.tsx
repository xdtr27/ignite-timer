import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/ContextProvider";

import {formatDistance} from 'date-fns'
import { ptBR } from "date-fns/locale"; 

export function History() {
  const { cycles } = useContext(CycleContext);
  


  function formatDateTable(oldDate: Date) {
    const currentDate = new Date();
    return formatDistance(oldDate, currentDate, {addSuffix: true, locale: ptBR})
  }


  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{formatDateTable(cycle.startDate)}</td>
                  <td>
                    <Status statusColor={cycle.finishedDate? "green" : cycle.interruptedDate? "red" : "yellow"}>
                      {cycle.finishedDate? "Concluído" : cycle.interruptedDate? "Interrompido" : "Em andamento"}
                    </Status>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
