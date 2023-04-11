
import { CoreApplicationSettings } from 'app/modules/@shared/framework/infra'
import { ApplicationSettingsEntity } from '../../../../domain'
import { FindAppSettingRepository } from '../../../../usecases/find-app-setting/ports/find-app-setting-repository'
import { AppSettingColorMapper } from '../mappers'

export class FindAppSettingRepositoryImpl implements FindAppSettingRepository{
  constructor (
    private readonly appSettingMapper: AppSettingColorMapper
  ) {}
  public async findAppSetting (): Promise<ApplicationSettingsEntity> {
    const applicationSetting = await CoreApplicationSettings
      .query()
      .whereNull('deleted_at')
      .firstOrFail()

    return this.appSettingMapper.toDomain(applicationSetting)
  }
}
