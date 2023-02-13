import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

interface RoleCreatedProps {
  roleId: UniqueEntityID
}

export class RoleCreatedEvent implements IDomainEvent<RoleCreatedProps> {
  public dateTimeOccurred: Date
  public eventData: RoleCreatedProps

  constructor (_eventData: RoleCreatedProps) {
    this.eventData = _eventData
    this.dateTimeOccurred = new Date()
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
