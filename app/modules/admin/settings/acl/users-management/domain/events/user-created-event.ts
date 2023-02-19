import {DomainEvent, UniqueEntityID} from 'app/core/domain'

export interface UserCreatedProps {
  userId: UniqueEntityID
  password: string
}

export class UserCreatedEvent extends DomainEvent<UserCreatedProps> {}
