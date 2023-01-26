import { UserEntity } from 'app/modules/auth/domain/entities/user-entity'

export interface FindUsernameRepository {
  findUsername (username: string): Promise<UserEntity | undefined>
}
