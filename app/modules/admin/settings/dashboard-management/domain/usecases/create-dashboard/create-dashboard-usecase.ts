import { Either, UseCase } from 'app/core/domain'
import { CreateDashboardUseCaseInput } from './create-dashboard-usecase-input'
import { DashboardErrors } from '../../errors/dashboard-errors'

export type CreateDashboardUseCase = UseCase<
CreateDashboardUseCaseInput,
Either<DashboardErrors.InvalidDashboardName, boolean>
>
