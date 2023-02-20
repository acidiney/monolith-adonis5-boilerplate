import { Either, IEventDispatcher, left, right} from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/@shared/domain/errors'
import { BlockUserUseCase, BlockUserUseCaseInput } from '../../domain'
import { FindUsernameRepository, UpdateUserRepository } from './ports'
import { UserRestoredEvent } from '../../domain/events/user-restored-event'

export class BlockUserUseCaseImpl implements BlockUserUseCase{
  constructor (
    private readonly findUserNameRepository: FindUsernameRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: BlockUserUseCaseInput): Promise<Either<UserNotFoundError, boolean>> {
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
