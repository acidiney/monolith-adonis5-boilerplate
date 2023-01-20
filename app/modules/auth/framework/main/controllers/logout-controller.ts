import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class LogoutController {
  public async perform({ auth, session, i18n, logger, response }: HttpContextContract) {
    try {
      await auth.use('web').logout()

      session.flash('success', i18n.formatMessage('auth.logout.success'))
      return response.redirect('/auth/login')
    } catch (e) {
      logger.error(e.message)
      session.flash('errors', i18n.formatMessage('auth.logout.failed'))
      return response.redirect().back()
    }
  }
}
