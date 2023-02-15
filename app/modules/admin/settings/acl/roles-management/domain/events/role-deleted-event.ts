import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

interface RoleDeletedProps {
  roleId: UniqueEntityID
  userId: UniqueEntityID
}

export class RoleDeleted implements IDomainEvent<RoleDeletedProps> {
  public dateTimeOccurred: Date
  public eventData: RoleDeletedProps

  constructor (_eventData: RoleDeletedProps) {
    this.eventData = _eventData
    this.dateTimeOccurred = new Date()
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
