import { ApplicationSettingsEntity } from './application-settings-entity'
import { Color } from '../value-objects'

describe('first', () => {
  it('should create the application settings', () => {
    const color = Color.create({ value: '#448bff' })

    if (color.isLeft()) {
      throw new Error()
    }

    const sut = ApplicationSettingsEntity.create('appName',
      'appDesc', color.value, color.value, color.value, color.value)

    expect(sut.isRight()).toBeTruthy()
  })

  it('should allow to change de appName', () => {
    const color = Color.create({ value: '#448bff' })

    if (color.isLeft()) {
      throw new Error()
    }
    const sut = ApplicationSettingsEntity.create('appName', 'appDesc',
      color.value, color.value, color.value, color.value)

    if (sut.isRight()) {
      const company = sut.value

      company.changeAppName('NewName')

      expect(company.appName).toBe('NewName')
    }
  })
})
