import {FindTokenRepository} from './ports'
import {makeFindTokenRepositoryStub} from './__test__'
import {ResetPasswordUseCaseImpl} from 'app/modules/auth/usecases'
import {ResetPasswordUseCase} from 'app/modules/auth/domain/usecases'

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
  })
})
