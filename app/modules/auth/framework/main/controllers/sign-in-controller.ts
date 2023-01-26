import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Controller } from 'app/core/ports'
import { AuthenticateUserUseCase } from 'app/modules/auth/domain/usecases'

import { SignInValidator } from '../validators/sign-in-validator'

export class SignInController implements Controller<HttpContextContract> {
  constructor (
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

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

    const output = await this.authenticateUserUseCase.perform(validation)

    if (output.isLeft()) {
      session.flash('errors', {
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    await auth.use('web').loginViaId(output.value.userId)

    logger.info(validation.username + ' - ' + i18n.formatMessage('auth.login.success'))
    return response.redirect('/account/dashboard')
  }
}
