import {Either, UseCase} from 'app/core/domain'
import {
  TokenExpiredError,
  TokenNotFoundError,
  TokenRevokedError,
  PasswordMismatchError, UserNotFoundError,
} from 'app/modules/auth/domain/errors'

export interface ResetPasswordUseCaseInput {
  token: string,
  password: string,
  confirmPassword: string,
}

export type ResetPasswordUseCaseResult = Either<
    TokenExpiredError | TokenNotFoundError | TokenRevokedError | PasswordMismatchError | UserNotFoundError
  , boolean>

export type ResetPasswordUseCase = UseCase<ResetPasswordUseCaseInput, ResetPasswordUseCaseResult>
