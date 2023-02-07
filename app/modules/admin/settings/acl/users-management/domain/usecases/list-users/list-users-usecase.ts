import {UseCase} from 'app/core/domain'
import {ListUsersUseCaseInput, ListUsersUseCaseOutput} from 'app/modules/admin/settings/acl/users-management/domain'

export type ListUsersUseCase = UseCase<ListUsersUseCaseInput, ListUsersUseCaseOutput>
