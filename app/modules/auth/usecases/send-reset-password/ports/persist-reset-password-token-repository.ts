import { UniqueEntityID } from 'App/core/domain'
export interface PersistResetPasswordTokenRepository {
  persist(userId: UniqueEntityID, hash: string): Promise<void>
}
