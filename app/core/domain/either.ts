export type Either<L, A> = Left<L, A> | Right<L, A>

class Left<L, A> {
  public readonly value: L
  constructor (value: L) {
    this.value = value
  }

  public isLeft (): this is Left<L, A> {
    return true
  }

  public isRight (): this is Right<L, A> {
    return false
  }
}

class Right<L, A> {
  public readonly value: A
  constructor (value: A) {
    this.value = value
  }

  public isLeft (): this is Left<L, A> {
    return false
  }

  public isRight (): this is Right<L, A> {
    return true
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l)
}

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}
