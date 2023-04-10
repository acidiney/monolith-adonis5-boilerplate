import { DomainError, Result } from 'app/core/domain'

export namespace DashboardErrors {
  export class InvalidDashboardName extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'dashboard-management.invalid-dashboard-name',
        error: InvalidDashboardName.name,
      })
    }
  }
}
