export interface SendResetPasswordLinkInput {
  username: string,
  fullName: string,
  token: string
}

export interface SendResetPasswordLinkService {
  send(input: SendResetPasswordLinkInput): Promise<void>
}
