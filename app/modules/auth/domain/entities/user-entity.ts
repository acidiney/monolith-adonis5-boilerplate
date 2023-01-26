import { Entity, UniqueEntityID } from 'app/core/domain'

interface UserProps {
  fullName: string,
  email: string
}

export class UserEntity extends Entity<UserProps> {
  public get fullName (): string {
    return this.props.fullName
  }

  public get email (): string {
    return this.props.email
  }

  public static hydrate (id: UniqueEntityID, fullName: string, email: string): UserEntity {
    return new UserEntity({
      fullName,
      email,
    }, id)
  }
}
