import { Either, UseCase } from 'app/core/domain'
import { AddIndicatorsToDashboard } from './errors'

import { AddIndicatorsToDashboardUseCaseInput } from './add-indicators-to-dashboard-usecase-input'
import { DashboardErrors } from '../../errors'

export type AddIndicatorsToDashboardUseCase = UseCase<
  AddIndicatorsToDashboardUseCaseInput,
  Either< AddIndicatorsToDashboard.AddIndiciatorsToDashboardErrors | DashboardErrors.DashboardNotFound, boolean>
>
