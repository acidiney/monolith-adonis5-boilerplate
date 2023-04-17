import { AddIndicatorsToDashboardUseCaseImpl } from './add-indicators-to-dashboard-usecase-impl'
import {
  AddIndicatorsToDashboard,
  AddIndicatorsToDashboardUseCase,
  Dashboard,
  DashboardErrors,
} from '../../domain'
import { EventDispatcher, UniqueEntityID } from 'app/core/domain'
import { TransactionAdapter } from 'app/core/ports'
import {
  FindDashboardRepository,
  IndicatorDasboard,
  PersistIndicatorsIntoDashboardWithTransactionRepository,
} from './ports'
import { makeTransactionAdapterStub } from 'app/modules/@shared/usecases/__test__'

interface SutTypes {
  sut: AddIndicatorsToDashboardUseCase;
  findDashboardRepositoryStub: FindDashboardRepository;
  persistIndicatorsIntoDashboardWithTransactionRepositoryStub: PersistIndicatorsIntoDashboardWithTransactionRepository;
  transactionAdapterSub: TransactionAdapter;
}

const makeFindDashboardRepositoryStub = (): FindDashboardRepository => {
  return new (class implements FindDashboardRepository {
    public async find (): Promise<Dashboard | undefined> {
      //

      const dashboardOrError = Dashboard.create({
        name: 'valid-dashboard',
        description: 'valid dashboard',
        items: [],
      })

      if (dashboardOrError.isLeft()) {
        throw new Error()
      }

      return dashboardOrError.value
    }
  })()
}

const makePersistIndicatorsIntoDashboardWithTransactionRepositoryStub =
  (): PersistIndicatorsIntoDashboardWithTransactionRepository => {
    return new (class
    implements PersistIndicatorsIntoDashboardWithTransactionRepository {
      public async persistWithTransaction (
        _input: IndicatorDasboard[],
        _trx
      ): Promise<boolean> {
        return true
      }
    })()
  }

const makeSut = (): SutTypes => {
  const findDashboardRepositoryStub = makeFindDashboardRepositoryStub()
  const persistIndicatorsIntoDashboardWithTransactionRepositoryStub =
    makePersistIndicatorsIntoDashboardWithTransactionRepositoryStub()

  const transactionAdapterSub = makeTransactionAdapterStub()

  const sut = new AddIndicatorsToDashboardUseCaseImpl(
    findDashboardRepositoryStub,
    persistIndicatorsIntoDashboardWithTransactionRepositoryStub,
    transactionAdapterSub,
    new EventDispatcher()
  )

  return {
    sut,
    findDashboardRepositoryStub,
    persistIndicatorsIntoDashboardWithTransactionRepositoryStub,
    transactionAdapterSub,
  }
}

describe('AddIndicatorsToDashboardUseCase', () => {
  it('should return dashboard does not exists', async () => {
    const { sut, findDashboardRepositoryStub } = makeSut()

    jest.spyOn(findDashboardRepositoryStub, 'find').mockResolvedValueOnce(undefined)

    const output = await sut.perform({
      dashboardId: new UniqueEntityID('invalid-dashboard-id'),
      indicators: [],
    })
    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toEqual(new DashboardErrors.DashboardNotFound())
  })

  it('should return indicators are required', async () => {
    const { sut } = makeSut()

    const output = await sut.perform({
      dashboardId: new UniqueEntityID('valid-dashboard-id'),
      indicators: [],
    })
    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toEqual(
      new AddIndicatorsToDashboard.NeedToHaveAtLeastOneIndicatorError()
    )
  })
})
