import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'app/core/ports'
import { SignInValidator } from '../validators/sign-in-validator'

export class SignInController implements Controller<HttpContextContract> {
  public async perform ({
    auth,
    request,
    i18n,
    session,
    response,
    logger,
  }: HttpContextContract) {
    const validation = await request.validate(SignInValidator)
      .catch((e) => {
        session.flash('errors', e)
      })

    if (!validation) {
      return response.redirect().back()
    }

    const { username, password } = validation

    // refactor this to use "usecases"
    const error = await auth.use('web').attempt(username, password)

    if (!error) {
      session.flash('errors', {
        invalid_credentials: i18n.formatMessage('auth.login.failed'),
      })
      return response.redirect().back()
    }

    logger.info(username + ' - ' + i18n.formatMessage('auth.login.success'))
    return response.redirect('/account/dashboard')
  }
}
