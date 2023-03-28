import {
  RetrieveUserActivitiesController,
} from 'app/modules/admin/common/framework/main/controllers/retrieve-user-activities-controller'
import {RetrieveNewestActivitiesUseCaseImpl} from 'app/modules/admin/common/usecases/retrieve-newest-activities'
import {RetrieveNewestActivitiesRepositoryImpl} from 'app/modules/admin/common/framework/infra'
import {DateAdapterImpl, FindUsernameRepositoryImpl} from 'app/modules/@shared/framework/infra'

export const makeRetrieveUserActivitiesControllerFactory = () => {
  return new RetrieveUserActivitiesController(
    new RetrieveNewestActivitiesUseCaseImpl(
      new FindUsernameRepositoryImpl(),
      new RetrieveNewestActivitiesRepositoryImpl(),
      new DateAdapterImpl()
    )
  )
}
