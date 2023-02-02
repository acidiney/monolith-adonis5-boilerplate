import luxon from 'luxon'
import {TokenEntity} from 'app/modules/auth/domain'
import {Mapper, UniqueEntityID} from 'app/core/domain'
import {TokenModel} from 'app/modules/auth/framework/infra/db/models/token-model'

export class TokenMapper implements Mapper<TokenEntity, TokenModel>{
  public toDomain (tokenModel: TokenModel): TokenEntity {
    return TokenEntity.hydrate(new UniqueEntityID(tokenModel.id), {
      token: tokenModel.token,
      userId: new UniqueEntityID(tokenModel.userId),
      revoked: tokenModel.isRevoked,
      expiredAt: tokenModel.expiresAt.toJSDate(),
      tokenType: tokenModel.type,
    })
  }

  public toPersistence (tokenEntity: TokenEntity): TokenModel {
    const tokenModel = new TokenModel()

    tokenModel.id = tokenEntity.id.toString()
    tokenModel.type = tokenEntity.tokenType
    tokenModel.token = tokenEntity.token
    tokenModel.expiresAt = luxon.DateTime.fromJSDate(tokenEntity.expiredAt)
    tokenModel.isRevoked = tokenEntity.isRevoked

    return tokenModel
  }
}
