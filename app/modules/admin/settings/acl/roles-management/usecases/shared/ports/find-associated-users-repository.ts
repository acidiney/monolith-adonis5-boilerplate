import {UniqueEntityID} from 'app/core/domain'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'

export interface FindAssociatedUsersRepository {
  findAssociatedUsers (roleId: UniqueEntityID): Promise<UserEntity[]>
}
