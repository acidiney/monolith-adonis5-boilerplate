import { Either, IEventDispatcher, left, right, UniqueEntityID } from 'app/core/domain'
import { FindUsernameRepository, UpdateUserRepository } from './ports'
import { UpdateUserErrors, UpdateUserUseCase, UpdateUserUseCaseInput } from '../../domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { Email } from 'app/modules/@shared/domain/value-objects/email'
import { UserUpdatedEvent, UserUpdatedProps } from '../../domain/events/user-updated-event'
import { UserAlreadyExistError } from '../../domain/errors'

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly findUserActiveByEmailRepository: FindUsernameRepository,
    private readonly eventDispatcher: IEventDispatcher,
  ) { }

  public async perform (input: UpdateUserUseCaseInput): Promise<Either<UpdateUserErrors, boolean>> {
    const user = await this.findUsernameRepository.findUsername(input.username)
    if (!user) {
      return left(new UserNotFoundError())
    }

    const eventProps: UserUpdatedProps = {
      userId: user.id,
      old: {
        fullName: user.fullName,
        email: user.email,
        roleId: new UniqueEntityID(user.roleId),
      },
      new: {
        fullName: user.fullName,
        email: user.email,
        roleId: new UniqueEntityID(user.roleId),
      },
    }

    user.changeFirstName(input.firstName)
    user.changeLastName(input.lastName)
    user.updatePermissions(new UniqueEntityID(input.role))

    if (user.email !== input.email) {
      const newEmail = Email.create(input.email)

      if (newEmail.isLeft()) {
        return left(newEmail.value)
      }

      user.alterEmail(newEmail.value)

      const olderUserWithSameEmail = await this.findUserActiveByEmailRepository.findUsername(user.email)

      if (olderUserWithSameEmail && !(olderUserWithSameEmail.id.equals(user.id))) {
        return left(new UserAlreadyExistError())
      }
    }

    await this.updateUserRepository.update(user)

    eventProps.new = {
      fullName: user.fullName,
      email: user.email,
      roleId: new UniqueEntityID(user.roleId),
    }

    await this.eventDispatcher.publish(new UserUpdatedEvent(eventProps))
    return right(true)
  }
}
