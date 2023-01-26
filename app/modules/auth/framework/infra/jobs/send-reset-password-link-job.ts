import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import { Job, JobContract } from '@ioc:Rocketseat/Bull'
// import Encryption from '@ioc:Adonis/Core/Encryption'
import { SendResetPasswordLinkInput } from 'app/modules/auth/usecases'

export default class SendResetPasswordLinkJob implements JobContract {
  public key = 'SendResetPasswordLinkJob'

  public async handle (job: Job<SendResetPasswordLinkInput>) {
    const { data } = job

    const AppName = Env.get('APP_NAME')

    await Mail.send((message) => {
      message
        .from(Env.get('MAIL_FROM'))
        .to(data.username)
        .subject(`${AppName} - Pedido de alteração de senha`)
        .text('E-mail de test, precisa de i18n aqui tbm, token: ' + data.token)
        // .htmlView('emails/forgot', {
        //   ...data,
        //   hash: Encryption.encrypt(Env.get('APP_KEY')),
        // })
    })
  }
}
