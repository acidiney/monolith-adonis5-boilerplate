import {Either, UseCase} from 'app/core/domain'
import {InvalidNotificationTypeError, UpdateUserNotificationsUseCaseInput} from 'app/modules/admin/common/domain'

export type UpdateUserNotificationsUseCase = UseCase<UpdateUserNotificationsUseCaseInput,
  Either<InvalidNotificationTypeError, boolean>>
