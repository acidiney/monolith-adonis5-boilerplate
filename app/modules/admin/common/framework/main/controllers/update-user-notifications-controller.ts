import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {
  UpdateUserNotificationsValidator,
} from 'app/modules/admin/common/framework/main/validators/update-user-notifications-validator'
import {UpdateUserNotificationsUseCase} from 'app/modules/admin/common/domain'

export class UpdateUserNotificationsController implements Controller<HttpContextContract> {
  constructor (
    private readonly updateUserNotificationsUseCase: UpdateUserNotificationsUseCase,
  ) {
  }

  public async perform ({ auth, request, response, i18n }: HttpContextContract): Promise<any> {
    if (!auth.user) {
      return response.redirect().back()
    }

    const validation = await request.validate(UpdateUserNotificationsValidator)
      .catch(() => {})

    if (!validation) {
      return response.badRequest({
        message: i18n.formatMessage('common.user.notification.missing_params'),
      })
    }

    const output = await this.updateUserNotificationsUseCase.perform({
      userId: auth.user.id,
      selectedNotificationIds: validation.notificationId,
      type: validation.type as any,
    })

    if (output.isLeft()) {
      return response.badRequest({
        message: i18n.formatMessage(output.value.errorMessage),
      })
    }

    return response.ok({
      message: i18n.formatMessage('common.user.notification.updated'),
    })
  }
}
