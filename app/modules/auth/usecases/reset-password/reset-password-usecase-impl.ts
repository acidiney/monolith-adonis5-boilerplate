import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseInput,
  ResetPasswordUseCaseResult,
} from 'app/modules/auth/domain/usecases'
import {FindTokenRepository, FindUserIdRepository, UpdateUserRepository} from './ports'
import {EventDispatcher, left, right} from 'app/core/domain'
import {
  TokenExpiredError,
  TokenNotFoundError,
  TokenRevokedError, UserNotFoundError,
} from 'app/modules/auth/domain/errors'
import {TokenEntity} from 'app/modules/auth/domain'
import {PasswordChangedEvent} from 'app/modules/auth/domain/events/password-changed-event'

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  constructor (
    private readonly findTokenRepository: FindTokenRepository,
    private readonly findUserIdRepository: FindUserIdRepository,
    private readonly userUserRepository: UpdateUserRepository,
    private readonly eventEmitter: EventDispatcher
  ) {
  }

  private validateToken (token: TokenEntity): ResetPasswordUseCaseResult {
    if (token.isExpired) {
      return left(new TokenExpiredError())
    }

    if (token.isRevoked) {
      return left(new TokenRevokedError())
    }

    return right(true)
  }

  public async perform (input: ResetPasswordUseCaseInput): Promise<ResetPasswordUseCaseResult> {
    const token = await this.findTokenRepository.find(input.token)

    if (!token) {
      return left(new TokenNotFoundError())
    }

    const validateTokenResult = this.validateToken(token)

    if (validateTokenResult.isLeft()) {
      return left(validateTokenResult.value)
    }

    const user = await this.findUserIdRepository.findUserId(token.userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const passwordUpdated = user.changePassword(input.password, input.confirmPassword)

    if (passwordUpdated.isLeft()) {
      this.eventEmitter.publish(new PasswordChangedEvent({
        userId: user.id,
        success: false,
        error: passwordUpdated.value.errorName,
      }))

      return left(passwordUpdated.value)
    }

    await this.userUserRepository.update(user)

    this.eventEmitter.publish(new PasswordChangedEvent({
      userId: user.id,
      success: true,
    }))

    return right(true)
  }
}
