import {UserEntity} from 'app/domain/entities/user-entity'

export interface PersistUserRepository {
  persist (user: UserEntity): Promise<void>
}
