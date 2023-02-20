import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { DeleteUserUseCaseInput } from './delete-user-usecase-input'

export type DeleteUserUseCase = UseCase<DeleteUserUseCaseInput, Either<UserNotFoundError, boolean>>
