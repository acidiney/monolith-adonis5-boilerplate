import {DomainEvent, UniqueEntityID} from 'app/core/domain'

interface RoleDeletedProps {
  roleId: UniqueEntityID
}

export class RoleDeleted extends DomainEvent<RoleDeletedProps> {}
