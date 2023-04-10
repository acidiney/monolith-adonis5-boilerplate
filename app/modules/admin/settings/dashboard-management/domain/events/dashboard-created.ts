import { DomainEvent, UniqueEntityID } from 'app/core/domain'

interface DashboardCreatedProps {
  id: UniqueEntityID
}

export class DasboardCreatedEvent extends DomainEvent<DashboardCreatedProps> {}
