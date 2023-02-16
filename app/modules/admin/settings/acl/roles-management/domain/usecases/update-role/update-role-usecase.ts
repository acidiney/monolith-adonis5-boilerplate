import { Either, UseCase } from 'app/core/domain'
import { NonRootCannotModifyError, RoleNotFoundError } from '../../errors'
import { UpdateRoleUseCaseInput } from './update-role-usecase-input'

export type UpdateRoleUseCase = UseCase<
  UpdateRoleUseCaseInput,
  Either<RoleNotFoundError | NonRootCannotModifyError, boolean>
>
