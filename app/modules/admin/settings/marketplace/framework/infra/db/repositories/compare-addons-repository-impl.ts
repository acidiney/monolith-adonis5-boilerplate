import { Addon } from '../../../../domain/entities/addon'
import { InstalledAddonModel } from '../model/installed-addon-model'
import { CompareAddonsRepository } from './../../../../usecases/list-addons/ports/compare-addons-repository'

export class CompareAddonsRepositoryImpl implements CompareAddonsRepository {
  public async compare (addons: Addon[]): Promise<Addon[]> {
    const installedAddons = await InstalledAddonModel.all()

    return addons.map((a) => {
      const foundAddon = installedAddons.find((iAddon) => a.name === iAddon.addonName)

      if (!foundAddon) {
        return {
          ...a,
          canInstall: true,
        }
      }

      return {
        ...a,
        update: a.version > foundAddon.version,
        canInstall: a.version > foundAddon.version,
      }
    })
  }
}
