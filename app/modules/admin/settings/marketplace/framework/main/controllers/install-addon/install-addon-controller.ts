import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {Controller} from 'app/core/ports'
import { UniqueEntityID } from 'app/core/domain'

import InstallAddonValidator from '../../validators/install-addon-validator'
import { InstallAddonUseCase } from '../../../../domain/usecases/install-addon-usecase'

export class InstallAddonController implements Controller<HttpContextContract>{
  constructor (
    private readonly installAddonUseCase: InstallAddonUseCase
  ) {}

  public async perform ({ request, i18n, session, response, auth }: HttpContextContract) {
    const result = await request.validate(InstallAddonValidator)
      .catch(() => {
        session.flash('errors', i18n.formatMessage('marketplace.addon.validation_error'))
      })

    if (!result) {
      return response.redirect(
        '/admin/settings/marketplace'
      )
    }

    if (!auth.user) {
      return response.redirect(
        '/admin/settings/marketplace'
      )
    }

    const currentUserId = auth.user.id

    await this.installAddonUseCase.perform({
      addonName: result.addonName,
      version: result.version,
      currentUserId: new UniqueEntityID(currentUserId),
    })

    session.flash('success', i18n.formatMessage('marketplace.addon.installed'))
    return response.redirect(
      '/admin/settings/marketplace'
    )
  }
}
