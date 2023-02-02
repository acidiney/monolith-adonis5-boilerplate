import {TokenEntity} from 'app/modules/auth/domain'
import {TokenMapper} from 'app/modules/auth/framework/infra/db/mappers/token-mapper'
import {UpdateTokenRepository} from 'app/modules/auth/usecases/reset-password/ports'

export class UpdateTokenRepositoryImpl implements UpdateTokenRepository {
  constructor (
    private readonly tokenMapper: TokenMapper
  ) {}

  public async update (tokenEntity: TokenEntity): Promise<void> {
    const tokenModel = this.tokenMapper.toPersistence(tokenEntity)

    await tokenModel.save()
  }
}
