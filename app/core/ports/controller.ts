
export interface Controller<I> {
  perform: (input: I) => Promise<any>
}
