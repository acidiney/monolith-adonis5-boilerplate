import {UserEntity} from 'app/modules/auth/domain'

export interface UpdateUserRepository {
  update (user: UserEntity): Promise<void>
}
