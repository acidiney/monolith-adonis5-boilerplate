import { IEventDispatcher, left,right } from 'app/core/domain'
import { PersistAppSettingUseCase, PersistAppSettingUseCaseInput } from '../../domain/usecases/persist-app-setting'
import { PersistAppSettingRepository } from './ports'
import { ApplicationSettingsEntity } from '../../domain/entity/application-settings-entity'
import { AppSettingModifiedEvent } from '../../domain/events/app-setting-modified'
import { CreatedAppSettingResult } from '../../domain/usecases/persist-app-setting/persist-app-setting-usecase'
import { Color } from '../../domain/value-objects/colors'
import { AppSettingInputErrors } from '../../domain/errors/app-setting-input-errors'
import { FindAppSettingRepository } from '../find-app-setting/ports/find-app-setting-repository'

export class PersistAppSettingUseCaseImpl implements PersistAppSettingUseCase{
  constructor (
    private readonly findAppSettingRepository: FindAppSettingRepository,
    private readonly persistAppSettingRepository: PersistAppSettingRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) { }
  public async perform (input: PersistAppSettingUseCaseInput): Promise<CreatedAppSettingResult> {
    const appColorPrimaryOrError = Color.create({ value: input.appColorPrimary })
    const appColorSecundaryOrError = Color.create({ value: input.appColorSecondary })
    const appBackgroundColorPrimaryOrError = Color.create({ value: input.appBackgroundPrimaryColor })
    const appBackgroundColorSecundaryOrError = Color.create({ value: input.appBackgroundSecondaryColor })

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
    const lastId = await this.findAppSettingRepository.findAppSetting()

    await this.persistAppSettingRepository.persist(createAppSettingOrError.value)

    this.eventDispatcher.publish(
      new AppSettingModifiedEvent({
        lastId: lastId.id,
        currentId:createAppSettingOrError.value.id,
      })
    )

    return right(true)
  }
}
