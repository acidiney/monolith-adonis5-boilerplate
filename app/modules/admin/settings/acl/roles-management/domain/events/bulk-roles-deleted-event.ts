import { DomainEvent, UniqueEntityID } from 'app/core/domain'

interface BulkRolesDeletedProps {
  roles: UniqueEntityID[]
}

export class BulkRolesDeletedEvent extends DomainEvent<BulkRolesDeletedProps> {}
