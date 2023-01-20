export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error: T | string
  private readonly _value: T

  public constructor (isSuccess: boolean, error?: T | string | null, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      )
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error as T
    this._value = value

    Object.freeze(this)
  }

  /**
   * If success returns an instance of provided class.
   */
  public getResult (): T {
    if (!this.isSuccess) {
      throw new Error(
        'Can not get the value of an error result. Use errorValue instead.'
      )
    }

    return this._value
  }

  public errorValue (): T {
    return this.error as T
  }

  public errorMessage (): string {
    return (this.error as any).message
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine (results: Array<Result<any>>): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result
    }
    return Result.ok()
  }
}
