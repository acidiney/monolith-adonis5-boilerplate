import { Either, left } from 'app/core/domain'
import { CreateDashboardUseCase } from '../../domain/usecases/create-dashboard/create-dashboard-usecase'
import { CreateDashboardUseCaseInput } from '../../domain/usecases/create-dashboard/create-dashboard-usecase-input'
import { DashboardErrors } from '../../domain/errors/dashboard-errors'

export class CreateDashboardUseCaseImpl implements CreateDashboardUseCase {
  public async perform (_input: CreateDashboardUseCaseInput):
  Promise<Either<DashboardErrors.InvalidDashboardName, boolean>> {
    return left(new DashboardErrors.InvalidDashboardName())
  }
}
