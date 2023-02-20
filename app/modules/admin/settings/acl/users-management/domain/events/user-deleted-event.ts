import { DomainEvent, UniqueEntityID } from 'app/core/domain'

export interface UserDeletedProps {
  userId: UniqueEntityID,
  motivation?: string
}

export class UserDeletedEvent extends DomainEvent<UserDeletedProps> {}
