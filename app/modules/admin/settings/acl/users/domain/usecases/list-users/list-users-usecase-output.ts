import {Pagination} from 'app/core/ports'
import {UserEntity} from 'app/domain/entities/user-entity'

export type ListUsersUseCaseOutput = Pagination<UserEntity[]>
