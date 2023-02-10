import { AddonEntity } from 'app/domain/entities/addon-entity'
import { AddonService } from '../../../usecases/ports/addon-service'
import { HttpClient } from '../../../usecases/ports/http-client'

export class AddonServiceImpl implements AddonService {
  constructor (
    private readonly httpClient: HttpClient
  ) {}

  public findAll (): Promise<AddonEntity[]> {
    return this.httpClient.retrieve()
      .then((addons: { data: any[] }) => {
        return addons.data.map((addon) => AddonEntity.create({
          name: addon.attributes.name,
          description: addon.attributes.description,
          url: addon.attributes.url,
          version: addon.attributes.version,
          lastUpdate: addon.attributes.updatedAt,
        }))
      })
  }

  public findPackage (packageName: string): Promise<AddonEntity | undefined> {
    return this.httpClient.retrieve({
      'filters[name][$eq]': packageName,
    })
      .then(({ data: addons }: any) => {
        const addon = addons[0]
        if (!addon) {
          return
        }

        return AddonEntity.create({
          name: addon.attributes.name,
          description: addon.attributes.description,
          url: addon.attributes.url,
          lastUpdate: addon.attributes.updatedAt,
          version: addon.attributes.version,
        })
      })
  }
}
