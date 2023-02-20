import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/@shared/domain/errors'
import { RootUserCannotBeModified } from '../../errors'
import { BlockUserUseCaseInput } from './block-user-usecase-input'

export type BlockUserUseCase = UseCase<BlockUserUseCaseInput,
 Either<UserNotFoundError | RootUserCannotBeModified, boolean>>
