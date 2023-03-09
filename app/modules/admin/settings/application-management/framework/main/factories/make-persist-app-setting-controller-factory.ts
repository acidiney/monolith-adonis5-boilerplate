import { EventDispatcher } from 'app/core/domain'
import { PersistAppSettingUseCaseImpl } from '../../../usecases/persist-app-setting'
import { PersistAppSettingController } from '../controllers/persist-app-setting/persist-app-setting-controller'
import { PersistAppSettingRepositoryImpl } from '../../infra/db/repositories/persist-app-setting-repository-impl'

export const makePersistAppSettingControllerFactory = (): PersistAppSettingController => {
  return new PersistAppSettingController(
    new PersistAppSettingUseCaseImpl(
      new PersistAppSettingRepositoryImpl(),
      EventDispatcher.getInstance()
    )
  )
}
