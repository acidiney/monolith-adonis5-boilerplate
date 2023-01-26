import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import { JobContract } from '@ioc:Rocketseat/Bull'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class SendResetPasswordLinkJob implements JobContract {
  public key = 'SendResetPasswordLinkJob'

  public async handle (job) {
    const { data } = job

    const AppName = Env.get('APP_NAME')

    await Mail.send((message) => {
      message
        .from(Env.get('MAIL_FROM'))
        .to(data.email)
        .subject(`${AppName} - Pedido de alteração de senha`)
        .htmlView('emails/forgot', {
          ...data,
          hash: Encryption.encrypt(Env.get('APP_KEY')),
        })
    })
  }
}
