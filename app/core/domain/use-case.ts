export interface UseCase<I, O> {
  perform: (input: I) => Promise<O>
}
