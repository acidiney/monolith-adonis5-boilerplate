import { UniqueEntityID } from 'app/core/domain'
import { GenerateRestPasswordTokenRepository } from 'app/modules/auth/usecases'

import { HashAdapter } from './ports/hash-adapter'
import { TokenTypes, TokenModel } from '../../models/token-model'

export class GenerateResetPasswordTokenRepositoryImpl implements GenerateRestPasswordTokenRepository {
  constructor (
    private readonly hashAdapter: HashAdapter
  ) {}

  public async generate (userId: UniqueEntityID): Promise<string> {
    const hash = await this.hashAdapter.generate(userId.toString(), TokenTypes.RECOVER_PASSWORD)

    await TokenModel.create({
      userId: userId.toString(),
      token: hash,
      type: TokenTypes.RECOVER_PASSWORD,
    })

    return hash
  }
}
