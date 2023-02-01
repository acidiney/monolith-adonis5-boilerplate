import {AuthenticateUserUseCase} from 'app/modules/auth/domain/usecases'
import {
  AuthenticateUserUseCaseImpl,
  FindUsernameRepository,
  VerifyPasswordMatchAdapter,
} from 'app/modules/auth/usecases'
import {makeFindUsernameRepositoryStub, makeVerifyPasswordMatchAdapterStub} from './__test__'

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
    verifyPasswordMatchAdapterStub
  )

  return {
    sut,
    findUsernameRepositoryStub,
    verifyPasswordMatchAdapterStub,
  }
}

describe('AuthenticateUserUseCase', () => {
  test('it should not found a user', async () => {
    const { sut } = makeSut()

    console.log(await sut.perform({
      password: 'valid',
      username: 'valid',
    }))
  })
})
