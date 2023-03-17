import {join} from 'path'
import {Edge} from 'edge.js'

import Env from '@ioc:Adonis/Core/Env'
import Encryption from '@ioc:Adonis/Core/Encryption'
import { BroadcastMessageContract } from 'app/modules/@shared/domain/ports'
import { SendResetPasswordLinkInput, SendResetPasswordLinkService } from 'app/modules/auth/usecases'

export class SendResetPasswordServiceImpl implements SendResetPasswordLinkService {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract
  ) {}

  public async send (input: SendResetPasswordLinkInput): Promise<void> {
    const appName = Env.get('APP_NAME')
    const resetPasswordLink = `${Env.get('APP_INTERNAL_URL')}/auth/reset/password/${input.token}`
    const edge = new Edge({ cache: false })

    edge.mount(join(__dirname, '..', './resources'))

    const html = await edge.render('pt/send-reset-password-link',
      {
        ...input,
        plataform: appName,
        link: resetPasswordLink,
        hash: Encryption.encrypt(Env.get('APP_KEY')),
      })

    await this.broadcastMessage.publish('core.shared', {
      message: {
        type: 'send_email',
        content: html,
        subject: 'auth.request_password.request',
        to: input.username,
      },
      meta: {
        userId: null,
      },
    })
  }
}
