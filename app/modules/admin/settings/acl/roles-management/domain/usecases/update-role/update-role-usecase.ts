import { Either, UseCase } from 'app/core/domain'
import { RoleNotFoundError } from '../../errors'
import { UpdateRoleUseCaseInput } from './update-role-usecase-input'

export type UpdateRoleUseCase = UseCase<
  UpdateRoleUseCaseInput,
  Either<RoleNotFoundError, boolean>
>
