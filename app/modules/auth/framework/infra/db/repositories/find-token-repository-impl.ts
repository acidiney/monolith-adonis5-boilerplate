import {TokenEntity} from 'app/modules/auth/domain'
import {TokenModel} from 'app/modules/auth/framework/infra/db/models/token-model'
import {FindTokenRepository} from 'app/modules/shared/usecases/ports/find-token-repository'
import {TokenMapper} from 'app/modules/auth/framework/infra/db/mappers/token-mapper'

export class FindTokenRepositoryImpl implements FindTokenRepository {
  constructor (
    public readonly tokenMapper: TokenMapper
  ) {
  }

  public async find (token: string): Promise<TokenEntity | undefined> {
    const tokenModel = await TokenModel.findBy('token', token)

    if (!tokenModel) {
      return
    }

    return this.tokenMapper.toDomain(tokenModel)
  }
}
