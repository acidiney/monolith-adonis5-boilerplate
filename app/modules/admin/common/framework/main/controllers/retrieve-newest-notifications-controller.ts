import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {RetrieveNewestNotificationsUseCase} from 'app/modules/admin/common/domain'

export class RetrieveNewestNotificationsController implements Controller<HttpContextContract> {
  constructor (
    private readonly retrieveNewestNotificationUseCase: RetrieveNewestNotificationsUseCase
  ) {
  }

  public async perform ({ auth, i18n, response }: HttpContextContract): Promise<any> {
    const userId = auth.user?.id

    if (!userId) {
      return response.unauthorized({
        error: i18n.formatMessage('shared.unauthorized'),
      })
    }

    const output = await this.retrieveNewestNotificationUseCase.perform({
      userId,
      orderDirection: 'desc',
      hideOpenedNotifications: true,
      perPage: 8,
      page: 1,
      withPagination: false,
    })

    return response.ok(output)
  }
}
