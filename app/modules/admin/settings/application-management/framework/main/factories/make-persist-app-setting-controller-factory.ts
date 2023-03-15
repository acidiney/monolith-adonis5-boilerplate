import { EventDispatcher } from 'app/core/domain'
import { PersistAppSettingUseCaseImpl } from '../../../usecases/persist-app-setting'
import { PersistAppSettingController } from '../controllers/persist-app-setting/persist-app-setting-controller'
import {PersistAppSettingRepositoryImpl, AppSettingColorMapper, FindAppSettingRepositoryImpl } from '../../infra'

export const makePersistAppSettingControllerFactory = (): PersistAppSettingController => {
  return new PersistAppSettingController(
    new PersistAppSettingUseCaseImpl(
      new FindAppSettingRepositoryImpl(new AppSettingColorMapper()),
      new PersistAppSettingRepositoryImpl(),
      EventDispatcher.getInstance()
    )
  )
}
