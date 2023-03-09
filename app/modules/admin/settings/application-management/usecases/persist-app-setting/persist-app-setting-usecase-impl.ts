import { IEventDispatcher, left,right } from 'app/core/domain'
import { PersistAppSettingUseCase, PersistAppSettingUseCaseInput } from '../../domain/usecases/persist-app-setting'
import { PersistAppSettingRepository } from './ports'
import { ApplicationSettingsEntity } from '../../domain/entity/application-settings-entity'
import { AppSettingCreated } from '../../domain/events/app-setting-created'
import { CreatedAppSettingResult } from '../../domain/usecases/persist-app-setting/persist-app-setting-usecase'

export class PersistAppSettingUseCaseImpl implements PersistAppSettingUseCase{
  constructor (private readonly persistAppSettingRepository: PersistAppSettingRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) { }
  public async perform (input: PersistAppSettingUseCaseInput): Promise<CreatedAppSettingResult > {
    const createAppSettingOrError = ApplicationSettingsEntity.create(
      input.appName,
      input.appDesc,
      input.appColorPrimary,
      input.appColorSecondary,
      input.appBackgroundPrimaryColor,
      input.appBackgroundSecondaryColor
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
