import { UserEntity } from 'app/modules/@shared/domain/entities/user-entity'

export interface FindUsernameRepository {
  findUsername (username: string): Promise<UserEntity | undefined>
}
