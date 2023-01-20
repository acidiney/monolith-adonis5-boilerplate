export const enum RouteMemoryAction {
  PUSH_STATE = 'PUSH_STATE',
}

class RouteMemory {
  private static routeMemory: RouteMemory

  private state: string[] = []

  private actions = {
    PUSH_STATE: (state) => {
      this.state.push(state)
    },
  }

  public get getState (): string[] {
    return this.state
  }

  public commit (action: RouteMemoryAction, payload: string) {
    this.actions[action](payload)
  }

  public static getInstance () {
    if (!this.routeMemory) {
      this.routeMemory = new RouteMemory()
    }

    return this.routeMemory
  }
}

export const routeMemory = RouteMemory.getInstance()
