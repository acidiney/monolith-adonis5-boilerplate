import {
  GenerateRandomPasswordService,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'
import {cuid} from '@ioc:Adonis/Core/Helpers'

export class GenerateRandomPasswordServiceImpl implements GenerateRandomPasswordService {
  public async generate (_username: string): Promise<string> {
    return cuid()
  }
}
