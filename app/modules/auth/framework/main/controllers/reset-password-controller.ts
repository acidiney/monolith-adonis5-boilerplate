import {Controller} from 'app/core/ports'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {ResetPasswordUseCase} from 'app/modules/auth/domain/usecases'
import {ResetPasswordValidator} from 'app/modules/auth/framework/main/validators/reset-password-validator'

export class ResetPasswordController implements Controller<HttpContextContract> {
  constructor (
    public readonly resetPasswordUseCase: ResetPasswordUseCase
  ) {
  }

  public async perform ({ session, request, response, i18n }: HttpContextContract): Promise<any> {
    const validation = await request.validate(ResetPasswordValidator)
      .catch((e) => {
        session.flash('errors', e)
      })

    if (!validation) {
      return response.redirect().back()
    }

    const output = await this.resetPasswordUseCase.perform({
      token: validation.token,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
    })

    if (output.isLeft()) {
      session.flash('errors', i18n.formatMessage(output.value.errorMessage))

      return response.redirect().back()
    }

    session.flash('success', i18n.formatMessage('auth.reset_password.success'))

    return response.redirect('/auth/login')
  }
}
