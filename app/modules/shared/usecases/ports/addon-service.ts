import { AddonEntity } from 'app/domain/entities/addon-entity'

export interface AddonService {
  findAll (): Promise<AddonEntity[]>
  findPackage (packageName: string): Promise<AddonEntity | undefined>
}
