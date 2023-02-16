import { FindNotificationsUseCaseImpl } from '../../../usecases'
import { FindNotificationsRepositoryImpl, NotificationMapper } from '../../infra'
import { ShowSettingsPageController } from '../controllers/show-settings-page-controller'

export const makeShowSettingsPageControllerFactory = (): ShowSettingsPageController => {
  return new ShowSettingsPageController(
    new FindNotificationsUseCaseImpl(
      new FindNotificationsRepositoryImpl(new NotificationMapper())
    )
  )
}
