import {
  DashboardErrors,
  Dashboard,
  CreateDashboardUseCase,
  CreateDashboardUseCaseInput,
  DashboardCreatedEvent,
} from '../../domain'
import { CreateDashboardRepository } from './ports'
import { Either, left, right, IEventDispatcher } from 'app/core/domain'

export class CreateDashboardUseCaseImpl implements CreateDashboardUseCase {
  constructor (
    private readonly createDashboardRepository: CreateDashboardRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (
    input: CreateDashboardUseCaseInput
  ): Promise<Either<DashboardErrors.InvalidDashboardName, boolean>> {
    const dashboardOrError = Dashboard.create({
      name: input.name,
      description: input.description,
      items: [],
    })

    if (dashboardOrError.isLeft()) {
      return left(dashboardOrError.value)
    }

    await this.createDashboardRepository.persist(dashboardOrError.value)

    this.eventDispatcher.publish(
      new DashboardCreatedEvent({
        id: dashboardOrError.value.id,
      })
    )

    return right(true)
  }
}
