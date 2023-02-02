import {UpdateTokenRepository} from 'app/modules/auth/usecases/reset-password/ports'
import {TokenEntity} from 'app/modules/auth/domain'

export const makeUpdateTokenRepositoryStub = (): UpdateTokenRepository => {
  return new (class implements UpdateTokenRepository{
    public async update (_token:TokenEntity): Promise<void> {
      // do nothing
    }
  })()
}
