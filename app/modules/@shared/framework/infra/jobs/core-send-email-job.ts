import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import Encryption from '@ioc:Adonis/Core/Encryption'

import { JobsOptions } from 'bullmq'
import { Job, JobContract } from '@ioc:Rocketseat/Bull'

export interface SendEmailProps {
  to: string
  subject: string
  cc?: string
  bcc?: string
  attach?: string,
  content: string
  lang: string
}

export default class CoreSendEmailJob implements JobContract {
  public key = CoreSendEmailJob.name

  public options: JobsOptions = {
    removeOnComplete: true,
  }

  public async handle (job: Job<SendEmailProps>) {
    const { data } = job

    const appName = Env.get('APP_NAME')

    const { to, cc, bcc, content, subject, attach } = data

    await Mail.send((message) => {
      message
        .from(Env.get('MAIL_FROM'))
        .to(to)
        .subject(`${appName} - ${subject}`)
        .header('x-sign-token', Encryption.encrypt(appName))

      if (bcc) {
        message.bcc(bcc)
      }

      if (cc) {
        message.cc(cc)
      }

      if (attach) {
        message.attach(attach)
      }

      message
        .html(content)
    })
  }
}
