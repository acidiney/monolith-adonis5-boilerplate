import {
  RetrieveNewestNotificationsController,
} from 'app/modules/admin/common/framework/main/controllers/retrieve-newest-notifications-controller'
import {RetrieveNewestNotificationsUseCaseImpl} from 'app/modules/admin/common/usecases'
import {
  RetrieveUserNewestNotificationsRepositoryImpl,
} from 'app/modules/admin/common/framework/infra/db/repositories/retrieve-user-newest-notifications-repository-impl'
import {UserNotificationMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {DateAdapterImpl} from 'app/modules/@shared/framework/infra'

export const makeRetrieveNewestNotificationsControllerFactory = (): RetrieveNewestNotificationsController => {
  return new RetrieveNewestNotificationsController(
    new RetrieveNewestNotificationsUseCaseImpl(
      new RetrieveUserNewestNotificationsRepositoryImpl(new UserNotificationMapper()),
      new DateAdapterImpl()
    )
  )
}
