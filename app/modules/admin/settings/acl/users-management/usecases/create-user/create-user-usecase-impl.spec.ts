/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {
  CreateUserUseCaseImpl,
} from './create-user-usecase-impl'
import {EmailError, UserNameErrors} from 'app/domain/errors'
import {makeFindUsernameRepositoryStub} from 'app/modules/auth/__test__'
import {FindUsernameRepository} from 'app/modules/auth/usecases'
import {
  GenerateRandomPasswordService, PersistUserRepository,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'
import {
  makeGenerateRandomPasswordServiceStub, makePersistUserRepositoryStub,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/__test__'
import {EventDispatcher} from 'app/core/domain'
import {UserAlreadyExistError} from 'app/modules/admin/settings/acl/users-management/domain/errors'

interface SutTypes {
  sut: CreateUserUseCaseImpl,
  findUsernameRepositoryStub: FindUsernameRepository,
  generateRandomPasswordServiceStub: GenerateRandomPasswordService,
  persistUserRepositoryStub: PersistUserRepository
}

const makeSut = (): SutTypes => {
  const findUsernameRepositoryStub = makeFindUsernameRepositoryStub()
  const generateRandomPasswordServiceStub = makeGenerateRandomPasswordServiceStub()
  const persistUserRepositoryStub = makePersistUserRepositoryStub()

  const sut = new CreateUserUseCaseImpl(
    findUsernameRepositoryStub,
    generateRandomPasswordServiceStub,
    persistUserRepositoryStub,
    new EventDispatcher()
  )
  return { sut, generateRandomPasswordServiceStub, findUsernameRepositoryStub, persistUserRepositoryStub }
}

describe('CreateUserUseCase', function () {
  it('should return EmailInvalidError error', async () => {
    const { sut } = makeSut()

    const output = await sut.perform({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      role: 'valid_role_id',
    })

    expect(output.isLeft())
    expect(output.value).toBeInstanceOf(EmailError.EmailInvalidError)
  })

  it('should return UserAlreadyExist error', async () => {
    const { sut } = makeSut()

    const output = await sut.perform({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@mail.com',
      role: 'valid_role_id',
    })

    expect(output.isLeft())
    expect(output.value).toBeInstanceOf(UserAlreadyExistError)
  })

  it ('should return invalid first name error', async () => {
    const { sut } = makeSut()
    const output = await sut.perform({
      firstName: '',
      lastName: 'lastName',
      email: 'email@mail.com',
      role: 'valid_role_id',
    })

    expect(output.isLeft())
    expect(output.value).toBeInstanceOf(UserNameErrors.UserFirstNameRequiredError)
  })

  it ('should return invalid last name error', async () => {
    const { sut } = makeSut()
    const output = await sut.perform({
      firstName: 'first',
      lastName: '',
      email: 'email@mail.com',
      role: 'valid_role_id',
    })

    expect(output.isLeft())
    expect(output.value).toBeInstanceOf(UserNameErrors.UserLastNameRequiredError)
  })

  it ('should return right if succeed', async () => {
    const { sut, findUsernameRepositoryStub} = makeSut()
    jest.spyOn(findUsernameRepositoryStub, 'findUsername')
      .mockResolvedValueOnce(undefined)
    const output = await sut.perform({
      firstName: 'first',
      lastName: 'user',
      email: 'email@mail.com',
      role: 'valid_role_id',
    })

    expect(output.isRight())
  })
})
