import { DashboardErrors } from '../errors/dashboard-errors'
import { Dashboard } from './dashboard'

describe('Dashboard', () => {
  it('should return InvalidDashboardName when dashboard name is empty', () => {
    const sut = Dashboard.create({
      name: '',
      description: '',
      items: [],
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(DashboardErrors.InvalidDashboardName)
  })

  it('should return InvalidDashboardName when dashboard name is less than the minimun allowed', () => {
    const sut = Dashboard.create({
      name: 'AB',
      description: '',
      items: [],
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(DashboardErrors.InvalidDashboardName)
  })

  it('shoudl return a valid instance of Dashboard', async () => {
    const sut = Dashboard.create({
      name: 'A valid Dashboard',
      description: '',
      items: [],
    })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Dashboard)
  })
})
