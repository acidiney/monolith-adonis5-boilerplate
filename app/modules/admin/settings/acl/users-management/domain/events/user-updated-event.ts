import { DomainEvent, UniqueEntityID } from 'app/core/domain'

interface UserEvent {
  fullName: string,
  email: string,
  roleId: UniqueEntityID
}

export interface UserUpdatedProps {
  userId: UniqueEntityID,
  old: UserEvent
  new: UserEvent
}

export class UserUpdatedEvent extends DomainEvent<UserUpdatedProps> {}
