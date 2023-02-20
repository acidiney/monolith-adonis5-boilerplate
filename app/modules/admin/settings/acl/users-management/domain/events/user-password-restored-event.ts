import { DomainEvent, UniqueEntityID } from 'app/core/domain'

export interface UserPasswordRestoredProps {
  userId: UniqueEntityID,
}

export class UserPasswordRestoredEvent extends DomainEvent<UserPasswordRestoredProps> {}
