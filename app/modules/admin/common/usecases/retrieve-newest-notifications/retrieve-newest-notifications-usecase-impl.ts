import {
  RetrieveNewestNotificationsUseCase,
  RetrieveNewestNotificationsUseCaseInput, RetrieveNewestNotificationsUseCaseOutput,
} from 'app/modules/admin/common/domain'
import {
  RetrieveUserNotificationsRepository,
} from 'app/modules/admin/common/usecases'
import {UniqueEntityID} from 'app/core/domain'
import {DateAdapter} from 'app/modules/@shared/domain/ports'
import {NotificationEntity} from 'app/modules/@shared/domain/entities/notification-entity'

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

    return (userNotifications as NotificationEntity[]).map((uN: NotificationEntity) => ({
      routePath: uN.routePath,
      title: uN.subject,
      message: uN.message,
      icon: uN.icon,
      eventType: uN.eventType,
      hash: uN.id.toString(),
      event: uN.event,
      createdAt: this.dateAdapter.format(uN.createdAt),
      createdAtText: this.dateAdapter.toRelative(uN.createdAt),
    }))
  }
}
