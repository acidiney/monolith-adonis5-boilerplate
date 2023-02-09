import {
  GenerateRandomPasswordService,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'

export const makeGenerateRandomPasswordServiceStub = (): GenerateRandomPasswordService => {
  return new (class implements GenerateRandomPasswordService {
    public generate (_username: string): Promise<string> {
      return Promise.resolve('hash_password')
    }
  })()
}
