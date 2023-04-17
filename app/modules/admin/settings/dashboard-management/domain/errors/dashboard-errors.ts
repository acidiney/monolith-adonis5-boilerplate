import { DomainError, Result } from 'app/core/domain'

export namespace DashboardErrors {
  export class InvalidDashboardName extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.settings.dashboard-management.invalid-dashboard-name',
        error: InvalidDashboardName.name,
      })
    }
  }

  export class DashboardNotFound extends Result <DomainError> {
    constructor () {
      super(false, {
        message: 'admin.settings.dashboard-management.dashboard-not-found',
        error: DashboardNotFound.name,
      })
    }
  }
}
