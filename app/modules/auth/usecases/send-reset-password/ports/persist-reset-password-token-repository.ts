import { UniqueEntityID } from 'app/core/domain'
export interface PersistResetPasswordTokenRepository {
  persist(userId: UniqueEntityID, hash: string): Promise<void>
}
