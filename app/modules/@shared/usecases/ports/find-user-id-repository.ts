import { UserEntity } from 'app/modules/@shared/domain/entities/user-entity'
import {UniqueEntityID} from 'app/core/domain'

export interface FindUserIdRepository {
  findUserId (id: UniqueEntityID): Promise<UserEntity | undefined>
}
