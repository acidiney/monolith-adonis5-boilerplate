import {
  makeFindUsernameRepositoryStub,
  makeGeneratePasswordTokenRepositoryStub,
  makeSendResetPasswordLinkServiceStub,
} from './__test__'

import {
  FindUsernameRepository,
  GenerateResetPasswordTokenRepository,
  SendResetPasswordLinkService,
  SendResetPasswordUseCaseImpl,
} from 'app/modules/auth/usecases'
import {UserNotFoundError} from 'app/modules/auth/domain/errors'
import {SendResetPasswordUseCase} from 'app/modules/auth/domain/usecases'
import {UniqueEntityID} from 'app/core/domain'

interface SutTypes {
  sut: SendResetPasswordUseCase
  generatePasswordTokenRepositoryStub: GenerateResetPasswordTokenRepository
  sendResetPasswordLinkServiceSub: SendResetPasswordLinkService
  findUsernameRepositoryStub: FindUsernameRepository
}

const makeSut = (): SutTypes => {
  const findUsernameRepositoryStub = makeFindUsernameRepositoryStub()
  const generatePasswordTokenRepositoryStub = makeGeneratePasswordTokenRepositoryStub()
  const sendResetPasswordLinkServiceSub = makeSendResetPasswordLinkServiceStub()

  const sut = new SendResetPasswordUseCaseImpl(
    findUsernameRepositoryStub,
    generatePasswordTokenRepositoryStub,
    sendResetPasswordLinkServiceSub,
  )

  return {
    sut,
    findUsernameRepositoryStub,
    generatePasswordTokenRepositoryStub,
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

  it ('should calls generatePasswordTokenRepository with userId', async () => {
    const { sut, generatePasswordTokenRepositoryStub } = makeSut()

    const generatePasswordTokenRepositorySpy = jest.spyOn(generatePasswordTokenRepositoryStub, 'generate')

    await sut.perform({ username: 'valid@mail.com' })
    expect(generatePasswordTokenRepositorySpy).toBeCalledTimes(1)
    expect(generatePasswordTokenRepositorySpy).toBeCalledWith(new UniqueEntityID('valid_user_id'))
  })

  it ('should calls sendResetPasswordLinkService with token', async () => {
    const { sut, sendResetPasswordLinkServiceSub } = makeSut()

    const sendResetPasswordLinkServiceSpy = jest.spyOn(sendResetPasswordLinkServiceSub, 'send')

    await sut.perform({ username: 'valid@mail.com' })
    expect(sendResetPasswordLinkServiceSpy).toBeCalledTimes(1)
    expect(sendResetPasswordLinkServiceSpy)
      .toBeCalledWith(
        {'fullName': 'valid_full_name', 'token': 'valid_token', 'username': 'valid@mail.com'}
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
