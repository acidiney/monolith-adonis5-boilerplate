/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Either, UseCase} from 'app/core/domain'
import {
  CreateUserUseCaseInput,
} from './create-user-usecase-input'
import {UserAlreadyExistError} from 'app/modules/admin/settings/acl/users-management/domain/errors'

export type CreateUserUseCase = UseCase<CreateUserUseCaseInput, Either<UserAlreadyExistError, string>>
