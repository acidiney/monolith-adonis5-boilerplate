import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { UpdatePasswordUseCase } from '../../../domain'
import { UpdatePasswordValidator } from '../validators/update-password-validator'

export class UpdatePasswordController implements Controller<HttpContextContract> {
  constructor (
    private readonly updatePasswordUseCase: UpdatePasswordUseCase
  ) { }

  public async perform ({ auth, session, request, i18n, response }: HttpContextContract): Promise<any> {
    if (!auth.user) {
      return response.redirect().back()
    }

    const validations = await request.validate(UpdatePasswordValidator)
      .catch(() => {})

    if (!validations) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('common.user.update_password_params_error'),
      })

      return response.redirect().back()
    }

    const output = await this.updatePasswordUseCase.perform({
      userId: auth.user.id,
      passwordOptions: {
        currentPassword: validations.currentPassword,
        newPassword: validations.newPassword,
        confirmPassword: validations.confirmPassword,
      },
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('common.user.password_updated'),
    })

    return response.redirect().back()
  }
}
