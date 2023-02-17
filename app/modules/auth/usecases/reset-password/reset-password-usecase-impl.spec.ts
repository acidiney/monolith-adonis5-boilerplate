import {FindTokenRepository, FindUserIdRepository, UpdateTokenRepository, UpdateUserRepository} from './ports'
import {makeFindTokenRepositoryStub, makeUpdateTokenRepositoryStub, makeUpdateUserRepositoryStub} from './__test__'

import {ResetPasswordUseCaseImpl} from 'app/modules/auth/usecases'
import {ResetPasswordUseCase} from 'app/modules/auth/domain/usecases'

import {EventDispatcher, IEventDispatcher, UniqueEntityID} from 'app/core/domain'
import {
  PasswordMismatchError,
  TokenEntity,
  TokenExpiredError,
  TokenNotFoundError,
  TokenRevokedError,
  TokenTypes,
} from '../../domain'
import {makeFindUserIdRepositoryStub} from 'app/modules/auth/__test__'
import {PasswordChangedEvent} from 'app/modules/@shared/domain/events/password-changed-event'

interface SutTypes {
  sut: ResetPasswordUseCase,
  findTokenRepositoryStub: FindTokenRepository,
  findUserIdRepositoryStub: FindUserIdRepository,
  updateUserRepositoryStub: UpdateUserRepository,
  updateTokenRepositoryStub: UpdateTokenRepository,
  eventDispatcher: IEventDispatcher
}

const makeSut = (): SutTypes => {
  const findTokenRepositoryStub = makeFindTokenRepositoryStub()
  const findUserIdRepositoryStub = makeFindUserIdRepositoryStub()
  const updateUserRepositoryStub = makeUpdateUserRepositoryStub()
  const updateTokenRepositoryStub = makeUpdateTokenRepositoryStub()
  const eventDispatcher = new EventDispatcher()

  const sut = new ResetPasswordUseCaseImpl(
    findTokenRepositoryStub,
    findUserIdRepositoryStub,
    updateUserRepositoryStub,
    updateTokenRepositoryStub,
    eventDispatcher,
  )

  return {
    sut,
    findTokenRepositoryStub,
    findUserIdRepositoryStub,
    updateUserRepositoryStub,
    eventDispatcher,
    updateTokenRepositoryStub,
  }
}

describe('ResetPasswordUseCaseImpl', function () {
  it('should return token not found', async () => {
    const { sut , findTokenRepositoryStub } = makeSut()

    jest.spyOn(findTokenRepositoryStub, 'find')
      .mockReturnValueOnce(Promise.resolve(undefined))

    const output = await sut.perform({
      token: 'valid_token',
      password: 'new_password',
      confirmPassword: 'new_password',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(TokenNotFoundError)
  })

  it ('should return token expired', async () => {
    const { sut, findTokenRepositoryStub } = makeSut()

    jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-02-03'))

    jest.spyOn(findTokenRepositoryStub, 'find')
      .mockReturnValueOnce(Promise.resolve(TokenEntity.hydrate(
        new UniqueEntityID('valid_token_id'),
        {
          token: 'valid_token',
          userId: new UniqueEntityID('valid_user_id'),
          expiredAt: new Date(2022, 1, 1),
          revoked: false,
          tokenType: TokenTypes.RECOVER_PASSWORD,
        }
      )))

    const output = await sut.perform({
      token: 'valid_token',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(TokenExpiredError)
  })

  it ('should return token revoked', async () => {
    const { sut, findTokenRepositoryStub } = makeSut()

    jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-01-01'))

    jest.spyOn(findTokenRepositoryStub, 'find')
      .mockReturnValueOnce(Promise.resolve(TokenEntity.hydrate(
        new UniqueEntityID('valid_token_id'),
        {
          token: 'valid_token',
          userId: new UniqueEntityID('valid_user_id'),
          expiredAt: new Date(2022, 1, 1),
          revoked: true,
          tokenType: TokenTypes.RECOVER_PASSWORD,
        }
      )))

    const output = await sut.perform({
      token: 'valid_token',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(TokenRevokedError)
  })

  it('should return password mismatch', async () => {
    const { sut, eventDispatcher } = makeSut()
    const eventDispatcherSpy = jest.spyOn(eventDispatcher, 'publish')

    const output = await sut.perform({
      token: 'valid_token',
      password: 'valid_password',
      confirmPassword: 'in_valid_password',
    })

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(PasswordMismatchError)
    expect(eventDispatcherSpy).toBeCalledWith(new PasswordChangedEvent({
      userId: new UniqueEntityID('valid_user_id'),
      success: false,
      error: PasswordMismatchError.name,
    }))
  })

  it('should return success', async () => {
    const { sut, eventDispatcher } = makeSut()

    const eventDispatcherSpy = jest.spyOn(eventDispatcher, 'publish')

    const output = await sut.perform({
      token: 'valid_token',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    })

    expect(output.isRight()).toBeTruthy()
    expect(eventDispatcherSpy).toBeCalledWith(new PasswordChangedEvent({
      userId: new UniqueEntityID('valid_user_id'),
      success: true,
    }))
  })
})
