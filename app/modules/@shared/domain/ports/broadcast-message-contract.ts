export interface BroadcastMessage<T> {
  type: string
  message: T
  meta: {
    userId: string | null
  }
}

export interface BroadcastMessageContract {
  publish: <T>(routeName: string, message: BroadcastMessage<T>) => Promise<void>
}
