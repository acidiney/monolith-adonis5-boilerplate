import { UniqueEntityID } from 'App/core/domain'
export interface GenerateRestPasswordTokenRepository {
  generate(userId: UniqueEntityID): Promise<string>
}
