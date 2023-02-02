import {TokenEntity} from 'app/modules/auth/domain'

export interface UpdateTokenRepository {
  update (token: TokenEntity): Promise<void>
}
