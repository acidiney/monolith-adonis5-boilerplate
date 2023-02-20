import {DomainEvent, UniqueEntityID} from 'app/core/domain'

export interface RoleUpdatedProps {
  older: {
    name: string,
    description: string,
    permissions: UniqueEntityID[]
  },
  roleId: UniqueEntityID
}

export class RoleUpdatedEvent extends DomainEvent<RoleUpdatedProps> {}
