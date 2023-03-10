import { ShowAppSettingPageController } from '../controllers/show-app-setting'
import { FindAppSettingColorUseCaseImpl } from '../../../usecases/find-app-setting/find-app-setting-usecase-impl'
import { FindAppSettingRepositoryImpl } from '../../infra/db/repositories/find-app-setting-repository-impl'
import { AppSettingColorMapper } from '../../infra'

export const makeShowAppSettingFactory = () => {
  return new ShowAppSettingPageController(
    new FindAppSettingColorUseCaseImpl(
      new FindAppSettingRepositoryImpl(new AppSettingColorMapper())
    )
  )
}
