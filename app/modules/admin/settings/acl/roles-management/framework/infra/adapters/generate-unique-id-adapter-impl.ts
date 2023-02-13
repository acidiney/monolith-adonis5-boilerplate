import {GenerateUniqueIdAdapter} from 'app/modules/admin/settings/acl/roles-management/usecases/find-permissions/ports'
import {cuid} from '@ioc:Adonis/Core/Helpers'

export class GenerateUniqueIdAdapterImpl implements GenerateUniqueIdAdapter {
  public generate (): string {
    return cuid()
  }
}
