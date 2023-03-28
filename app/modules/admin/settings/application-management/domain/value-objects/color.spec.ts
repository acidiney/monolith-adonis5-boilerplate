import { Color } from './colors'

describe('Color unit test', () => {
  it('should not create a color if it empty', () => {
    const sut = Color.create({ value: '' })

    expect(sut.isLeft()).toBeTruthy()
  })

  it('should not create a color is not a hexadecimal pattern', () => {
    const sut = Color.create({ value: '#448bff' })

    expect(sut.isRight()).toBeTruthy()
  })
})
