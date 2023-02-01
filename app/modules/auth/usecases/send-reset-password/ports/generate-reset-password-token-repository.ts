import { UniqueEntityID } from 'App/core/domain'
export interface GenerateResetPasswordTokenRepository {
  generate(userId: UniqueEntityID): Promise<string>
}
