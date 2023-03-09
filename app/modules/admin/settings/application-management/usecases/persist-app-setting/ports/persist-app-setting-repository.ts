import { ApplicationSettingsEntity } from '../../../domain/entity/application-settings-entity'

export interface PersistAppSettingRepository{
  persist(applicationSetting:ApplicationSettingsEntity):Promise<void>
}
