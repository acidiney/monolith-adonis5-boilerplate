import {Either, Entity, left, Options, right, UniqueEntityID} from 'app/core/domain'
import {PasswordMismatchError} from 'app/modules/auth/domain'

interface UserProps {
  fullName: string,
  email: string
  password: string

  status?: string

  slug?: string

  lasLoginAt: Date
}

export class UserEntity extends Entity<UserProps> {
  public get fullName (): string {
    return this.props.fullName
  }

  public get email (): string {
    return this.props.email
  }

  public get password (): string {
    return this.props.password
  }

  public get lastLoginAt (): Date {
    return this.props.lasLoginAt
  }

  public get status (): string | undefined {
    return this.props.status
  }

  public get slug (): string {
    return this.props.slug as string
  }

  public changePassword (password: string, confirmPassword: string): Either<PasswordMismatchError, boolean> {
    if (password !== confirmPassword) {
      return left(new PasswordMismatchError())
    }

    this.props.password = password

    return right(true)
  }

  public userLogged (loggedAt: Date): void {
    this.props.lasLoginAt = loggedAt
  }

  public static hydrate (id: UniqueEntityID, props: UserProps, options?: Options): UserEntity {
    return new UserEntity(props, id, options)
  }
}
