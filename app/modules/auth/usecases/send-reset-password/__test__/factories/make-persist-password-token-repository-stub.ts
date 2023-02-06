import { PersistResetPasswordTokenRepository } from 'app/modules/auth/usecases'
import {UniqueEntityID} from 'app/core/domain'

export const makePersistPasswordTokenRepositoryStub = (): PersistResetPasswordTokenRepository => {
  return new (class implements PersistResetPasswordTokenRepository {
    public async persist (_userId: UniqueEntityID, _hash: string): Promise<void> {
    }
  })()
}
