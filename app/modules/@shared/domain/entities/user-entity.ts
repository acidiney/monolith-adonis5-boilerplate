import {StatusEnum, StatusType} from 'app/modules/@shared/domain/types'
import {PasswordMismatchError} from 'app/modules/auth/domain'
import {UserNameErrors} from 'app/modules/@shared/domain/errors'
import {Either, Entity, left, Options, right, UniqueEntityID} from 'app/core/domain'
import {Email} from 'app/modules/@shared/domain/value-objects/email'

interface UserProps {
  avatar?: string
  firstName: string,
  lastName: string,
  email: Email
  defaultLang: string
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

  public get defaultLang (): string {
    return this.props.defaultLang
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

  public get isInactive (): boolean {
    return this.props.status === StatusEnum.INACTIVE
  }

  public changePassword (password: string, confirmPassword: string): Either<PasswordMismatchError, boolean> {
    if (password !== confirmPassword) {
      return left(new PasswordMismatchError())
    }

    this.props.password = password

    return right(true)
  }

  public get isRoot (): boolean {
    return this.props.email.value === 'root@itgest.co.ao'
  }

  public userLogged (loggedAt: Date): void {
    this.props.lastLoginAt = loggedAt
  }

  public changeAvatar (avatar: string): void {
    this.props.avatar = avatar
  }

  public changeFirstName (firstName: string): void {
    this.props.firstName = firstName
  }

  public changeLastName (lastName: string): void {
    this.props.lastName = lastName
  }

  public updatePermissions (roleId: UniqueEntityID): void {
    this.props.roleId = roleId
  }

  public alterEmail (email: Email) : void {
    this.props.email = email
  }

  public block () {
    this.props.status = StatusEnum.INACTIVE
  }

  public restore () {
    this.props.status = StatusEnum.ACTIVE
  }

  public validate (): Either<
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

  public delete (): void {
    this._deletedAt = new Date()
    this.props.status = StatusEnum.DELETED
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
