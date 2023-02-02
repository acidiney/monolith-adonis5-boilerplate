import {IDomainEvent, UniqueEntityID} from 'app/core/domain'
import {TokenTypes} from 'app/modules/auth/domain'

interface RevokeTokenProps {
  userId: UniqueEntityID
  token: string
  tokenType: TokenTypes
}

export class TokenRevokedEvent implements IDomainEvent<RevokeTokenProps> {
  public dateTimeOccurred: Date

  public readonly eventData: RevokeTokenProps
  constructor (protected readonly _eventData: RevokeTokenProps) {
    this.dateTimeOccurred = new Date()
    this.eventData = _eventData
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
