import {Either, UseCase} from 'app/core/domain'
import {
  RetrieveNewestActivitiesUseCaseInput,
} from './retrieve-newest-activities-usecase-input'
import {
  RetrieveNewestActivitiesUseCaseOutput,
} from './retrieve-newest-activities-usecase-output'
import {UserNotFoundError} from 'app/modules/@shared/domain/errors'

export type RetrieveNewestActivitiesUseCase =
  UseCase<RetrieveNewestActivitiesUseCaseInput, Either<UserNotFoundError, RetrieveNewestActivitiesUseCaseOutput[]>>
