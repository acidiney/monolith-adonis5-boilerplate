import Bull from '@ioc:Rocketseat/Bull'
import Job from '../jobs/send-reset-password-link-job'
import { SendResetPasswordLinkInput, SendResetPasswordLinkService } from 'app/modules/auth/usecases'

export class SendResetPasswordServiceImpl implements SendResetPasswordLinkService {
  public async send (input: SendResetPasswordLinkInput): Promise<void> {
    Bull.add(new Job().key, {
      email: input.username,
      fullName: input.fullName,
      token: input.token,
    })
  }
}
