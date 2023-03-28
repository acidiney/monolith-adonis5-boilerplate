import { DomainEvent, UniqueEntityID } from 'app/core/domain'

interface PasswordChangedProps {
  userId: UniqueEntityID
}

export class PasswordChangedEvent extends DomainEvent<PasswordChangedProps> {}
