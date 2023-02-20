import { Either, IEventDispatcher, left, right} from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/@shared/domain/errors'
import { UnblockUserUseCase, UnblockUserUseCaseInput } from '../../domain'
import { FindUsernameRepository, UpdateUserRepository } from './ports'
import { UserRestoredEvent } from '../../domain/events/user-restored-event'

export class UnblockBlockUserUseCaseImpl implements UnblockUserUseCase{
  constructor (
    private readonly findUserNameRepository: FindUsernameRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: UnblockUserUseCaseInput): Promise<Either<UserNotFoundError, boolean>> {
    const userEntity = await this.findUserNameRepository.findUsername(input.username)

    if (!userEntity) {
      return left(new UserNotFoundError())
    }

    userEntity.restore()

    await this.updateUserRepository.update(userEntity)

    this.eventDispatcher.publish(new UserRestoredEvent({
      userId: userEntity.id,
    }))

    return right(true)
  }
}
