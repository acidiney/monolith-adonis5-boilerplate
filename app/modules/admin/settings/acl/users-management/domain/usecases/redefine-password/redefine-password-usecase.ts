import { UserNotFoundError } from 'app/modules/@shared/domain/errors/user-not-found-error'
import { Either, UseCase } from 'app/core/domain'
import { RedefinePasswordUseCaseInput } from './redefine-password-usecase-input'

export type RedefinePasswordUseCase = UseCase<RedefinePasswordUseCaseInput, Either<UserNotFoundError, string>>
