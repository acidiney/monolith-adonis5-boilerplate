
export interface BroadcastMessage {
  message: {
    type: string,
    [key: string]: any
  }

  meta: {
    userId: string | null
  }
}

export interface BroadcastMessageContract {
  publish: (routeName: string, message: BroadcastMessage) => Promise<void>
}
