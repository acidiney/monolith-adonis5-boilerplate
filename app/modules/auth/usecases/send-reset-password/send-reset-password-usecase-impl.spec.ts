
import {
  makeFindUsernameRepositoryStub, makeHashAdapterStub,
  makePersistPasswordTokenRepositoryStub,
  makeSendResetPasswordLinkServiceStub,
} from './__test__'

import {
  FindUsernameRepository, HashAdapter,
  PersistResetPasswordTokenRepository,
  SendResetPasswordLinkService,
  SendResetPasswordUseCaseImpl,
} from 'app/modules/auth/usecases'
import {UserNotFoundError} from 'app/modules/auth/domain/errors'
import {SendResetPasswordUseCase} from 'app/modules/auth/domain/usecases'
import {EventDispatcher} from 'app/core/domain'

interface SutTypes {
  sut: SendResetPasswordUseCase
  hashAdapterStub: HashAdapter
  persistPasswordTokenRepositoryStub: PersistResetPasswordTokenRepository
  sendResetPasswordLinkServiceSub: SendResetPasswordLinkService
  findUsernameRepositoryStub: FindUsernameRepository
}

const makeSut = (): SutTypes => {
  const findUsernameRepositoryStub = makeFindUsernameRepositoryStub()
  const persistPasswordTokenRepositoryStub = makePersistPasswordTokenRepositoryStub()
  const hashAdapterStub = makeHashAdapterStub()
  const sendResetPasswordLinkServiceSub = makeSendResetPasswordLinkServiceStub()

  const sut = new SendResetPasswordUseCaseImpl(
    findUsernameRepositoryStub,
    hashAdapterStub,
    persistPasswordTokenRepositoryStub,
    sendResetPasswordLinkServiceSub,
    new EventDispatcher()
  )

  return {
    sut,
    findUsernameRepositoryStub,
    hashAdapterStub,
    persistPasswordTokenRepositoryStub,
    sendResetPasswordLinkServiceSub,
  }
}

describe('SendResetPasswordUseCase', () => {
  it('should returns UserNotFoundError, when username does not exists', async () => {
    const { sut, findUsernameRepositoryStub } = makeSut()

    jest.spyOn(findUsernameRepositoryStub, 'findUsername')
      .mockReturnValueOnce(Promise.resolve(undefined))

    const output = await sut.perform({
      username: 'invalid@mail.com',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(UserNotFoundError)
  })

  it ('should calls sendResetPasswordLinkService with token', async () => {
    const { sut, sendResetPasswordLinkServiceSub } = makeSut()

    const sendResetPasswordLinkServiceSpy = jest.spyOn(sendResetPasswordLinkServiceSub, 'send')

    await sut.perform({ username: 'valid@mail.com' })
    expect(sendResetPasswordLinkServiceSpy).toBeCalledTimes(1)
    expect(sendResetPasswordLinkServiceSpy)
      .toBeCalledWith(
        {'fullName': 'valid user', 'token': 'valid_token', 'username': 'valid@email.com'}
      )
  })

  it('should throws when findUsernameRepository throws', async () => {
    const { sut, findUsernameRepositoryStub } = makeSut()

    const error = new Error('Database Error')
    jest.spyOn(findUsernameRepositoryStub, 'findUsername')
      .mockReturnValueOnce(Promise.reject(error))

    const output = sut.perform({
      username: 'valid@mail.com',
    })

    await expect(output).rejects.toThrow(error)
  })
})
