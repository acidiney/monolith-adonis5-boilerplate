import {AuthenticateUserUseCase} from 'app/modules/auth/domain/usecases'
import {
  AuthenticateUserUseCaseImpl,
  FindUsernameRepository,
  VerifyPasswordMatchAdapter,
} from 'app/modules/auth/usecases'
import {makeFindUsernameRepositoryStub, makeVerifyPasswordMatchAdapterStub} from './__test__'
import {UserNotFoundError, PasswordMismatchError} from 'app/modules/auth/domain/errors'
import {EventDispatcher} from 'app/core/domain'

interface SutTypes {
  sut: AuthenticateUserUseCase,
  findUsernameRepositoryStub: FindUsernameRepository,
  verifyPasswordMatchAdapterStub: VerifyPasswordMatchAdapter
}

const makeSut = (): SutTypes => {
  const findUsernameRepositoryStub = makeFindUsernameRepositoryStub()
  const verifyPasswordMatchAdapterStub = makeVerifyPasswordMatchAdapterStub()
  const sut = new AuthenticateUserUseCaseImpl(
    findUsernameRepositoryStub,
    verifyPasswordMatchAdapterStub,
    new EventDispatcher()
  )

  return {
    sut,
    findUsernameRepositoryStub,
    verifyPasswordMatchAdapterStub,
  }
}

describe('AuthenticateUserUseCase', () => {
  it('should not found a user', async () => {
    const { sut, findUsernameRepositoryStub } = makeSut()

    jest.spyOn(findUsernameRepositoryStub, 'findUsername')
      .mockReturnValueOnce(Promise.resolve(undefined))

    const output = await sut.perform({
      username: 'invalid@mail.com',
      password: 'valid_password',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should not match passwords', async () => {
    const { sut, verifyPasswordMatchAdapterStub } = makeSut()

    jest.spyOn(verifyPasswordMatchAdapterStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false))

    const output = await sut.perform({
      username: 'valid@mail.com',
      password: 'invalid_password',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(PasswordMismatchError)
  })

  it('should throws when findUsernameRepository throws', async () => {
    const { sut, findUsernameRepositoryStub } = makeSut()

    const error = new Error('Database Error')
    jest.spyOn(findUsernameRepositoryStub, 'findUsername')
      .mockReturnValueOnce(Promise.reject(error))

    const output = sut.perform({
      username: 'valid@mail.com',
      password: 'valid_password',
    })

    await expect(output).rejects.toThrow(error)
  })

  it('should return userId when succeed', async () => {
    const { sut } = makeSut()

    const output = await sut.perform({
      username: 'valid@mail.com',
      password: 'valid_password',
    })

    expect(output.isRight())
    expect(output.value).toEqual({
      userId: 'valid_id',
    })
  })
})
