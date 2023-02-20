import { IEventDispatcher, Either, left, right } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/@shared/domain/errors'
import { DeleteUserUseCase, DeleteUserUseCaseInput } from '../../domain'
import { RootUserCannotBeModified } from '../../domain/errors'
import { UserDeletedEvent } from '../../domain/events/user-deleted-event'
import { FindUsernameRepository, UpdateUserRepository } from '../block-user'

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
  constructor (
    private readonly findUserNameRepository: FindUsernameRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: DeleteUserUseCaseInput): Promise<
  Either<UserNotFoundError | RootUserCannotBeModified, boolean>> {
    const userEntity = await this.findUserNameRepository.findUsername(input.username)

    if (!userEntity) {
      return left(new UserNotFoundError())
    }

    if (userEntity.isRoot) {
      return left(new RootUserCannotBeModified())
    }
    userEntity.delete()

    await this.updateUserRepository.update(userEntity)

    this.eventDispatcher.publish(new UserDeletedEvent({
      userId: userEntity.id,
      motivation: input.motivation,
    }))

    return right(true)
  }
}
