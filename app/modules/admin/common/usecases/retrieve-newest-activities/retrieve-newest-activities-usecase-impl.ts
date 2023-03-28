import {
  RetrieveNewestActivitiesUseCase,
  RetrieveNewestActivitiesUseCaseInput,
  RetrieveNewestActivitiesUseCaseOutput,
} from 'app/modules/admin/common/domain'
import {
  RetrieveLatestActivitiesRepository,
} from './ports'
import {Either, left, right} from 'app/core/domain'
import {DateAdapter} from 'app/modules/@shared/domain/ports'
import {FindUsernameRepository} from 'app/modules/@shared/usecases/ports/find-username-repository'
import {UserNotFoundError} from 'app/modules/@shared/domain/errors'

export class RetrieveNewestActivitiesUseCaseImpl implements RetrieveNewestActivitiesUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly retrieveLatestActivitiesRepository: RetrieveLatestActivitiesRepository,
    private readonly dateAdapter: DateAdapter
  ) {
  }
  public async perform (input: RetrieveNewestActivitiesUseCaseInput):
  Promise<Either<UserNotFoundError, RetrieveNewestActivitiesUseCaseOutput[]>> {
    const user = await this.findUsernameRepository.findUsername(input.userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const output = await this.retrieveLatestActivitiesRepository.find(user.id)
      .then((activities) => activities.map((activity, index) => ({
        operation: activity.operation,
        success: activity.success,
        last: index === 0,
        recordAt: this.dateAdapter.format(activity.createdAt),
        recordAtText: this.dateAdapter.toRelative(activity.createdAt),
      })))

    return right(output)
  }
}
