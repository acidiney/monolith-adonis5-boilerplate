import {Either, UseCase} from 'app/core/domain'
import {
  FindRoleUseCaseInput,
} from './find-role-usecase-input'
import {RoleNotFoundError} from 'app/modules/admin/settings/acl/roles-management/domain/errors'
import {
  FindRoleUseCaseOutput,
} from './find-role-usecase-output'

export type FindRoleUseCase = UseCase<FindRoleUseCaseInput, Either<RoleNotFoundError, FindRoleUseCaseOutput>>
