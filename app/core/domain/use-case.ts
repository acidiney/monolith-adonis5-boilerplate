export interface UseCase<I, O> {
  perform: (input?: I) => Promise<O>
}

export interface UseCaseWithoutInput<O> {
  perform: () => Promise<O>
}
