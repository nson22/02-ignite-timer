import { Cycle } from "./cycle"

export enum CycleActions {
    CREATE = "CREATE",
    STOP = "STOP",
    DONE = "DONE",
}

export function createNewCycleAction(newCycle: Cycle) {
    return {
        type: CycleActions.CREATE,
        payload: {
            newCycle,
        },
    }
}

export function stopCycleAction() {
    return {
        type: CycleActions.STOP,
    }
}

export function setAsDoneCycleAction() {
    return {
        type: CycleActions.DONE,
    }
}