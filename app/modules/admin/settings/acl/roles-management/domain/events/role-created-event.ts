import {DomainEvent, UniqueEntityID} from 'app/core/domain'

interface RoleCreatedProps {
  roleId: UniqueEntityID
}

export class RoleCreatedEvent extends DomainEvent<RoleCreatedProps> {}
