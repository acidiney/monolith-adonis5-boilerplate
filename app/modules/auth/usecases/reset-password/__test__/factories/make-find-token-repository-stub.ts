import {FindTokenRepository} from 'app/modules/shared/usecases/ports/find-token-repository'
import {TokenEntity, TokenTypes} from 'app/modules/auth/domain/entities/token-entity'
import {UniqueEntityID} from 'app/core/domain'

export const makeFindTokenRepositoryStub = (): FindTokenRepository => {
  return new (class implements FindTokenRepository{
    public async find (_token: string): Promise<TokenEntity | undefined> {
      return TokenEntity.hydrate(new UniqueEntityID('valid_token_id'), {
        userId: new UniqueEntityID('valid_user_id'),
        revoked: false,
        expiredAt: new Date(),
        tokenType: TokenTypes.RECOVER_PASSWORD,
        token: _token,
      })
    }
  })()
}
