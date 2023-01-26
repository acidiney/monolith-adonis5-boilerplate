import { DomainError, Result } from 'app/core/domain'

export class UserPasswordMisMatch extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.password_mismatch',
      error: UserPasswordMisMatch.name,
    })
  }
}
