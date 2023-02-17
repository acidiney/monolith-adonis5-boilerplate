import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { UpdateUserInfoUseCaseInput } from './update-user-info-usecase-input'

export type UpdateUserInfoUseCase = UseCase<UpdateUserInfoUseCaseInput, Either<UserNotFoundError, boolean>>
