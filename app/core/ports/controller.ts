import { Input, Output } from './communication'

export interface Controller<I, O> {
  perform: (input: Input<I>) => Promise<Output<O>>
}
