import { UniqueEntityID } from 'app/core/domain'

export interface PersistInstalledAddonRepository {
  persist (name: string, version: number, currentUserId: UniqueEntityID): Promise<void>
}
