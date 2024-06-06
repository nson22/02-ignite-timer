import { CycleActions } from "./actions";
import { produce } from "immer";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CycleReduce() {
  return (state: CyclesState, action: any) => {
    switch (action.type) {
      case CycleActions.CREATE:
        return produce(state, (draft) => {
          draft.cycles.push(action.payload.newCycle);
          draft.activeCycleId = action.payload.newCycle.id;
        });

      case CycleActions.STOP: {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId
        );

        if (currentCycleIndex < 0) {
          return state;
        }

        return produce(state, (draft) => {
          draft.cycles[currentCycleIndex].interruptedAt = new Date();
          draft.activeCycleId = null;
        });
      }

      case CycleActions.DONE: {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId
        );

        if (currentCycleIndex < 0) {
          return state;
        }

        return produce(state, (draft) => {
          draft.cycles[currentCycleIndex].startedAt = new Date();
          draft.activeCycleId = null;
        });
      }

      default:
        return state;
    }
  };
}
