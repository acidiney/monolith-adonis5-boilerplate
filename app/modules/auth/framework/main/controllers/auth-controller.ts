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

  public async signIn({ auth, request, i18n, session, response, logger }: HttpContextContract) {
    const { username, password } = request.all()

    try {
      await auth.use('web').attempt(username, password)

      logger.info(username + '- ' + i18n('auth.sign_in.success'))
      return response.redirect('/account/dashboard')
    } catch (e) {
      logger.error(e.message)
      session.flash('errors', i18n('auth.sign_in.failed'))
      return response.redirect().back()
    }
  }

  public async signOut({ auth, session, i18n, logger, response }: HttpContextContract) {
    try {
      await auth.use('web').logout()

      return response.redirect('/auth')
    } catch (e) {
      logger.error(e.message)
      session.flash('errors', i18n.formatMessage('auth.logout.failed'))
      return response.redirect().back()
    }
  }

  public async sendResetPasswordMail({
    request,
    i18n,
    session,
    response,
    logger,
  }: HttpContextContract) {
    const { username } = request.all()

    const { data, error } = await this.generateResetPasswordUseCase.execute(username)

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
