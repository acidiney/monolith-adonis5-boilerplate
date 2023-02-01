import {SendResetPasswordLinkInput, SendResetPasswordLinkService} from 'app/modules/auth/usecases'

export const makeSendResetPasswordLinkServiceStub = (): SendResetPasswordLinkService => {
  return new (class implements SendResetPasswordLinkService {
    public async send (_input: SendResetPasswordLinkInput): Promise<void> {
      return Promise.resolve()
    }
  })()
}
