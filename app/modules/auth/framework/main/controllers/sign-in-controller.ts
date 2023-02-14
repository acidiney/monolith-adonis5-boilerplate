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
  }: HttpContextContract) {
    const validation = await request.validate(SignInValidator)
      .catch((e) => {
        session.flash('alert', {
          success: false,
          message: e.messages,
        })
      })

    if (!validation) {
      return response.redirect().back()
    }

    const output = await this.authenticateUserUseCase.perform(validation)

    if (output.isLeft()) {
      session.flash('alertGlobal', {
        success: false,
        message: i18n.formatMessage('auth.user.mismatch'),
      })

      return response.redirect().back()
    }

    await auth.use('web').loginViaId(output.value.userId)
    return response.redirect('/account/dashboard')
  }
}
