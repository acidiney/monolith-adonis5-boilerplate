import { UseCase } from 'app/core/domain'
import {
  RetrieveNewestNotificationsUseCaseInput,
  RetrieveNewestNotificationsUseCaseOutput,
} from 'app/modules/admin/common/domain'
export type RetrieveNewestNotificationsUseCase =
  UseCase<RetrieveNewestNotificationsUseCaseInput, RetrieveNewestNotificationsUseCaseOutput[]>
