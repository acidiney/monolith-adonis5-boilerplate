import {GenerateResetPasswordTokenRepository} from 'app/modules/auth/usecases'
import {UniqueEntityID} from 'app/core/domain'

export const makeGeneratePasswordTokenRepositoryStub = (): GenerateResetPasswordTokenRepository => {
  return new (class implements GenerateResetPasswordTokenRepository {
    public async generate (_userId: UniqueEntityID): Promise<string> {
      return Promise.resolve('valid_token')
    }
  })()
}
