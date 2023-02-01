import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseInput,
  ResetPasswordUseCaseResult,
} from 'app/modules/auth/domain/usecases'
import {FindTokenRepository} from './ports'
import {left, right} from 'app/core/domain'
import {TokenNotFoundError} from 'app/modules/auth/domain/errors'

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

    return right(true)
  }
}
