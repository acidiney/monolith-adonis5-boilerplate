import { Handler } from 'app/infra/listeners/handler'
import { UserBlockedEvent } from '../../../../domain/events/user-blocked-event'

export class SendEmailToBlockedUserListener extends Handler<UserBlockedEvent> {
  public async handle (_event: UserBlockedEvent): Promise<void> {
    // do something, like, send e-mail or log
    console.log('should send email to blocked user')
  }
}
