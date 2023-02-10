import {TokenEntity} from 'app/modules/auth/domain/entities/token-entity'

export interface FindTokenRepository {
  find (token: string): Promise<TokenEntity | undefined>
}
