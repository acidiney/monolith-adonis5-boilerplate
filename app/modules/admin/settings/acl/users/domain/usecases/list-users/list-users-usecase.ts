import {UseCase} from 'app/core/domain'
import {ListUsersUseCaseInput, ListUsersUseCaseOutput} from 'app/modules/admin/settings/acl/users/domain'

export type ListUsersUseCase = UseCase<ListUsersUseCaseInput, ListUsersUseCaseOutput>
