import { SendResetPasswordUseCase } from './../../../domain/usecases'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class SendResetPasswordController {
  constructor (
    private readonly sendResetPasswordUseCase: SendResetPasswordUseCase
  ) {}

  public async perform ({ request }) {
    const { username } = request.all()

    const { data, error } = await this.sendResetPasswordUseCase.perform({ username })

    if (error || !data) {
      logger.error(error?.message as string)
      session.flash('errors', error?.message as string)
      return response.redirect().back()
    }

    await Bull.add(new Job().key, { token: data.token, user: data.user })
    session.flash('success', i18n('auth.reset_password.mail_sent'))
    logger.info(i18n('auth.reset_password.mail_sent'))
    return response.redirect().back()
  }
}
