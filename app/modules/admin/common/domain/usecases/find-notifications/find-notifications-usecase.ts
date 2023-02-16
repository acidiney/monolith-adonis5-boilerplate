import { UseCase } from 'app/core/domain'
import { FindNotificationsUseCaseOutput } from './find-notifications-usecase-output'

export type FindNotificationsUseCase = UseCase<{ userId: string }, FindNotificationsUseCaseOutput>
