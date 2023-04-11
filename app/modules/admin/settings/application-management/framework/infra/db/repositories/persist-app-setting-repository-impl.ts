import { PersistAppSettingRepository } from '../../../../usecases/persist-app-setting'
import { AppSettingColorMapper } from '../mappers'
import { ApplicationSettingsEntity } from '../../../../domain/entity/application-settings-entity'
import { CoreApplicationSettings } from 'app/modules/@shared/framework/infra'

export class PersistAppSettingRepositoryImpl implements
    PersistAppSettingRepository {
  constructor (
    private readonly appSettingMapper: AppSettingColorMapper =
    new AppSettingColorMapper()
  ) { }

  public async persist (appSetting: ApplicationSettingsEntity): Promise<void> {
    const lastId= await CoreApplicationSettings.query()
      .whereNull('deleted_at')
      .firstOrFail()

    lastId.delete()
    lastId.save()
    const appSettingColor = await this.appSettingMapper.toPersistence(appSetting)

    await appSettingColor.save()
  }
}
