import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull'
import Job from 'App/Jobs/AuthSendResetPassword'

import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'
import GenerateResetPassword from 'App/Domain/User/Auth/UseCase/GenerateResetPasswordUseCase'
import ResetPassword from 'App/Domain/User/Auth/UseCase/ResetPasswordUseCase'

export default class AuthenticationController {
  constructor(
    private readonly generateResetPasswordUseCase: GenerateResetPassword,
    private readonly resetPasswordUseCase: ResetPassword
  ) {}

  public async resetPassword({
    params,
    i18n,
    request,
    session,
    response,
    logger,
  }: HttpContextContract) {
    await request.validate(ResetPasswordValidator)
    const { token } = params
    const { password } = request.all()

    const { data, error } = await this.resetPasswordUseCase.execute(token, password)

    if (error || !data) {
      logger.error(error?.message as string)
      session.flash('errors', error?.message as string)
      return response.redirect().back()
    }

    logger.info(token + '- ' + i18n('auth.reset_password.success'))
    return response.redirect('/auth/login')
  }
}
