import {
  GenerateRandomPasswordService,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'
import Hash from '@ioc:Adonis/Core/Hash'

export class GenerateRandomPasswordServiceImpl implements GenerateRandomPasswordService {
  public async generate (username: string): Promise<string> {
    return Hash.make(username)
  }
}
