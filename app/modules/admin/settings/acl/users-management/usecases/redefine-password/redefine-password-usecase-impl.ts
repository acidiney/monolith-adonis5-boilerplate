import { IEventDispatcher, Either, left, right } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/@shared/domain/errors'
import { RedefinePasswordUseCase, RedefinePasswordUseCaseInput } from '../../domain'
import { UserPasswordRestoredEvent } from '../../domain/events/user-password-restored-event'
import { FindUsernameRepository, UpdateUserRepository } from '../block-user'
import { GenerateRandomPasswordService } from '../create-user'

export class RedefinePasswordUseCaseImpl implements RedefinePasswordUseCase {
  constructor (
    private readonly findUserNameRepository: FindUsernameRepository,
    private readonly generateRandomPasswordService: GenerateRandomPasswordService,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: RedefinePasswordUseCaseInput): Promise<Either<UserNotFoundError, string>> {
    const userEntity = await this.findUserNameRepository.findUsername(input.username)

    if (!userEntity) {
      return left(new UserNotFoundError())
    }

    const newPassword = await this.generateRandomPasswordService.generate(userEntity.slug)

    userEntity.changePassword(newPassword, newPassword)

    await this.updateUserRepository.update(userEntity)

    this.eventDispatcher.publish(new UserPasswordRestoredEvent({
      userId: userEntity.id,
    }))

    return right(newPassword)
  }
}
