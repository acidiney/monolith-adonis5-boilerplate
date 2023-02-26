import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { FindUserUseCaseInput } from './find-user-usecase-input'
import { FindUserUseCaseOutput } from './find-user-usecase-output'

export type FindUserUseCase = UseCase<FindUserUseCaseInput, Either<UserNotFoundError, FindUserUseCaseOutput>>
