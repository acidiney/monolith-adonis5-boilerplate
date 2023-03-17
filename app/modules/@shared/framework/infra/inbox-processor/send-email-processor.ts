import CoreSendEmailJob, { SendEmailProps } from './../jobs/core-send-email-job'
import { InboxProcessorContract } from 'app/modules/@shared/domain/ports'
import Bull from '@ioc:Rocketseat/Bull'

export class SendEmailProcessor implements InboxProcessorContract<SendEmailProps> {
  public async perform (input: SendEmailProps): Promise<void> {
    Bull.add(CoreSendEmailJob.name, {
      to: input.to,
      bcc: input.bcc,
      attach: input.attach,
      content: input.content,
      subject: input.subject,
    })
  }
}
