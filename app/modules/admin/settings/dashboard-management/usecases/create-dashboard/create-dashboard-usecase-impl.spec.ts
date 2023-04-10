import { DashboardErrors } from '../../domain/errors/dashboard-errors'
import { CreateDashboardUseCaseInput } from './../../domain/usecases/create-dashboard/create-dashboard-usecase-input'
import { CreateDashboardUseCaseImpl } from './create-dashboard-usecase-impl'

describe('CreateDashboardUseCase', () => {
  it('should return dashboard name is required', async () => {
    const sut = new CreateDashboardUseCaseImpl()

    const input: CreateDashboardUseCaseInput = {
      name: '',
      description: '',
    }

    const output = await sut.perform(input)

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(DashboardErrors.InvalidDashboardName)
  })
})
