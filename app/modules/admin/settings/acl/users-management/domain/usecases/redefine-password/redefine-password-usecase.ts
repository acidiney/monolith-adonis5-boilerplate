import { Either, UseCase } from 'app/core/domain'
import { RedefinePasswordUseCaseInput } from './redefine-password-usecase-input'
import { UserInactiveError, UserNotFoundError } from 'app/modules/@shared/domain/errors'

export type RedefinePasswordUseCase = UseCase<RedefinePasswordUseCaseInput,
Either<UserNotFoundError | UserInactiveError, string>>
