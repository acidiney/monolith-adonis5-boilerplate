import {Either, IEventDispatcher, left, right} from 'app/core/domain'
import { UserNotFoundError } from '../../domain/errors'
import { SendResetPasswordInput, SendResetPasswordUseCase } from '../../domain/usecases'
import {
  FindUsernameRepository,
  HashAdapter,
  PersistResetPasswordTokenRepository,
  SendResetPasswordLinkService,
} from './ports'
import {TokenTypes} from 'app/modules/auth/domain'
import {SentResetPasswordEvent} from 'app/modules/auth/domain/events/sent-reset-password-event'

export class SendResetPasswordUseCaseImpl implements SendResetPasswordUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly hashAdapter: HashAdapter,
    private readonly persistResetPasswordTokenRepository: PersistResetPasswordTokenRepository,
    private readonly sendResetPasswordLinkService: SendResetPasswordLinkService,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: SendResetPasswordInput): Promise<Either<UserNotFoundError, boolean>> {
    const user = await this.findUsernameRepository.findUsername(input.username)

    if (!user) {
      return left(new UserNotFoundError())
    }
    const token = await this.hashAdapter.generate(user.id.toString(), TokenTypes.RECOVER_PASSWORD)
    await this.persistResetPasswordTokenRepository.persist(user.id, token)

    await this.sendResetPasswordLinkService.send({
      username: user.email,
      fullName: user.fullName,
      token,
    })

    await this.eventDispatcher.publish(new SentResetPasswordEvent({
      userId: user.id,
    }))

    return right(true)
  }
}
