import { Either, IEventDispatcher, left, right, UniqueEntityID } from 'app/core/domain'
import { UserNotFoundError, PasswordMismatchError } from 'app/modules/auth/domain'
import { UpdateUserRepository, VerifyPasswordMatchAdapter } from './ports'
import {
  SamePasswordError, UpdatePasswordUseCase, UpdatePasswordUseCaseInput, WrongCurrentPasswordError,
} from '../../domain'
import { PasswordChangedEvent } from 'app/modules/@shared/domain/events/password-changed-event'
import { FindUserIdRepository } from 'app/modules/@shared/usecases/ports/find-user-id-repository'

export class UpdatePasswordUseCaseImpl implements UpdatePasswordUseCase {
  constructor (
    private readonly findUseIdRepository: FindUserIdRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly verifyPasswordMatchAdapter: VerifyPasswordMatchAdapter,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: UpdatePasswordUseCaseInput):
  Promise<Either<UserNotFoundError | WrongCurrentPasswordError | PasswordMismatchError, boolean>> {
    const userEntity = await this.findUseIdRepository.findUserId(new UniqueEntityID(input.userId))

    if (!userEntity) {
      return left(new UserNotFoundError())
    }

    const verifyPasswordResult =
        await this.verifyPasswordMatchAdapter.compare(userEntity.password, input.passwordOptions.currentPassword)

    if (!verifyPasswordResult) {
      return left(new WrongCurrentPasswordError())
    }

    const samePasswordError =
      await this.verifyPasswordMatchAdapter.compare(userEntity.password, input.passwordOptions.newPassword)

    if (samePasswordError) {
      return left(new SamePasswordError())
    }

    const updatePasswordOrError =
        userEntity.changePassword(input.passwordOptions.newPassword, input.passwordOptions.confirmPassword)

    if (updatePasswordOrError.isLeft()) {
      return left(new PasswordMismatchError())
    }

    await this.updateUserRepository.update(userEntity)

    this.eventDispatcher.publish(
      new PasswordChangedEvent({
        userId: userEntity.id,
      })
    )

    return right(true)
  }
}
