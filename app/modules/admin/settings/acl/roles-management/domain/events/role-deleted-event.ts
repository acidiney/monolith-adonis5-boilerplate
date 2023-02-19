import {DomainEvent, UniqueEntityID} from 'app/core/domain'

interface RoleDeletedProps {
  roleId: UniqueEntityID
  userId: UniqueEntityID
}

export class RoleDeleted extends DomainEvent<RoleDeletedProps> {}
