import { Either, UseCase } from 'app/core/domain'

import { RoleAlreadyExistError } from '../../errors'
import { CreateRoleUseCaseInput } from './create-role-usecase-input'

export type CreateRoleUseCase = UseCase<CreateRoleUseCaseInput, Either<RoleAlreadyExistError, boolean>>
