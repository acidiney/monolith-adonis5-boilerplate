import {Either, Entity, left, right, UniqueEntityID} from 'app/core/domain'
import {PasswordMismatchError} from 'app/modules/auth/domain'

interface UserProps {
  fullName: string,
  email: string
  password: string
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

  public changePassword (password: string, confirmPassword: string): Either<PasswordMismatchError, boolean> {
    if (password !== confirmPassword) {
      return left(new PasswordMismatchError())
    }

    this.props.password = password

    return right(true)
  }

  public static hydrate (id: UniqueEntityID, props: UserProps): UserEntity {
    return new UserEntity(props, id)
  }
}
