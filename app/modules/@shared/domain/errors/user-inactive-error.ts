import { DomainError, Result } from 'app/core/domain'

export class UserInactiveError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.shared.user.inactive',
      error: UserInactiveError.name,
    })
  }
}
