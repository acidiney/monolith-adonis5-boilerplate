import {DomainError, Result} from 'app/core/domain'

export class WrongCurrentPasswordError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.current_password_mismatch',
      error: WrongCurrentPasswordError.name,
    })
  }
}
