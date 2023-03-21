import {
  RetrieveNewestNotificationsUseCase,
  RetrieveNewestNotificationsUseCaseInput, RetrieveNewestNotificationsUseCaseOutput,
} from 'app/modules/admin/common/domain'
import {
  RetrieveUserNotificationsRepository,
} from './ports/retrieve-user-notifications-repository'
import {UniqueEntityID} from 'app/core/domain'
import {DateAdapter} from 'app/modules/@shared/domain/ports'

export class RetrieveNewestNotificationsUseCaseImpl implements RetrieveNewestNotificationsUseCase {
  constructor (
    private readonly retrieveUserNotificationsRepository: RetrieveUserNotificationsRepository,
    private readonly dateAdapter: DateAdapter
  ) {
  }

  public async perform (input: RetrieveNewestNotificationsUseCaseInput):
  Promise<RetrieveNewestNotificationsUseCaseOutput[]> {
    const userNotifications = await this.retrieveUserNotificationsRepository.findAll(new UniqueEntityID(input.userId), {
      hideOpenedNotifications: input.hideOpenedNotifications || true,
      page: input.page,
      perPage: input.perPage,
      withPagination: input.withPagination,
      orderDirection: input.orderDirection,
    })

    return userNotifications.map((uN) => ({
      routePath: uN.routePath,
      title: uN.subject,
      message: uN.message,
      icon: uN.icon,
      eventType: uN.eventType,
      hash: uN.hash,
      createdAt: this.dateAdapter.format(uN.createdAt),
      createdAtText: this.dateAdapter.toRelative(uN.createdAt),
    }))
  }
}
