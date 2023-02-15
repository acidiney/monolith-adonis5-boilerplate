import {Either, UseCase} from 'app/core/domain'
import {
  DeleteRoleUseCaseInput,
} from './delete-role-usecase-input'
import {
  RoleHaveAssociatedUsersError,
  RoleNotFoundError,
} from 'app/modules/admin/settings/acl/roles-management/domain/errors'

export type DeleteRoleUseCase = UseCase<DeleteRoleUseCaseInput,
  Either<RoleNotFoundError | RoleHaveAssociatedUsersError, boolean>>
