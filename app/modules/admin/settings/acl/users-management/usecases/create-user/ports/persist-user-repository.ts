import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'

export interface PersistUserRepository {
  persist (user: UserEntity): Promise<string>
}
