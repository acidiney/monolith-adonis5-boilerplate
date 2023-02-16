import { Controller } from 'app/core/ports'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FindNotificationsUseCase } from '../../../domain'

export class ShowSettingsPageController implements Controller<HttpContextContract> {
  constructor (
    private readonly findNotificationsUseCase: FindNotificationsUseCase
  ) {}

  public async perform ({ auth, inertia, response}: HttpContextContract): Promise<any> {
    if (!auth.user) {
      return response.redirect().back()
    }

    const notifications = await this.findNotificationsUseCase.perform({
      userId: auth.user.id,
    })

    return inertia.render('admin/common/framework/views/settings/general', {
      ...notifications,
    })
  }
}
