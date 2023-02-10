import { AddonService } from 'app/modules/shared/usecases/ports/addon-service'
import { Addon } from '../../../domain/entities/addon'
import { RetrieveAddonsService } from '../../../usecases/list-addons/ports'

export class RetrieveAddonsServiceImpl implements RetrieveAddonsService {
  constructor (
    private readonly addonService: AddonService
  ) {}

  public async retrieveAll (): Promise<Addon[]> {
    return this.addonService.findAll()
      .then((addons) => addons.map((addon) => ({
        name: addon.name,
        description: addon.description,
        url: addon.url,
        image: addon.image,
        version: addon.version,
      })))
  }
}
