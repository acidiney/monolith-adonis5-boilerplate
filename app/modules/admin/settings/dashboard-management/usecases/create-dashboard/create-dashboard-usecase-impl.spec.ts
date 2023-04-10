import { EventDispatcher } from 'app/core/domain'
import { Dashboard, DashboardErrors, CreateDashboardUseCaseInput } from '../../domain'
import { CreateDashboardUseCaseImpl } from './create-dashboard-usecase-impl'

import { CreateDashboardRepository } from './ports'

interface SutTypes {
  sut: CreateDashboardUseCaseImpl
  createDashboardRepositoryStub: CreateDashboardRepository
}

const makeCreateDashboardRepositoryStub = (): CreateDashboardRepository => {
  return new (class implements CreateDashboardRepository {
    public async persist (_dashboard: Dashboard): Promise<void> {
      // do nothing
    }
  })()
}

const makeSut = (): SutTypes => {
  const createDashboardRepositoryStub = makeCreateDashboardRepositoryStub()
  const sut = new CreateDashboardUseCaseImpl(createDashboardRepositoryStub, new EventDispatcher())

  return { sut, createDashboardRepositoryStub }
}

describe('CreateDashboardUseCase', () => {
  it('should return dashboard name is required', async () => {
    const { sut } = makeSut()

    const input: CreateDashboardUseCaseInput = {
      name: '',
      description: '',
    }

    const output = await sut.perform(input)

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(DashboardErrors.InvalidDashboardName)
  })

  it ('should be able to create a dashboard', async () => {
    const { sut } = makeSut()

    const input: CreateDashboardUseCaseInput = {
      name: 'Default',
      description: '',
    }

    const output = await sut.perform(input)

    expect(output.isRight()).toBeTruthy()
  })
})
