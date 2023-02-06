import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import { Job, JobContract } from '@ioc:Rocketseat/Bull'
import { SendResetPasswordLinkInput } from 'app/modules/auth/usecases'
import {JobsOptions} from 'bullmq'

import {Edge} from 'edge.js'
import {join} from 'path'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class SendResetPasswordLinkJob implements JobContract {
  public key = 'SendResetPasswordLinkJob'

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle (job: Job<SendResetPasswordLinkInput>) {
    const { data } = job

    const appName = Env.get('APP_NAME')
    const resetPasswordLink = `${Env.get('APP_INTERNAL_URL')}/auth/reset/password/${data.token}`
    const edge = new Edge({ cache: false })
    edge.mount(join(__dirname, '..', './resources'))

    const html = await edge.render('pt/send-reset-password-link',
      {
        user: data,
        plataform: appName,
        link: resetPasswordLink,
        hash: Encryption.encrypt(Env.get('APP_KEY')),
      })

    await Mail.send((message) => {
      message
        .from(Env.get('MAIL_FROM'))
        .to(data.username)
        .subject(`${appName} - Pedido de alteração de senha`)
        .header('x-token', data.token)
        .html(html)
    })
  }
}
