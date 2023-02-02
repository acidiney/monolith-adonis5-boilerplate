import {Entity, UniqueEntityID} from 'app/core/domain'

export enum TokenTypes {
  RECOVER_PASSWORD = 'recover_password',
}

export type TokenType = TokenTypes.RECOVER_PASSWORD

interface TokenProps {
  expiredAt: Date
  revoked: boolean

  token: string
  tokenType:TokenType
  userId: UniqueEntityID
}

export class TokenEntity extends Entity<TokenProps> {
  public get expiredAt (): Date {
    return this.props.expiredAt
  }

  public get isRevoked (): boolean {
    return this.props.revoked
  }

  public get isExpired (): boolean {
    return this.expiredAt.getTime() < (new Date()).getTime()
  }

  public get userId (): UniqueEntityID {
    return this.props.userId
  }

  public get token (): string {
    return this.props.token
  }

  public get tokenType (): TokenType {
    return this.props.tokenType
  }

  public revoke (): void {
    this.props.revoked = true
  }

  public static hydrate (id: UniqueEntityID, props: TokenProps): TokenEntity {
    return new TokenEntity(props, id)
  }
}
