import {AuthenticateUserInput, AuthenticateUserOutput, AuthenticateUserUseCase} from 'app/modules/auth/domain/usecases'
import {UserNotFoundError, PasswordMismatchError} from 'app/modules/auth/domain/errors'
import {Either, IEventDispatcher, left, right} from 'app/core/domain'
import {FindUsernameRepository} from 'app/modules/auth/usecases'
import {VerifyPasswordMatchAdapter} from 'app/modules/auth/usecases/authenticate-user/ports'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'

export class AuthenticateUserUseCaseImpl implements AuthenticateUserUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly verifyPasswordMatchAdapter: VerifyPasswordMatchAdapter,
    private readonly eventDispatcher: IEventDispatcher
  ) {
  }

  public async perform (input: AuthenticateUserInput): Promise<
    Either<UserNotFoundError | PasswordMismatchError, AuthenticateUserOutput>
    > {
    const user = await this.findUsernameRepository.findUsername(input.username)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const result = await this.verifyPasswordMatchAdapter.compare(user.password, input.password)

    if (!result) {
      return left(new PasswordMismatchError())
    }

    this.eventDispatcher.publish(new UserLoggedEvent({
      userId: user.id,
    }))

    return right({
      userId: user.id.toString(),
    })
  }
}
