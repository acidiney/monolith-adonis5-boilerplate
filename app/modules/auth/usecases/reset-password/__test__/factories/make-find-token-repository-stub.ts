import {FindTokenRepository} from 'app/modules/auth/usecases/shared/ports/find-token-repository'
import {TokenEntity} from 'app/modules/auth/domain/entities/token-entity'
import {UniqueEntityID} from 'app/core/domain'

export const makeFindTokenRepositoryStub = (): FindTokenRepository => {
  return new (class implements FindTokenRepository{
    public async find (_token: string): Promise<TokenEntity | undefined> {
      return TokenEntity.hydrate(new UniqueEntityID('valid_token_id'), {
        userId: new UniqueEntityID('valid_user_id'),
        revoked: false,
        expiredAt: new Date(),
      })
    }
  })()
}
