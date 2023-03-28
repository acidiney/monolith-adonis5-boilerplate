import Env from '@ioc:Adonis/Core/Env'
import I18n from '@ioc:Adonis/Addons/I18n'
import Encryption from '@ioc:Adonis/Core/Encryption'
import { BroadcastMessageContract, EmailAdapter } from 'app/modules/@shared/domain/ports'
import { SendResetPasswordLinkInput, SendResetPasswordLinkService } from 'app/modules/auth/usecases'
import { CoreBroadcastEnum } from 'app/modules/@shared/domain/types'

export class SendResetPasswordServiceImpl implements SendResetPasswordLinkService {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract,
    private readonly emailAdapter: EmailAdapter
  ) {}

  public async send (input: SendResetPasswordLinkInput): Promise<void> {
    const appName = Env.get('APP_NAME')
    const resetPasswordLink = `${Env.get('APP_INTERNAL_URL')}/auth/reset/password/${input.token}`

    const html = await this.emailAdapter.render(`${input.userLang}/send-reset-password-link`,
      {
        user: input,
        plataform: appName,
        link: resetPasswordLink,
        hash: Encryption.encrypt(Env.get('APP_KEY')),
      })

    await this.broadcastMessage.publish('core.shared', {
      type: CoreBroadcastEnum.SEND_EMAIL,
      message: {
        content: html,
        subject: I18n.locale(input.userLang).formatMessage('auth.request_password.request'),
        to: input.username,
      },
      meta: {
        userId: null,
      },
    })
  }
}
