import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

export interface RoleUpdatedProps {
  older: {
    name: string,
    description: string,
    permissions: UniqueEntityID[]
  },
  roleId: UniqueEntityID
  userId: UniqueEntityID
}

export class RoleUpdatedEvent implements IDomainEvent<RoleUpdatedProps> {
  public dateTimeOccurred: Date
  public eventData: RoleUpdatedProps

  constructor (_eventData: RoleUpdatedProps) {
    this.eventData = _eventData
    this.dateTimeOccurred = new Date()
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
