import { UserEntity } from 'app/domain/entities/user-entity'

export interface FindUsernameRepository {
  findUsername (username: string): Promise<UserEntity | undefined>
}
