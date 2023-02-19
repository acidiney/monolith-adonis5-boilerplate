import { UseCase, Either } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { UnblockUserUseCaseInput } from './unblock-user-usecase-input'

export type UnblockUserUseCase = UseCase<UnblockUserUseCaseInput, Either<UserNotFoundError, boolean>>
