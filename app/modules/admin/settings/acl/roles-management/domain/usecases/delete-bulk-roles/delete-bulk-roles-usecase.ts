import { Either, UseCase } from 'app/core/domain'
import { RoleHaveAssociatedUsersError, RoleNotFoundError } from '../../errors'
import { DeleteBulkRolesUseCaseInput } from './delete-bulk-roles-usecase-input'

export type DeleteBulkRolesUseCase = UseCase<DeleteBulkRolesUseCaseInput,
Either<RoleNotFoundError | RoleHaveAssociatedUsersError, boolean>>
