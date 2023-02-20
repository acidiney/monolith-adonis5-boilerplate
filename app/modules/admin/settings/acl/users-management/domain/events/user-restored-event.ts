import { DomainEvent, UniqueEntityID } from 'app/core/domain'

export interface UserRestoredProps {
  userId: UniqueEntityID,
}

export class UserRestoredEvent extends DomainEvent<UserRestoredProps> {}
