import { PersistAppSettingRepository } from '../../../../usecases/persist-app-setting'
import { AppSettingColorMapper } from '../mappers'
import { ApplicationSettingsEntity } from '../../../../domain/entity/application-settings-entity'

export class PersistAppSettingRepositoryImpl implements
    PersistAppSettingRepository {
  constructor (
    private readonly appSettingMapper: AppSettingColorMapper =
    new AppSettingColorMapper()
  ) { }

  public async persist (appSetting: ApplicationSettingsEntity):Promise<void> {
    const appSettingColor = await this.appSettingMapper.toPersistence(appSetting)

    await appSettingColor.save()
  }
}
