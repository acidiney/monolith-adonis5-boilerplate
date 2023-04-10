import { UseCase } from 'app/core/domain'
import { CreateDashboardUseCaseInput } from './create-dashboard-usecase-input'

export type CreateDashboardUseCase = UseCase<CreateDashboardUseCaseInput, void>
