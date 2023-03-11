export interface MessageBus {
  start (): void

  stop (): void
  publish(queue: string, message: string): void
  consume(queue: string, onMessage: (message: any, ack: () => void) => void): void
}
