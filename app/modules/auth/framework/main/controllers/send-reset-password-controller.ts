import { SendResetPasswordUseCase } from './../../../domain/usecases'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SendResetPasswordLinkValidator } from '../validators/send-reset-password-link-validator'
import { Controller } from 'app/core/ports'

export class SendResetPasswordController implements Controller<HttpContextContract>{
  constructor (
    private readonly sendResetPasswordUseCase: SendResetPasswordUseCase
  ) {}

  public async perform ({ request, response, session, i18n }: HttpContextContract) {
    const validation = await request.validate(SendResetPasswordLinkValidator)
      .catch((e) => {
        session.flash('alert', {
          success: false,
          message: e.message,
        })
      })

    if (!validation) {
      return response.redirect().back()
    }

    const result = await this.sendResetPasswordUseCase.perform({ username: validation.username })

    if (result.isLeft()) {
      session.flash('alertGlobal', {
        success: false,
        message: i18n.formatMessage(result.value.errorMessage),
      })
      return response.redirect().back()
    }

    session.flash('alertGlobal', {
      success: true,
      message: i18n.formatMessage('auth.reset_password.mail_sent'),
    })

    return response.redirect().back()
  }
}
