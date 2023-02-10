import {StatusType} from 'app/modules/@shared/domain/types'
import {PasswordMismatchError} from 'app/modules/auth/domain'
import {UserNameErrors} from 'app/modules/@shared/domain/errors'
import {Either, Entity, left, Options, right, UniqueEntityID} from 'app/core/domain'
import {Email} from 'app/modules/@shared/domain/value-objects/email'

interface UserProps {
  firstName: string,

  avatar?: string
  lastName: string,
  email: Email
  password: string
  roleId: UniqueEntityID
  status?: StatusType
  slug?: string
  lastLoginAt?: Date
}

type UserEntityError = UserNameErrors.UserFirstNameRequiredError | UserNameErrors.UserLastNameRequiredError

export class UserEntity extends Entity<UserProps> {
  public get fullName (): string {
    return `${this.props.firstName} ${this.props.lastName ?? ''}`
  }

  public get firstName () : string {
    return this.props.firstName
  }

  public get lastName (): string {
    return this.props.lastName
  }

  public get email (): string {
    return this.props.email.value
  }

  public get password (): string {
    return this.props.password
  }

  public get lastLoginAt (): Date | undefined {
    return this.props.lastLoginAt
  }

  public get avatar (): string | undefined {
    return this.props.avatar
  }
  public get status (): StatusType | undefined {
    return this.props.status
  }

  public get slug (): string {
    return this.props.slug as string
  }

  public get roleId (): string {
    return this.props.roleId.toString()
  }

  public changePassword (password: string, confirmPassword: string): Either<PasswordMismatchError, boolean> {
    if (password !== confirmPassword) {
      return left(new PasswordMismatchError())
    }

    this.props.password = password

    return right(true)
  }

  public userLogged (loggedAt: Date): void {
    this.props.lastLoginAt = loggedAt
  }

  private validate (): Either<
    UserEntityError
  , boolean> {
    if (!this.props.firstName || !this.props.firstName.trim().length) {
      return left(new UserNameErrors.UserFirstNameRequiredError())
    }

    if (!this.props.lastName || !this.props.lastName.trim().length) {
      return left(new UserNameErrors.UserLastNameRequiredError())
    }

    return right(true)
  }

  public static create (props: UserProps): Either<UserEntityError, UserEntity> {
    const userEntity = new UserEntity(props)

    const validation = userEntity.validate()

    if (validation.isLeft()) {
      return left(
        validation.value
      )
    }

    return right(userEntity)
  }

  public static hydrate (id: UniqueEntityID, props: UserProps, options?: Options): Either<UserEntityError, UserEntity> {
    const userEntity = new UserEntity(props, id, options)

    const validation = userEntity.validate()

    if (validation.isLeft()) {
      return left(
        validation.value
      )
    }
    return right(userEntity)
  }
}
