import Hash from '@ioc:Adonis/Core/Hash'
import { VerifyPasswordMatchAdapter } from 'app/modules/auth/usecases'

export class VerifyPasswordMatchAdapterImpl implements VerifyPasswordMatchAdapter {
  public async compare (hash: string, plain: string): Promise<boolean> {
    return await Hash.verify(hash, plain)
  }
}
