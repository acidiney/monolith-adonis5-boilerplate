import { Mapper, UniqueEntityID } from 'app/core/domain'
import { DateAdapter } from 'app/modules/@shared/domain/ports'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra'
import { ApplicationSettingsEntity } from '../../../../domain/entity/application-settings-entity'
import { Color } from '../../../../domain/value-objects/colors'

import { AppSettingModel } from '../models/app-setting-model'

export class AppSettingColorMapper extends Mapper<ApplicationSettingsEntity, AppSettingModel> {
  constructor (
    private readonly dateAdapter: DateAdapter = new DateAdapterImpl()
  ) {
    super()
  }

  public toDomain (appSettingModel: AppSettingModel): ApplicationSettingsEntity {
    const appColorPrimaryOrError = Color.create({ value: appSettingModel.appColorPrimary })

    if (appColorPrimaryOrError.isLeft()) {
      throw new Error(appColorPrimaryOrError.value.errorMessage)
    }

    const appColorSecondaryOrError = Color.create({ value: appSettingModel.appColorSecondary })

    if (appColorSecondaryOrError.isLeft()) {
      throw new Error(appColorSecondaryOrError.value.errorMessage)
    }

    const appBackgroundPrimaryOrError = Color.create({ value: appSettingModel.appBackgroundPrimaryColor })

    if (appBackgroundPrimaryOrError.isLeft()) {
      throw new Error(appBackgroundPrimaryOrError.value.errorMessage)
    }

    const appBackgroundSecondaryOrError = Color.create({ value: appSettingModel.appBackgroundSecondaryColor })
    if (appBackgroundSecondaryOrError.isLeft()) {
      throw new Error(appBackgroundSecondaryOrError.value.errorMessage)
    }

    const appSettingColors = ApplicationSettingsEntity.hydrate(new UniqueEntityID(appSettingModel.id), {
      appName: appSettingModel.appName,
      appDesc: appSettingModel.appDesc,
      appColorPrimary: appColorPrimaryOrError.value,
      appColorSecondary: appColorSecondaryOrError.value,
      appBackgroundPrimaryColor: appBackgroundPrimaryOrError.value,
      appBackgroundSecondaryColor: appBackgroundSecondaryOrError.value,
    })

    if (appSettingColors.isLeft()) {
      throw new Error(appSettingColors.value.errorMessage)
    }
    console.log(appBackgroundPrimaryOrError.value)
    return appSettingColors.value
  }
  public async toPersistence (_applicationSettingsEntity: ApplicationSettingsEntity):
  | Promise<AppSettingModel> {
    let appSettingModel: AppSettingModel = new AppSettingModel()
    appSettingModel.appName = _applicationSettingsEntity.appName
    appSettingModel.appDesc = _applicationSettingsEntity.appDesc
    appSettingModel.appColorPrimary = _applicationSettingsEntity.appColorPrimary
    appSettingModel.appColorSecondary = _applicationSettingsEntity.appColorSecondary
    appSettingModel.appBackgroundPrimaryColor = _applicationSettingsEntity.appBackgroundPrimaryColor
    appSettingModel.appBackgroundSecondaryColor = _applicationSettingsEntity.appBackgroundSecondaryColor
    appSettingModel.deletedAt = this.dateAdapter.toDatePersistence(_applicationSettingsEntity.deletedAt)

    return appSettingModel
  }
}
