import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignInValidator from '../validators/sign-in-validator'

export class SignInController {
  public async perform ({ auth, request, i18n, session, response, logger }: HttpContextContract) {
    await request.validate(SignInValidator)

    const { username, password } = request.all()

    try {
      await auth.use('web').attempt(username, password)

      logger.info(username + ' - ' + i18n.formatMessage('auth.login.success'))
      return response.redirect('/admin/account/dashboard')
    } catch (e) {
      console.log(e)
      session.flash('errors.invalid_credentials', i18n.formatMessage('auth.login.failed'))
      return response.redirect().back()
    }
  }
}
