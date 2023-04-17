import { DomainError, Result } from 'app/core/domain'

export namespace AddIndicatorsToDashboard {
  export class IndicatorNotFoundError extends Result<DomainError> {
    constructor () {
      super(false, {
        error: IndicatorNotFoundError.name,
        message: 'admin.setting.dashboard-management.indicator-not-found',
      })
    }
  }
  export class NeedToHaveAtLeastOneIndicatorError extends Result<DomainError> {
    constructor () {
      super(false, {
        error: NeedToHaveAtLeastOneIndicatorError.name,
        message: 'admin.setting.dashboard-management.need-to-have-at-least-one-indicator',
      })
    }
  }

  export type AddIndiciatorsToDashboardErrors = IndicatorNotFoundError | NeedToHaveAtLeastOneIndicatorError
}
