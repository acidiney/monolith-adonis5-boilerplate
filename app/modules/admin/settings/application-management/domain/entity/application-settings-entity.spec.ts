import { ApplicationSettingsEntity } from './application-settings-entity'
import { Color } from '../value-objects'
describe('first', () => {
  it('should create the application settings', () => {
    const color = Color.create({ value: '#448bff' }).value

    const sut = ApplicationSettingsEntity.create('appName', 'appDesc', color, color, color, color)

    console.log(sut)

    expect(sut.isRight()).toBeTruthy()
  })

  it('should allow to change de appName', () => {
    const color = Color.create({ value: '#448bff' }).value

    const sut = ApplicationSettingsEntity.create('appName', 'appDesc', color, color, color, color)

    if (sut.isRight()) {
      const company = sut.value

      company.changeAppName('NewName')

      expect(company.appName).toBe('NewName')
    }
  })
})
