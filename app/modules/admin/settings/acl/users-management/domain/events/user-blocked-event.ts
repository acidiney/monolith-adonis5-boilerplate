import { DomainEvent, UniqueEntityID } from 'app/core/domain'

export interface UserBlockedProps {
  userId: UniqueEntityID,
}

export class UserBlockedEvent extends DomainEvent<UserBlockedProps> {}
