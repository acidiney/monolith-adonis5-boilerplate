import { ApplicationSettingsEntity } from '../../../domain/entity/application-settings-entity'

export interface FindAppSettingRepository{
  findAppSetting():Promise <ApplicationSettingsEntity >
}
