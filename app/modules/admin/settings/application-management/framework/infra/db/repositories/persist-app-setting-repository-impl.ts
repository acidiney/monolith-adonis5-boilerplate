import { PersistAppSettingRepository } from '../../../../usecases/persist-app-setting'
import { AppSettingColorMapper } from '../mappers'
import { ApplicationSettingsEntity } from '../../../../domain/entity/application-settings-entity'
import { AppSettingModel } from '../models/app-setting-model'
import { DateTime } from 'luxon'

export class PersistAppSettingRepositoryImpl implements
    PersistAppSettingRepository {
  constructor (
    private readonly appSettingMapper: AppSettingColorMapper =
    new AppSettingColorMapper()
  ) { }

  public async persist (appSetting: ApplicationSettingsEntity): Promise<void> {
    const lastId= await AppSettingModel.query()
      .whereNull('deleted_at')
      .firstOrFail()

    lastId.deletedAt = DateTime.now()
    lastId.save()
    const appSettingColor = await this.appSettingMapper.toPersistence(appSetting)

    await appSettingColor.save()
  }
}
