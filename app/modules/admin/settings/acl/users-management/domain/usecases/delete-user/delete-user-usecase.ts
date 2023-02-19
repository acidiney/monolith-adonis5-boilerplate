import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { DeleteUserUseCaseImpl } from './delete-user-usecase-input'

export type DeleteUserUseCase = UseCase<DeleteUserUseCaseImpl,Either<UserNotFoundError, boolean>>
