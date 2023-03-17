export interface InboxProcessorContract<T> {
  perform(input: T): Promise<void>
}
