import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseInput,
  ResetPasswordUseCaseResult,
} from 'app/modules/auth/domain/usecases'
import {FindTokenRepository} from './ports'
import {left, right} from 'app/core/domain'
import {TokenExpiredError, TokenNotFoundError, TokenRevokedError} from 'app/modules/auth/domain/errors'

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  constructor (
    private readonly findTokenRepository: FindTokenRepository
  ) {
  }

  public async perform (input: ResetPasswordUseCaseInput): Promise<ResetPasswordUseCaseResult> {
    const token = await this.findTokenRepository.find(input.token)

    if (!token) {
      return left(new TokenNotFoundError())
    }

    if (token.isExpired) {
      return left(new TokenExpiredError())
    }

    if (token.isRevoked) {
      return left(new TokenRevokedError())
    }

    return right(true)
  }
}
