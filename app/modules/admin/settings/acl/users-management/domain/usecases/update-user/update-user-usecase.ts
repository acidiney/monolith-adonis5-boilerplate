import { Either, UseCase } from 'app/core/domain'
import { EmailError } from 'app/modules/@shared/domain/errors'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { UserAlreadyExistError } from '../../errors'
import { UpdateUserUseCaseInput } from './update-user-usecase-input'

export type UpdateUserErrors =
    UserAlreadyExistError | UserNotFoundError | EmailError.EmailInvalidError | EmailError.EmailRequiredError

export type UpdateUserUseCase = UseCase<UpdateUserUseCaseInput, Either<UpdateUserErrors, boolean>>
