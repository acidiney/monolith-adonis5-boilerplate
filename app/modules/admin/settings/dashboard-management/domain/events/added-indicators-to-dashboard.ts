import { DomainEvent, UniqueEntityID } from 'app/core/domain'

interface IndicatorsAddedProps {
  indicators: UniqueEntityID[],
  dashboard: UniqueEntityID,
}

export class AddedIndicatorsToDashbordEvent extends DomainEvent<IndicatorsAddedProps> {}
