/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {StatusEnum} from 'app/modules/@shared/domain/types'
import {Email} from 'app/modules/@shared/domain/value-objects/email'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'
import {FindUsernameRepository} from 'app/modules/auth/usecases'
import {
  CreateUserUseCase,
  CreateUserUseCaseInput,
} from 'app/modules/admin/settings/acl/users-management/domain'
import {Either, IEventDispatcher, left, right, UniqueEntityID} from 'app/core/domain'
import {
  GenerateRandomPasswordService, PersistUserRepository,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'
import {UserAlreadyExistError} from 'app/modules/admin/settings/acl/users-management/domain/errors'
import {UserCreatedEvent} from 'app/modules/admin/settings/acl/users-management/domain/events/user-created-event'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly generateRandomPasswordService: GenerateRandomPasswordService,
    private readonly persistUserRepository: PersistUserRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: CreateUserUseCaseInput):
  Promise<Either<UserAlreadyExistError, string>> {
    const emailOrError = Email.create(input.email)

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const userEntityOrEntity = UserEntity.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: emailOrError.value,
      status: StatusEnum.ACTIVE,
      roleId: new UniqueEntityID(input.role),
      password: 'first_password',
    })

    if (userEntityOrEntity.isLeft()) {
      return left(userEntityOrEntity.value)
    }

    const userExist = await this.findUsernameRepository.findUsername(userEntityOrEntity.value.email)

    if (userExist) {
      return left(new UserAlreadyExistError())
    }

    const randomPassword = await this.generateRandomPasswordService.generate(userEntityOrEntity.value.email)

    userEntityOrEntity.value.changePassword(randomPassword, randomPassword)

    const userSlug = await this.persistUserRepository.persist(userEntityOrEntity.value)

    this.eventDispatcher.publish(new UserCreatedEvent({
      userId: userEntityOrEntity.value.id,
      password: randomPassword,
    }))

    return right(userSlug)
  }
}
