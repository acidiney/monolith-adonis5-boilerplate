import { EventDispatcher } from 'app/core/domain'
import { PersistAppSettingUseCaseImpl } from '../../../usecases/persist-app-setting'
import { PersistAppSettingController } from '../controllers/persist-app-setting/persist-app-setting-controller'

export const makePersistAppSettingContollerFactory = (): PersistAppSettingController => {
  return new PersistAppSettingController(
    new PersistAppSettingUseCaseImpl(
      EventDispatcher.getInstance()
    )
  )
}
