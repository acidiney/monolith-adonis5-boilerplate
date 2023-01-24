import { UniqueEntityID } from 'app/core/domain'
import { InstalledAddonModel } from '../model/installed-addon-model'
import { PersistInstalledAddonRepository }
  from './../../../../usecases/install-addon/ports/persist-installed-addon-repository'

export class PersistInstalledAddonRepositoryImpl implements PersistInstalledAddonRepository {
  public async persist (name: string, version: number, currentUserId: UniqueEntityID): Promise<void> {
    await InstalledAddonModel.create({
      addonName: name,
      version,
      userId: currentUserId.toString(),
    })
  }
}
