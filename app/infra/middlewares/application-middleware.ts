import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {CoreApplicationSettings} from 'app/modules/@shared/framework/infra/db/models'

export default class MenuMiddleware {
  public async handle (
    { session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if(!session.get('header')) {
      const settings = await CoreApplicationSettings
        .query()
        .whereNull('deleted_at')
        .orderBy('created_at', 'desc')
        .first()

      if (!settings) {
        throw new Error('Application need to be have at least, one global configuration')
      }

      session.put('header', {
        appName: settings.appName,
        appDescription: settings.appDesc,
        appColorPrimary: settings.appColorPrimary,
        appColorSecondary: settings.appColorSecondary,
        appBackgroundColorPrimary: settings.appBackgroundPrimaryColor,
        appBackgroundColorSecondary: settings.appBackgroundSecondaryColor,
      })
    }

    await next()
  }
}
