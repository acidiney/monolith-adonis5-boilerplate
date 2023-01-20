interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected constructor (protected readonly props: T) {}
}
