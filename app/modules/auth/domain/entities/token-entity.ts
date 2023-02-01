import {Entity, UniqueEntityID} from 'app/core/domain'

interface TokenProps {
  expiredAt: Date
  revoked: boolean

  userId: UniqueEntityID
}

export class TokenEntity extends Entity<TokenProps> {
  public get expiredAt (): Date {
    return this.props.expiredAt
  }

  public get isRevoked (): boolean {
    return this.props.revoked
  }

  public get isExpiredAt (): boolean {
    return this.expiredAt.getTime() > (new Date()).getTime()
  }

  public get userId (): UniqueEntityID {
    return this.props.userId
  }

  public static hydrate (id: UniqueEntityID, props: TokenProps): TokenEntity {
    return new TokenEntity(props, id)
  }
}
