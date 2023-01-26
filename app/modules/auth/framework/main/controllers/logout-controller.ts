import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'app/core/ports'

export class LogoutController implements Controller<HttpContextContract> {
  public async perform ({ auth, session, i18n, response }) {
    await auth.use('web').logout()

    session.flash('success', i18n.formatMessage('auth.logout.success'))
    return response.redirect('/auth/login')
  }
}
