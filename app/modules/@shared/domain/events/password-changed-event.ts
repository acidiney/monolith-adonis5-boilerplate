import { DomainEvent, UniqueEntityID } from 'app/core/domain'

interface PasswordChangedProps {
  userId: UniqueEntityID
  success: boolean
  error?: string
}

export class PasswordChangedEvent extends DomainEvent<PasswordChangedProps> {}
