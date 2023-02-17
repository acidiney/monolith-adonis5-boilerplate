import { Either, UseCase } from 'app/core/domain'
import { PasswordMismatchError, UserNotFoundError } from 'app/modules/auth/domain'
import { SamePasswordError, WrongCurrentPasswordError } from '../../errors'
import { UpdatePasswordUseCaseInput } from './update-password-usecase-input'

export type UpdatePasswordUseCase = UseCase<UpdatePasswordUseCaseInput, Either<
    UserNotFoundError | WrongCurrentPasswordError |
    PasswordMismatchError | SamePasswordError,
    boolean
>>
