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

export enum CycleActionsType {
  CREATE = "CREATE",
  STOP = "STOP",
  DONE = "DONE",
}

export function CycleReduce() {
  (state: CyclesState, action: any) => {
    switch (action.type) {
      case CycleActionsType.CREATE:
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };

      case CycleActionsType.STOP:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedAt: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null,
        };

      case CycleActionsType.DONE:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedAt: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null,
        };

      default:
        return state;
    }
  };
}
