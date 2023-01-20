export interface Service<I, O> {
  perform: (input: I) => Promise<O>
}
