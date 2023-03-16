
export interface Message {
  payload: {
    [key: string]: any
  },
  $meta: {
    outboxId: string,
    userId: string
  }
}

export interface MessageBus {
  start (): void

  stop (): void
  publish(queue: string, message: Message): void
  consume(queue: string, onMessage: (message: Message, ack: () => void) => Promise<void>): void
}
