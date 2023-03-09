import { IEventDispatcher, left,right } from 'app/core/domain'
import { PersistAppSettingUseCase, PersistAppSettingUseCaseInput } from '../../domain/usecases/persist-app-setting'
import { PersistAppSettingRepository } from './ports'
import { ApplicationSettingsEntity } from '../../domain/entity/application-settings-entity'
import { AppSettingCreated } from '../../domain/events/app-setting-created'
import { CreatedAppSettingResult } from '../../domain/usecases/persist-app-setting/persist-app-setting-usecase'
import { Color } from '../../domain/value-objects/colors'
import { AppSettingInputErrors } from '../../domain/errors/app-setting-input-errors'

export class PersistAppSettingUseCaseImpl implements PersistAppSettingUseCase{
  constructor (private readonly persistAppSettingRepository: PersistAppSettingRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) { }
  public async perform (input: PersistAppSettingUseCaseInput): Promise<CreatedAppSettingResult> {
    const appColorPrimaryOrError = Color.create({ value: input.appColorPrimary })
    const appColorSecundaryOrError = Color.create({ value: input.appColorSecundary })
    const appBackgroundColorPrimaryOrError = Color.create({ value: input.appBackgroundPrimaryColor })
    const appBackgroundColorSecundaryOrError = Color.create({ value: input.appBackgroundSecundaryColor })

    if (appColorPrimaryOrError.isLeft() || appColorSecundaryOrError.isLeft() ||
        appBackgroundColorPrimaryOrError.isLeft() || appBackgroundColorSecundaryOrError.isLeft()) {
      return left(new AppSettingInputErrors.AppColorRequiredError())
    }

    const createAppSettingOrError = ApplicationSettingsEntity.create(
      input.appName,
      input.appDesc,
      appColorPrimaryOrError.value,
      appColorSecundaryOrError.value,
      appBackgroundColorPrimaryOrError.value,
      appBackgroundColorSecundaryOrError.value
    )

    if (createAppSettingOrError.isLeft()) {
      return left(createAppSettingOrError.value)
    }

    await this.persistAppSettingRepository.persist(createAppSettingOrError.value)

    this.eventDispatcher.publish(
      new AppSettingCreated({
        appName: createAppSettingOrError.value.appName,
        appDesc: createAppSettingOrError.value.appDesc,
        appColorPrimary: createAppSettingOrError.value.appColorPrimary,
        appColorSecondary: createAppSettingOrError.value.appColorSecondary,
        appBackgroundPrimaryColor: createAppSettingOrError.value.appBackgroundPrimaryColor,
        appBackgroundSecondaryColor: createAppSettingOrError.value.appBackgroundSecondaryColor,
      })
    )

    return right(true)
  }
}
