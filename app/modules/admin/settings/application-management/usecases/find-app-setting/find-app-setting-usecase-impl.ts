import { AppSettingUseCaseOutput } from '../../domain'
import { FindAppSettingUseCase } from '../../domain/usecases/find-app-setting/find-app-setting-usecase'
import { FindAppSettingRepository } from './ports/find-app-setting-repository'

export class FindAppSettingColorUseCaseImpl implements FindAppSettingUseCase{
  constructor (private readonly findAppSettingRepository: FindAppSettingRepository
  ){}
  public async perform (): Promise<AppSettingUseCaseOutput>{
    const appSetting = await this.findAppSettingRepository.findAppSetting()
      .then((a) => {
        return {
          appName:a?.appName,
          appDesc:a?.appDesc,
          appColorPrimary:a?.appColorPrimary,
          appColorSecondary:a?.appColorSecondary,
          appBackgroundPrimaryColor:a?.appBackgroundPrimaryColor,
          appBackgroundSecondaryColor:a?.appBackgroundSecondaryColor,
        }
      })
    console.log(appSetting)

    return {appSetting}
  }
}
