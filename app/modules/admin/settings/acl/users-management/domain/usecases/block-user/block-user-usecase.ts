import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { BlockUserUseCaseInput } from './block-user-usecase-input'

export type BlockUserUseCase = UseCase<BlockUserUseCaseInput, Either<UserNotFoundError, boolean>>
