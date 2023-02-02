import {FindTokenRepository} from './ports'
import {makeFindTokenRepositoryStub} from './__test__'

import {ResetPasswordUseCaseImpl} from 'app/modules/auth/usecases'
import {ResetPasswordUseCase} from 'app/modules/auth/domain/usecases'

import {UniqueEntityID} from 'app/core/domain'
import {TokenEntity, TokenRevokedError, TokenExpiredError, TokenNotFoundError} from '../../domain'

interface SutTypes {
  sut: ResetPasswordUseCase,
  findTokenRepositoryStub: FindTokenRepository,
}

const makeSut = (): SutTypes => {
  const findTokenRepositoryStub = makeFindTokenRepositoryStub()
  const sut = new ResetPasswordUseCaseImpl(
    findTokenRepositoryStub
  )

  return {
    sut,
    findTokenRepositoryStub,
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
})
