import {
  UpdateUserInfoUseCase,
  UpdateUserInfoUseCaseInput,
  UserInfoUpdatedEvent,
  UserInfoUpdatedProps,
} from '../../domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { FindUserIdRepository, UpdateUserRepository } from './ports'
import { Either, IEventDispatcher, left, right, UniqueEntityID } from 'app/core/domain'

export class UpdateUserInfoUseCaseImpl implements UpdateUserInfoUseCase {
  constructor (
    private readonly findUserIdRepository: FindUserIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) { }

  public async perform (input: UpdateUserInfoUseCaseInput): Promise<Either<UserNotFoundError, boolean>> {
    const userEntity = await this.findUserIdRepository.findUserId(new UniqueEntityID(input.userId))

    if (!userEntity) {
      return left(new UserNotFoundError())
    }

    const eventProps: UserInfoUpdatedProps = {
      old: {
        avatarUrl: userEntity.avatar,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
      },
      new: {
        avatarUrl: input.avatarUrl,
        firstName: input.firstName,
        lastName: input.lastName,
      },
    }

    if (input.avatarUrl) {
      userEntity.changeAvatar(input.avatarUrl)
    }

    userEntity.changeFirstName(input.firstName)
    userEntity.changeLastName(input.lastName)

    const userValidationError = userEntity.validate()

    if (userValidationError.isLeft()) {
      return left(userValidationError.value)
    }

    await this.updateUserRepository.update(userEntity)

    this.eventDispatcher.publish(new UserInfoUpdatedEvent(eventProps))
    return right(true)
  }
}
