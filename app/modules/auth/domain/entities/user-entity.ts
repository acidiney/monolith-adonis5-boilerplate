import { Entity, UniqueEntityID } from 'app/core/domain'

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

  public static hydrate (id: UniqueEntityID, props: UserProps): UserEntity {
    return new UserEntity(props, id)
  }
}
