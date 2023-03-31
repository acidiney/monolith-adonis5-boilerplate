import { ApplicationSettingsEntity, Color } from '../../domain'
import { FindAppSettingColorUseCaseImpl } from './find-app-setting-usecase-impl'
import { FindAppSettingRepository } from './ports'

interface SutTypes{
  sut: FindAppSettingColorUseCaseImpl
  findAppSettingRepository: FindAppSettingRepository
}

const makeFindAppSettingRepository = (): FindAppSettingRepository => {
  class FindAppSettingRepositoryMock implements FindAppSettingRepository{
    public async findAppSetting ():Promise<ApplicationSettingsEntity> {
      const color = Color.create({ value: '#448bff' })

      if (color.isLeft()) {
        throw new Error()
      }

      const appSettings = ApplicationSettingsEntity.create(
        'appName', 'appDesc', color.value, color.value, color.value, color.value
      )
      if (appSettings.isLeft()) {
        throw new Error()
      }

      return appSettings.value
    }
  }
  return new FindAppSettingRepositoryMock()
}
const makeSut = (): SutTypes => {
  const findAppSettingRepository = makeFindAppSettingRepository()

  const sut = new FindAppSettingColorUseCaseImpl(findAppSettingRepository)
  return { sut, findAppSettingRepository}
}

describe('Find App settings usecase implementation unit test', () => {
  it('should return a Appsettings', async () => {
    const { sut, findAppSettingRepository } = makeSut()

    const findAppSettingSpy = jest.spyOn(findAppSettingRepository, 'findAppSetting')

    await sut.perform()

    expect(findAppSettingSpy).toBeCalledTimes(1)
  })
})
